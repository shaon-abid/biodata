import React from 'react';
import {
  AddressPrivacyLevel,
  ContactDetails,
  IncomePrivacyLevel,
  PhonePrivacyLevel,
  PhotoPrivacyLevel,
  PrivacySettings,
} from '../../types/biodata';
import {
  DEFAULT_PRIVACY_SETTINGS,
  SAFE_SHARE_PRIVACY_SETTINGS,
  STRICT_PRIVACY_SETTINGS,
} from '../../data/sampleProfiles';
import {
  formatAddressWithPrivacy,
  formatEmailWithPrivacy,
  formatPhoneWithPrivacy,
} from '../../utils/privacyHelpers';
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Lock,
  Eye,
  EyeOff,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Info,
  QrCode,
} from 'lucide-react';

interface ContactPrivacySectionProps {
  contact: ContactDetails;
  privacy: PrivacySettings;
  onContactChange: (updated: Partial<ContactDetails>) => void;
  onPrivacyChange: (updated: Partial<PrivacySettings>) => void;
}

export const ContactPrivacySection: React.FC<ContactPrivacySectionProps> = ({
  contact,
  privacy,
  onContactChange,
  onPrivacyChange,
}) => {
  const isSafeShare =
    privacy.phonePrivacy === 'masked' &&
    privacy.addressPrivacy === 'cityStateOnly';

  const isStrict =
    privacy.phonePrivacy === 'onRequest' &&
    privacy.addressPrivacy === 'onRequest';

  const isFull =
    privacy.phonePrivacy === 'visible' &&
    privacy.addressPrivacy === 'full';

  const previewPhone = formatPhoneWithPrivacy(contact.primaryPhone, privacy.phonePrivacy);
  const previewEmail = formatEmailWithPrivacy(contact.email, privacy.emailPrivacy);
  const previewAddress = formatAddressWithPrivacy(
    contact.fullAddress,
    contact.city,
    contact.state,
    contact.pincode,
    privacy.addressPrivacy
  );

  return (
    <div className="space-y-5">
      {/* PRIVACY HIGHLIGHT BANNER & QUICK PRESETS */}
      <div className="p-4 rounded-xl bg-linear-to-br from-amber-50 to-orange-50 border border-amber-200">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-600 text-white rounded-lg shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-amber-950 flex items-center gap-1.5">
                Privacy Protection Center
                <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold bg-amber-200 text-amber-900 rounded-full">
                  Security Controls
                </span>
              </h3>
              <p className="text-xs text-amber-800">
                Protect yourself from unauthorized calls, data scraping, and address stalking.
              </p>
            </div>
          </div>
        </div>

        {/* 1-Click Privacy Profile Mode Presets */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
          <button
            type="button"
            onClick={() => onPrivacyChange(SAFE_SHARE_PRIVACY_SETTINGS)}
            className={`p-2.5 rounded-lg border text-left transition flex flex-col justify-between ${
              isSafeShare
                ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                : 'bg-white text-stone-700 border-amber-200 hover:border-amber-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" />
                Safe Share
              </span>
              {isSafeShare && <CheckCircle2 className="w-3.5 h-3.5" />}
            </div>
            <p className={`text-[10px] leading-tight ${isSafeShare ? 'text-amber-100' : 'text-stone-500'}`}>
              Masks phone digits & shows City/State only. Best for matrimonial circles & WhatsApp.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onPrivacyChange(STRICT_PRIVACY_SETTINGS)}
            className={`p-2.5 rounded-lg border text-left transition flex flex-col justify-between ${
              isStrict
                ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" />
                Maximum Privacy
              </span>
              {isStrict && <CheckCircle2 className="w-3.5 h-3.5" />}
            </div>
            <p className={`text-[10px] leading-tight ${isStrict ? 'text-stone-300' : 'text-stone-500'}`}>
              Displays "On Verified Request". Blurs photo. Maximum confidentiality.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onPrivacyChange(DEFAULT_PRIVACY_SETTINGS)}
            className={`p-2.5 rounded-lg border text-left transition flex flex-col justify-between ${
              isFull
                ? 'bg-stone-700 text-white border-stone-700 shadow-xs'
                : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                Full Disclosure
              </span>
              {isFull && <CheckCircle2 className="w-3.5 h-3.5" />}
            </div>
            <p className={`text-[10px] leading-tight ${isFull ? 'text-stone-200' : 'text-stone-500'}`}>
              All numbers and full street address visible. For close family meetings.
            </p>
          </button>
        </div>
      </div>

      {/* LIVE PRIVACY PREVIEW CHIP */}
      <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
        <div className="flex items-center gap-1.5 font-semibold text-stone-800 mb-1.5">
          <Info className="w-3.5 h-3.5 text-amber-600" />
          Live Contact Output in Generated Biodata:
        </div>
        <div className="space-y-1 text-stone-600 text-[11.5px] bg-white p-2.5 rounded-lg border border-stone-200">
          <div className="flex items-center justify-between">
            <span className="text-stone-400">Phone:</span>
            <span className={`font-mono ${previewPhone.isProtected ? 'text-amber-700 font-semibold' : 'text-stone-900'}`}>
              {previewPhone.hidden ? '(Hidden)' : previewPhone.text || 'Not filled'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-stone-400">Email:</span>
            <span className={`${previewEmail.isProtected ? 'text-amber-700 font-medium' : 'text-stone-900'}`}>
              {previewEmail.hidden ? '(Hidden)' : previewEmail.text || 'Not filled'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-stone-400">Address:</span>
            <span className={`text-right max-w-[280px] truncate ${previewAddress.isProtected ? 'text-amber-700 font-medium' : 'text-stone-900'}`}>
              {previewAddress.hidden ? '(Hidden)' : previewAddress.text || 'Not filled'}
            </span>
          </div>
        </div>
      </div>

      {/* DETAILED CONTACT INPUTS */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600">
          Contact Details (Input Values)
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Contact Person *
            </label>
            <input
              type="text"
              value={contact.contactPerson}
              onChange={(e) => onContactChange({ contactPerson: e.target.value })}
              placeholder="e.g. Sh. Deepak Kumar Aggarwal (Father)"
              className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Relationship with Candidate
            </label>
            <input
              type="text"
              value={contact.relationWithCandidate}
              onChange={(e) => onContactChange({ relationWithCandidate: e.target.value })}
              placeholder="e.g. Father / Mother / Self / Uncle"
              className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
            />
          </div>
        </div>

        {/* Primary Phone & Alternate Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-stone-700 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-stone-500" />
                Primary Phone / WhatsApp *
              </label>
              <select
                value={privacy.phonePrivacy}
                onChange={(e) => onPrivacyChange({ phonePrivacy: e.target.value as PhonePrivacyLevel })}
                className="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5 outline-none cursor-pointer"
              >
                <option value="visible">Visible</option>
                <option value="masked">Mask Digits</option>
                <option value="onRequest">On Request</option>
                <option value="hidden">Hide Completely</option>
              </select>
            </div>
            <input
              type="text"
              value={contact.primaryPhone}
              onChange={(e) => onContactChange({ primaryPhone: e.target.value })}
              placeholder="e.g. +91 98101 23456"
              className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-stone-700 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-stone-500" />
                Alternate Contact
              </label>
              <select
                value={privacy.altPhonePrivacy}
                onChange={(e) => onPrivacyChange({ altPhonePrivacy: e.target.value as PhonePrivacyLevel })}
                className="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5 outline-none cursor-pointer"
              >
                <option value="visible">Visible</option>
                <option value="masked">Mask Digits</option>
                <option value="onRequest">On Request</option>
                <option value="hidden">Hide Completely</option>
              </select>
            </div>
            <input
              type="text"
              value={contact.alternatePhone}
              onChange={(e) => onContactChange({ alternatePhone: e.target.value })}
              placeholder="e.g. +91 98110 65432"
              className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-medium text-stone-700 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-stone-500" />
              Email Address
            </label>
            <select
              value={privacy.emailPrivacy}
              onChange={(e) => onPrivacyChange({ emailPrivacy: e.target.value as PhonePrivacyLevel })}
              className="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5 outline-none cursor-pointer"
            >
              <option value="visible">Visible</option>
              <option value="masked">Mask Characters</option>
              <option value="onRequest">On Request</option>
              <option value="hidden">Hide Completely</option>
            </select>
          </div>
          <input
            type="email"
            value={contact.email}
            onChange={(e) => onContactChange({ email: e.target.value })}
            placeholder="e.g. family.biodata@gmail.com"
            className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
          />
        </div>

        {/* Full Address */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-medium text-stone-700 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-stone-500" />
              Residential Street Address
            </label>
            <select
              value={privacy.addressPrivacy}
              onChange={(e) => onPrivacyChange({ addressPrivacy: e.target.value as AddressPrivacyLevel })}
              className="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5 outline-none cursor-pointer"
            >
              <option value="full">Full Address</option>
              <option value="cityStateOnly">City & State Only (Safe)</option>
              <option value="onRequest">On Request Only</option>
              <option value="hidden">Hide Completely</option>
            </select>
          </div>
          <input
            type="text"
            value={contact.fullAddress}
            onChange={(e) => onContactChange({ fullAddress: e.target.value })}
            placeholder="e.g. M-Block, House No. 23, Greater Kailash-II"
            className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
          />
        </div>

        {/* City, State, Pincode */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              City *
            </label>
            <input
              type="text"
              value={contact.city}
              onChange={(e) => onContactChange({ city: e.target.value })}
              placeholder="e.g. New Delhi"
              className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              State
            </label>
            <input
              type="text"
              value={contact.state}
              onChange={(e) => onContactChange({ state: e.target.value })}
              placeholder="e.g. Delhi / Maharashtra"
              className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Pincode
            </label>
            <input
              type="text"
              value={contact.pincode}
              onChange={(e) => onContactChange({ pincode: e.target.value })}
              placeholder="e.g. 110048"
              className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
            />
          </div>
        </div>
      </div>

      {/* ADDITIONAL PRIVACY CONTROLS (Photo, Income, Watermark) */}
      <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-amber-600" />
          Additional Confidentiality Settings
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Photograph Privacy
            </label>
            <select
              value={privacy.photoPrivacy}
              onChange={(e) => onPrivacyChange({ photoPrivacy: e.target.value as PhotoPrivacyLevel })}
              className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
            >
              <option value="visible">Full Photo Visible</option>
              <option value="blurred">Privacy Blurred (Security)</option>
              <option value="hidden">Hide Photo in PDF</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Annual Income Privacy
            </label>
            <select
              value={privacy.incomePrivacy}
              onChange={(e) => onPrivacyChange({ incomePrivacy: e.target.value as IncomePrivacyLevel })}
              className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
            >
              <option value="visible">Exact Income Visible</option>
              <option value="rangeOnly">"Disclosed to suitable prospects"</option>
              <option value="onRequest">"Available on Direct Discussion"</option>
              <option value="hidden">Hide Income Completely</option>
            </select>
          </div>
        </div>

        {/* Watermark Protection */}
        <div className="pt-2 border-t border-stone-200">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-xs font-semibold text-stone-800">Protective Anti-Scraping Watermark</span>
              <p className="text-[11px] text-stone-500">Adds diagonal stamp across the page to deter misuse</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={privacy.showWatermark}
                onChange={(e) => onPrivacyChange({ showWatermark: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-600"></div>
            </label>
          </div>

          {privacy.showWatermark && (
            <input
              type="text"
              value={privacy.watermarkText}
              onChange={(e) => onPrivacyChange({ watermarkText: e.target.value })}
              placeholder="e.g. For Matrimonial Purposes Only • Confidential"
              className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition"
            />
          )}
        </div>

        {/* Contact Details QR Code Feature */}
        <div className="pt-3 border-t border-stone-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-start gap-2">
              <div className="p-1.5 bg-amber-100 text-amber-800 rounded-lg shrink-0 mt-0.5">
                <QrCode className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-semibold text-stone-800 flex items-center gap-1.5">
                  Contact QR Code for PDF Export
                  <span className="text-[10px] font-medium bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full">
                    Easy Scan
                  </span>
                </span>
                <p className="text-[11px] text-stone-500">
                  Embeds a scannable QR badge in the biodata sheet for direct saving or WhatsApp messaging
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-3">
              <input
                type="checkbox"
                checked={privacy.includeContactQr ?? true}
                onChange={(e) => onPrivacyChange({ includeContactQr: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-600"></div>
            </label>
          </div>

          {(privacy.includeContactQr ?? true) && (
            <div className="mt-3 p-3 bg-amber-50/70 border border-amber-200/80 rounded-lg space-y-2.5">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  QR Code Action Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => onPrivacyChange({ qrCodeType: 'vcard' })}
                    className={`px-3 py-2 text-xs rounded-lg border text-left transition ${
                      (privacy.qrCodeType ?? 'vcard') === 'vcard'
                        ? 'bg-amber-600 text-white border-amber-600 shadow-2xs font-semibold'
                        : 'bg-white text-stone-700 border-stone-200 hover:border-amber-300'
                    }`}
                  >
                    <div className="font-semibold text-[11px]">vCard Contact</div>
                    <div className={`text-[10px] mt-0.5 leading-tight ${(privacy.qrCodeType ?? 'vcard') === 'vcard' ? 'text-amber-100' : 'text-stone-500'}`}>
                      Saves contact name & numbers directly to phone
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => onPrivacyChange({ qrCodeType: 'whatsapp' })}
                    className={`px-3 py-2 text-xs rounded-lg border text-left transition ${
                      privacy.qrCodeType === 'whatsapp'
                        ? 'bg-amber-600 text-white border-amber-600 shadow-2xs font-semibold'
                        : 'bg-white text-stone-700 border-stone-200 hover:border-amber-300'
                    }`}
                  >
                    <div className="font-semibold text-[11px]">WhatsApp Link</div>
                    <div className={`text-[10px] mt-0.5 leading-tight ${privacy.qrCodeType === 'whatsapp' ? 'text-amber-100' : 'text-stone-500'}`}>
                      Opens WhatsApp chat with candidate/guardian
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => onPrivacyChange({ qrCodeType: 'text' })}
                    className={`px-3 py-2 text-xs rounded-lg border text-left transition ${
                      privacy.qrCodeType === 'text'
                        ? 'bg-amber-600 text-white border-amber-600 shadow-2xs font-semibold'
                        : 'bg-white text-stone-700 border-stone-200 hover:border-amber-300'
                    }`}
                  >
                    <div className="font-semibold text-[11px]">Contact Text</div>
                    <div className={`text-[10px] mt-0.5 leading-tight ${privacy.qrCodeType === 'text' ? 'text-amber-100' : 'text-stone-500'}`}>
                      Clean plaintext formatted summary
                    </div>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-amber-900 bg-amber-100/60 px-2.5 py-1.5 rounded">
                <Info className="w-3.5 h-3.5 shrink-0 text-amber-700" />
                <span>
                  The QR code automatically respects your privacy presets. If phone numbers are hidden or set to "On Request", placeholder details are maintained.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
