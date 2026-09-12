import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { PersonalSection } from './components/FormEditor/PersonalSection';
import { HoroscopeSection } from './components/FormEditor/HoroscopeSection';
import { EducationCareerSection } from './components/FormEditor/EducationCareerSection';
import { FamilySection } from './components/FormEditor/FamilySection';
import { ContactPrivacySection } from './components/FormEditor/ContactPrivacySection';
import { AboutPartnerSection } from './components/FormEditor/AboutPartnerSection';
import { TemplateCustomizer } from './components/TemplateCustomizer';
import { BiodataSheet } from './components/BiodataPreview/BiodataSheet';
import {
  DEFAULT_PRIVACY_SETTINGS,
  DEFAULT_TEMPLATE_CONFIG,
  SAFE_SHARE_PRIVACY_SETTINGS,
  SAMPLE_PROFILES,
} from './data/sampleProfiles';
import {
  BiodataProfile,
  PrivacySettings,
  TemplateConfig,
  TemplateId,
} from './types/biodata';
import { exportToImage, exportToPdf } from './utils/pdfExport';
import {
  User,
  Moon,
  GraduationCap,
  Users,
  ShieldCheck,
  Heart,
  Palette,
  FileDown,
  Printer,
  Eye,
  ZoomIn,
  ZoomOut,
  Sparkles,
  CheckCircle2,
  Lock,
} from 'lucide-react';

type EditorTab =
  | 'personal'
  | 'horoscope'
  | 'career'
  | 'family'
  | 'privacy'
  | 'about'
  | 'templates';

const BLANK_PROFILE: BiodataProfile = {
  id: 'profile-blank',
  personal: {
    fullName: '',
    gender: 'Female',
    dateOfBirth: '',
    timeOfBirth: '',
    placeOfBirth: '',
    height: '',
    weight: '',
    complexion: '',
    bloodGroup: '',
    maritalStatus: 'Never Married',
    motherTongue: '',
    languagesKnown: '',
    photoUrl: '',
    photoShape: 'rounded',
  },
  horoscope: {
    enabled: true,
    rashi: '',
    nakshatra: '',
    gotra: '',
    manglik: 'Non-Manglik',
    gan: '',
    nadi: '',
    charan: '',
  },
  educationCareer: {
    highestDegree: '',
    collegeUniversity: '',
    occupation: '',
    organization: '',
    annualIncome: '',
    workLocation: '',
  },
  family: {
    fatherName: '',
    fatherOccupation: '',
    motherName: '',
    motherOccupation: '',
    grandfatherName: '',
    nativePlace: '',
    familyType: 'Nuclear',
    familyValues: 'Moderate',
    familyStatus: 'Upper Middle Class',
    brothers: '',
    sisters: '',
  },
  contact: {
    contactPerson: '',
    relationWithCandidate: 'Father',
    primaryPhone: '',
    alternatePhone: '',
    email: '',
    fullAddress: '',
    city: '',
    state: '',
    pincode: '',
  },
  aboutAndPreferences: {
    aboutCandidate: '',
    hobbies: '',
    partnerExpectations: '',
  },
};

export default function App() {
  // State for profile data
  const [profile, setProfile] = useState<BiodataProfile>(() => {
    const saved = localStorage.getItem('mbm_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.id === 'profile-mahima') {
          return SAMPLE_PROFILES.fatima.profile;
        }
        return parsed;
      } catch (e) {
        console.error('Failed to parse saved profile', e);
      }
    }
    return SAMPLE_PROFILES.fatima.profile;
  });

  // State for privacy controls
  const [privacy, setPrivacy] = useState<PrivacySettings>(() => {
    const saved = localStorage.getItem('mbm_privacy');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved privacy', e);
      }
    }
    return SAFE_SHARE_PRIVACY_SETTINGS;
  });

  // State for template styling
  const [template, setTemplate] = useState<TemplateConfig>(() => {
    const saved = localStorage.getItem('mbm_template');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.id === 'classic-gold' && parsed.headerSymbol === 'ganesha') {
          return DEFAULT_TEMPLATE_CONFIG;
        }
        return parsed;
      } catch (e) {
        console.error('Failed to parse saved template', e);
      }
    }
    return DEFAULT_TEMPLATE_CONFIG;
  });

  // Editor UI navigation
  const [activeTab, setActiveTab] = useState<EditorTab>('personal');
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [zoomScale, setZoomScale] = useState<number>(0.75);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem('mbm_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('mbm_privacy', JSON.stringify(privacy));
  }, [privacy]);

  useEffect(() => {
    localStorage.setItem('mbm_template', JSON.stringify(template));
  }, [template]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Sample Loader
  const handleLoadSample = (key: string) => {
    const sample = SAMPLE_PROFILES[key];
    if (sample) {
      setProfile(sample.profile);
      const isMuslimProfile = key === 'fatima' || key === 'tanvir' || key === 'nusrat' || key === 'sazzad';
      setTemplate((prev) => ({
        ...prev,
        id: sample.defaultTemplate,
        headerSymbol: isMuslimProfile ? 'bismillah' : 'ganesha',
        headerTitle: isMuslimProfile ? 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ' : '॥ श्री गणेशाय नमঃ ॥',
      }));
      showToast(`Loaded profile for ${sample.profile.personal.fullName}`);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset all fields to a blank template?')) {
      setProfile(BLANK_PROFILE);
      showToast('Profile reset to blank');
    }
  };

  // PDF Export
  const handleExportPdf = async () => {
    setIsExporting(true);
    try {
      const fileName = `${profile.personal.fullName || 'Marriage'}_Biodata`;
      const success = await exportToPdf('biodata-print-sheet', fileName);
      if (success) {
        showToast('PDF downloaded successfully in A4 format!');
      } else {
        showToast('Could not generate PDF. Please try again or use Print.');
      }
    } finally {
      setIsExporting(false);
    }
  };

  // Image Export (PNG for WhatsApp)
  const handleExportImage = async () => {
    setIsExporting(true);
    try {
      const fileName = `${profile.personal.fullName || 'Marriage'}_Biodata`;
      const success = await exportToImage('biodata-print-sheet', fileName);
      if (success) {
        showToast('High-res image downloaded for WhatsApp/mobile!');
      } else {
        showToast('Could not save image. Please try again.');
      }
    } finally {
      setIsExporting(false);
    }
  };

  // Native Print
  const handlePrint = () => {
    window.print();
  };

  // Toggle quick Safe Share mode
  const toggleSafeShare = () => {
    if (privacy.phonePrivacy === 'masked' && privacy.addressPrivacy === 'cityStateOnly') {
      setPrivacy(DEFAULT_PRIVACY_SETTINGS);
      showToast('Switched to Full Disclosure Mode');
    } else {
      setPrivacy(SAFE_SHARE_PRIVACY_SETTINGS);
      showToast('Safe Share Privacy Enabled: Phone & Address protected');
    }
  };

  const isSafeShareActive =
    privacy.phonePrivacy === 'masked' &&
    privacy.addressPrivacy === 'cityStateOnly';

  const navTabs = [
    { id: 'personal', label: 'Personal', icon: User },
    { id: 'horoscope', label: 'Horoscope', icon: Moon },
    { id: 'career', label: 'Education', icon: GraduationCap },
    { id: 'family', label: 'Family', icon: Users },
    {
      id: 'privacy',
      label: 'Privacy & Contact',
      icon: ShieldCheck,
      highlight: true,
    },
    { id: 'about', label: 'About & Partner', icon: Heart },
    { id: 'templates', label: 'Templates', icon: Palette },
  ];

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col text-stone-900 font-sans antialiased">
      {/* GLOBAL NAVBAR */}
      <Navbar
        onLoadSample={handleLoadSample}
        onReset={handleReset}
        onExportPdf={handleExportPdf}
        onExportImage={handleExportImage}
        onPrint={handlePrint}
        privacy={privacy}
        isExporting={isExporting}
        activeProfileName={profile.personal.fullName}
      />

      {/* MOBILE VIEW TOGGLE (Sticky on small screens) */}
      <div className="no-print lg:hidden sticky top-[61px] z-30 bg-white border-b border-stone-200 px-4 py-2 flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setMobileView('editor')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${
            mobileView === 'editor'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          Edit Biodata Details
        </button>
        <button
          type="button"
          onClick={() => setMobileView('preview')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition flex items-center justify-center gap-1 ${
            mobileView === 'preview'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          Live Preview ({template.id.split('-')[0]})
        </button>
      </div>

      {/* TOAST ALERT NOTIFICATION */}
      {toastMessage && (
        <div className="no-print fixed bottom-6 right-6 z-50 bg-stone-900 text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-bounce border border-stone-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* MAIN DUAL PANE WORKSPACE */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT PANE: FORM & CUSTOMIZATION EDITOR (5 COLS) */}
        <section
          className={`no-print lg:col-span-5 bg-white rounded-2xl border border-stone-200/80 shadow-xs flex flex-col overflow-hidden ${
            mobileView === 'preview' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Editor Header Navigation Tabs */}
          <div className="border-b border-stone-200 bg-stone-50/70 p-2 overflow-x-auto flex gap-1">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as EditorTab)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                    isActive
                      ? tab.highlight
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-white text-stone-900 shadow-xs border border-stone-200'
                      : tab.highlight
                      ? 'text-amber-800 hover:bg-amber-100/70'
                      : 'text-stone-600 hover:bg-stone-200/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Form Content */}
          <div className="p-5 max-h-[calc(100vh-190px)] overflow-y-auto">
            {activeTab === 'personal' && (
              <PersonalSection
                data={profile.personal}
                onChange={(updated) =>
                  setProfile((prev) => ({
                    ...prev,
                    personal: { ...prev.personal, ...updated },
                  }))
                }
              />
            )}

            {activeTab === 'horoscope' && (
              <HoroscopeSection
                data={profile.horoscope}
                onChange={(updated) =>
                  setProfile((prev) => ({
                    ...prev,
                    horoscope: { ...prev.horoscope, ...updated },
                  }))
                }
              />
            )}

            {activeTab === 'career' && (
              <EducationCareerSection
                data={profile.educationCareer}
                onChange={(updated) =>
                  setProfile((prev) => ({
                    ...prev,
                    educationCareer: { ...prev.educationCareer, ...updated },
                  }))
                }
              />
            )}

            {activeTab === 'family' && (
              <FamilySection
                data={profile.family}
                onChange={(updated) =>
                  setProfile((prev) => ({
                    ...prev,
                    family: { ...prev.family, ...updated },
                  }))
                }
              />
            )}

            {activeTab === 'privacy' && (
              <ContactPrivacySection
                contact={profile.contact}
                privacy={privacy}
                onContactChange={(updated) =>
                  setProfile((prev) => ({
                    ...prev,
                    contact: { ...prev.contact, ...updated },
                  }))
                }
                onPrivacyChange={(updated) =>
                  setPrivacy((prev) => ({ ...prev, ...updated }))
                }
              />
            )}

            {activeTab === 'about' && (
              <AboutPartnerSection
                data={profile.aboutAndPreferences}
                onChange={(updated) =>
                  setProfile((prev) => ({
                    ...prev,
                    aboutAndPreferences: {
                      ...prev.aboutAndPreferences,
                      ...updated,
                    },
                  }))
                }
              />
            )}

            {activeTab === 'templates' && (
              <TemplateCustomizer
                config={template}
                onChange={(updated) =>
                  setTemplate((prev) => ({ ...prev, ...updated }))
                }
              />
            )}
          </div>
        </section>

        {/* RIGHT PANE: LIVE A4 PRINTABLE BIODATA PREVIEW (7 COLS) */}
        <section
          className={`print-container lg:col-span-7 flex flex-col items-center w-full ${
            mobileView === 'editor' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Quick Toolbar above Canvas */}
          <div className="no-print w-full flex flex-wrap items-center justify-between gap-2 mb-3 bg-white/90 p-2.5 rounded-xl border border-stone-200/80 shadow-2xs">
            {/* Quick Template Switcher Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-md py-0.5">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider pl-1">
                Template:
              </span>
              {[
                { id: 'islamic-noor', label: 'Noor (Islamic)' },
                { id: 'dhaka-jamdani', label: 'Jamdani' },
                { id: 'padma-teal', label: 'Padma Teal' },
                { id: 'chittagong-navy', label: 'Chattogram' },
                { id: 'mughal-rose', label: 'Mughal Rose' },
                { id: 'olive-peace', label: 'Olive' },
                { id: 'classic-gold', label: 'Gold' },
                { id: 'royal-maroon', label: 'Maroon' },
                { id: 'saffron-heritage', label: 'Saffron' },
                { id: 'sapphire-blue', label: 'Sapphire' },
                { id: 'rose-blush', label: 'Rose' },
                { id: 'minimal-ivory', label: 'Ivory' },
                { id: 'vintage-floral', label: 'Floral' },
                { id: 'emerald-regalia', label: 'Emerald' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() =>
                    setTemplate((prev) => ({ ...prev, id: t.id as TemplateId }))
                  }
                  className={`px-2 py-0.5 text-xs rounded-md font-medium transition whitespace-nowrap ${
                    template.id === t.id
                      ? 'bg-amber-600 text-white font-semibold'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Quick Privacy Toggle & Zoom Controls */}
            <div className="flex items-center gap-2">
              {/* Quick Privacy Shield Button */}
              <button
                type="button"
                onClick={toggleSafeShare}
                title="Click to toggle Safe Share Privacy mode"
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition flex items-center gap-1 ${
                  isSafeShareActive
                    ? 'bg-amber-50 text-amber-900 border-amber-300'
                    : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                }`}
              >
                {isSafeShareActive ? (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                    <span>Safe Share</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 text-stone-400" />
                    <span>Unmasked</span>
                  </>
                )}
              </button>

              {/* Zoom Buttons */}
              <div className="hidden sm:flex items-center gap-1 bg-stone-100 p-1 rounded-lg border border-stone-200 text-stone-600">
                <button
                  type="button"
                  onClick={() => setZoomScale((s) => Math.max(0.5, s - 0.1))}
                  className="p-1 hover:text-stone-900"
                  title="Zoom out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono px-1">
                  {Math.round(zoomScale * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomScale((s) => Math.min(1.0, s + 0.1))}
                  className="p-1 hover:text-stone-900"
                  title="Zoom in"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* THE PREVIEW CANVAS CONTAINER */}
          <div className="w-full flex justify-center overflow-x-auto p-2 bg-stone-200/50 rounded-2xl border border-stone-300/60 shadow-inner">
            <div
              className="origin-top transition-transform duration-150 shadow-2xl rounded-sm"
              style={{
                transform: `scale(${zoomScale})`,
                marginBottom: `${(zoomScale - 1) * 1120}px`, // Offset spacing for scale transform
              }}
            >
              <BiodataSheet
                profile={profile}
                template={template}
                privacy={privacy}
              />
            </div>
          </div>

          {/* Bottom Export Bar for Quick Action */}
          <div className="no-print mt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              disabled={isExporting}
              onClick={handleExportPdf}
              className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-2 shadow-md transition disabled:opacity-50"
            >
              <FileDown className="w-4 h-4" />
              Download Official PDF
            </button>

            <button
              type="button"
              disabled={isExporting}
              onClick={handleExportImage}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 text-xs font-semibold flex items-center gap-2 shadow-2xs transition"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              Save Image for WhatsApp
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 text-xs font-semibold flex items-center gap-2 shadow-2xs transition"
            >
              <Printer className="w-4 h-4 text-stone-600" />
              Print / Save as PDF
            </button>
          </div>
        </section>

      </main>
    </div>
  );
}
