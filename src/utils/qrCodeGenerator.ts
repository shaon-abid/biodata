import QRCode from 'qrcode';
import { ContactDetails, PrivacySettings } from '../types/biodata';

/**
 * Builds an RFC 2426 compliant vCard 3.0 string for matrimonial contact.
 * Automatically respects privacy settings to avoid exposing masked or hidden data.
 */
export function buildContactVCard(
  candidateName: string,
  contact: ContactDetails,
  privacy: PrivacySettings
): string {
  const lines: string[] = [
    'BEGIN:VCARD',
    'VERSION:3.0',
  ];

  // Contact name & relation
  const displayName = contact.contactPerson
    ? `${contact.contactPerson}${contact.relationWithCandidate ? ` (${contact.relationWithCandidate})` : ''}`
    : candidateName;
  lines.push(`FN:${displayName.trim()}`);
  lines.push(`N:;;;;`);

  // Candidate reference in note
  const notes: string[] = [`Matrimonial Profile: ${candidateName}`];

  // Phone numbers (only if visible, or masked indicator)
  if (privacy.phonePrivacy === 'visible' && contact.primaryPhone) {
    const cleanPhone = contact.primaryPhone.trim();
    lines.push(`TEL;TYPE=CELL,VOICE:${cleanPhone}`);
  } else if (privacy.phonePrivacy === 'masked') {
    notes.push('Primary Phone: Privacy Masked in Biodata');
  } else if (privacy.phonePrivacy === 'onRequest') {
    notes.push('Primary Phone: Available on verified request');
  }

  if (privacy.altPhonePrivacy === 'visible' && contact.alternatePhone) {
    const cleanAlt = contact.alternatePhone.trim();
    lines.push(`TEL;TYPE=HOME,VOICE:${cleanAlt}`);
  }

  // Email
  if (privacy.emailPrivacy === 'visible' && contact.email) {
    lines.push(`EMAIL;TYPE=INTERNET,HOME:${contact.email.trim()}`);
  }

  // Address
  if (privacy.addressPrivacy === 'full' && (contact.fullAddress || contact.city)) {
    lines.push(
      `ADR;TYPE=HOME:;;${contact.fullAddress || ''};${contact.city || ''};${contact.state || ''};${contact.pincode || ''};`
    );
  } else if (privacy.addressPrivacy === 'cityStateOnly' && (contact.city || contact.state)) {
    lines.push(`ADR;TYPE=HOME:;;;${contact.city || ''};${contact.state || ''};;`);
  }

  lines.push(`NOTE:${notes.join(' | ')}`);
  lines.push('CATEGORIES:Matrimonial,Family');
  lines.push('END:VCARD');

  return lines.join('\r\n');
}

/**
 * Builds direct WhatsApp contact link if primary phone is available and visible.
 */
export function buildWhatsAppLink(
  candidateName: string,
  contact: ContactDetails
): string {
  const cleanDigits = contact.primaryPhone.replace(/[^0-9]/g, '');
  if (!cleanDigits) return '';
  const greeting = `Hello, inquiring regarding the matrimonial biodata of ${candidateName}.`;
  return `https://wa.me/${cleanDigits}?text=${encodeURIComponent(greeting)}`;
}

/**
 * Generates high-res DataURL for QR code rendering in DOM and PDF exports.
 */
export async function generateQrDataUrl(
  text: string,
  options?: {
    colorDark?: string;
    colorLight?: string;
    size?: number;
  }
): Promise<string> {
  if (!text || text.trim() === '') {
    return '';
  }

  try {
    const dataUrl = await QRCode.toDataURL(text, {
      errorCorrectionLevel: 'M',
      margin: 1,
      width: options?.size || 256,
      color: {
        dark: options?.colorDark || '#1c1917',
        light: options?.colorLight || '#ffffff',
      },
    });
    return dataUrl;
  } catch (error) {
    console.error('Failed to generate contact QR code:', error);
    return '';
  }
}
