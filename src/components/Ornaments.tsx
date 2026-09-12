import React from 'react';
import { HeaderSymbolType } from '../types/biodata';

export const HeaderSymbolIcon: React.FC<{
  type: HeaderSymbolType;
  className?: string;
  color?: string;
}> = ({ type, className = 'w-9 h-9', color = 'currentColor' }) => {
  switch (type) {
    case 'bismillah':
      return (
        <div className="flex flex-col items-center justify-center text-center">
          <div
            className="text-lg sm:text-xl font-serif font-bold tracking-wider px-3 py-0.5 select-none"
            style={{ color, fontFamily: "'Amiri', 'Traditional Arabic', 'Scheherazade New', 'Cinzel', serif" }}
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
          <div className="w-16 h-px mt-0.5 opacity-60" style={{ backgroundColor: color }} />
        </div>
      );

    case 'mosque':
      return (
        <svg
          viewBox="0 0 100 100"
          className={className}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Central Dome */}
          <path d="M50 22 C40 22 34 34 34 48 L66 48 C66 34 60 22 50 22 Z" fill={color} fillOpacity="0.25" />
          {/* Finial / Crescent on Dome */}
          <line x1="50" y1="12" x2="50" y2="22" strokeWidth="2.5" />
          <circle cx="50" cy="11" r="2.5" fill={color} />
          {/* Main Arched Entrance */}
          <path d="M43 68 L43 54 C43 50 57 50 57 54 L57 68" fill={color} fillOpacity="0.3" strokeWidth="2.5" />
          {/* Base structure */}
          <rect x="30" y="48" width="40" height="20" strokeWidth="2.5" />
          {/* Left Minaret */}
          <line x1="24" y1="28" x2="24" y2="68" strokeWidth="3" />
          <path d="M21 28 L24 20 L27 28 Z" fill={color} />
          {/* Right Minaret */}
          <line x1="76" y1="28" x2="76" y2="68" strokeWidth="3" />
          <path d="M73 28 L76 20 L79 28 Z" fill={color} />
          {/* Base foundation line */}
          <line x1="16" y1="68" x2="84" y2="68" strokeWidth="3" />
        </svg>
      );

    case 'ganesha':
      return (
        <svg
          viewBox="0 0 100 100"
          className={className}
          fill="none"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Stylized Ganesha */}
          <path d="M50 18 Q50 10 57 10 Q64 10 64 18 Q64 26 50 26 Z" fill={color} fillOpacity="0.2" />
          <circle cx="50" cy="14" r="3" fill={color} />
          {/* Head & Ears */}
          <path d="M42 28 C28 26 24 38 28 46 C32 54 40 50 43 45" />
          <path d="M58 28 C72 26 76 38 72 46 C68 54 60 50 57 45" />
          {/* Crown (Mukut) */}
          <path d="M45 22 L50 12 L55 22 Z" fill={color} fillOpacity="0.3" />
          {/* Forehead Tilak */}
          <path d="M48 27 L52 27" strokeWidth="4" />
          <path d="M49 32 L51 32" strokeWidth="3" />
          <circle cx="50" cy="36" r="2" fill={color} />
          {/* Trunk */}
          <path d="M48 38 Q46 54 53 62 Q60 70 66 65 Q70 60 63 56 Q57 53 53 45" strokeWidth="4" />
          {/* Modak */}
          <circle cx="70" cy="62" r="4.5" fill={color} />
          <path d="M68 60 L72 64" stroke="#fff" strokeWidth="1.5" />
          {/* Tusk */}
          <path d="M43 46 L38 48" strokeWidth="3" />
        </svg>
      );

    case 'om':
      return (
        <svg
          viewBox="0 0 100 100"
          className={className}
          fill="none"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Sacred Om Symbol */}
          <path d="M38 32 C38 22 48 18 56 22 C64 26 62 38 52 42 C64 42 70 54 66 66 C60 78 40 78 34 68 C30 62 32 54 36 50" />
          <path d="M52 42 C44 46 36 46 32 46" />
          <path d="M52 42 Q68 46 76 34" strokeWidth="3.2" />
          <path d="M56 16 C66 16 78 20 82 28" />
          <path d="M68 12 Q76 10 84 14" strokeWidth="2.5" />
          <circle cx="78" cy="8" r="2.5" fill={color} />
        </svg>
      );

    case 'swastika':
      return (
        <svg
          viewBox="0 0 100 100"
          className={className}
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          {/* Auspicious Vedic Swastika */}
          <line x1="50" y1="18" x2="50" y2="82" />
          <line x1="18" y1="50" x2="82" y2="50" />
          <line x1="50" y1="18" x2="80" y2="18" />
          <line x1="82" y1="50" x2="82" y2="80" />
          <line x1="50" y1="82" x2="20" y2="82" />
          <line x1="18" y1="50" x2="18" y2="20" />
          <circle cx="35" cy="35" r="3" fill={color} />
          <circle cx="65" cy="35" r="3" fill={color} />
          <circle cx="35" cy="65" r="3" fill={color} />
          <circle cx="65" cy="65" r="3" fill={color} />
        </svg>
      );

    case 'floral':
      return (
        <svg
          viewBox="0 0 100 100"
          className={className}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
        >
          {/* Lotus / Floral Crest */}
          <path d="M50 20 C42 35 44 60 50 78 C56 60 58 35 50 20 Z" fill={color} fillOpacity="0.25" />
          <path d="M50 78 C35 68 22 55 24 38 C32 40 44 58 50 78 Z" />
          <path d="M50 78 C65 68 78 55 76 38 C68 40 56 58 50 78 Z" />
          <path d="M50 78 C25 82 16 66 14 54 C24 54 38 68 50 78 Z" strokeWidth="2.2" />
          <path d="M50 78 C75 82 84 66 86 54 C76 54 62 68 50 78 Z" strokeWidth="2.2" />
          <circle cx="50" cy="82" r="3" fill={color} />
        </svg>
      );

    case 'khanda':
      return (
        <svg
          viewBox="0 0 100 100"
          className={className}
          fill="none"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
        >
          <line x1="50" y1="12" x2="50" y2="88" strokeWidth="4.5" />
          <circle cx="50" cy="50" r="18" strokeWidth="4" />
          <path d="M26 28 C18 42 18 64 34 78" strokeWidth="4" />
          <path d="M74 28 C82 42 82 64 66 78" strokeWidth="4" />
        </svg>
      );

    case 'crescent':
      return (
        <svg
          viewBox="0 0 100 100"
          className={className}
          fill="none"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
        >
          <path d="M60 20 C38 22 24 40 28 64 C32 82 50 92 68 84 C50 82 40 68 40 50 C40 32 50 24 60 20 Z" fill={color} fillOpacity="0.25" />
          <polygon points="70,30 73,38 82,38 75,43 78,51 70,46 62,51 65,43 58,38 67,38" fill={color} stroke="none" />
        </svg>
      );

    default:
      return null;
  }
};

export const DividerFiligree: React.FC<{ color?: string; className?: string }> = ({
  color = '#b45309',
  className = 'w-full my-3',
}) => {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <div className="h-[1px] flex-1 opacity-35" style={{ backgroundColor: color }} />
      <div className="flex items-center gap-1.5 opacity-80">
        <span className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: color }} />
        <span className="w-2.5 h-2.5 rotate-45 border" style={{ borderColor: color, backgroundColor: 'transparent' }} />
        <span className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: color }} />
      </div>
      <div className="h-[1px] flex-1 opacity-35" style={{ backgroundColor: color }} />
    </div>
  );
};

export const CornerOrnament: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  color?: string;
  size?: number;
}> = ({ position, color = '#b45309', size = 52 }) => {
  const rotationClass = {
    'top-left': '',
    'top-right': 'rotate-90',
    'bottom-right': 'rotate-180',
    'bottom-left': '-rotate-90',
  }[position];

  return (
    <div className={`pointer-events-none transform ${rotationClass}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="3" className="w-full h-full opacity-85">
        <path d="M6 94 L6 24 Q6 6 24 6 L94 6" strokeWidth="2.5" />
        <path d="M14 94 L14 26 Q14 14 26 14 L94 14" strokeWidth="1.5" />
        {/* Filigree corner flourish */}
        <path d="M22 46 C22 28 28 22 46 22" strokeWidth="2.5" />
        <circle cx="48" cy="22" r="3" fill={color} />
        <circle cx="22" cy="48" r="3" fill={color} />
        <path d="M20 20 L35 35" strokeWidth="2" />
        <circle cx="36" cy="36" r="3" fill={color} />
        <path d="M8 8 L18 18" strokeWidth="3" />
      </svg>
    </div>
  );
};

export const TraditionalMandalaWatermark: React.FC<{ color?: string; opacity?: number }> = ({
  color = '#b45309',
  opacity = 0.05,
}) => {
  return (
    <svg
      viewBox="0 0 300 300"
      className="absolute inset-0 m-auto w-96 h-96 pointer-events-none"
      style={{ opacity }}
      fill="none"
      stroke={color}
      strokeWidth="1.8"
    >
      <circle cx="150" cy="150" r="140" strokeWidth="2" strokeDasharray="6 4" />
      <circle cx="150" cy="150" r="120" strokeWidth="1.5" />
      <circle cx="150" cy="150" r="100" strokeWidth="2" />
      <circle cx="150" cy="150" r="70" strokeWidth="1.5" />
      <circle cx="150" cy="150" r="40" strokeWidth="2" />
      {/* 16 Petals */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 360) / 16;
        return (
          <g key={i} transform={`rotate(${angle} 150 150)`}>
            <path d="M150 50 Q138 90 150 110 Q162 90 150 50 Z" />
            <circle cx="150" cy="35" r="3" fill={color} />
          </g>
        );
      })}
    </svg>
  );
};
