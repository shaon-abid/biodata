export type PhonePrivacyLevel = 'visible' | 'masked' | 'hidden' | 'onRequest';
export type AddressPrivacyLevel = 'full' | 'cityStateOnly' | 'onRequest' | 'hidden';
export type IncomePrivacyLevel = 'visible' | 'rangeOnly' | 'onRequest' | 'hidden';
export type HoroscopePrivacyLevel = 'visible' | 'basicOnly' | 'hidden';
export type PhotoPrivacyLevel = 'visible' | 'blurred' | 'hidden';

export interface PrivacySettings {
  phonePrivacy: PhonePrivacyLevel;
  altPhonePrivacy: PhonePrivacyLevel;
  emailPrivacy: PhonePrivacyLevel;
  addressPrivacy: AddressPrivacyLevel;
  incomePrivacy: IncomePrivacyLevel;
  horoscopePrivacy: HoroscopePrivacyLevel;
  photoPrivacy: PhotoPrivacyLevel;
  siblingDetailsPrivacy: 'visible' | 'countOnly' | 'hidden';
  showWatermark: boolean;
  watermarkText: string;
}

export interface PersonalDetails {
  fullName: string;
  gender: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
  height: string;
  weight: string;
  complexion: string;
  bloodGroup: string;
  maritalStatus: string;
  motherTongue: string;
  languagesKnown: string;
  photoUrl: string;
  photoShape: 'square' | 'rounded' | 'circle' | 'arch';
}

export interface HoroscopeDetails {
  enabled: boolean;
  rashi: string;
  nakshatra: string;
  gotra: string;
  manglik: string;
  gan: string;
  nadi: string;
  charan: string;
}

export interface EducationCareerDetails {
  highestDegree: string;
  collegeUniversity: string;
  occupation: string;
  organization: string;
  annualIncome: string;
  workLocation: string;
  additionalDegrees?: string;
}

export interface FamilyDetails {
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  grandfatherName: string;
  nativePlace: string;
  familyType: string; // Nuclear, Joint
  familyValues: string; // Traditional, Moderate, Liberal
  familyStatus: string; // Upper Middle Class, Middle Class, Affluent
  brothers: string;
  sisters: string;
  familyAbout?: string;
}

export interface ContactDetails {
  contactPerson: string;
  relationWithCandidate: string;
  primaryPhone: string;
  alternatePhone: string;
  email: string;
  fullAddress: string;
  city: string;
  state: string;
  pincode: string;
}

export interface AboutAndPreferences {
  aboutCandidate: string;
  hobbies: string;
  partnerExpectations: string;
}

export interface BiodataProfile {
  id: string;
  personal: PersonalDetails;
  horoscope: HoroscopeDetails;
  educationCareer: EducationCareerDetails;
  family: FamilyDetails;
  contact: ContactDetails;
  aboutAndPreferences: AboutAndPreferences;
}

export type TemplateId =
  | 'classic-gold'
  | 'royal-maroon'
  | 'saffron-heritage'
  | 'sapphire-blue'
  | 'rose-blush'
  | 'minimal-ivory'
  | 'vintage-floral'
  | 'emerald-regalia'
  | 'islamic-noor'
  | 'dhaka-jamdani'
  | 'padma-teal'
  | 'mughal-rose'
  | 'chittagong-navy'
  | 'olive-peace';

export type HeaderSymbolType =
  | 'bismillah'
  | 'crescent'
  | 'mosque'
  | 'floral'
  | 'ganesha'
  | 'om'
  | 'swastika'
  | 'khanda'
  | 'none';

export interface TemplateConfig {
  id: TemplateId;
  headerSymbol: HeaderSymbolType;
  headerTitle: string;
  fontFamily: 'cinzel' | 'cormorant' | 'playfair' | 'outfit';
  accentColor: string;
  showPhoto: boolean;
  sectionBadgeStyle: 'pill' | 'ornate' | 'border' | 'minimal';
}
