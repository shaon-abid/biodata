import React from 'react';
import { EducationCareerDetails } from '../../types/biodata';
import { GraduationCap, Building2, Briefcase, IndianRupee, MapPin } from 'lucide-react';

interface EducationCareerSectionProps {
  data: EducationCareerDetails;
  onChange: (updated: Partial<EducationCareerDetails>) => void;
}

export const EducationCareerSection: React.FC<EducationCareerSectionProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1 flex items-center gap-1">
            <GraduationCap className="w-3.5 h-3.5 text-stone-500" />
            Highest Qualification *
          </label>
          <input
            type="text"
            value={data.highestDegree}
            onChange={(e) => onChange({ highestDegree: e.target.value })}
            placeholder="e.g. B.Tech / MBA / MBBS / MS"
            className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1 flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5 text-stone-500" />
            College / University
          </label>
          <input
            type="text"
            value={data.collegeUniversity}
            onChange={(e) => onChange({ collegeUniversity: e.target.value })}
            placeholder="e.g. IIT Delhi / SRCC / Delhi University"
            className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1 flex items-center gap-1">
            <Briefcase className="w-3.5 h-3.5 text-stone-500" />
            Occupation / Designation *
          </label>
          <input
            type="text"
            value={data.occupation}
            onChange={(e) => onChange({ occupation: e.target.value })}
            placeholder="e.g. Senior Software Engineer / Consultant / Doctor"
            className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1">
            Company / Organization
          </label>
          <input
            type="text"
            value={data.organization}
            onChange={(e) => onChange({ organization: e.target.value })}
            placeholder="e.g. Google / BCG / Hospital / Self-Employed"
            className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1 flex items-center gap-1">
            <IndianRupee className="w-3.5 h-3.5 text-stone-500" />
            Annual Income / Package
          </label>
          <input
            type="text"
            value={data.annualIncome}
            onChange={(e) => onChange({ annualIncome: e.target.value })}
            placeholder="e.g. ₹ 25,00,000 PA or $120k"
            className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
          />
          <p className="text-[10px] text-stone-500 mt-1">
            Tip: You can hide or mask this in the Privacy Controls tab.
          </p>
        </div>

        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-stone-500" />
            Work Location / City
          </label>
          <input
            type="text"
            value={data.workLocation}
            onChange={(e) => onChange({ workLocation: e.target.value })}
            placeholder="e.g. Bengaluru / New Delhi / London"
            className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
          />
        </div>
      </div>
    </div>
  );
};
