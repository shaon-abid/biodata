import React from 'react';
import { AboutAndPreferences } from '../../types/biodata';
import { Sparkles, Heart, Smile } from 'lucide-react';

interface AboutPartnerSectionProps {
  data: AboutAndPreferences;
  onChange: (updated: Partial<AboutAndPreferences>) => void;
}

export const AboutPartnerSection: React.FC<AboutPartnerSectionProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-stone-700 mb-1 flex items-center gap-1">
          <Smile className="w-3.5 h-3.5 text-stone-500" />
          About the Candidate
        </label>
        <textarea
          rows={3}
          value={data.aboutCandidate}
          onChange={(e) => onChange({ aboutCandidate: e.target.value })}
          placeholder="e.g. Warm, ambitious, and family-oriented person. Believes in mutual respect and an active lifestyle..."
          className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
        />
        <p className="text-[10px] text-stone-500 mt-0.5">
          Briefly share candidate's nature, core values, and passions.
        </p>
      </div>

      <div>
        <label className="block text-xs font-medium text-stone-700 mb-1 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-stone-500" />
          Hobbies & Interests
        </label>
        <input
          type="text"
          value={data.hobbies}
          onChange={(e) => onChange({ hobbies: e.target.value })}
          placeholder="e.g. Badminton, Classical Music, Hiking, Reading, Cooking"
          className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-stone-700 mb-1 flex items-center gap-1">
          <Heart className="w-3.5 h-3.5 text-stone-500" />
          Partner Expectations / Preferences
        </label>
        <textarea
          rows={3}
          value={data.partnerExpectations}
          onChange={(e) => onChange({ partnerExpectations: e.target.value })}
          placeholder="e.g. Looking for a well-educated, ambitious, and caring life partner who respects family values..."
          className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
        />
        <p className="text-[10px] text-stone-500 mt-0.5">
          Educational background, location, values, or life perspective expected.
        </p>
      </div>
    </div>
  );
};
