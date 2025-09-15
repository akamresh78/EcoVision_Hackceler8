import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Scan, 
  CloudRain, 
  MessageSquare, 
  BarChart3, 
  Leaf, 
  ShieldCheck,
  Users,
  TrendingUp,
  ArrowRight
} from "lucide-react";
import heroImage from "@/assets/farming-hero.jpg";

const Home = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: Scan,
      title: "Disease Detection",
      description: "Upload crop photos for instant AI-powered disease and pest identification with 92% accuracy.",
      link: "/disease-detection",
      color: "text-accent"
    },
    {
      icon: CloudRain,
      title: "Weather Insights",
      description: "Get precise weather forecasts and agricultural recommendations tailored to your location.",
      link: "/weather",
      color: "text-blue-500"
    },
    {
      icon: MessageSquare,
      title: "AI Farm Assistant",
      description: "Chat with our intelligent assistant for farming advice, tips, and problem-solving support.",
      link: "/chatbot",
      color: "text-green-500"
    },
    {
      icon: BarChart3,
      title: "Farm Dashboard",
      description: "Track your crop health history, yields, and get personalized farming insights and reports.",
      link: "/dashboard",
      color: "text-primary"
    }
  ];

  const benefits = [
    {
      icon: ShieldCheck,
      title: "Eco-Friendly Solutions",
      description: "Reduce pesticide use with organic and sustainable farming recommendations"
    },
    {
      icon: Users,
      title: "Multilingual Support",
      description: "Available in multiple regional languages for better accessibility"
    },
    {
      icon: TrendingUp,
      title: "Increased Yield",
      description: "Early disease detection helps save crops and maximize your harvest"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-80" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center mb-6">
            <Leaf className="h-16 w-16 text-white mr-4" />
            <h1 className="text-5xl md:text-7xl font-bold text-white">
              EcoVision
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            Revolutionize your farming with AI-powered disease detection, 
            weather insights, and smart recommendations for sustainable agriculture.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/disease-detection">
              <Button variant="hero" size="lg" className="text-lg px-8 py-4">
                Start Disease Detection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/weather">
              <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-lg px-8 py-4">
                Check Weather
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-card">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Smart Farming Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive AI-powered tools to help you make informed decisions and optimize your farming practices.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link key={index} to={feature.link}>
                  <Card className="h-full hover:shadow-medium transition-spring transform hover:scale-105 cursor-pointer group bg-gradient-card border-border/50">
                    <CardHeader className="text-center">
                      <div className="mx-auto mb-4 p-3 rounded-full bg-accent/10 w-fit">
                        <Icon className={`h-8 w-8 ${feature.color} group-hover:scale-110 transition-spring`} />
                      </div>
                      <CardTitle className="text-xl group-hover:text-accent transition-smooth">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center text-muted-foreground leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Choose SmartFarm AI?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of farmers who are already transforming their agricultural practices with our AI-powered platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="mx-auto mb-6 p-4 rounded-full bg-accent/10 w-fit group-hover:bg-accent/20 transition-smooth">
                    <Icon className="h-10 w-10 text-accent group-hover:scale-110 transition-spring" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-primary">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Farm?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Start using SmartFarm AI today and experience the future of sustainable farming.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/disease-detection">
              <Button variant="outline" size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;