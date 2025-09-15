import { createContext, useContext, useState, ReactNode } from 'react';

type Language = {
  code: string;
  name: string;
  nativeName: string;
};

type LanguageContextType = {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  translate: (key: string) => string;
};

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
];

// Basic translations for key farming terms
const translations: Record<string, Record<string, string>> = {
  en: {
    'smart_farming': 'Smart Farming Assistant',
    'disease_detection': 'Disease Detection',
    'ai_chat': 'AI Chat', 
    'dashboard': 'Dashboard',
    'upload_photo': 'Upload Crop Photo',
    'save_history': 'Save to History',
    'get_details': 'Get More Details',
    'healthy_crops': 'Healthy Crops',
    'total_scans': 'Total Scans',
    'voice_control': 'Voice Control',
    'analysis_results': 'Analysis Results'
  },
  hi: {
    'smart_farming': 'स्मार्ट खेती सहायक',
    'disease_detection': 'रोग का पता लगाना',
    'ai_chat': 'एआई चैट',
    'dashboard': 'डैशबोर्ड',
    'upload_photo': 'फसल की फोटो अपलोड करें',
    'save_history': 'इतिहास में सहेजें',
    'get_details': 'अधिक विवरण प्राप्त करें',
    'healthy_crops': 'स्वस्थ फसलें',
    'total_scans': 'कुल स्कैन',
    'voice_control': 'आवाज नियंत्रण',
    'analysis_results': 'विश्लेषण परिणाम'
  },
  bn: {
    'smart_farming': 'স্মার্ট কৃষি সহায়ক',
    'disease_detection': 'রোগ সনাক্তকরণ',
    'ai_chat': 'এআই চ্যাট',
    'dashboard': 'ড্যাশবোর্ড',
    'upload_photo': 'ফসলের ছবি আপলোড করুন',
    'save_history': 'ইতিহাসে সংরক্ষণ করুন',
    'get_details': 'আরো বিবরণ পান',
    'healthy_crops': 'সুস্থ ফসল',
    'total_scans': 'মোট স্ক্যান',
    'voice_control': 'কণ্ঠস্বর নিয়ন্ত্রণ',
    'analysis_results': 'বিশ্লেষণের ফলাফল'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('farming-language', language.code);
  };

  const translate = (key: string): string => {
    return translations[currentLanguage.code]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export { languages };