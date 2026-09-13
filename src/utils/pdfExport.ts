import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// Shared canvas 2D context for native browser color conversion
let sharedCanvasCtx: CanvasRenderingContext2D | null = null;

function getSharedCanvasCtx(): CanvasRenderingContext2D | null {
  if (!sharedCanvasCtx && typeof document !== 'undefined') {
    try {
      const c = document.createElement('canvas');
      c.width = 1;
      c.height = 1;
      sharedCanvasCtx = c.getContext('2d');
    } catch {
      // ignore
    }
  }
  return sharedCanvasCtx;
}

// Mathematical conversion of OKLCH to linear sRGB
function oklchToLinearSrgb(l: number, c: number, h: number): [number, number, number] {
  const hRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);

  const l_ = Math.pow(l + 0.3963377774 * a + 0.2158037573 * b, 3);
  const m_ = Math.pow(l - 0.1055613458 * a - 0.0638541728 * b, 3);
  const s_ = Math.pow(l - 0.0894841775 * a - 1.2914855480 * b, 3);

  const r = +4.0767434090 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_;
  const g = -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_;
  const bLinear = -0.0041960863 * l_ - 0.7034186147 * m_ + 1.7076147010 * s_;

  return [r, g, bLinear];
}

function linearToSrgb(c: number): number {
  const clamped = Math.max(0, Math.min(1, c));
  const srgb = clamped <= 0.0031308 ? 12.92 * clamped : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
  return Math.round(Math.max(0, Math.min(255, srgb * 255)));
}

// Mathematical parser fallback for OKLCH
function fallbackOklchToRgb(inner: string): string {
  try {
    const cleanInner = inner.replace(/\//g, ' ');
    const parts = cleanInner.trim().split(/\s+/).filter(Boolean);
    if (parts.length >= 3) {
      let l = parseFloat(parts[0]);
      if (isNaN(l)) l = 0;
      if (parts[0].includes('%')) l /= 100;

      let c = parseFloat(parts[1]);
      if (isNaN(c)) c = 0;
      if (parts[1].includes('%')) c = (c / 100) * 0.4;

      let h = parseFloat(parts[2]);
      if (isNaN(h) || parts[2].toLowerCase() === 'none') h = 0;
      if (parts[2].includes('deg')) h = parseFloat(parts[2].replace('deg', '')) || 0;

      let alpha = 1;
      if (parts[3] !== undefined) {
        alpha = parseFloat(parts[3]);
        if (isNaN(alpha)) alpha = 1;
        if (parts[3].includes('%')) alpha /= 100;
      }

      const [rLin, gLin, bLin] = oklchToLinearSrgb(l, c, h);
      const r = linearToSrgb(rLin);
      const g = linearToSrgb(gLin);
      const b = linearToSrgb(bLin);

      return alpha < 1 ? `rgba(${r}, ${g}, ${b}, ${alpha})` : `rgb(${r}, ${g}, ${b})`;
    }
  } catch (e) {
    console.warn('Failed to parse oklch color string math:', inner, e);
  }
  return 'rgb(28, 25, 23)';
}

// Convert any unsupported modern CSS color function (oklch, oklab, color-mix, etc.) to standard rgb/rgba
export function convertOklchToRgb(colorStr: string): string {
  if (!colorStr || typeof colorStr !== 'string') {
    return colorStr;
  }

  if (
    !colorStr.includes('oklch') &&
    !colorStr.includes('oklab') &&
    !colorStr.includes('color-mix') &&
    !colorStr.includes('color(')
  ) {
    return colorStr;
  }

  const ctx = getSharedCanvasCtx();

  // Replace oklch(...) occurrences
  let result = colorStr.replace(/oklch\(\s*([^)]+)\s*\)/gi, (match, inner) => {
    if (ctx) {
      try {
        ctx.fillStyle = '#000000';
        ctx.fillStyle = match;
        const computed = ctx.fillStyle;
        if (computed && !computed.includes('oklch')) {
          return computed;
        }
      } catch {
        // continue to math fallback
      }
    }
    return fallbackOklchToRgb(inner);
  });

  // Replace oklab(...) occurrences
  if (result.includes('oklab')) {
    result = result.replace(/oklab\(\s*([^)]+)\s*\)/gi, (match) => {
      if (ctx) {
        try {
          ctx.fillStyle = '#000000';
          ctx.fillStyle = match;
          const computed = ctx.fillStyle;
          if (computed && !computed.includes('oklab')) {
            return computed;
          }
        } catch {
          // continue
        }
      }
      return 'rgb(28, 25, 23)';
    });
  }

  return result;
}

// Proxy wrapper around CSSStyleDeclaration to intercept any property read that might return oklch
function createCleanComputedStyleProxy(target: CSSStyleDeclaration): CSSStyleDeclaration {
  return new Proxy(target, {
    get(obj, prop, receiver) {
      if (prop === 'getPropertyValue') {
        return (propertyName: string) => {
          const val = obj.getPropertyValue(propertyName);
          return convertOklchToRgb(val);
        };
      }

      const val = Reflect.get(obj, prop, obj);
      if (typeof val === 'function') {
        return val.bind(obj);
      }
      if (typeof val === 'string') {
        return convertOklchToRgb(val);
      }
      return val;
    },
  });
}

// Safeguard CanvasRenderingContext2D.prototype.createPattern against 0-width/0-height canvas bug
function patchContextCreatePattern(targetWin: Window): () => void {
  const ctxProto = (targetWin as any).CanvasRenderingContext2D?.prototype;
  if (!ctxProto || (ctxProto as any).__createPatternPatched) {
    return () => {};
  }
  const original = ctxProto.createPattern;
  ctxProto.createPattern = function (
    image: CanvasImageSource,
    repetition: string | null
  ): CanvasPattern | null {
    // Check if the image/canvas has zero or invalid dimensions
    const width = (image as any)?.width ?? (image as any)?.videoWidth ?? 0;
    const height = (image as any)?.height ?? (image as any)?.videoHeight ?? 0;

    if (width <= 0 || height <= 0) {
      try {
        const dummy = (this.canvas?.ownerDocument || targetWin.document).createElement('canvas');
        dummy.width = 1;
        dummy.height = 1;
        return original.call(this, dummy, repetition || 'repeat');
      } catch {
        return null;
      }
    }

    try {
      return original.call(this, image, repetition);
    } catch {
      try {
        const dummy = (this.canvas?.ownerDocument || targetWin.document).createElement('canvas');
        dummy.width = Math.max(1, Math.round(width));
        dummy.height = Math.max(1, Math.round(height));
        return original.call(this, dummy, repetition || 'repeat');
      } catch {
        return null;
      }
    }
  };
  (ctxProto as any).__createPatternPatched = true;

  return () => {
    ctxProto.createPattern = original;
    delete (ctxProto as any).__createPatternPatched;
  };
}

// Render element to canvas with complete isolation and OKLCH interception
async function renderElementToCanvas(
  element: HTMLElement,
  elementId: string,
  scale: number
): Promise<HTMLCanvasElement> {
  const origWindowGetComputedStyle = window.getComputedStyle;
  const restoreWindowCreatePattern = patchContextCreatePattern(window);

  // Intercept window.getComputedStyle so html2canvas never receives oklch on any element
  window.getComputedStyle = function (elt: Element, pseudoElt?: string | null): CSSStyleDeclaration {
    const comp = origWindowGetComputedStyle.call(window, elt, pseudoElt);
    return createCleanComputedStyleProxy(comp);
  };

  try {
    const canvas = await html2canvas(element, {
      scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: 1200,
      onclone: (clonedDoc) => {
        // 1. Also intercept the cloned iframe window's getComputedStyle and createPattern
        if (clonedDoc.defaultView) {
          const cloneWin = clonedDoc.defaultView;
          patchContextCreatePattern(cloneWin);
          const origCloneGetComputedStyle = cloneWin.getComputedStyle;
          cloneWin.getComputedStyle = function (elt: Element, pseudoElt?: string | null): CSSStyleDeclaration {
            const comp = origCloneGetComputedStyle.call(cloneWin, elt, pseudoElt);
            return createCleanComputedStyleProxy(comp);
          };
        }

        // 2. Normalize root and body backgrounds in the cloned document
        if (clonedDoc.documentElement) {
          clonedDoc.documentElement.style.backgroundColor = '#ffffff';
          clonedDoc.documentElement.style.color = '#1c1917';
          clonedDoc.documentElement.style.transform = 'none';
        }
        if (clonedDoc.body) {
          clonedDoc.body.style.backgroundColor = '#ffffff';
          clonedDoc.body.style.color = '#1c1917';
          clonedDoc.body.style.transform = 'none';
          clonedDoc.body.style.margin = '0';
          clonedDoc.body.style.padding = '0';
        }

        // 3. Sanitize and replace all <style> tags containing oklch
        clonedDoc.querySelectorAll('style').forEach((styleTag) => {
          if (
            styleTag.textContent &&
            (styleTag.textContent.includes('oklch') || styleTag.textContent.includes('oklab'))
          ) {
            const sanitized = convertOklchToRgb(styleTag.textContent);
            const newStyle = clonedDoc.createElement('style');
            newStyle.textContent = sanitized;
            if (styleTag.parentNode) {
              styleTag.parentNode.replaceChild(newStyle, styleTag);
            }
          }
        });

        // 4. Target element layout & transform normalization
        const target = clonedDoc.getElementById(elementId);
        if (target) {
          // Reset transform and offset margins on target and ALL ancestors to prevent coordinate skewing
          let curr: HTMLElement | null = target;
          while (curr && curr !== clonedDoc.body) {
            curr.style.transform = 'none';
            (curr.style as any).webkitTransform = 'none';
            curr.style.boxShadow = 'none';
            curr.style.margin = '0';
            curr.style.padding = '0';
            curr = curr.parentElement;
          }

          target.style.transform = 'none';
          (target.style as any).webkitTransform = 'none';
          target.style.margin = '0 auto';
          target.style.boxShadow = 'none';
          target.style.width = '794px';
          target.style.minWidth = '794px';
          target.style.maxWidth = '794px';
          target.style.minHeight = '1123px';
          target.style.boxSizing = 'border-box';

          // Sanitize descendants for clean rasterization
          target.querySelectorAll('*').forEach((el) => {
            if (el instanceof HTMLElement || el instanceof SVGElement) {
              if (el.style.boxShadow) {
                el.style.boxShadow = convertOklchToRgb(el.style.boxShadow);
              }
              if (el instanceof HTMLElement) {
                if (el.style.background && el.style.background.includes('gradient')) {
                  el.style.background = 'transparent';
                }
                if (el.style.backgroundImage && el.style.backgroundImage.includes('gradient')) {
                  el.style.backgroundImage = 'none';
                }

                // Explicitly normalize section badge headers
                if (el.getAttribute('data-section-badge') === 'true') {
                  el.style.display = 'inline-flex';
                  el.style.alignItems = 'center';
                  el.style.justifyContent = 'center';
                  el.style.lineHeight = '1.25rem';
                }

                // Ensure that sections like Family, Education, Contact do not get cut off awkwardly across page breaks
                if (
                  el.getAttribute('data-biodata-section') === 'true' ||
                  el.classList.contains('biodata-section')
                ) {
                  el.style.pageBreakInside = 'avoid';
                  (el.style as any).breakInside = 'avoid';
                  (el.style as any).webkitColumnBreakInside = 'avoid';
                }
              }
            }
          });
        }
      },
    });

    return canvas;
  } finally {
    // Always restore the global window.getComputedStyle and createPattern
    window.getComputedStyle = origWindowGetComputedStyle;
    restoreWindowCreatePattern();
  }
}

export async function exportToPdf(elementId: string, filename: string): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found`);
    return false;
  }

  try {
    // Wait for all images inside to load
    const images = element.getElementsByTagName('img');
    await Promise.all(
      Array.from(images).map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      })
    );

    // Collect bounding positions of sections to avoid awkward cut-offs across pages
    const elementRect = element.getBoundingClientRect();
    const sectionElements = element.querySelectorAll('[data-biodata-section="true"], .biodata-section');
    const sections: { topRatio: number; bottomRatio: number }[] = [];
    sectionElements.forEach((sec) => {
      if (sec instanceof HTMLElement) {
        const rect = sec.getBoundingClientRect();
        sections.push({
          topRatio: (rect.top - elementRect.top) / elementRect.height,
          bottomRatio: (rect.bottom - elementRect.top) / elementRect.height,
        });
      }
    });

    const canvas = await renderElementToCanvas(element, elementId, 2.0);

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfWidth = 210;
    const pdfHeight = 297;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Calculate height in mm when fitted to 210mm width
    const totalHeightMm = (canvasHeight * pdfWidth) / canvasWidth;

    if (totalHeightMm <= 302) {
      // Single A4 page: perfectly fits the full A4 sheet without awkward bottom cut-offs
      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const renderHeight = Math.min(pdfHeight, totalHeightMm);
      const yOffset = totalHeightMm < 294 ? (pdfHeight - totalHeightMm) / 2 : 0;
      pdf.addImage(imgData, 'JPEG', 0, yOffset, pdfWidth, renderHeight, undefined, 'FAST');
    } else {
      // Multi-page export with smart section-aware page slicing
      const nominalPageCanvasHeight = Math.floor((canvasWidth * pdfHeight) / pdfWidth);
      let yOffset = 0;
      let pageNum = 0;

      while (yOffset < canvasHeight) {
        let currentSliceHeight = Math.min(nominalPageCanvasHeight, canvasHeight - yOffset);

        // If not on the final page, check if the cut point slices awkwardly across a section
        if (yOffset + currentSliceHeight < canvasHeight) {
          const cutPoint = yOffset + currentSliceHeight;
          for (const sec of sections) {
            const secTopPx = sec.topRatio * canvasHeight;
            const secBottomPx = sec.bottomRatio * canvasHeight;
            // If the cut point lands right through the middle of this section
            if (cutPoint > secTopPx + 15 && cutPoint < secBottomPx - 10) {
              const safeHeight = Math.floor(secTopPx - yOffset);
              // Only backtrack if the page maintains at least 50% capacity
              if (safeHeight > nominalPageCanvasHeight * 0.5) {
                currentSliceHeight = safeHeight;
              }
              break;
            }
          }
        }

        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvasWidth;
        pageCanvas.height = nominalPageCanvasHeight;
        const pageCtx = pageCanvas.getContext('2d');
        if (pageCtx) {
          pageCtx.fillStyle = '#ffffff';
          pageCtx.fillRect(0, 0, canvasWidth, nominalPageCanvasHeight);
          pageCtx.drawImage(
            canvas,
            0,
            yOffset,
            canvasWidth,
            currentSliceHeight,
            0,
            0,
            canvasWidth,
            currentSliceHeight
          );
        }

        const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.96);
        if (pageNum > 0) {
          pdf.addPage('a4', 'portrait');
        }
        pdf.addImage(pageImgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');

        yOffset += currentSliceHeight;
        pageNum++;
      }
    }

    pdf.save(`${filename || 'Marriage_Biodata'}.pdf`);
    return true;
  } catch (error) {
    console.error('Failed to export PDF:', error);
    return false;
  }
}

export async function exportToImage(elementId: string, filename: string): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) return false;

  try {
    // Wait for all images inside to load
    const images = element.getElementsByTagName('img');
    await Promise.all(
      Array.from(images).map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      })
    );

    const canvas = await renderElementToCanvas(element, elementId, 2.5);

    const link = document.createElement('a');
    link.download = `${filename || 'Marriage_Biodata'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    return true;
  } catch (error) {
    console.error('Failed to export Image:', error);
    return false;
  }
}

