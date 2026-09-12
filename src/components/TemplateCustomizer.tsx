import React from 'react';
import {
  HeaderSymbolType,
  TemplateConfig,
  TemplateId,
} from '../types/biodata';
import { HeaderSymbolIcon } from './Ornaments';
import { Check, Palette, Sparkles, Type, Image as ImageIcon } from 'lucide-react';

interface TemplateCustomizerProps {
  config: TemplateConfig;
  onChange: (updated: Partial<TemplateConfig>) => void;
}

const TEMPLATES: Array<{
  id: TemplateId;
  name: string;
  themeDesc: string;
  bgPreview: string;
  borderPreview: string;
  tag: string;
}> = [
  {
    id: 'islamic-noor',
    name: 'Noor Emerald (Islamic)',
    themeDesc: 'Deep Quranic emerald green & luminous gold with arched header',
    bgPreview: '#082f23',
    borderPreview: '#e6c86e',
    tag: 'Islamic Classic',
  },
  {
    id: 'dhaka-jamdani',
    name: 'Dhaka Jamdani',
    themeDesc: 'Ivory background with crimson Jamdani motif border and accents',
    bgPreview: '#fffdf9',
    borderPreview: '#b91c1c',
    tag: 'Bangla Heritage',
  },
  {
    id: 'padma-teal',
    name: 'Padma River Teal',
    themeDesc: 'River breeze teal with warm sand tones and modern typography',
    bgPreview: '#f5faf9',
    borderPreview: '#0f766e',
    tag: 'Contemporary',
  },
  {
    id: 'chittagong-navy',
    name: 'Chattogram Royal Navy',
    themeDesc: 'Deep Bay of Bengal navy with warm port-city gold filigree',
    bgPreview: '#0c1b33',
    borderPreview: '#f59e0b',
    tag: 'Port City Royal',
  },
  {
    id: 'mughal-rose',
    name: 'Mughal Rose Gold',
    themeDesc: 'Velvety dark rose plum canvas with soft blush gold framing',
    bgPreview: '#2e1820',
    borderPreview: '#f472b6',
    tag: 'Mughal Elegance',
  },
  {
    id: 'olive-peace',
    name: 'Olive Serenity',
    themeDesc: 'Peaceful natural olive & linen pearl with minimalist borders',
    bgPreview: '#f9faf7',
    borderPreview: '#4d7c0f',
    tag: 'Natural Zen',
  },
  {
    id: 'classic-gold',
    name: 'Classic Gold & Saffron',
    themeDesc: 'Warm amber tones, double geometric border & badge headers',
    bgPreview: '#ffffff',
    borderPreview: '#d97706',
    tag: 'Most Popular',
  },
  {
    id: 'royal-maroon',
    name: 'Royal Heritage Maroon',
    themeDesc: 'Regal umber backdrop, golden corner filigree & dividers',
    bgPreview: '#3e2321',
    borderPreview: '#e6a147',
    tag: 'Traditional Royal',
  },
  {
    id: 'saffron-heritage',
    name: 'Vedic Saffron',
    themeDesc: 'Auspicious warm turmeric, Ganesh emblem & traditional styling',
    bgPreview: '#fffdfa',
    borderPreview: '#ea580c',
    tag: 'Auspicious',
  },
  {
    id: 'sapphire-blue',
    name: 'Imperial Sapphire',
    themeDesc: 'Deep midnight blue with gold damask accents and crisp typography',
    bgPreview: '#162847',
    borderPreview: '#dfb76c',
    tag: 'Contemporary Royal',
  },
  {
    id: 'rose-blush',
    name: 'Rose Gold & Blush',
    themeDesc: 'Soft pastel rose, circular frame, clean modern pills',
    bgPreview: '#fdfbfb',
    borderPreview: '#f472b6',
    tag: 'Modern Chic',
  },
  {
    id: 'minimal-ivory',
    name: 'Minimalist Ivory',
    themeDesc: 'Understated cream canvas, elegant hairline accents',
    bgPreview: '#fbfbfa',
    borderPreview: '#78350f',
    tag: 'Editorial',
  },
  {
    id: 'vintage-floral',
    name: 'Vintage Floral Gold',
    themeDesc: 'Parchment background with antique botanical flourishes',
    bgPreview: '#faf7f0',
    borderPreview: '#a16207',
    tag: 'Vintage Classic',
  },
  {
    id: 'emerald-regalia',
    name: 'Emerald Regalia',
    themeDesc: 'Deep royal forest emerald with warm champagne gold',
    bgPreview: '#143126',
    borderPreview: '#e2bc77',
    tag: 'Luxury',
  },
];

const INVOCATION_PRESETS = [
  { symbol: 'bismillah' as HeaderSymbolType, text: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ' },
  { symbol: 'crescent' as HeaderSymbolType, text: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ' },
  { symbol: 'mosque' as HeaderSymbolType, text: 'Alhamdulillah • Nikah Biodata' },
  { symbol: 'none' as HeaderSymbolType, text: 'BIODATA FOR MARRIAGE' },
  { symbol: 'floral' as HeaderSymbolType, text: 'In The Name Of Almighty Allah' },
  { symbol: 'ganesha' as HeaderSymbolType, text: '॥ श्री गणेशाय नमः ॥' },
  { symbol: 'om' as HeaderSymbolType, text: '|| Om Namah Shivaya ||' },
  { symbol: 'swastika' as HeaderSymbolType, text: '॥ शुभ विवाह ॥' },
  { symbol: 'khanda' as HeaderSymbolType, text: 'ੴ Ek Onkar Satnam ੴ' },
];

export const TemplateCustomizer: React.FC<TemplateCustomizerProps> = ({
  config,
  onChange,
}) => {
  return (
    <div className="space-y-5">
      {/* TEMPLATE PICKER (GRID OF 8 REALISTIC DESIGNS) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-amber-600" />
            Select Template Design ({TEMPLATES.length} Styles)
          </label>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {TEMPLATES.map((tmpl) => {
            const isSelected = config.id === tmpl.id;
            return (
              <button
                key={tmpl.id}
                type="button"
                onClick={() => onChange({ id: tmpl.id })}
                className={`relative p-2.5 rounded-xl text-left border-2 transition-all flex flex-col justify-between group overflow-hidden ${
                  isSelected
                    ? 'border-amber-600 ring-2 ring-amber-500/20 shadow-md scale-[1.02]'
                    : 'border-stone-200 hover:border-amber-300 bg-white'
                }`}
              >
                {/* Mini Preview Box */}
                <div
                  className="w-full h-16 rounded-lg mb-2 p-1.5 relative border flex flex-col justify-between overflow-hidden shadow-2xs"
                  style={{
                    backgroundColor: tmpl.bgPreview,
                    borderColor: tmpl.borderPreview,
                  }}
                >
                  <div className="flex justify-between items-center">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: tmpl.borderPreview }}
                    />
                    <span
                      className="text-[7px] px-1 rounded font-semibold"
                      style={{
                        color: tmpl.bgPreview === '#ffffff' || tmpl.bgPreview.includes('f') ? '#1c1917' : '#ffffff',
                      }}
                    >
                      BIODATA
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div
                      className="h-1 w-2/3 rounded-full opacity-60"
                      style={{ backgroundColor: tmpl.borderPreview }}
                    />
                    <div
                      className="h-1 w-1/2 rounded-full opacity-40"
                      style={{ backgroundColor: tmpl.borderPreview }}
                    />
                  </div>

                  {isSelected && (
                    <div className="absolute inset-0 bg-amber-600/15 flex items-center justify-center">
                      <div className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center shadow-xs">
                        <Check className="w-3 h-3" />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded block w-fit mb-1">
                    {tmpl.tag}
                  </span>
                  <div className="text-xs font-bold text-stone-900 leading-tight">
                    {tmpl.name}
                  </div>
                  <p className="text-[10.5px] text-stone-500 mt-0.5 line-clamp-2">
                    {tmpl.themeDesc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* AUSPICIOUS HEADER & INVOCATION */}
      <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          Auspicious Header & Religious Emblem
        </label>

        {/* Emblems row */}
        <div>
          <span className="block text-[11px] font-medium text-stone-600 mb-1.5">
            Top Crest Symbol:
          </span>
          <div className="flex flex-wrap gap-2">
            {(
              [
                { type: 'bismillah', label: 'Bismillah Calligraphy' },
                { type: 'crescent', label: 'Crescent & Star' },
                { type: 'mosque', label: 'Mosque Minaret' },
                { type: 'floral', label: 'Lotus Crest' },
                { type: 'none', label: 'None (Clean)' },
                { type: 'ganesha', label: 'Ganesha' },
                { type: 'om', label: 'Om' },
                { type: 'swastika', label: 'Swastika' },
                { type: 'khanda', label: 'Khanda' },
              ] as const
            ).map((item) => (
              <button
                key={item.type}
                type="button"
                onClick={() => onChange({ headerSymbol: item.type })}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition ${
                  config.headerSymbol === item.type
                    ? 'border-amber-600 bg-amber-600 text-white shadow-xs'
                    : 'border-stone-200 bg-white text-stone-700 hover:border-amber-300'
                }`}
              >
                {item.type !== 'none' && (
                  <HeaderSymbolIcon
                    type={item.type}
                    className="w-4 h-4"
                    color={config.headerSymbol === item.type ? '#ffffff' : '#b45309'}
                  />
                )}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Preset Invocations */}
        <div>
          <span className="block text-[11px] font-medium text-stone-600 mb-1.5">
            Quick Invocations:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {INVOCATION_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() =>
                  onChange({
                    headerSymbol: preset.symbol,
                    headerTitle: preset.text,
                  })
                }
                className="px-2 py-1 text-[11px] bg-white border border-stone-200 hover:border-amber-400 text-stone-700 rounded-md transition"
              >
                {preset.text}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Header Title Input */}
        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1">
            Custom Header Inscription / Title
          </label>
          <input
            type="text"
            value={config.headerTitle}
            onChange={(e) => onChange({ headerTitle: e.target.value })}
            placeholder="e.g. ॥ श्री गणेशाय नमः ॥ or Subh Vivah"
            className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
          />
        </div>
      </div>

      {/* TYPOGRAPHY & PHOTO CONTROLS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Font Family */}
        <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/70">
          <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5 mb-2">
            <Type className="w-3.5 h-3.5 text-amber-600" />
            Typography Pairings
          </label>
          <div className="space-y-1.5">
            {(
              [
                { id: 'cinzel', name: 'Cinzel (Royal Classical)' },
                { id: 'cormorant', name: 'Cormorant (Graceful Serif)' },
                { id: 'playfair', name: 'Playfair (Editorial Luxury)' },
                { id: 'outfit', name: 'Outfit (Modern Clean Sans)' },
              ] as const
            ).map((font) => (
              <button
                key={font.id}
                type="button"
                onClick={() => onChange({ fontFamily: font.id })}
                className={`w-full text-left px-3 py-1.5 rounded-lg border text-xs transition flex items-center justify-between ${
                  config.fontFamily === font.id
                    ? 'border-amber-600 bg-amber-50 text-amber-950 font-bold'
                    : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                }`}
              >
                <span>{font.name}</span>
                {config.fontFamily === font.id && <Check className="w-3.5 h-3.5 text-amber-600" />}
              </button>
            ))}
          </div>
        </div>

        {/* Photo Display Setting */}
        <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/70 flex flex-col justify-between">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5 mb-2">
              <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
              Photo Display in Template
            </label>
            <p className="text-xs text-stone-600 mb-3">
              Control whether the photograph space is rendered in the biodata sheet.
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-stone-200">
            <span className="text-xs font-medium text-stone-700">Display Photo Frame</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.showPhoto}
                onChange={(e) => onChange({ showPhoto: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
