import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload, 
  Scan, 
  Camera, 
  AlertTriangle, 
  CheckCircle, 
  Leaf,
  Bug,
  Droplets,
  Sun,
  Clock
} from "lucide-react";

const DiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (JPG, PNG, etc.)",
        variant: "destructive",
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    if (files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResults = [
        {
          condition: "Early Blight",
          confidence: 92,
          severity: "Moderate",
          description: "Fungal infection affecting tomato leaves",
          treatment: "Apply copper-based fungicide. Remove affected leaves. Improve air circulation.",
          organic_alternatives: ["Neem oil spray", "Baking soda solution", "Copper sulfate"]
        },
        {
          condition: "Healthy Plant",
          confidence: 96,
          severity: "None",
          description: "Plant appears healthy with no visible diseases",
          treatment: "Continue current care routine. Monitor regularly.",
          organic_alternatives: ["Maintain good watering", "Regular pruning", "Nutrient balance"]
        },
        {
          condition: "Aphid Infestation",
          confidence: 88,
          severity: "Mild",
          description: "Small insects feeding on plant sap",
          treatment: "Use insecticidal soap or introduce beneficial insects.",
          organic_alternatives: ["Ladybug release", "Insecticidal soap", "Companion planting"]
        }
      ];
      
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setAnalysisResult(randomResult);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: `Detected: ${randomResult.condition} (${randomResult.confidence}% confidence)`,
      });
    }, 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
      case 'severe':
        return 'destructive';
      case 'moderate':
      case 'mild':
        return 'default';
      case 'none':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
      case 'severe':
        return AlertTriangle;
      case 'moderate':
      case 'mild':
        return Bug;
      case 'none':
        return CheckCircle;
      default:
        return Leaf;
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            AI Disease Detection
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload a photo of your crop to get instant AI-powered disease and pest identification with treatment recommendations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-accent" />
                Upload Crop Image
              </CardTitle>
              <CardDescription>
                Take a clear photo of affected leaves or crop parts for best results
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Image Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? 'border-accent bg-accent/10'
                    : 'border-border hover:border-accent/50'
                }`}
                onDragEnter={() => setDragActive(true)}
                onDragLeave={() => setDragActive(false)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                {selectedImage ? (
                  <div className="space-y-4">
                    <img
                      src={selectedImage}
                      alt="Selected crop"
                      className="max-w-full h-64 object-contain mx-auto rounded-lg"
                    />
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Change Image
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-16 w-16 text-muted-foreground mx-auto" />
                    <div>
                      <p className="text-lg font-medium text-foreground">
                        Drop your image here
                      </p>
                      <p className="text-muted-foreground">
                        or click to browse files
                      </p>
                    </div>
                    <Button
                      variant="farm"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Select Image
                    </Button>
                  </div>
                )}
              </div>

              <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Analyze Button */}
              {selectedImage && (
                <Button
                  variant="hero"
                  size="lg"
                  className="w-full"
                  onClick={simulateAnalysis}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Clock className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Scan className="mr-2 h-4 w-4" />
                      Analyze Crop
                    </>
                  )}
                </Button>
              )}

              {/* Analysis Progress */}
              {isAnalyzing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>AI Analysis in Progress</span>
                    <span>Processing...</span>
                  </div>
                  <Progress value={33} className="animate-pulse" />
                  <p className="text-sm text-muted-foreground text-center">
                    Our AI is examining your crop image for diseases and pests...
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-accent" />
                Analysis Results
              </CardTitle>
              <CardDescription>
                {analysisResult ? "AI detection results and recommendations" : "Upload an image to see analysis results"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {analysisResult ? (
                <div className="space-y-6">
                  {/* Detection Results */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-semibold text-foreground">
                        {analysisResult.condition}
                      </h3>
                      <Badge 
                        variant={getSeverityColor(analysisResult.severity)}
                        className="text-sm"
                      >
                        {analysisResult.confidence}% confidence
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      {(() => {
                        const SeverityIcon = getSeverityIcon(analysisResult.severity);
                        return <SeverityIcon className="h-5 w-5 text-accent" />;
                      })()}
                      <span className="font-medium">Severity: {analysisResult.severity}</span>
                    </div>

                    <p className="text-muted-foreground">
                      {analysisResult.description}
                    </p>
                  </div>

                  {/* Treatment Recommendations */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <Droplets className="h-5 w-5 text-accent" />
                      Treatment Recommendations
                    </h4>
                    <div className="bg-accent/5 p-4 rounded-lg border border-accent/20">
                      <p className="text-foreground">{analysisResult.treatment}</p>
                    </div>
                  </div>

                  {/* Organic Alternatives */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <Sun className="h-5 w-5 text-accent" />
                      Eco-Friendly Alternatives
                    </h4>
                    <div className="space-y-2">
                      {analysisResult.organic_alternatives.map((alternative: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-accent" />
                          <span className="text-foreground">{alternative}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Scan className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg text-muted-foreground">
                    Upload a crop image to get started with AI analysis
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tips Section */}
        <Card className="mt-8 bg-gradient-card shadow-soft">
          <CardHeader>
            <CardTitle>Photography Tips for Better Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <Camera className="h-8 w-8 text-accent mx-auto mb-2" />
                <h4 className="font-medium">Clear Focus</h4>
                <p className="text-sm text-muted-foreground">Ensure affected areas are in sharp focus</p>
              </div>
              <div className="text-center">
                <Sun className="h-8 w-8 text-accent mx-auto mb-2" />
                <h4 className="font-medium">Good Lighting</h4>
                <p className="text-sm text-muted-foreground">Use natural light for true colors</p>
              </div>
              <div className="text-center">
                <Leaf className="h-8 w-8 text-accent mx-auto mb-2" />
                <h4 className="font-medium">Close-up Shots</h4>
                <p className="text-sm text-muted-foreground">Capture symptoms clearly and closely</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DiseaseDetection;