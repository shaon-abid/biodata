import React from 'react';
import {
  BiodataProfile,
  PrivacySettings,
  TemplateConfig,
} from '../../types/biodata';
import {
  formatAddressWithPrivacy,
  formatEmailWithPrivacy,
  formatIncomeWithPrivacy,
  formatPhoneWithPrivacy,
} from '../../utils/privacyHelpers';
import {
  CornerOrnament,
  DividerFiligree,
  HeaderSymbolIcon,
  TraditionalMandalaWatermark,
} from '../Ornaments';
import { Shield, Lock, EyeOff } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  badgeBg: string;
  badgeText: string;
  accentColor: string;
  icon?: React.ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  badgeBg,
  badgeText,
  accentColor,
  icon,
}) => (
  <div className="flex items-center mb-1.5 w-full">
    <div
      data-section-badge="true"
      className="inline-flex items-center justify-center px-2.5 py-0.5 text-[10.5px] font-bold tracking-wider uppercase rounded-full shrink-0 select-none shadow-xs"
      style={{
        backgroundColor: badgeBg,
        color: badgeText,
        lineHeight: '1.25rem',
      }}
    >
      <span className="inline-flex items-center gap-1">
        {title}
        {icon}
      </span>
    </div>
    <div
      className="h-[1px] flex-1 ml-2 opacity-35 self-center"
      style={{ backgroundColor: accentColor }}
    />
  </div>
);

interface BiodataSheetProps {
  profile: BiodataProfile;
  template: TemplateConfig;
  privacy: PrivacySettings;
  scale?: number;
}

export const BiodataSheet: React.FC<BiodataSheetProps> = ({
  profile,
  template,
  privacy,
}) => {
  const { personal, horoscope, educationCareer, family, contact, aboutAndPreferences } = profile;

  // Format privacy-controlled fields
  const primaryPhone = formatPhoneWithPrivacy(contact.primaryPhone, privacy.phonePrivacy);
  const altPhone = formatPhoneWithPrivacy(contact.alternatePhone, privacy.altPhonePrivacy);
  const email = formatEmailWithPrivacy(contact.email, privacy.emailPrivacy);
  const address = formatAddressWithPrivacy(
    contact.fullAddress,
    contact.city,
    contact.state,
    contact.pincode,
    privacy.addressPrivacy
  );
  const income = formatIncomeWithPrivacy(educationCareer.annualIncome, privacy.incomePrivacy);

  // Determine template theme classes
  const isDarkTemplate =
    template.id === 'royal-maroon' ||
    template.id === 'sapphire-blue' ||
    template.id === 'emerald-regalia' ||
    template.id === 'islamic-noor' ||
    template.id === 'chittagong-navy' ||
    template.id === 'mughal-rose';
  
  const getThemeColors = () => {
    switch (template.id) {
      case 'islamic-noor':
        return {
          bg: '#082f23', // Deep Quranic Emerald Green
          cardBg: '#082f23',
          text: '#fbfbf5',
          mutedText: '#c9ded6',
          accent: '#e6c86e', // Luminous Quranic Gold
          headerBg: '#114434',
          border: '#e6c86e',
          badgeBg: '#e6c86e',
          badgeText: '#082f23',
        };
      case 'dhaka-jamdani':
        return {
          bg: '#fffdf9', // Ivory Muslin
          cardBg: '#ffffff',
          text: '#2d141b',
          mutedText: '#694851',
          accent: '#b91c1c', // Jamdani Crimson
          headerBg: '#fee2e2',
          border: '#b91c1c',
          badgeBg: '#b91c1c',
          badgeText: '#ffffff',
        };
      case 'padma-teal':
        return {
          bg: '#f5faf9', // Padma River Mist
          cardBg: '#ffffff',
          text: '#133535',
          mutedText: '#476969',
          accent: '#0f766e', // Deep River Teal
          headerBg: '#ccfbf1',
          border: '#0d9488',
          badgeBg: '#0f766e',
          badgeText: '#ffffff',
        };
      case 'mughal-rose':
        return {
          bg: '#2e1820', // Velvety Mughal Plum / Dark Rose
          cardBg: '#2e1820',
          text: '#fdf2f4',
          mutedText: '#d8b6c0',
          accent: '#f472b6', // Soft Rose Gold
          headerBg: '#4a2634',
          border: '#f472b6',
          badgeBg: '#db2777',
          badgeText: '#ffffff',
        };
      case 'chittagong-navy':
        return {
          bg: '#0c1b33', // Bay of Bengal Deep Navy
          cardBg: '#0c1b33',
          text: '#f8fafc',
          mutedText: '#b3c7df',
          accent: '#f59e0b', // Port City Warm Amber Gold
          headerBg: '#19345d',
          border: '#f59e0b',
          badgeBg: '#f59e0b',
          badgeText: '#0c1b33',
        };
      case 'olive-peace':
        return {
          bg: '#f9faf7', // Natural Peaceful Olive Canvas
          cardBg: '#ffffff',
          text: '#1b2419',
          mutedText: '#51614e',
          accent: '#4d7c0f', // Olive Laurel
          headerBg: '#ecfccb',
          border: '#65a30d',
          badgeBg: '#4d7c0f',
          badgeText: '#ffffff',
        };
      case 'royal-maroon':
        return {
          bg: '#3e2321',
          cardBg: '#3e2321',
          text: '#fbf5ea',
          mutedText: '#dfcfb6',
          accent: '#e6a147',
          headerBg: '#6b3c37',
          border: '#e6a147',
          badgeBg: '#b97a29',
          badgeText: '#ffffff',
        };
      case 'sapphire-blue':
        return {
          bg: '#162847',
          cardBg: '#162847',
          text: '#f3f6fc',
          mutedText: '#bccbe3',
          accent: '#dfb76c',
          headerBg: '#213a63',
          border: '#dfb76c',
          badgeBg: '#dfb76c',
          badgeText: '#162847',
        };
      case 'emerald-regalia':
        return {
          bg: '#143126',
          cardBg: '#143126',
          text: '#f5faf7',
          mutedText: '#c2ded3',
          accent: '#e2bc77',
          headerBg: '#1f4536',
          border: '#e2bc77',
          badgeBg: '#e2bc77',
          badgeText: '#143126',
        };
      case 'saffron-heritage':
        return {
          bg: '#fffdfa',
          cardBg: '#ffffff',
          text: '#2d1806',
          mutedText: '#6f5238',
          accent: '#c2410c', // deep orange
          headerBg: '#ffedd5',
          border: '#ea580c',
          badgeBg: '#ea580c',
          badgeText: '#ffffff',
        };
      case 'rose-blush':
        return {
          bg: '#fdfbfb',
          cardBg: '#ffffff',
          text: '#3b252c',
          mutedText: '#7b5b66',
          accent: '#be185d',
          headerBg: '#fce7f3',
          border: '#f472b6',
          badgeBg: '#db2777',
          badgeText: '#ffffff',
        };
      case 'vintage-floral':
        return {
          bg: '#faf7f0',
          cardBg: '#faf7f0',
          text: '#332a21',
          mutedText: '#6c5c4e',
          accent: '#854d0e',
          headerBg: '#f3ebd9',
          border: '#a16207',
          badgeBg: '#854d0e',
          badgeText: '#ffffff',
        };
      case 'minimal-ivory':
        return {
          bg: '#fbfbfa',
          cardBg: '#ffffff',
          text: '#1c1917',
          mutedText: '#57534e',
          accent: '#78350f',
          headerBg: '#f5f5f4',
          border: '#d6d3d1',
          badgeBg: '#44403c',
          badgeText: '#ffffff',
        };
      case 'classic-gold':
      default:
        return {
          bg: '#ffffff',
          cardBg: '#ffffff',
          text: '#292524',
          mutedText: '#57534e',
          accent: '#b45309',
          headerBg: '#fef3c7',
          border: '#d97706',
          badgeBg: '#b45309',
          badgeText: '#ffffff',
        };
    }
  };

  const colors = getThemeColors();

  const getFontFamilyClass = () => {
    switch (template.fontFamily) {
      case 'cinzel':
        return 'font-cinzel';
      case 'cormorant':
        return 'font-cormorant';
      case 'playfair':
        return 'font-playfair';
      case 'outfit':
        return 'font-outfit';
      default:
        return 'font-cinzel';
    }
  };

  const fontClass = getFontFamilyClass();

  // Photo shape styling
  const getPhotoShapeClass = () => {
    switch (personal.photoShape) {
      case 'circle':
        return 'rounded-full';
      case 'arch':
        return 'rounded-t-full rounded-b-lg';
      case 'rounded':
        return 'rounded-xl';
      case 'square':
      default:
        return 'rounded-sm';
    }
  };

  return (
    <div
      id="biodata-print-sheet"
      className="biodata-a4-page relative w-[210mm] min-h-[297mm] mx-auto select-none p-6 sm:p-7 flex flex-col justify-between transition-all"
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
      }}
    >
      {/* Outer Decorative Frame Border */}
      <div
        className="absolute inset-3.5 pointer-events-none border-2"
        style={{ borderColor: colors.border }}
      />
      <div
        className="absolute inset-[18px] pointer-events-none border"
        style={{ borderColor: colors.border, opacity: 0.6 }}
      />

      {/* Ornate Corner Elements */}
      <div className="absolute top-3.5 left-3.5">
        <CornerOrnament position="top-left" color={colors.accent} size={40} />
      </div>
      <div className="absolute top-3.5 right-3.5">
        <CornerOrnament position="top-right" color={colors.accent} size={40} />
      </div>
      <div className="absolute bottom-3.5 left-3.5">
        <CornerOrnament position="bottom-left" color={colors.accent} size={40} />
      </div>
      <div className="absolute bottom-3.5 right-3.5">
        <CornerOrnament position="bottom-right" color={colors.accent} size={40} />
      </div>

      {/* Background Mandala Watermark */}
      <TraditionalMandalaWatermark
        color={colors.accent}
        opacity={isDarkTemplate ? 0.08 : 0.05}
      />

      {/* Matrimonial Privacy Watermark Banner (if enabled) */}
      {privacy.showWatermark && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div
            className="transform -rotate-45 text-2xl font-bold tracking-widest uppercase border-y-2 py-2 px-8 select-none"
            style={{
              color: colors.accent,
              borderColor: colors.accent,
              opacity: 0.18,
            }}
          >
            {privacy.watermarkText || 'For Matrimonial Use Only • Confidential'}
          </div>
        </div>
      )}

      {/* Content wrapper */}
      <div className="relative z-10 flex-1 flex flex-col justify-between px-2 pt-1">
        {/* HEADER SECTION */}
        <div className="text-center mb-2.5">
          {/* Header religious / auspicious emblem & title */}
          {template.headerSymbol !== 'none' && (
            <div className="flex justify-center mb-1">
              <HeaderSymbolIcon
                type={template.headerSymbol}
                className="w-7 h-7"
                color={colors.accent}
              />
            </div>
          )}
          
          {template.headerTitle && (
            <h4
              className={`text-xs tracking-wider font-semibold mb-0.5 ${fontClass}`}
              style={{ color: colors.accent }}
            >
              {template.headerTitle}
            </h4>
          )}

          {/* Candidate Big Name & Subtitle */}
          <div>
            <h1
              className={`text-2xl font-bold tracking-wide uppercase leading-tight ${fontClass}`}
              style={{ color: isDarkTemplate ? '#ffffff' : colors.text }}
            >
              {personal.fullName || 'Candidate Full Name'}
            </h1>
            <p
              className="text-[11px] tracking-normal mt-0.5"
              style={{ color: colors.mutedText }}
            >
              {personal.dateOfBirth && `DOB: ${new Date(personal.dateOfBirth).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}`}
              {personal.timeOfBirth && ` • ${personal.timeOfBirth}`}
              {personal.placeOfBirth && ` • ${personal.placeOfBirth}`}
            </p>
          </div>

          <DividerFiligree color={colors.accent} className="my-2 max-w-md mx-auto" />
        </div>

        {/* MAIN BODY: BALANCED 2 COLUMNS */}
        <div className="grid grid-cols-12 gap-5 flex-1 items-start">
          {/* LEFT COLUMN: PERSONAL DETAILS & OPTIONAL HOROSCOPE */}
          <div className={template.showPhoto && personal.photoUrl ? 'col-span-7 space-y-2.5' : 'col-span-6 space-y-2.5'}>
            {/* SECTION: PERSONAL DETAILS */}
            <div>
              <SectionHeader
                title="Personal Details"
                badgeBg={colors.badgeBg}
                badgeText={colors.badgeText}
                accentColor={colors.accent}
              />

              <div className="grid grid-cols-12 text-[11px] leading-snug gap-y-1">
                {personal.fullName && (
                  <>
                    <div className="col-span-4 font-medium" style={{ color: colors.mutedText }}>Full Name</div>
                    <div className="col-span-8 font-semibold">: {personal.fullName}</div>
                  </>
                )}
                {personal.dateOfBirth && (
                  <>
                    <div className="col-span-4 font-medium" style={{ color: colors.mutedText }}>Date of Birth</div>
                    <div className="col-span-8">: {new Date(personal.dateOfBirth).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
                  </>
                )}
                {personal.timeOfBirth && (
                  <>
                    <div className="col-span-4 font-medium" style={{ color: colors.mutedText }}>Time of Birth</div>
                    <div className="col-span-8">: {personal.timeOfBirth}</div>
                  </>
                )}
                {personal.placeOfBirth && (
                  <>
                    <div className="col-span-4 font-medium" style={{ color: colors.mutedText }}>Place of Birth</div>
                    <div className="col-span-8">: {personal.placeOfBirth}</div>
                  </>
                )}
                {personal.height && (
                  <>
                    <div className="col-span-4 font-medium" style={{ color: colors.mutedText }}>Height</div>
                    <div className="col-span-8">: {personal.height}</div>
                  </>
                )}
                {personal.weight && (
                  <>
                    <div className="col-span-4 font-medium" style={{ color: colors.mutedText }}>Weight</div>
                    <div className="col-span-8">: {personal.weight}</div>
                  </>
                )}
                {personal.complexion && (
                  <>
                    <div className="col-span-4 font-medium" style={{ color: colors.mutedText }}>Complexion</div>
                    <div className="col-span-8">: {personal.complexion}</div>
                  </>
                )}
                {personal.bloodGroup && (
                  <>
                    <div className="col-span-4 font-medium" style={{ color: colors.mutedText }}>Blood Group</div>
                    <div className="col-span-8">: {personal.bloodGroup}</div>
                  </>
                )}
                {personal.motherTongue && (
                  <>
                    <div className="col-span-4 font-medium" style={{ color: colors.mutedText }}>Mother Tongue</div>
                    <div className="col-span-8">: {personal.motherTongue}</div>
                  </>
                )}
                {personal.languagesKnown && (
                  <>
                    <div className="col-span-4 font-medium" style={{ color: colors.mutedText }}>Languages</div>
                    <div className="col-span-8">: {personal.languagesKnown}</div>
                  </>
                )}
                {personal.maritalStatus && (
                  <>
                    <div className="col-span-4 font-medium" style={{ color: colors.mutedText }}>Marital Status</div>
                    <div className="col-span-8">: {personal.maritalStatus}</div>
                  </>
                )}
              </div>
            </div>

            {/* SECTION: HOROSCOPE (Optional / Privacy-aware) */}
            {horoscope.enabled && privacy.horoscopePrivacy !== 'hidden' && (
              <div>
                <SectionHeader
                  title="Horoscope Details"
                  badgeBg={colors.badgeBg}
                  badgeText={colors.badgeText}
                  accentColor={colors.accent}
                />

                <div className="grid grid-cols-12 text-[11px] leading-snug gap-y-1">
                  {horoscope.rashi && (
                    <>
                      <div className="col-span-4 font-medium" style={{ color: colors.mutedText }}>Rashi (Moon)</div>
                      <div className="col-span-8 font-semibold">: {horoscope.rashi}</div>
                    </>
                  )}
                  {horoscope.nakshatra && (
                    <>
                      <div className="col-span-4 font-medium" style={{ color: colors.mutedText }}>Nakshatra</div>
                      <div className="col-span-8">: {horoscope.nakshatra}</div>
                    </>
                  )}
                  {horoscope.gotra && (
                    <>
                      <div className="col-span-4 font-medium" style={{ color: colors.mutedText }}>Gotra</div>
                      <div className="col-span-8">: {horoscope.gotra}</div>
                    </>
                  )}
                  {horoscope.manglik && (
                    <>
                      <div className="col-span-4 font-medium" style={{ color: colors.mutedText }}>Manglik Status</div>
                      <div className="col-span-8 font-semibold">: {horoscope.manglik}</div>
                    </>
                  )}
                  {privacy.horoscopePrivacy === 'visible' && (
                    <>
                      {horoscope.gan && (
                        <>
                          <div className="col-span-4 font-medium" style={{ color: colors.mutedText }}>Gan</div>
                          <div className="col-span-8">: {horoscope.gan}</div>
                        </>
                      )}
                      {horoscope.nadi && (
                        <>
                          <div className="col-span-4 font-medium" style={{ color: colors.mutedText }}>Nadi</div>
                          <div className="col-span-8">: {horoscope.nadi}</div>
                        </>
                      )}
                      {horoscope.charan && (
                        <>
                          <div className="col-span-4 font-medium" style={{ color: colors.mutedText }}>Charan</div>
                          <div className="col-span-8">: {horoscope.charan}</div>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: CANDIDATE PHOTO & EDUCATION & CAREER */}
          {template.showPhoto && personal.photoUrl ? (
            <div className="col-span-5 flex flex-col justify-between">
              {/* Photo & Origin Tag */}
              <div className="flex flex-col items-center mb-2">
                <div
                  className={`relative overflow-hidden p-1 border-2 shadow-xs ${getPhotoShapeClass()}`}
                  style={{ borderColor: colors.border, backgroundColor: colors.cardBg }}
                >
                  {privacy.photoPrivacy === 'hidden' ? (
                    <div
                      className={`w-32 h-40 flex flex-col items-center justify-center p-2 text-center ${getPhotoShapeClass()}`}
                      style={{ backgroundColor: colors.headerBg, color: colors.mutedText }}
                    >
                      <EyeOff className="w-7 h-7 opacity-40 mb-1.5" />
                      <span className="text-[10px] font-medium opacity-60">Photo Confidential</span>
                      <span className="text-[8.5px] opacity-40">Shared on request</span>
                    </div>
                  ) : (
                    <div className="relative">
                      <img
                        src={personal.photoUrl}
                        alt={personal.fullName}
                        className={`w-32 h-40 object-cover ${getPhotoShapeClass()} ${privacy.photoPrivacy === 'blurred' ? 'blur-md' : ''}`}
                        crossOrigin="anonymous"
                      />
                      {privacy.photoPrivacy === 'blurred' && (
                        <div
                          className="absolute inset-0 flex flex-col items-center justify-center text-[9.5px] font-semibold text-center px-1"
                          style={{ backgroundColor: 'rgba(0,0,0,0.45)', color: '#ffffff' }}
                        >
                          <Shield className="w-3.5 h-3.5 mb-0.5" color="#fcd34d" />
                          Privacy Masked
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {family.nativePlace && (
                  <div
                    className="mt-1.5 px-2 py-0.5 text-[9px] text-center rounded border border-dashed max-w-[150px]"
                    style={{ borderColor: colors.accent, color: colors.mutedText }}
                  >
                    <span className="font-semibold block text-[8.5px]" style={{ color: colors.accent }}>Native Origin</span>
                    <span className="truncate block">{family.nativePlace}</span>
                  </div>
                )}
              </div>

              {/* Education & Career under photo */}
              <div>
                <SectionHeader
                  title="Education & Career"
                  badgeBg={colors.badgeBg}
                  badgeText={colors.badgeText}
                  accentColor={colors.accent}
                />

                <div className="grid grid-cols-12 text-[10.5px] leading-snug gap-y-1">
                  {educationCareer.highestDegree && (
                    <>
                      <div className="col-span-5 font-medium" style={{ color: colors.mutedText }}>Qualification</div>
                      <div className="col-span-7 font-semibold">: {educationCareer.highestDegree}</div>
                    </>
                  )}
                  {educationCareer.collegeUniversity && (
                    <>
                      <div className="col-span-5 font-medium" style={{ color: colors.mutedText }}>College / Univ.</div>
                      <div className="col-span-7">: {educationCareer.collegeUniversity}</div>
                    </>
                  )}
                  {educationCareer.occupation && (
                    <>
                      <div className="col-span-5 font-medium" style={{ color: colors.mutedText }}>Occupation</div>
                      <div className="col-span-7 font-semibold">: {educationCareer.occupation}</div>
                    </>
                  )}
                  {educationCareer.organization && (
                    <>
                      <div className="col-span-5 font-medium" style={{ color: colors.mutedText }}>Company / Firm</div>
                      <div className="col-span-7">: {educationCareer.organization}</div>
                    </>
                  )}
                  {!income.hidden && income.text && (
                    <>
                      <div className="col-span-5 font-medium flex items-center gap-1" style={{ color: colors.mutedText }}>
                        Annual Income
                        {income.isProtected && <Lock className="w-2.5 h-2.5 text-amber-500 inline" />}
                      </div>
                      <div className="col-span-7 font-medium">: {income.text}</div>
                    </>
                  )}
                  {educationCareer.workLocation && (
                    <>
                      <div className="col-span-5 font-medium" style={{ color: colors.mutedText }}>Work Location</div>
                      <div className="col-span-7">: {educationCareer.workLocation}</div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="col-span-6 flex flex-col justify-between">
              <div>
                <SectionHeader
                  title="Education & Career"
                  badgeBg={colors.badgeBg}
                  badgeText={colors.badgeText}
                  accentColor={colors.accent}
                />

                <div className="grid grid-cols-12 text-[11px] leading-snug gap-y-1">
                  {educationCareer.highestDegree && (
                    <>
                      <div className="col-span-4 font-medium" style={{ color: colors.mutedText }}>Qualification</div>
                      <div className="col-span-8 font-semibold">: {educationCareer.highestDegree}</div>
                    </>
                  )}
                  {educationCareer.collegeUniversity && (
                    <>
                      <div className="col-span-4 font-medium" style={{ color: colors.mutedText }}>College / Univ.</div>
                      <div className="col-span-8">: {educationCareer.collegeUniversity}</div>
                    </>
                  )}
                  {educationCareer.occupation && (
                    <>
                      <div className="col-span-4 font-medium" style={{ color: colors.mutedText }}>Occupation</div>
                      <div className="col-span-8 font-semibold">: {educationCareer.occupation}</div>
                    </>
                  )}
                  {educationCareer.organization && (
                    <>
                      <div className="col-span-4 font-medium" style={{ color: colors.mutedText }}>Company / Firm</div>
                      <div className="col-span-8">: {educationCareer.organization}</div>
                    </>
                  )}
                  {!income.hidden && income.text && (
                    <>
                      <div className="col-span-4 font-medium flex items-center gap-1" style={{ color: colors.mutedText }}>
                        Annual Income
                        {income.isProtected && <Lock className="w-2.5 h-2.5 text-amber-500 inline" />}
                      </div>
                      <div className="col-span-8 font-medium">: {income.text}</div>
                    </>
                  )}
                  {educationCareer.workLocation && (
                    <>
                      <div className="col-span-4 font-medium" style={{ color: colors.mutedText }}>Work Location</div>
                      <div className="col-span-8">: {educationCareer.workLocation}</div>
                    </>
                  )}
                </div>
              </div>

              {family.nativePlace && (
                <div
                  className="mt-3 px-2 py-1 text-[10px] text-center rounded border border-dashed max-w-[170px]"
                  style={{ borderColor: colors.accent, color: colors.mutedText }}
                >
                  <span className="font-semibold block text-[9.5px]" style={{ color: colors.accent }}>Native Origin</span>
                  <span>{family.nativePlace}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* BOTTOM SECTION: FAMILY DETAILS & CONTACT DETAILS IN A BALANCED 2-COLUMN GRID */}
        <div className="mt-2.5 space-y-2">
          <div className="grid grid-cols-12 gap-4">
            {/* FAMILY DETAILS (col-span-6) */}
            <div className="col-span-6">
              <SectionHeader
                title="Family Details"
                badgeBg={colors.badgeBg}
                badgeText={colors.badgeText}
                accentColor={colors.accent}
              />

              <div className="grid grid-cols-12 text-[10.5px] leading-snug gap-y-1">
                {family.fatherName && (
                  <>
                    <div className="col-span-5 font-medium" style={{ color: colors.mutedText }}>Father's Name</div>
                    <div className="col-span-7 font-semibold">
                      : {family.fatherName} {family.fatherOccupation && <span className="font-normal opacity-85">({family.fatherOccupation})</span>}
                    </div>
                  </>
                )}
                {family.motherName && (
                  <>
                    <div className="col-span-5 font-medium" style={{ color: colors.mutedText }}>Mother's Name</div>
                    <div className="col-span-7 font-semibold">
                      : {family.motherName} {family.motherOccupation && <span className="font-normal opacity-85">({family.motherOccupation})</span>}
                    </div>
                  </>
                )}
                {family.grandfatherName && (
                  <>
                    <div className="col-span-5 font-medium" style={{ color: colors.mutedText }}>Grandfather</div>
                    <div className="col-span-7">: {family.grandfatherName}</div>
                  </>
                )}
                {privacy.siblingDetailsPrivacy !== 'hidden' && (family.brothers || family.sisters) && (
                  <>
                    <div className="col-span-5 font-medium" style={{ color: colors.mutedText }}>Siblings</div>
                    <div className="col-span-7">
                      : {privacy.siblingDetailsPrivacy === 'countOnly'
                          ? [family.brothers ? 'Brothers Details Protected' : '', family.sisters ? 'Sisters Details Protected' : ''].filter(Boolean).join(' • ')
                          : [family.brothers, family.sisters].filter(Boolean).join(' | ')}
                    </div>
                  </>
                )}
                {family.familyType && (
                  <>
                    <div className="col-span-5 font-medium" style={{ color: colors.mutedText }}>Family Type</div>
                    <div className="col-span-7">
                      : {family.familyType} {family.familyStatus && `• ${family.familyStatus}`}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* CONTACT DETAILS (col-span-6) */}
            <div className="col-span-6">
              <SectionHeader
                title="Contact Details"
                badgeBg={colors.badgeBg}
                badgeText={colors.badgeText}
                accentColor={colors.accent}
                icon={(primaryPhone.isProtected || address.isProtected || email.isProtected) ? (
                  <Shield className="w-3 h-3 inline ml-0.5 text-amber-200" />
                ) : undefined}
              />

              <div className="grid grid-cols-12 text-[10.5px] leading-snug gap-y-1">
                {contact.contactPerson && (
                  <>
                    <div className="col-span-5 font-medium" style={{ color: colors.mutedText }}>Contact Person</div>
                    <div className="col-span-7 font-semibold">: {contact.contactPerson}</div>
                  </>
                )}
                {!primaryPhone.hidden && primaryPhone.text && (
                  <>
                    <div className="col-span-5 font-medium flex items-center gap-1" style={{ color: colors.mutedText }}>
                      Contact No.
                      {primaryPhone.isProtected && <Lock className="w-2.5 h-2.5 inline" color={colors.accent} />}
                    </div>
                    <div className="col-span-7 font-semibold">
                      : <span className={primaryPhone.isProtected ? 'tracking-wider font-mono text-[10px]' : ''} style={primaryPhone.isProtected ? { color: colors.accent } : undefined}>{primaryPhone.text}</span>
                    </div>
                  </>
                )}
                {!altPhone.hidden && altPhone.text && (
                  <>
                    <div className="col-span-5 font-medium" style={{ color: colors.mutedText }}>Alt. Phone</div>
                    <div className="col-span-7 font-semibold">: {altPhone.text}</div>
                  </>
                )}
                {!email.hidden && email.text && (
                  <>
                    <div className="col-span-5 font-medium flex items-center gap-1" style={{ color: colors.mutedText }}>
                      Email ID
                      {email.isProtected && <Lock className="w-2.5 h-2.5 inline" color={colors.accent} />}
                    </div>
                    <div className="col-span-7 truncate">
                      : <span style={email.isProtected ? { color: colors.accent } : undefined}>{email.text}</span>
                    </div>
                  </>
                )}
                {!address.hidden && address.text && (
                  <>
                    <div className="col-span-5 font-medium flex items-center gap-1" style={{ color: colors.mutedText }}>
                      Address
                      {address.isProtected && <Lock className="w-2.5 h-2.5 text-amber-500 inline" />}
                    </div>
                    <div className="col-span-7">
                      : <span className={address.isProtected ? 'italic opacity-90' : ''}>{address.text}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* OPTIONAL: BRIEF ABOUT ME & PARTNER EXPECTATIONS (IF AVAILABLE) */}
          {(aboutAndPreferences.aboutCandidate || aboutAndPreferences.partnerExpectations) && (
            <div className="pt-1.5 text-[10px] border-t border-dashed opacity-85" style={{ borderColor: colors.border }}>
              {aboutAndPreferences.aboutCandidate && (
                <p className="line-clamp-2 mb-0.5">
                  <strong style={{ color: colors.accent }}>About:</strong> {aboutAndPreferences.aboutCandidate}
                </p>
              )}
              {aboutAndPreferences.partnerExpectations && (
                <p className="line-clamp-2">
                  <strong style={{ color: colors.accent }}>Expectations:</strong> {aboutAndPreferences.partnerExpectations}
                </p>
              )}
            </div>
          )}
        </div>

        {/* BOTTOM ORNATE FOOTER / MOTIF */}
        <div className="mt-2 text-center text-[9px] opacity-60">
          <div className="h-px w-24 mx-auto mb-1" style={{ backgroundColor: colors.accent }} />
          <span>Om Shanti • Designed for Holy Matrimony</span>
        </div>
      </div>
    </div>
  );
};
