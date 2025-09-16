import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Send,
  MessageSquare,
  Bot as BotIcon,
  User as UserIcon,
  Lightbulb,
  Leaf,
  Bug,
  Droplets,
  Sun,
  Truck,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

/**
 * Web Speech API TS shims
 */
declare global {
  interface Window {
    SpeechRecognition?: typeof SpeechRecognition;
    webkitSpeechRecognition?: typeof SpeechRecognition;
    speechSynthesis: SpeechSynthesis;
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: Event) => void;
  onend: () => void;
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
  length: number;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

declare var SpeechRecognition: {
  prototype: SpeechRecognition;
  new (): SpeechRecognition;
};

/**
 * Message + KB types
 */
interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  language: string;
  suggestions?: string[];
}

interface FarmingKnowledge {
  [key: string]: {
    [lang: string]: string;
  };
}

const farmingKnowledgeBase: FarmingKnowledge = {
  "crop diseases": {
    en: "Common crop diseases include blight, rust, smut, and wilt. Early detection is crucial. Look for yellowing leaves, spots, stunted growth, or unusual discoloration. Use resistant varieties, practice crop rotation, ensure proper drainage, and apply organic fungicides like neem oil when needed.",
    hi: "मुख्य फसल रोगों में झुलसा, किट्ट, कांगियारी और मुरझाना शामिल हैं। जल्दी पहचान महत्वपूर्ण है। पीले पत्ते, धब्बे, बौनी वृद्धि या असामान्य रंग देखें। प्रतिरोधी किस्मों का उपयोग करें, फसल चक्र अपनाएं, उचित जल निकासी सुनिश्चित करें।",
    ta: "பொதுவான பயிர் நோய்களில் கருகல், துரு, பூஞ்சை மற்றும் வாடல் அடங்கும். ஆரம்பகால கண்டறிதல் முக்கியம். மஞ்சள் இலைகள், புள்ளிகள், வளர்ச்சி குறைவு அல்லது அசாதாரண நிறமாற்றத்தை பார்க்கவும்.",
    te: "సాధారణ పంట వ్యాధుల్లో ముడత, తుప్పు, మచ్చ మరియు వాడిపోవడం ఉన్నాయి. ముందుగా గుర్తించడం కీలకం. పసుపు ఆకులు, మచ్చలు, పెరుగుదల తగ్గడం లేదా అసాధారణ రంగు మార్పులు చూడండి.",
    mr: "सामान्य पीक रोगांमध्ये करपा, गंज, काजळी आणि वाळणे येतात. लवकर ओळख महत्त्वाची. पिवळी पाने, डाग, वाढ खुंटणे किंवा असामान्य रंग बदल पाहा.",
    gu: "સામાન્ય પાક રોગોમાં ઝૂલસો, કાટ, કાળો અને સુકાઈ જવાનો સમાવેશ થાય છે. વહેલી ઓળખ મહત્વપૂર્ણ છે.",
    kn: "ಸಾಮಾನ್ಯ ಬೆಳೆ ರೋಗಗಳಲ್ಲಿ ಬ್ಲೈಟ್, ತುಕ್ಕು, ಕಲೆ ಮತ್ತು ಬಾಡುವಿಕೆ ಸೇರಿವೆ. ಆರಂಭಿಕ ಪತ್ತೆ ಮುಖ್ಯ." 
  },
  "fertilizer use": {
    en: "Use fertilizers based on soil testing results. NPK ratio varies by crop and stage. For vegetables use 10-10-10 during growth, reduce nitrogen at flowering. Apply compost regularly. Avoid over-fertilization.",
    hi: "मिट्टी जांच के आधार पर उर्वरक दें. एनपीके अनुपात फसल और अवस्था पर निर्भर है.",
    ta: "மண் பரிசோதனை அடிப்படையில் உரம் பயன்படுத்து.",
    te: "మట్టి పరీక్ష ఆధారంగా ఎరువులు వాడండి.",
    mr: "माती परीक्षणावर खत द्या.",
    gu: "માટી પરીક્ષણ મુજબ ખાતર આપો.",
    kn: "ಮಣ್ಣಿನ ಪರೀಕ್ಷೆ ಆಧರಿಸಿ ಗೊಬ್ಬರ ಬಳಸಿ." 
  },
  "irrigation methods": {
    en: "Drip saves water, sprinklers give uniform coverage, furrow suits rows. Water mornings or evenings. Monitor soil moisture. Avoid overwatering.",
    hi: "ड्रिप पानी बचाता है, स्प्रिंकलर समान कवरेज देता है. सुबह/शाम पानी दें.",
    ta: "டிரிப் நீர் சேமிக்கும். காலை/மாலை நீர்ப்பாசனம் செய்க.",
    te: "డ్రిప్ నీళ్లు ఆదా. ఉదయం/సాయంత్రం నీరు ఇవ్వండి.",
    mr: "ठिबक पाणी बचवते. सकाळ/संध्याकाळ पाणी द्या.",
    gu: "ડ્રિપ પાણી બચાવે. સવાર/સાંજ પાણી આપો.",
    kn: "ಡ್ರಿಪ್ ನೀರು ಉಳಿಸುತ್ತದೆ. ಬೆಳಗ್ಗೆ/ಸಂಜೆ ನೀರು ನೀಡಿ." 
  },
  "pest control": {
    en: "IPM: beneficial insects, crop rotation, physical barriers. Neem oil and soap sprays help. Monitor and act on thresholds.",
    hi: "आईपीएम: लाभकारी कीट, फसल चक्र, भौतिक अवरोध. नीम तेल/साबुन स्प्रे उपयोगी.",
    ta: "ஐபிஎம்: நன்மை பூச்சிகள், பயிர் சுழற்சி, உடல் தடைகள்.",
    te: "ఐపిఎమ్: ప్రయోజనకర కీటకాలు, పంట భ్రమణం.",
    mr: "आयपीएम: उपयुक्त कीटक, फिरवणी, अडथळे.",
    gu: "IPM: લાભકારી જીવાતો, પાક પરિભ્રમણ.",
    kn: "IPM: ಪ್ರಯೋಜನಕಾರಿ ಕೀಟಗಳು, ಬೆಳೆ ಸರದಿ." 
  },
  "soil health": {
    en: "Maintain pH, organic matter, drainage, microbes. Test yearly. Add compost. Rotate crops.",
    hi: "pH, जैविक पदार्थ, निकासी बनाए रखें. सालाना परीक्षण करें.",
    ta: "pH, கரிமப் பொருள், வடிகால் பராமரி.",
    te: "pH, సేంద్రియ పదార్థం, డ్రైనేజ్ నిలుపుకోండి.",
    mr: "pH, सेंद्रिय द्रव्य, निचरा सांभाळा.",
    gu: "pH, કાર્બનિક પદાર્થ, ડ્રેનેજ જાળવો.",
    kn: "pH, ಸಾವಯವ ಪದಾರ್ಥ, ಒಳಚರಂಡಿ ಕಾಪಾಡಿ." 
  },
  "crop rotation": {
    en: "Rotate legumes, heavy feeders, light feeders. 3–4 year cycles. Avoid same-family repeats.",
    hi: "दलहन, भारी/हल्के फीडर घुमाएँ. 3–4 वर्ष चक्र.",
    ta: "பருப்பு, கன/இலகு உணவுகள் மாற்றவும்.",
    te: "పప్పులు, హెವಿ/లైట్ ఫీడర్స్ రొటేట్ చేయండి.",
    mr: "डाळी, भारी/हलके फीडर फिरवा.",
    gu: "કઠોળ, ભારે/હલકા ફીડર ફેરવો.",
    kn: "ದ್ವಿದಳ, ಭಾರಿ/ಲಘು ಫೀಡರ್ ತಿರುಗಿಸಿ." 
  },
};

const languages: Record<string, string> = {
  en: "English",
  hi: "हिंदी",
  ta: "தமிழ்",
  te: "తెలుగు",
  mr: "मराठी",
  gu: "ગુજરાતી",
  kn: "ಕನ್ನಡ",
};

const getLanguageCode = (lang: string): string => {
  const codes: Record<string, string> = {
    en: "en-US",
    hi: "hi-IN",
    ta: "ta-IN",
    te: "te-IN",
    mr: "mr-IN",
    gu: "gu-IN",
    kn: "kn-IN",
  };
  return codes[lang] || "en-US";
};

const welcomeByLang: Record<string, string> = {
  en: "Welcome to the Farming Assistant. Ask about diseases, fertilizers, irrigation, pests, soil, and rotation.",
  hi: "कृषि सहायक में आपका स्वागत है. फसल रोग, उर्वरक, सिंचाई, कीट, मिट्टी, और फसल चक्र पूछें.",
  ta: "விவசாய உதவியாளர்へ வரவேற்பு. நோய்கள், உரம், நீர்ப்பாசனம், பூச்சி, மண், சுழற்சி கேளுங்கள்.",
  te: "వ్యవసాయ సహాయకుడికి స్వాగతం. వ్యాధులు, ఎరువులు, నీటిపారుదల, కీటకాలు, మట్టి, రొటేషన్ అడగండి.",
  mr: "शेती सहाय्यकात स्वागत. रोग, खते, सिंचन, किड, माती, फिरवणी विचारा.",
  gu: "ખેતી સહાયકમાં સ્વાગત. રોગ, ખાતર, સિંચાઈ, જીવાત, માટી, પરિભ્રમણ પૂછો.",
  kn: "ಕೃಷಿ ಸಹಾಯಕರಿಗೆ ಸ್ವಾಗತ. ರೋಗ, ಗೊಬ್ಬರ, ನೀರಾವರಿ, ಕೀಟ, ಮಣ್ಣು, ಸರದಿ ಕೇಳಿ.",
};

const quickQuestions = [
  { icon: Bug, text: "Pest identification help", category: "pest" },
  { icon: Leaf, text: "Disease diagnosis", category: "disease" },
  { icon: Droplets, text: "Irrigation advice", category: "water" },
  { icon: Sun, text: "Seasonal planting guide", category: "planting" },
  { icon: Truck, text: "Harvest timing", category: "harvest" },
];

const findBestMatch = (query: string): string | null => {
  const q = query.toLowerCase();
  if (q.includes("tomato") && q.includes("yellow")) return "crop diseases";
  if (q.includes("pest")) return "pest control";
  if (q.includes("irrigation") || q.includes("water")) return "irrigation methods";
  if (q.includes("fertilizer") || q.includes("npk")) return "fertilizer use";
  if (q.includes("soil") || q.includes("ph")) return "soil health";
  if (q.includes("rotation")) return "crop rotation";
  return null;
};

const generateResponse = (query: string, lang: string): string => {
  const topic = findBestMatch(query);
  if (topic && farmingKnowledgeBase[topic]) {
    return farmingKnowledgeBase[topic][lang] || farmingKnowledgeBase[topic].en;
  }
  const fallback: Record<string, string> = {
    en: "I can help with diseases, fertilizers, irrigation, pests, soil, and rotation. Be specific for better advice.",
    hi: "मैं रोग, उर्वरक, सिंचाई, कीट, मिट्टी, और चक्र में मदद कर सकता हूँ. कृपया अधिक विशिष्ट बताएं.",
    ta: "நோய், உரம், நீர்ப்பாசனம், பூச்சி, மண், சுழற்சி உதவி செய்யலாம். மேலும் குறிப்பிட்டு கேளுங்கள்.",
    te: "వ్యాధులు, ఎరువులు, నీటిపారుదల, కీటకాలు, మట్టి, రొటేషన్ పై సహాయం చేయగలను. మరింత వివరంగా అడగండి.",
    mr: "रोग, खते, सिंचन, किड, माती, फिरवणीवर मदत करू शकतो. कृपया अधिक विशिष्ट सांगा.",
    gu: "રોગ, ખાતર, સિંચાઈ, જીવાત, માટી, પરિભ્રમણમાં મદદ કરી શકું. વધુ ખાસ કહો.",
    kn: "ರೋಗ, ಗೊಬ್ಬರ, ನೀರಾವರಿ, ಕೀಟ, ಮಣ್ಣು, ಸರದಿಯಲ್ಲಿ ನೆರವಾಗುತ್ತೇನೆ. ಹೆಚ್ಚಿನ ವಿವರ ಕೊಡಿ.",
  };
  return fallback[lang] || fallback.en;
};

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // init speech recognition instance when language changes
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const Ctor: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const rec: SpeechRecognition = new Ctor();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = getLanguageCode(currentLanguage);
      rec.onresult = (e: SpeechRecognitionEvent) => {
        const t = e.results[0][0].transcript;
        setInputMessage(t);
        setIsListening(false);
      };
      rec.onerror = () => {
        setIsListening(false);
        toast?.({ title: "Voice recognition failed", description: "Try again or type.", variant: "destructive" });
      };
      rec.onend = () => setIsListening(false);
      setRecognition(rec);
    } else {
      setRecognition(null);
    }

    // welcome message on language switch
    setMessages([
      {
        id: "welcome-" + currentLanguage,
        content: welcomeByLang[currentLanguage] || welcomeByLang.en,
        sender: "bot",
        timestamp: new Date(),
        language: currentLanguage,
        suggestions: [
          "My tomato leaves are yellow",
          "Organic fertilizer recommendations",
          "How to set up drip irrigation?",
          "Soil pH is low. What to do?",
        ],
      },
    ]);
  }, [currentLanguage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      setIsSpeaking(true);
      const u = new SpeechSynthesisUtterance(text);
      u.lang = getLanguageCode(currentLanguage);
      u.rate = 0.9;
      u.onend = () => setIsSpeaking(false);
      u.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    }
  };

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      recognition.lang = getLanguageCode(currentLanguage);
      recognition.start();
    } else {
      toast?.({ title: "Voice not supported", description: "Type your message.", variant: "destructive" });
    }
  };

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const user: Message = {
      id: Date.now().toString() + "-u",
      content: trimmed,
      sender: "user",
      timestamp: new Date(),
      language: currentLanguage,
    };

    setMessages((p) => [...p, user]);
    setInputMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const resp = generateResponse(trimmed, currentLanguage);
      const bot: Message = {
        id: Date.now().toString() + "-b",
        content: resp,
        sender: "bot",
        timestamp: new Date(),
        language: currentLanguage,
        suggestions: [
          "Tell me more",
          "Other crops?",
          "Any preventive steps?",
          "Organic alternatives?",
        ],
      };
      setMessages((p) => [...p, bot]);
      setIsTyping(false);
      setTimeout(() => speakText(resp), 300);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputMessage);
  };

  const handleSuggestionClick = (s: string) => sendMessage(s);

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-farm-sky to-background">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">🌾 AI Farm Assistant</h1>
            <p className="text-sm text-muted-foreground">Ask in your language. Use voice or text.</p>
          </div>
          <select
            value={currentLanguage}
            onChange={(e) => setCurrentLanguage(e.target.value)}
            className="bg-card border px-3 py-2 rounded-md text-sm"
          >
            {Object.entries(languages).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Quick Questions */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-card shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lightbulb className="h-5 w-5 text-accent" /> Quick Questions
                </CardTitle>
                <CardDescription>Common farming topics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickQuestions.map((q, i) => {
                  const Icon = q.icon;
                  return (
                    <Button
                      key={i}
                      variant="ghost"
                      className="w-full justify-start text-left h-auto p-3"
                      onClick={() => handleSuggestionClick(q.text)}
                    >
                      <Icon className="h-4 w-4 mr-2 text-accent flex-shrink-0" />
                      <span className="text-sm">{q.text}</span>
                    </Button>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Chat */}
          <div className="lg:col-span-3">
            <Card className="h-[640px] flex flex-col bg-gradient-card shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-accent" /> Chat with AI Assistant
                </CardTitle>
                <CardDescription>Voice input, TTS, and multilingual replies</CardDescription>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea className="flex-1 px-6">
                  <div className="space-y-4 pb-4">
                    {messages.map((m) => (
                      <div key={m.id} className={`flex gap-3 ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                        {m.sender === "bot" && (
                          <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                            <BotIcon className="h-4 w-4 text-accent" />
                          </div>
                        )}

                        <div
                          className={`max-w-[80%] rounded-lg p-4 ${m.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                        >
                          <p className="text-sm leading-relaxed">{m.content}</p>
                          {m.suggestions && m.sender === "bot" && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {m.suggestions.map((s, i) => (
                                <Badge
                                  key={i}
                                  variant="secondary"
                                  className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors text-xs"
                                  onClick={() => handleSuggestionClick(s)}
                                >
                                  {s}
                                </Badge>
                              ))}
                            </div>
                          )}
                          {m.sender === "bot" && (
                            <div className="mt-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => speakText(m.content)}
                                disabled={isSpeaking}
                                className="h-8 w-8 p-0"
                                aria-label="Play response"
                              >
                                <Volume2 className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </div>

                        {m.sender === "user" && (
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <UserIcon className="h-4 w-4 text-primary" />
                          </div>
                        )}
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex gap-3 justify-start">
                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                          <BotIcon className="h-4 w-4 text-accent" />
                        </div>
                        <div className="bg-muted rounded-lg p-4">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-accent rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                            <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="border-t p-4">
                  <form onSubmit={handleSubmit} className="flex gap-2 items-end">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder={
                        currentLanguage === "en"
                          ? "Ask anything about farming..."
                          : currentLanguage === "hi"
                          ? "खेती के बारे में पूछें..."
                          : currentLanguage === "ta"
                          ? "விவசாயம் பற்றி கேளுங்கள்..."
                          : currentLanguage === "te"
                          ? "వ్యవసాయం గురించి అడగండి..."
                          : currentLanguage === "mr"
                          ? "शेतीबद्दल विचारा..."
                          : currentLanguage === "gu"
                          ? "ખેતી વિશે પૂછો..."
                          : "ಕೃಷಿಯ ಬಗ್ಗೆ ಕೇಳಿ..."
                      }
                      className="flex-1"
                      disabled={isTyping || isListening}
                    />

                    <Button
                      type="button"
                      onClick={isListening ? () => setIsListening(false) : startListening}
                      variant={isListening ? "destructive" : "secondary"}
                      className="h-10 w-10 p-0"
                      disabled={isSpeaking}
                      aria-label={isListening ? "Stop listening" : "Start listening"}
                    >
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </Button>

                    {isSpeaking && (
                      <Button type="button" onClick={stopSpeaking} variant="outline" className="h-10 w-10 p-0" aria-label="Stop speaking">
                        <VolumeX className="w-4 h-4" />
                      </Button>
                    )}

                    <Button type="submit" variant="farm" disabled={!inputMessage.trim() || isTyping || isListening} aria-label="Send">
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>

                  {isListening && (
                    <div className="mt-2 text-center">
                      <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-3 py-2 rounded-md text-sm">
                        <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
                        {currentLanguage === "en"
                          ? "Listening..."
                          : currentLanguage === "hi"
                          ? "सुन रहा हूँ..."
                          : currentLanguage === "ta"
                          ? "கேட்டுக் கொண்டிருக்கிறேன்..."
                          : currentLanguage === "te"
                          ? "వింటున్నాను..."
                          : currentLanguage === "mr"
                          ? "ऐकत आहे..."
                          : currentLanguage === "gu"
                          ? "સાંભળી રહ્યાં છીએ..."
                          : "ಕೇಳುತ್ತಿದ್ದೇನೆ..."}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
