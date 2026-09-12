import React from 'react';
import { FamilyDetails } from '../../types/biodata';
import { Users, Home, MapPin, HeartHandshake } from 'lucide-react';

interface FamilySectionProps {
  data: FamilyDetails;
  onChange: (updated: Partial<FamilyDetails>) => void;
}

export const FamilySection: React.FC<FamilySectionProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-3">
      {/* Father & Mother */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1">
            Father's Name *
          </label>
          <input
            type="text"
            value={data.fatherName}
            onChange={(e) => onChange({ fatherName: e.target.value })}
            placeholder="e.g. Sh. Deepak Kumar Aggarwal"
            className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1">
            Father's Occupation
          </label>
          <input
            type="text"
            value={data.fatherOccupation}
            onChange={(e) => onChange({ fatherOccupation: e.target.value })}
            placeholder="e.g. Businessman (Steel Trading) / Govt Officer"
            className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1">
            Mother's Name *
          </label>
          <input
            type="text"
            value={data.motherName}
            onChange={(e) => onChange({ motherName: e.target.value })}
            placeholder="e.g. Smt. Madhu Aggarwal"
            className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1">
            Mother's Occupation
          </label>
          <input
            type="text"
            value={data.motherOccupation}
            onChange={(e) => onChange({ motherOccupation: e.target.value })}
            placeholder="e.g. Homemaker / Teacher / Doctor"
            className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
          />
        </div>
      </div>

      {/* Grandfather & Native place */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1">
            Grandfather's Name
          </label>
          <input
            type="text"
            value={data.grandfatherName}
            onChange={(e) => onChange({ grandfatherName: e.target.value })}
            placeholder="e.g. Late Sh. Ramcharan Aggarwal"
            className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-stone-500" />
            Native Place / Ancestral Origin
          </label>
          <input
            type="text"
            value={data.nativePlace}
            onChange={(e) => onChange({ nativePlace: e.target.value })}
            placeholder="e.g. Rohtak, Haryana / Varanasi, UP"
            className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
          />
        </div>
      </div>

      {/* Siblings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1">
            Brothers Details
          </label>
          <input
            type="text"
            value={data.brothers}
            onChange={(e) => onChange({ brothers: e.target.value })}
            placeholder="e.g. 1 Brother (Unmarried, Software Engineer)"
            className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1">
            Sisters Details
          </label>
          <input
            type="text"
            value={data.sisters}
            onChange={(e) => onChange({ sisters: e.target.value })}
            placeholder="e.g. 1 Sister (Married, settled in Pune)"
            className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
          />
        </div>
      </div>

      {/* Family Type & Status */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1 flex items-center gap-1">
            <Home className="w-3.5 h-3.5 text-stone-500" />
            Family Type
          </label>
          <select
            value={data.familyType}
            onChange={(e) => onChange({ familyType: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
          >
            <option value="Nuclear">Nuclear</option>
            <option value="Joint">Joint Family</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1">
            Family Status
          </label>
          <select
            value={data.familyStatus}
            onChange={(e) => onChange({ familyStatus: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
          >
            <option value="Upper Middle Class">Upper Middle Class</option>
            <option value="Middle Class">Middle Class</option>
            <option value="Affluent / Elite">Affluent / Elite</option>
            <option value="Upper Class">Upper Class</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1 flex items-center gap-1">
            <HeartHandshake className="w-3.5 h-3.5 text-stone-500" />
            Family Values
          </label>
          <select
            value={data.familyValues}
            onChange={(e) => onChange({ familyValues: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
          >
            <option value="Traditional">Traditional</option>
            <option value="Moderate">Moderate / Blend</option>
            <option value="Liberal">Liberal / Progressive</option>
          </select>
        </div>
      </div>
    </div>
  );
};
