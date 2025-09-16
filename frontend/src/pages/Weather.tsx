import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import { 
  CloudRain, 
  Sun, 
  Cloud, 
  Droplets, 
  Wind, 
  Thermometer,
  Eye,
  MapPin,
  Calendar,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Navigation
} from "lucide-react";

const Weather = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lon: number} | null>(null);

  // Get user's current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Geolocation not supported",
        description: "Your browser doesn't support geolocation.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lon: longitude });
        fetchWeatherByCoords(latitude, longitude);
      },
      (error) => {
        setLoading(false);
        toast({
          title: "Location Error",
          description: "Unable to get your location. Please enter it manually.",
          variant: "destructive",
        });
      }
    );
  };

  // Fetch weather by coordinates
  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      
      // For demo purposes, we'll use a mock API call
      // In a real app, you would use: 
      // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock weather data based on location
      const mockWeatherData = {
        current: {
          location: `Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`,
          temperature: Math.round(20 + Math.random() * 15),
          condition: t("partlyCloudy"),
          humidity: Math.round(50 + Math.random() * 40),
          windSpeed: Math.round(5 + Math.random() * 20),
          visibility: Math.round(8 + Math.random() * 7),
          uvIndex: Math.round(3 + Math.random() * 7),
          icon: "partly-cloudy"
        },
        forecast: [
          { day: t("today"), high: 26, low: 18, condition: t("partlyCloudy"), icon: "partly-cloudy", rain: 20 },
          { day: t("tomorrow"), high: 28, low: 20, condition: t("sunny"), icon: "sunny", rain: 0 },
          { day: t("wednesday"), high: 23, low: 16, condition: t("rainy"), icon: "rainy", rain: 80 },
          { day: t("thursday"), high: 25, low: 17, condition: t("cloudy"), icon: "cloudy", rain: 30 },
          { day: t("friday"), high: 27, low: 19, condition: t("sunny"), icon: "sunny", rain: 10 }
        ],
        farmingTips: [
          {
            type: "irrigation",
            title: t("irrigationRecommendation"),
            message: "Rain expected Wednesday. Reduce watering schedule to prevent over-irrigation.",
            priority: "medium",
            icon: Droplets
          },
          {
            type: "pest",
            title: t("pestAlert"),
            message: "High humidity levels may increase aphid activity. Monitor crops closely.",
            priority: "high",
            icon: AlertTriangle
          },
          {
            type: "planting",
            title: t("plantingWindow"),
            message: "Ideal conditions for planting tomatoes this weekend with stable temperatures.",
            priority: "low",
            icon: Sun
          }
        ]
      };
      
      setWeatherData(mockWeatherData);
      setLoading(false);
      
      toast({
        title: "Weather Updated",
        description: "Location-based weather data loaded successfully!",
      });
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error",
        description: "Failed to fetch weather data. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Fetch weather by location name
  const fetchWeatherByLocation = async () => {
    if (!location.trim()) {
      toast({
        title: "Location Required",
        description: "Please enter a location or use current location.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      // For demo purposes, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockWeatherData = {
        current: {
          location: location,
          temperature: Math.round(15 + Math.random() * 20),
          condition: t("partlyCloudy"),
          humidity: Math.round(40 + Math.random() * 50),
          windSpeed: Math.round(3 + Math.random() * 25),
          visibility: Math.round(5 + Math.random() * 10),
          uvIndex: Math.round(2 + Math.random() * 8),
          icon: "partly-cloudy"
        },
        forecast: [
          { day: t("today"), high: 26, low: 18, condition: t("partlyCloudy"), icon: "partly-cloudy", rain: 20 },
          { day: t("tomorrow"), high: 28, low: 20, condition: t("sunny"), icon: "sunny", rain: 0 },
          { day: t("wednesday"), high: 23, low: 16, condition: t("rainy"), icon: "rainy", rain: 80 },
          { day: t("thursday"), high: 25, low: 17, condition: t("cloudy"), icon: "cloudy", rain: 30 },
          { day: t("friday"), high: 27, low: 19, condition: t("sunny"), icon: "sunny", rain: 10 }
        ],
        farmingTips: [
          {
            type: "irrigation",
            title: t("irrigationRecommendation"),
            message: "Rain expected Wednesday. Reduce watering schedule to prevent over-irrigation.",
            priority: "medium",
            icon: Droplets
          },
          {
            type: "pest",
            title: t("pestAlert"),
            message: "High humidity levels may increase aphid activity. Monitor crops closely.",
            priority: "high",
            icon: AlertTriangle
          },
          {
            type: "planting",
            title: t("plantingWindow"),
            message: "Ideal conditions for planting tomatoes this weekend with stable temperatures.",
            priority: "low",
            icon: Sun
          }
        ]
      };
      
      setWeatherData(mockWeatherData);
      setLoading(false);
      
      toast({
        title: "Weather Updated",
        description: `Weather data for ${location} loaded successfully!`,
      });
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error",
        description: "Failed to fetch weather data. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('sunny') || conditionLower.includes(t("sunny").toLowerCase())) {
      return <Sun className="h-8 w-8 text-yellow-500" />;
    } else if (conditionLower.includes('rain') || conditionLower.includes(t("rainy").toLowerCase())) {
      return <CloudRain className="h-8 w-8 text-blue-500" />;
    } else if (conditionLower.includes('cloud') || conditionLower.includes(t("cloudy").toLowerCase())) {
      return <Cloud className="h-8 w-8 text-gray-500" />;
    } else {
      return <Cloud className="h-8 w-8 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    const priorityLower = priority.toLowerCase();
    if (priorityLower.includes('high') || priorityLower.includes(t("high").toLowerCase())) {
      return 'destructive';
    } else if (priorityLower.includes('medium') || priorityLower.includes(t("medium").toLowerCase())) {
      return 'default';
    } else {
      return 'secondary';
    }
  };

  useEffect(() => {
    // Auto-load user's location on component mount
    getCurrentLocation();
  }, []);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {t("weatherTitle")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("weatherSubtitle")}
          </p>
        </div>

        {/* Location Search */}
        <Card className="mb-8 bg-gradient-card shadow-soft">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder={`${t("getWeather")}...`}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="text-lg"
                  onKeyPress={(e) => e.key === 'Enter' && fetchWeatherByLocation()}
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="farm" 
                  onClick={fetchWeatherByLocation}
                  disabled={loading || !location.trim()}
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  {loading ? t("loading") : t("getWeather")}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={getCurrentLocation}
                  disabled={loading}
                >
                  <Navigation className="mr-2 h-4 w-4" />
                  {t("currentLocation")}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {weatherData && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Current Weather */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-gradient-card shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-accent" />
                    {t("currentWeather")}
                  </CardTitle>
                  <CardDescription>{weatherData.current.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      {getWeatherIcon(weatherData.current.icon)}
                      <div>
                        <div className="text-4xl font-bold text-foreground">
                          {weatherData.current.temperature}°C
                        </div>
                        <div className="text-muted-foreground">
                          {weatherData.current.condition}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-accent/5 rounded-lg">
                      <Droplets className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                      <div className="text-sm text-muted-foreground">{t("humidity")}</div>
                      <div className="font-semibold">{weatherData.current.humidity}%</div>
                    </div>
                    <div className="text-center p-4 bg-accent/5 rounded-lg">
                      <Wind className="h-6 w-6 text-gray-500 mx-auto mb-2" />
                      <div className="text-sm text-muted-foreground">{t("wind")}</div>
                      <div className="font-semibold">{weatherData.current.windSpeed} km/h</div>
                    </div>
                    <div className="text-center p-4 bg-accent/5 rounded-lg">
                      <Eye className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                      <div className="text-sm text-muted-foreground">{t("visibility")}</div>
                      <div className="font-semibold">{weatherData.current.visibility} km</div>
                    </div>
                    <div className="text-center p-4 bg-accent/5 rounded-lg">
                      <Sun className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                      <div className="text-sm text-muted-foreground">{t("uvIndex")}</div>
                      <div className="font-semibold">{weatherData.current.uvIndex}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 5-Day Forecast */}
              <Card className="bg-gradient-card shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-accent" />
                    {t("forecast5Day")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weatherData.forecast.map((day: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-accent/5 rounded-lg">
                        <div className="flex items-center gap-4">
                          {getWeatherIcon(day.icon)}
                          <div>
                            <div className="font-medium">{day.day}</div>
                            <div className="text-sm text-muted-foreground">{day.condition}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-red-500" />
                            <span className="font-semibold">{day.high}°</span>
                            <TrendingDown className="h-4 w-4 text-blue-500" />
                            <span className="text-muted-foreground">{day.low}°</span>
                          </div>
                          <div className="text-sm text-blue-500 flex items-center gap-1">
                            <Droplets className="h-3 w-3" />
                            {day.rain}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Farming Recommendations */}
            <div className="space-y-6">
              <Card className="bg-gradient-card shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Thermometer className="h-5 w-5 text-accent" />
                    {t("farmingInsights")}
                  </CardTitle>
                  <CardDescription>
                    {t("farmingInsightsDesc")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {weatherData.farmingTips.map((tip: any, index: number) => {
                    const Icon = tip.icon;
                    return (
                      <div key={index} className="p-4 border border-border rounded-lg space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className="h-5 w-5 text-accent" />
                            <span className="font-medium text-foreground">{tip.title}</span>
                          </div>
                          <Badge variant={getPriorityColor(tip.priority)} className="text-xs">
                            {t(tip.priority)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{tip.message}</p>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="bg-gradient-card shadow-soft">
                <CardHeader>
                  <CardTitle>{t("weatherSummary")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">{t("bestPlantingDay")}</span>
                    <span className="font-medium">{t("friday")}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">{t("rainExpected")}</span>
                    <span className="font-medium">{t("wednesday")}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">{t("irrigationNeeded")}</span>
                    <span className="font-medium">{t("reduced")}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">{t("pestRisk")}</span>
                    <span className="font-medium text-destructive">{t("high")}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;