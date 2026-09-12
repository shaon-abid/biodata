import { AddressPrivacyLevel, IncomePrivacyLevel, PhonePrivacyLevel } from '../types/biodata';

export function maskPhone(phone: string): string {
  if (!phone) return '';
  const cleaned = phone.trim();
  // Keep country code and first 3 chars, mask next digits, keep last 2
  if (cleaned.length > 7) {
    const start = cleaned.slice(0, Math.max(4, Math.floor(cleaned.length * 0.4)));
    const end = cleaned.slice(-2);
    return `${start} ••••• ${end}`;
  }
  return `${cleaned.slice(0, 2)}••••${cleaned.slice(-1)}`;
}

export function maskEmail(email: string): string {
  if (!email || !email.includes('@')) return email;
  const [user, domain] = email.split('@');
  if (user.length <= 2) {
    return `${user.charAt(0)}*@${domain}`;
  }
  return `${user.slice(0, 2)}••••${user.slice(-1)}@${domain}`;
}

export function formatPhoneWithPrivacy(phone: string, level: PhonePrivacyLevel): { text: string; isProtected: boolean; hidden: boolean } {
  if (!phone) return { text: '', isProtected: false, hidden: true };
  
  switch (level) {
    case 'visible':
      return { text: phone, isProtected: false, hidden: false };
    case 'masked':
      return { text: maskPhone(phone), isProtected: true, hidden: false };
    case 'onRequest':
      return { text: 'Available on Verified Request / Interest', isProtected: true, hidden: false };
    case 'hidden':
      return { text: '', isProtected: true, hidden: true };
    default:
      return { text: phone, isProtected: false, hidden: false };
  }
}

export function formatEmailWithPrivacy(email: string, level: PhonePrivacyLevel): { text: string; isProtected: boolean; hidden: boolean } {
  if (!email) return { text: '', isProtected: false, hidden: true };

  switch (level) {
    case 'visible':
      return { text: email, isProtected: false, hidden: false };
    case 'masked':
      return { text: maskEmail(email), isProtected: true, hidden: false };
    case 'onRequest':
      return { text: 'Shared upon Mutual Interest', isProtected: true, hidden: false };
    case 'hidden':
      return { text: '', isProtected: true, hidden: true };
    default:
      return { text: email, isProtected: false, hidden: false };
  }
}

export function formatAddressWithPrivacy(
  fullAddress: string,
  city: string,
  state: string,
  pincode: string,
  level: AddressPrivacyLevel
): { text: string; isProtected: boolean; hidden: boolean } {
  const cityState = [city, state].filter(Boolean).join(', ');
  const complete = [fullAddress, cityState, pincode ? `- ${pincode}` : ''].filter(Boolean).join(', ');

  switch (level) {
    case 'full':
      return { text: complete || cityState || 'Not Specified', isProtected: false, hidden: false };
    case 'cityStateOnly':
      return { text: cityState ? `${cityState} (Exact address confidential)` : 'Confidential', isProtected: true, hidden: false };
    case 'onRequest':
      return { text: 'Residential Address shared on verified match', isProtected: true, hidden: false };
    case 'hidden':
      return { text: '', isProtected: true, hidden: true };
    default:
      return { text: complete, isProtected: false, hidden: false };
  }
}

export function formatIncomeWithPrivacy(income: string, level: IncomePrivacyLevel): { text: string; isProtected: boolean; hidden: boolean } {
  if (!income) return { text: '', isProtected: false, hidden: true };

  switch (level) {
    case 'visible':
      return { text: income, isProtected: false, hidden: false };
    case 'rangeOnly':
      return { text: 'Disclosed to suitable prospects', isProtected: true, hidden: false };
    case 'onRequest':
      return { text: 'Available on Direct Family Discussion', isProtected: true, hidden: false };
    case 'hidden':
      return { text: '', isProtected: true, hidden: true };
    default:
      return { text: income, isProtected: false, hidden: false };
  }
}
