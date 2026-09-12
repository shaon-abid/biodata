import React, { useState } from 'react';
import { SAMPLE_PROFILES } from '../data/sampleProfiles';
import { BiodataProfile, PrivacySettings, TemplateConfig, TemplateId } from '../types/biodata';
import {
  FileDown,
  Printer,
  Image as ImageIcon,
  ShieldCheck,
  Shield,
  RotateCcw,
  Sparkles,
  ChevronDown,
  Check,
  Heart,
  Loader2,
} from 'lucide-react';

interface NavbarProps {
  onLoadSample: (key: string) => void;
  onReset: () => void;
  onExportPdf: () => Promise<void>;
  onExportImage: () => Promise<void>;
  onPrint: () => void;
  privacy: PrivacySettings;
  isExporting: boolean;
  activeProfileName: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onLoadSample,
  onReset,
  onExportPdf,
  onExportImage,
  onPrint,
  privacy,
  isExporting,
  activeProfileName,
}) => {
  const [samplesOpen, setSamplesOpen] = useState(false);

  const isPrivacyProtected =
    privacy.phonePrivacy !== 'visible' ||
    privacy.addressPrivacy !== 'full' ||
    privacy.emailPrivacy !== 'visible' ||
    privacy.showWatermark;

  return (
    <header className="no-print sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:px-6 flex items-center justify-between gap-3">
        {/* APP BRAND & LOGO */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-600 to-orange-700 text-white flex items-center justify-center shadow-sm">
            <Heart className="w-5 h-5 fill-white/30 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold tracking-tight text-stone-900 font-cinzel">
                Marriage Biodata Maker
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-semibold bg-amber-100 text-amber-900 rounded-full">
                Professional & Vedic
              </span>
            </div>
            <p className="text-[11px] text-stone-500 hidden sm:block">
              Customizable templates • Privacy protected • Print-ready A4 PDF
            </p>
          </div>
        </div>

        {/* MIDDLE / PRIVACY BADGE */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-xs">
          {isPrivacyProtected ? (
            <div className="flex items-center gap-1.5 text-amber-800 font-medium">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Privacy Shield Active</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-stone-600">
              <Shield className="w-4 h-4 text-stone-400" />
              <span>Standard Visibility</span>
            </div>
          )}
        </div>

        {/* ACTION CONTROLS */}
        <div className="flex items-center gap-2">
          {/* Sample Profiles Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setSamplesOpen(!samplesOpen)}
              className="px-3 py-1.5 rounded-lg border border-stone-300 hover:border-amber-500 bg-white text-stone-700 text-xs font-medium flex items-center gap-1.5 transition shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden md:inline">Sample Profiles</span>
              <span className="md:hidden">Samples</span>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
            </button>

            {samplesOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setSamplesOpen(false)}
                />
                <div className="absolute right-0 mt-1.5 w-64 bg-white rounded-xl shadow-xl border border-stone-200 py-1.5 z-30 text-xs">
                  <div className="px-3 py-1.5 text-[10.5px] font-bold text-stone-400 uppercase tracking-wider border-b border-stone-100">
                    Load Pre-filled Examples
                  </div>
                  {Object.entries(SAMPLE_PROFILES).map(([key, item]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        onLoadSample(key);
                        setSamplesOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-amber-50 text-stone-800 hover:text-amber-900 transition flex items-center justify-between"
                    >
                      <span className="font-medium truncate">{item.name}</span>
                      {activeProfileName === item.name && (
                        <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      )}
                    </button>
                  ))}
                  <div className="border-t border-stone-100 mt-1 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        onReset();
                        setSamplesOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-stone-50 text-stone-600 hover:text-red-600 transition flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Start with Blank Profile</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Native Print to PDF button */}
          <button
            type="button"
            onClick={onPrint}
            title="Open browser print dialog for vector crisp PDF"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-300 hover:border-stone-400 bg-white text-stone-700 text-xs font-medium transition shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5 text-stone-600" />
            <span>Print</span>
          </button>

          {/* Export PNG Image */}
          <button
            type="button"
            disabled={isExporting}
            onClick={onExportImage}
            title="Download high-resolution image for WhatsApp sharing"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-300 hover:border-stone-400 bg-white text-stone-700 text-xs font-medium transition shadow-2xs"
          >
            <ImageIcon className="w-3.5 h-3.5 text-stone-600" />
            <span>Image</span>
          </button>

          {/* Export PDF (Primary Action) */}
          <button
            type="button"
            disabled={isExporting}
            onClick={onExportPdf}
            className="px-3.5 py-1.5 rounded-lg bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition disabled:opacity-50"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <FileDown className="w-4 h-4" />
                <span>Export PDF</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
