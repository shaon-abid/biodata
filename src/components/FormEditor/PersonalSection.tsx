import React from 'react';
import { PersonalDetails } from '../../types/biodata';
import { User, Calendar, Clock, MapPin, Ruler, Heart, Languages, Upload, Image as ImageIcon, Sparkles } from 'lucide-react';

interface PersonalSectionProps {
  data: PersonalDetails;
  onChange: (updated: Partial<PersonalDetails>) => void;
}

export const PersonalSection: React.FC<PersonalSectionProps> = ({ data, onChange }) => {
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (typeof uploadEvent.target?.result === 'string') {
          onChange({ photoUrl: uploadEvent.target.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      {/* Photo Uploader & Shape Selection */}
      <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50">
        <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
          Profile Photograph
        </label>
        <div className="flex items-center gap-4">
          <div className="relative group">
            {data.photoUrl ? (
              <img
                src={data.photoUrl}
                alt="Candidate"
                className={`w-20 h-24 object-cover border-2 border-amber-600/40 shadow-sm ${
                  data.photoShape === 'circle'
                    ? 'rounded-full'
                    : data.photoShape === 'arch'
                    ? 'rounded-t-full rounded-b-md'
                    : data.photoShape === 'rounded'
                    ? 'rounded-xl'
                    : 'rounded-md'
                }`}
              />
            ) : (
              <div className="w-20 h-24 rounded-md border-2 border-dashed border-stone-300 flex flex-col items-center justify-center bg-white text-stone-400">
                <ImageIcon className="w-6 h-6 mb-1" />
                <span className="text-[10px]">No photo</span>
              </div>
            )}
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium rounded-lg shadow-xs transition">
                <Upload className="w-3.5 h-3.5" />
                Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>

              {data.photoUrl && (
                <button
                  type="button"
                  onClick={() => onChange({ photoUrl: '' })}
                  className="px-2.5 py-1.5 border border-stone-300 text-stone-600 hover:text-red-600 hover:border-red-300 text-xs font-medium rounded-lg transition"
                >
                  Remove
                </button>
              )}
            </div>

            {/* Photo Frame Shape */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[11px] font-medium text-stone-500">Frame Shape:</span>
              <div className="flex gap-1.5">
                {(['square', 'rounded', 'circle', 'arch'] as const).map((shape) => (
                  <button
                    key={shape}
                    type="button"
                    onClick={() => onChange({ photoShape: shape })}
                    className={`px-2 py-0.5 text-[11px] capitalize rounded border transition ${
                      data.photoShape === shape
                        ? 'border-amber-600 bg-amber-50 text-amber-900 font-semibold'
                        : 'border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    {shape}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Name and Gender */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1 flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-stone-500" />
            Full Name *
          </label>
          <input
            type="text"
            value={data.fullName}
            onChange={(e) => onChange({ fullName: e.target.value })}
            placeholder="e.g. Fatima Tuz Zohra / Tanvir Ahmed Chowdhury"
            className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1">
            Gender *
          </label>
          <select
            value={data.gender}
            onChange={(e) => onChange({ gender: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
          >
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* DOB, Time & Place */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-stone-500" />
            Date of Birth
          </label>
          <input
            type="date"
            value={data.dateOfBirth}
            onChange={(e) => onChange({ dateOfBirth: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-stone-500" />
            Time of Birth
          </label>
          <input
            type="text"
            value={data.timeOfBirth}
            onChange={(e) => onChange({ timeOfBirth: e.target.value })}
            placeholder="e.g. 07:20 PM"
            className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-stone-500" />
            Place of Birth
          </label>
          <input
            type="text"
            value={data.placeOfBirth}
            onChange={(e) => onChange({ placeOfBirth: e.target.value })}
            placeholder="e.g. New Delhi, India"
            className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
          />
        </div>
      </div>

      {/* Physical Attributes: Height, Complexion, Blood Group */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1 flex items-center gap-1">
            <Ruler className="w-3.5 h-3.5 text-stone-500" />
            Height
          </label>
          <input
            type="text"
            value={data.height}
            onChange={(e) => onChange({ height: e.target.value })}
            placeholder="e.g. 5' 6&quot; (168 cm)"
            className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1">
            Complexion
          </label>
          <input
            type="text"
            value={data.complexion}
            onChange={(e) => onChange({ complexion: e.target.value })}
            placeholder="e.g. Fair / Wheatish"
            className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1">
            Blood Group
          </label>
          <input
            type="text"
            value={data.bloodGroup}
            onChange={(e) => onChange({ bloodGroup: e.target.value })}
            placeholder="e.g. B+ / O+"
            className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
          />
        </div>
      </div>

      {/* Marital Status, Mother Tongue, Languages */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1 flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-stone-500" />
            Marital Status
          </label>
          <select
            value={data.maritalStatus}
            onChange={(e) => onChange({ maritalStatus: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
          >
            <option value="Never Married">Never Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Awaiting Divorce">Awaiting Divorce</option>
            <option value="Widowed">Widowed</option>
            <option value="Annulled">Annulled</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1">
            Mother Tongue
          </label>
          <input
            type="text"
            value={data.motherTongue}
            onChange={(e) => onChange({ motherTongue: e.target.value })}
            placeholder="e.g. Hindi / Punjabi / Tamil"
            className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1 flex items-center gap-1">
            <Languages className="w-3.5 h-3.5 text-stone-500" />
            Languages Known
          </label>
          <input
            type="text"
            value={data.languagesKnown}
            onChange={(e) => onChange({ languagesKnown: e.target.value })}
            placeholder="e.g. English, Hindi, Punjabi"
            className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
          />
        </div>
      </div>
    </div>
  );
};
