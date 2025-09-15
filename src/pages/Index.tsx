import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UploadArea } from '@/components/UploadArea';
import { ChatInterface } from '@/components/ChatInterface';
import { Dashboard } from '@/components/Dashboard';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageSelector } from '@/components/LanguageSelector';
import { VoiceControl } from '@/components/VoiceControl';
import { HistoryCard } from '@/components/HistoryCard';
import { useLanguage } from '@/hooks/useLanguage';
import { useHistory } from '@/hooks/useHistory';
import heroImage from '@/assets/hero-farming.jpg';
import { 
  Sprout, 
  MessageSquare, 
  BarChart3, 
  Leaf, 
  Shield, 
  Users,
  Zap,
  Globe
} from 'lucide-react';

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [detailedResult, setDetailedResult] = useState<any>(null);
  const { translate } = useLanguage();
  const { addToHistory, history } = useHistory();

  const handleImageUpload = async (file: File) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setDetailedResult(null);

    // Simulate AI analysis (replace with actual AI service integration)
    setTimeout(() => {
      const mockResults = [
        {
          diagnosis: "Early Blight detected with 89% confidence. Recommend organic copper fungicide spray every 7-10 days. Ensure good air circulation and avoid overhead watering.",
          cropName: "Tomato",
          issue: "Early Blight",
          confidence: 89,
          treatment: "Organic copper fungicide spray every 7-10 days",
          pesticides: ["Copper sulfate", "Bordeaux mixture", "Neem oil", "Bacillus subtilis"]
        },
        {
          diagnosis: "Healthy crop detected with 95% confidence. Continue current care routine. Consider preventive neem oil application during humid weather.",
          cropName: "Healthy Plant",
          issue: "Healthy",
          confidence: 95,
          treatment: "Continue current care routine",
          pesticides: ["Preventive neem oil (optional)"]
        },
        {
          diagnosis: "Aphid infestation detected with 82% confidence. Use insecticidal soap or introduce ladybugs as biological control. Spray with neem oil solution.",
          cropName: "Various Crops",
          issue: "Aphid Infestation",
          confidence: 82,
          treatment: "Insecticidal soap or biological control",
          pesticides: ["Insecticidal soap", "Neem oil", "Pyrethrin", "Ladybugs (biological)"]
        },
        {
          diagnosis: "Nitrogen deficiency detected with 91% confidence. Apply organic nitrogen fertilizer (fish emulsion or compost). Yellowing should improve within 1-2 weeks.",
          cropName: "General Crop",
          issue: "Nitrogen Deficiency",
          confidence: 91,
          treatment: "Organic nitrogen fertilizer application",
          pesticides: ["Fish emulsion", "Compost", "Blood meal", "Urea (synthetic option)"]
        }
      ];
      
      const result = mockResults[Math.floor(Math.random() * mockResults.length)];
      setAnalysisResult(result.diagnosis);
      setDetailedResult(result);
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleSaveToHistory = () => {
    if (detailedResult) {
      addToHistory({
        cropName: detailedResult.cropName,
        issue: detailedResult.issue,
        confidence: detailedResult.confidence,
        diagnosis: detailedResult.diagnosis,
        treatment: detailedResult.treatment,
        pesticides: detailedResult.pesticides
      });
      
      // Show success toast
      import('@/hooks/use-toast').then(({ toast }) => {
        toast({
          title: "Saved to History",
          description: "Analysis result has been saved to your history.",
        });
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center">
                <Sprout className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">{translate('smart_farming')}</h1>
                <p className="text-sm text-muted-foreground">AI-Powered Crop Care</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <VoiceControl onResult={(transcript) => {
                // Handle voice input in chat interface
                console.log('Voice input:', transcript);
              }} />
              <LanguageSelector />
              <ThemeToggle />
              <Button variant="hero" className="hidden md:flex">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60"></div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Revolutionize Your Farming with AI
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Detect crop diseases instantly, get eco-friendly solutions, and optimize your harvest 
              with our intelligent farming assistant powered by cutting-edge AI technology.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <Card className="bg-card/90 backdrop-blur border-0 shadow-medium">
                <CardContent className="p-6 text-center">
                  <Shield className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">Disease Detection</h3>
                  <p className="text-sm text-muted-foreground">
                    AI-powered analysis identifies diseases and pests with 90%+ accuracy
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/90 backdrop-blur border-0 shadow-medium">
                <CardContent className="p-6 text-center">
                  <Leaf className="h-12 w-12 mx-auto mb-4 text-success" />
                  <h3 className="font-semibold mb-2">Eco-Friendly Solutions</h3>
                  <p className="text-sm text-muted-foreground">
                    Organic treatments and sustainable farming practices
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/90 backdrop-blur border-0 shadow-medium">
                <CardContent className="p-6 text-center">
                  <Globe className="h-12 w-12 mx-auto mb-4 text-accent" />
                  <h3 className="font-semibold mb-2">Multilingual Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Available in multiple languages for farmers worldwide
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="scan" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8">
            <TabsTrigger value="scan" className="gap-2">
              <Zap className="h-4 w-4" />
              Quick Scan
            </TabsTrigger>
            <TabsTrigger value="chat" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              {translate('ai_chat')}
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              {translate('dashboard')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scan" className="space-y-6">
            <div className="text-center space-y-2 mb-6">
              <h3 className="text-2xl font-bold">{translate('disease_detection')}</h3>
              <p className="text-muted-foreground">
                {translate('upload_photo')}
              </p>
            </div>
            
            <UploadArea 
              onImageUpload={handleImageUpload} 
              isAnalyzing={isAnalyzing}
            />
            
            {analysisResult && (
              <Card className="max-w-2xl mx-auto shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Shield className="h-5 w-5" />
                    {translate('analysis_results')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                    <p className="text-sm leading-relaxed">{analysisResult}</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button 
                      variant="success" 
                      size="sm"
                      onClick={handleSaveToHistory}
                    >
                      {translate('save_history')}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        if (detailedResult?.pesticides) {
                          const pesticideText = `Recommended pesticides/treatments for ${detailedResult.issue}: ${detailedResult.pesticides.join(', ')}. Apply as per manufacturer instructions and local regulations.`;
                          setAnalysisResult(analysisResult + '\n\n' + pesticideText);
                        }
                      }}
                    >
                      {translate('get_details')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <div className="text-center space-y-2 mb-6">
              <h3 className="text-2xl font-bold">AI Farming Assistant</h3>
              <p className="text-muted-foreground">
                Ask questions about crops, weather, fertilizers, and farming practices
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <ChatInterface />
            </div>
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="text-center space-y-2 mb-6">
              <h3 className="text-2xl font-bold">Farm Dashboard</h3>
              <p className="text-muted-foreground">
                Track your crop health, monitor treatments, and analyze farming trends
              </p>
            </div>
            
            <Dashboard />
            
            {/* History Section */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Analysis History</CardTitle>
              </CardHeader>
              <CardContent>
                {history.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No saved analysis yet. Upload and analyze crops to build your history.
                  </p>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {history.slice(0, 10).map((result) => (
                      <HistoryCard key={result.id} result={result} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sprout className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">Smart Farming</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Empowering farmers worldwide with AI-driven crop care solutions for sustainable agriculture.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Features</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Disease Detection</li>
                <li>Eco-friendly Solutions</li>
                <li>Weather Integration</li>
                <li>Multilingual Support</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Impact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Sustainable Farming</li>
                <li>Reduced Chemical Use</li>
                <li>Increased Yield</li>
                <li>Cost Savings</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 EcoVision. Promoting sustainable agriculture worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;