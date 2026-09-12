import React from 'react';
import { HoroscopeDetails } from '../../types/biodata';
import { Compass, Moon, Star } from 'lucide-react';

interface HoroscopeSectionProps {
  data: HoroscopeDetails;
  onChange: (updated: Partial<HoroscopeDetails>) => void;
}

export const HoroscopeSection: React.FC<HoroscopeSectionProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-4">
      {/* Enable/Disable Toggle */}
      <div className="flex items-center justify-between p-3.5 bg-amber-50/60 rounded-xl border border-amber-200">
        <div className="flex items-center gap-2.5">
          <Moon className="w-4 h-4 text-amber-700" />
          <div>
            <h4 className="text-xs font-semibold text-amber-950">Include Horoscope / Kundli Details</h4>
            <p className="text-[11px] text-amber-800/80">Rashi, Nakshatra, Gotra, and Manglik status</p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={data.enabled}
            onChange={(e) => onChange({ enabled: e.target.checked })}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-600"></div>
        </label>
      </div>

      {data.enabled && (
        <div className="space-y-3 pt-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1 flex items-center gap-1">
                <Moon className="w-3.5 h-3.5 text-stone-500" />
                Rashi (Moon Sign)
              </label>
              <input
                type="text"
                value={data.rashi}
                onChange={(e) => onChange({ rashi: e.target.value })}
                placeholder="e.g. Tula (Libra) / Mesha"
                className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-stone-500" />
                Nakshatra
              </label>
              <input
                type="text"
                value={data.nakshatra}
                onChange={(e) => onChange({ nakshatra: e.target.value })}
                placeholder="e.g. Ashwini / Rohini / Hasta"
                className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-stone-500" />
                Gotra
              </label>
              <input
                type="text"
                value={data.gotra}
                onChange={(e) => onChange({ gotra: e.target.value })}
                placeholder="e.g. Kashyap / Garg / Vadhula"
                className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Manglik Status
              </label>
              <select
                value={data.manglik}
                onChange={(e) => onChange({ manglik: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
              >
                <option value="Non-Manglik">Non-Manglik</option>
                <option value="Manglik">Manglik</option>
                <option value="Anshik (Mild)">Anshik Manglik</option>
                <option value="Don't Believe">Don't Believe</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Gan
              </label>
              <input
                type="text"
                value={data.gan}
                onChange={(e) => onChange({ gan: e.target.value })}
                placeholder="e.g. Deva / Manushya"
                className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Nadi
              </label>
              <input
                type="text"
                value={data.nadi}
                onChange={(e) => onChange({ nadi: e.target.value })}
                placeholder="e.g. Antya / Madhya / Adi"
                className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Charan
              </label>
              <input
                type="text"
                value={data.charan}
                onChange={(e) => onChange({ charan: e.target.value })}
                placeholder="e.g. 1st / 2nd / 3rd / 4th"
                className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
