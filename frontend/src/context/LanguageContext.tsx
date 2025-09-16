import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  en: {
    // Navigation
    home: "Home",
    diseaseDetection: "Disease Detection",
    weather: "Weather",
    aiAssistant: "AI Assistant",
    dashboard: "Dashboard",
    
    // Home Page
    homeTitle: "AI-Powered Smart Farming with EcoVision",
    homeSubtitle: "Revolutionize your farming with cutting-edge AI technology. Detect diseases, get weather insights, and receive personalized farming recommendations.",
    getStarted: "Get Started",
    learnMore: "Learn More",
    smartDiagnosis: "Smart Diagnosis",
    smartDiagnosisDesc: "Upload crop images for instant AI-powered disease and pest detection with 95+ accuracy.",
    weatherInsights: "Weather Insights",
    weatherInsightsDesc: "Get hyper-local weather forecasts and agricultural recommendations tailored to your location.",
    aiChatbot: "AI Assistant",
    aiChatbotDesc: "24/7 farming expert at your fingertips. Ask questions in your native language.",
    dataAnalytics: "Smart Analytics",
    dataAnalyticsDesc: "Track crop health, yield predictions, and farm performance with comprehensive dashboards.",
    
    // Disease Detection
    diseaseTitle: "AI Disease Detection",
    diseaseSubtitle: "Upload a photo of your crop to get instant AI-powered disease identification and treatment recommendations.",
    uploadImage: "Upload Image",
    dragDrop: "Drag & drop an image here, or click to select",
    analyzing: "Analyzing...",
    confidence: "Confidence",
    recommendations: "Treatment Recommendations",
    
    // Weather
    weatherTitle: "Weather & Farm Insights",
    weatherSubtitle: "Get accurate weather forecasts and agricultural recommendations tailored to your farming needs.",
    currentLocation: "Use Current Location",
    getWeather: "Get Weather",
    currentWeather: "Current Weather",
    forecast5Day: "5-Day Forecast",
    farmingInsights: "Farming Insights",
    farmingInsightsDesc: "AI-powered recommendations based on current weather conditions",
    humidity: "Humidity",
    wind: "Wind",
    visibility: "Visibility",
    uvIndex: "UV Index",
    weatherSummary: "Weather Summary",
    bestPlantingDay: "Best Planting Day",
    rainExpected: "Rain Expected",
    irrigationNeeded: "Irrigation Needed",
    pestRisk: "Pest Risk",
    
    // Chatbot
    chatbotTitle: "AI Farming Assistant",
    chatbotSubtitle: "Get instant answers to your farming questions. Ask about crops, diseases, weather, or best practices.",
    typeMessage: "Type your farming question...",
    send: "Send",
    
    // Dashboard
    dashboardTitle: "Farm Analytics Dashboard",
    dashboardSubtitle: "Monitor your farm's performance with comprehensive analytics and insights.",
    
    // Weather conditions
    partlyCloudy: "Partly Cloudy",
    sunny: "Sunny",
    rainy: "Rainy",
    cloudy: "Cloudy",
    
    // Days
    today: "Today",
    tomorrow: "Tomorrow",
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
    
    // Priorities
    high: "High",
    medium: "Medium",
    low: "Low",
    
    // Common
    loading: "Loading...",
    error: "Error",
    retry: "Retry",
    cancel: "Cancel",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    view: "View",
    
    // Farming tips
    irrigationRecommendation: "Irrigation Recommendation",
    pestAlert: "Pest Alert",
    plantingWindow: "Planting Window",
    reduced: "Reduced"
  },
  es: {
    // Navigation
    home: "Inicio",
    diseaseDetection: "Detección de Enfermedades",
    weather: "Clima",
    aiAssistant: "Asistente IA",
    dashboard: "Panel de Control",
    
    // Home Page
    homeTitle: "Agricultura Inteligente Impulsada por IA con EcoVision",
    homeSubtitle: "Revoluciona tu agricultura con tecnología de IA de vanguardia. Detecta enfermedades, obtén información meteorológica y recibe recomendaciones agrícolas personalizadas.",
    getStarted: "Comenzar",
    learnMore: "Aprender Más",
    smartDiagnosis: "Diagnóstico Inteligente",
    smartDiagnosisDesc: "Sube imágenes de cultivos para detección instantánea de enfermedades y plagas con IA con precisión del 95+.",
    weatherInsights: "Información Meteorológica",
    weatherInsightsDesc: "Obtén pronósticos meteorológicos hiperlocales y recomendaciones agrícolas adaptadas a tu ubicación.",
    aiChatbot: "Asistente IA",
    aiChatbotDesc: "Experto agrícola 24/7 a tu alcance. Haz preguntas en tu idioma nativo.",
    dataAnalytics: "Análisis Inteligente",
    dataAnalyticsDesc: "Rastrea la salud de los cultivos, predicciones de rendimiento y rendimiento de la granja con paneles integrales.",
    
    // Disease Detection
    diseaseTitle: "Detección de Enfermedades IA",
    diseaseSubtitle: "Sube una foto de tu cultivo para obtener identificación instantánea de enfermedades y recomendaciones de tratamiento impulsadas por IA.",
    uploadImage: "Subir Imagen",
    dragDrop: "Arrastra y suelta una imagen aquí, o haz clic para seleccionar",
    analyzing: "Analizando...",
    confidence: "Confianza",
    recommendations: "Recomendaciones de Tratamiento",
    
    // Weather
    weatherTitle: "Clima e Información Agrícola",
    weatherSubtitle: "Obtén pronósticos meteorológicos precisos y recomendaciones agrícolas adaptadas a tus necesidades agrícolas.",
    currentLocation: "Usar Ubicación Actual",
    getWeather: "Obtener Clima",
    currentWeather: "Clima Actual",
    forecast5Day: "Pronóstico de 5 Días",
    farmingInsights: "Información Agrícola",
    farmingInsightsDesc: "Recomendaciones impulsadas por IA basadas en las condiciones meteorológicas actuales",
    humidity: "Humedad",
    wind: "Viento",
    visibility: "Visibilidad",
    uvIndex: "Índice UV",
    weatherSummary: "Resumen del Clima",
    bestPlantingDay: "Mejor Día para Plantar",
    rainExpected: "Lluvia Esperada",
    irrigationNeeded: "Riego Necesario",
    pestRisk: "Riesgo de Plagas",
    
    // Weather conditions
    partlyCloudy: "Parcialmente Nublado",
    sunny: "Soleado",
    rainy: "Lluvioso",
    cloudy: "Nublado",
    
    // Days
    today: "Hoy",
    tomorrow: "Mañana",
    monday: "Lunes",
    tuesday: "Martes",
    wednesday: "Miércoles",
    thursday: "Jueves",
    friday: "Viernes",
    saturday: "Sábado",
    sunday: "Domingo",
    
    // Priorities
    high: "Alto",
    medium: "Medio",
    low: "Bajo",
    
    // Common
    loading: "Cargando...",
    error: "Error",
    retry: "Reintentar",
    cancel: "Cancelar",
    save: "Guardar",
    edit: "Editar",
    delete: "Eliminar",
    view: "Ver",
    
    // Farming tips
    irrigationRecommendation: "Recomendación de Riego",
    pestAlert: "Alerta de Plagas",
    plantingWindow: "Ventana de Plantación",
    reduced: "Reducido"
  },
  hi: {
    // Navigation
    home: "होम",
    diseaseDetection: "रोग की पहचान",
    weather: "मौसम",
    aiAssistant: "AI सहायक",
    dashboard: "डैशबोर्ड",
    
    // Home Page
    homeTitle: "EcoVision के साथ AI-संचालित स्मार्ट खेती",
    homeSubtitle: "अत्याधुनिक AI तकनीक के साथ अपनी खेती में क्रांति लाएं। बीमारियों का पता लगाएं, मौसम की जानकारी प्राप्त करें, और व्यक्तिगत खेती की सिफारिशें प्राप्त करें।",
    getStarted: "शुरू करें",
    learnMore: "और जानें",
    smartDiagnosis: "स्मार्ट निदान",
    smartDiagnosisDesc: "95+ सटीकता के साथ तत्काल AI-संचालित रोग और कीट पहचान के लिए फसल की छवियां अपलोड करें।",
    weatherInsights: "मौसम की जानकारी",
    weatherInsightsDesc: "अपने स्थान के अनुकूल हाइपर-लोकल मौसम पूर्वानुमान और कृषि सिफारिशें प्राप्त करें।",
    aiChatbot: "AI सहायक",
    aiChatbotDesc: "आपकी मूल भाषा में प्रश्न पूछें। 24/7 खेती विशेषज्ञ आपकी सेवा में।",
    dataAnalytics: "स्मार्ट एनालिटिक्स",
    dataAnalyticsDesc: "व्यापक डैशबोर्ड के साथ फसल स्वास्थ्य, उपज भविष्यवाणियों और खेत के प्रदर्शन को ट्रैक करें।",
    
    // Disease Detection
    diseaseTitle: "AI रोग की पहचान",
    diseaseSubtitle: "तत्काल AI-संचालित रोग पहचान और उपचार सिफारिशें प्राप्त करने के लिए अपनी फसल की तस्वीर अपलोड करें।",
    uploadImage: "छवि अपलोड करें",
    dragDrop: "यहाँ एक छवि खींचें और छोड़ें, या चुनने के लिए क्लिक करें",
    analyzing: "विश्लेषण कर रहे हैं...",
    confidence: "विश्वास",
    recommendations: "उपचार सिफारिशें",
    
    // Weather
    weatherTitle: "मौसम और खेत की जानकारी",
    weatherSubtitle: "अपनी खेती की जरूरतों के अनुकूल सटीक मौसम पूर्वानुमान और कृषि सिफारिशें प्राप्त करें।",
    currentLocation: "वर्तमान स्थान का उपयोग करें",
    getWeather: "मौसम प्राप्त करें",
    currentWeather: "वर्तमान मौसम",
    forecast5Day: "5-दिन का पूर्वानुमान",
    farmingInsights: "खेती की जानकारी",
    farmingInsightsDesc: "वर्तमान मौसम स्थितियों के आधार पर AI-संचालित सिफारिशें",
    humidity: "नमी",
    wind: "हवा",
    visibility: "दृश्यता",
    uvIndex: "UV इंडेक्स",
    weatherSummary: "मौसम सारांश",
    bestPlantingDay: "सबसे अच्छा रोपण दिन",
    rainExpected: "बारिश की उम्मीद",
    irrigationNeeded: "सिंचाई आवश्यक",
    pestRisk: "कीट जोखिम",
    
    // Weather conditions
    partlyCloudy: "आंशिक रूप से बादल",
    sunny: "धूप",
    rainy: "बरसात",
    cloudy: "बादल",
    
    // Days
    today: "आज",
    tomorrow: "कल",
    monday: "सोमवार",
    tuesday: "मंगलवार",
    wednesday: "बुधवार",
    thursday: "गुरुवार",
    friday: "शुक्रवार",
    saturday: "शनिवार",
    sunday: "रविवार",
    
    // Priorities
    high: "उच्च",
    medium: "मध्यम",
    low: "कम",
    
    // Common
    loading: "लोड हो रहा है...",
    error: "त्रुटि",
    retry: "पुनः प्रयास करें",
    cancel: "रद्द करें",
    save: "सेव करें",
    edit: "संपादित करें",
    delete: "हटाएं",
    view: "देखें",
    
    // Farming tips
    irrigationRecommendation: "सिंचाई सिफारिश",
    pestAlert: "कीट चेतावनी",
    plantingWindow: "रोपण विंडो",
    reduced: "कम"
  },
  bn: {
    // Navigation
    home: "হোম",
    diseaseDetection: "রোগ সনাক্তকরণ",
    weather: "আবহাওয়া",
    aiAssistant: "AI সহায়ক",
    dashboard: "ড্যাশবোর্ড",
    
    // Home Page
    homeTitle: "EcoVision এর সাথে AI-চালিত স্মার্ট কৃষি",
    homeSubtitle: "অত্যাধুনিক AI প্রযুক্তির সাথে আপনার কৃষিকাজে বিপ্লব আনুন। রোগ সনাক্ত করুন, আবহাওয়ার তথ্য পান এবং ব্যক্তিগতকৃত কৃষি সুপারিশ পান।",
    getStarted: "শুরু করুন",
    learnMore: "আরও জানুন",
    smartDiagnosis: "স্মার্ট নির্ণয়",
    smartDiagnosisDesc: "95+ নির্ভুলতার সাথে তাৎক্ষণিক AI-চালিত রোগ এবং কীটপতঙ্গ সনাক্তকরণের জন্য ফসলের ছবি আপলোড করুন।",
    weatherInsights: "আবহাওয়ার তথ্য",
    weatherInsightsDesc: "আপনার অবস্থানের জন্য হাইপার-লোকাল আবহাওয়ার পূর্বাভাস এবং কৃষি সুপারিশ পান।",
    aiChatbot: "AI সহায়ক",
    aiChatbotDesc: "আপনার মাতৃভাষায় প্রশ্ন করুন। 24/7 কৃষি বিশেষজ্ঞ আপনার সেবায়।",
    dataAnalytics: "স্মার্ট বিশ্লেষণ",
    dataAnalyticsDesc: "বিস্তৃত ড্যাশবোর্ডের সাথে ফসলের স্বাস্থ্য, ফলন পূর্বাভাস এবং খামারের কর্মক্ষমতা ট্র্যাক করুন।",
    
    // Disease Detection
    diseaseTitle: "AI রোগ সনাক্তকরণ",
    diseaseSubtitle: "তাৎক্ষণিক AI-চালিত রোগ সনাক্তকরণ এবং চিকিৎসা সুপারিশের জন্য আপনার ফসলের ছবি আপলোড করুন।",
    uploadImage: "ছবি আপলোড করুন",
    dragDrop: "এখানে একটি ছবি টেনে আনুন এবং ছাড়ুন, অথবা নির্বাচন করতে ক্লিক করুন",
    analyzing: "বিশ্লেষণ করা হচ্ছে...",
    confidence: "আস্থা",
    recommendations: "চিকিৎসা সুপারিশ",
    
    // Weather
    weatherTitle: "আবহাওয়া এবং খামার তথ্য",
    weatherSubtitle: "আপনার কৃষি প্রয়োজনের জন্য নির্ভুল আবহাওয়ার পূর্বাভাস এবং কৃষি সুপারিশ পান।",
    currentLocation: "বর্তমান অবস্থান ব্যবহার করুন",
    getWeather: "আবহাওয়া পান",
    currentWeather: "বর্তমান আবহাওয়া",
    forecast5Day: "5-দিনের পূর্বাভাস",
    farmingInsights: "কৃষি তথ্য",
    farmingInsightsDesc: "বর্তমান আবহাওয়ার অবস্থার উপর ভিত্তি করে AI-চালিত সুপারিশ",
    humidity: "আর্দ্রতা",
    wind: "বাতাস",
    visibility: "দৃশ্যমানতা",
    uvIndex: "UV সূচক",
    weatherSummary: "আবহাওয়ার সারসংক্ষেপ",
    bestPlantingDay: "সেরা রোপণের দিন",
    rainExpected: "বৃষ্টির প্রত্যাশা",
    irrigationNeeded: "সেচের প্রয়োজন",
    pestRisk: "কীটপতঙ্গের ঝুঁকি",
    
    // Weather conditions
    partlyCloudy: "আংশিক মেঘলা",
    sunny: "রৌদ্রোজ্জ্বল",
    rainy: "বৃষ্টি",
    cloudy: "মেঘলা",
    
    // Days
    today: "আজ",
    tomorrow: "কাল",
    monday: "সোমবার",
    tuesday: "মঙ্গলবার",
    wednesday: "বুধবার",
    thursday: "বৃহস্পতিবার",
    friday: "শুক্রবার",
    saturday: "শনিবার",
    sunday: "রবিবার",
    
    // Priorities
    high: "উচ্চ",
    medium: "মধ্যম",
    low: "কম",
    
    // Common
    loading: "লোড হচ্ছে...",
    error: "ত্রুটি",
    retry: "আবার চেষ্টা করুন",
    cancel: "বাতিল",
    save: "সেভ করুন",
    edit: "সম্পাদনা",
    delete: "মুছুন",
    view: "দেখুন",
    
    // Farming tips
    irrigationRecommendation: "সেচ সুপারিশ",
    pestAlert: "কীটপতঙ্গ সতর্কতা",
    plantingWindow: "রোপণ উইন্ডো",
    reduced: "হ্রাস"
  },
  te: {
    // Navigation
    home: "హోమ్",
    diseaseDetection: "వ్యాధి గుర్తింపు",
    weather: "వాతావరణం",
    aiAssistant: "AI సహాయకుడు",
    dashboard: "డాష్‌బోర్డ్",
    
    // Home Page
    homeTitle: "EcoVision తో AI-శక్తితో పనిచేసే స్మార్ట్ వ్యవసాయం",
    homeSubtitle: "అత్యాధునిక AI సాంకేతికతతో మీ వ్యవసాయంలో విప్లవం తీసుకురండి. వ్యాధులను గుర్తించండి, వాతావరణ అంతర్దృష్టులను పొందండి మరియు వ్యక్తిగతీకరించిన వ్యవసాయ సిఫార్సులను పొందండి।",
    getStarted: "ప్రారంభించండి",
    learnMore: "మరింత తెలుసుకోండి",
    smartDiagnosis: "స్మార్ట్ రోగనిర్ణయం",
    smartDiagnosisDesc: "95+ ఖచ్చితత్వంతో తక్షణ AI-శక్తితో పనిచేసే వ్యాధి మరియు కీట గుర్తింపు కోసం పంట చిత్రాలను అప్‌లోడ్ చేయండి।",
    weatherInsights: "వాతావరణ అంతర్దృష్టులు",
    weatherInsightsDesc: "మీ స్థానానికి అనుకూలమైన హైపర్-లోకల్ వాతావరణ అంచనాలు మరియు వ్యవసాయ సిఫార్సులను పొందండి।",
    aiChatbot: "AI సహాయకుడు",
    aiChatbotDesc: "మీ మాతృభాషలో ప్రశ్నలు అడగండి। 24/7 వ్యవసాయ నిపుణుడు మీ సేవలో.",
    dataAnalytics: "స్మార్ట్ అనలిటిక్స్",
    dataAnalyticsDesc: "సమగ్ర డాష్‌బోర్డులతో పంట ఆరోగ్యం, దిగుబడి అంచనాలు మరియు వ్యవసాయ పనితీరును ట్రాక్ చేయండి।",
    
    // Disease Detection
    diseaseTitle: "AI వ్యాధి గుర్తింపు",
    diseaseSubtitle: "తక్షణ AI-శక్తితో పనిచేసే వ్యాధి గుర్తింపు మరియు చికిత్స సిఫార్సుల కోసం మీ పంట ఫోటోను అప్‌లోడ్ చేయండి।",
    uploadImage: "చిత్రాన్ని అప్‌లోడ్ చేయండి",
    dragDrop: "ఇక్కడ ఒక చిత్రాన్ని లాగి వదలండి, లేదా ఎంచుకోవడానికి క్లిక్ చేయండి",
    analyzing: "విశ్లేషిస్తోంది...",
    confidence: "విశ్వాసం",
    recommendations: "చికిత్స సిఫార్సులు",
    
    // Weather
    weatherTitle: "వాతావరణం మరియు వ్యవసాయ అంతర్దృష్టులు",
    weatherSubtitle: "మీ వ్యవసాయ అవసరాలకు అనుకూలమైన ఖచ్చితమైన వాతావరణ అంచనాలు మరియు వ్యవసాయ సిఫార్సులను పొందండి।",
    currentLocation: "ప్రస్తుత స్థానాన్ని ఉపయోగించండి",
    getWeather: "వాతావరణాన్ని పొందండి",
    currentWeather: "ప్రస్తుత వాతావరణం",
    forecast5Day: "5-రోజుల అంచనా",
    farmingInsights: "వ్యవసాయ అంతర్దృష్టులు",
    farmingInsightsDesc: "ప్రస్తుత వాతావరణ పరిస్థితుల ఆధారంగా AI-శక్తితో పనిచేసే సిఫార్సులు",
    humidity: "తేమ",
    wind: "గాలి",
    visibility: "దృశ్యమానత",
    uvIndex: "UV సూచిక",
    weatherSummary: "వాతావరణ సారాంశం",
    bestPlantingDay: "ఉత్తమ నాటే రోజు",
    rainExpected: "వర్షం అంచనా",
    irrigationNeeded: "నీటిపారుదల అవసరం",
    pestRisk: "కీట ప్రమాదం",
    
    // Weather conditions
    partlyCloudy: "పాక్షికంగా మేఘావృతం",
    sunny: "ఎండగా",
    rainy: "వర్షం",
    cloudy: "మేఘావృతం",
    
    // Days
    today: "ఈరోజు",
    tomorrow: "రేపు",
    monday: "సోమవారం",
    tuesday: "మంగళవారం",
    wednesday: "బుధవారం",
    thursday: "గురువారం",
    friday: "శుక్రవారం",
    saturday: "శనివారం",
    sunday: "ఆదివారం",
    
    // Priorities
    high: "అధిక",
    medium: "మధ్యమ",
    low: "తక్కువ",
    
    // Common
    loading: "లోడ్ అవుతోంది...",
    error: "లోపం",
    retry: "మళ్లీ ప్రయత్నించండి",
    cancel: "రద్దు చేయండి",
    save: "సేవ్ చేయండి",
    edit: "సవరించండి",
    delete: "తొలగించండి",
    view: "చూడండి",
    
    // Farming tips
    irrigationRecommendation: "నీటిపారుదల సిఫార్సు",
    pestAlert: "కీట హెచ్చరిక",
    plantingWindow: "నాటే కిటికీ",
    reduced: "తగ్గించబడింది"
  }
};

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  languages: Array<{ code: string; name: string }>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "hi", name: "हिंदी" },
    { code: "bn", name: "বাংলা" },
    { code: "te", name: "తెలుగు" },
  ];

  const t = (key: string): string => {
    return translations[language]?.[key] || translations["en"]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
};