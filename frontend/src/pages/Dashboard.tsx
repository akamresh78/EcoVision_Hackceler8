import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Leaf, 
  Bug, 
  CheckCircle,
  AlertTriangle,
  Download,
  Eye,
  Activity,
  Target
} from "lucide-react";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("30d");

  // Mock data
  const farmStats = {
    totalScans: 156,
    diseasesDetected: 23,
    healthyScans: 133,
    accuracy: 94,
    trends: {
      scans: "+15%",
      diseases: "-8%",
      health: "+12%"
    }
  };

  const recentDetections = [
    {
      id: 1,
      date: "2024-01-15",
      crop: "Tomato",
      condition: "Early Blight",
      severity: "Moderate",
      confidence: 92,
      status: "treated"
    },
    {
      id: 2,
      date: "2024-01-14",
      crop: "Corn",
      condition: "Healthy",
      severity: "None",
      confidence: 96,
      status: "healthy"
    },
    {
      id: 3,
      date: "2024-01-13",
      crop: "Wheat",
      condition: "Rust Disease",
      severity: "High",
      confidence: 89,
      status: "monitoring"
    },
    {
      id: 4,
      date: "2024-01-12",
      crop: "Potato",
      condition: "Aphid Infestation",
      severity: "Mild",
      confidence: 87,
      status: "treated"
    }
  ];

  const cropHealth = [
    { crop: "Tomatoes", health: 85, total: 45, healthy: 38, diseased: 7 },
    { crop: "Corn", health: 92, total: 32, healthy: 29, diseased: 3 },
    { crop: "Wheat", health: 78, total: 28, healthy: 22, diseased: 6 },
    { crop: "Potatoes", health: 88, total: 51, healthy: 45, diseased: 6 }
  ];

  const weatherImpact = {
    currentConditions: "Favorable",
    riskLevel: "Low",
    recommendations: [
      "Continue regular monitoring",
      "Maintain current irrigation schedule", 
      "Monitor for increased pest activity next week"
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'secondary';
      case 'treated':
        return 'default';
      case 'monitoring':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-4 w-4" />;
      case 'treated':
        return <Target className="h-4 w-4" />;
      case 'monitoring':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'destructive';
      case 'moderate':
        return 'default';
      case 'mild':
        return 'secondary';
      case 'none':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Farm Dashboard
            </h1>
            <p className="text-xl text-muted-foreground">
              Track your crop health, monitor trends, and get insights about your farm.
            </p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <div className="flex rounded-lg border border-border overflow-hidden">
              {["7d", "30d", "90d"].map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? "default" : "ghost"}
                  size="sm"
                  className="rounded-none border-0"
                  onClick={() => setTimeRange(range)}
                >
                  {range}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Scans</p>
                  <p className="text-3xl font-bold text-foreground">{farmStats.totalScans}</p>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    {farmStats.trends.scans} this month
                  </div>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Eye className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Diseases Detected</p>
                  <p className="text-3xl font-bold text-foreground">{farmStats.diseasesDetected}</p>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingDown className="h-4 w-4 mr-1" />
                    {farmStats.trends.diseases} this month
                  </div>
                </div>
                <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
                  <Bug className="h-6 w-6 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Healthy Scans</p>
                  <p className="text-3xl font-bold text-foreground">{farmStats.healthyScans}</p>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    {farmStats.trends.health} this month
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">AI Accuracy</p>
                  <p className="text-3xl font-bold text-foreground">{farmStats.accuracy}%</p>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +2% this month
                  </div>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Crop Health Overview */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gradient-card shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-accent" />
                  Crop Health Overview
                </CardTitle>
                <CardDescription>
                  Current health status of your crops
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {cropHealth.map((crop, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-foreground">{crop.crop}</span>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{crop.healthy} healthy</span>
                        <span>{crop.diseased} issues</span>
                        <span className="font-semibold text-foreground">{crop.health}%</span>
                      </div>
                    </div>
                    <Progress value={crop.health} className="h-3" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Detections */}
            <Card className="bg-gradient-card shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-accent" />
                  Recent Detections
                </CardTitle>
                <CardDescription>
                  Latest AI scan results and detected issues
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentDetections.map((detection) => (
                    <div key={detection.id} className="flex items-center justify-between p-4 bg-accent/5 rounded-lg border border-border/50">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(detection.status)}
                          <div>
                            <div className="font-medium text-foreground">{detection.crop}</div>
                            <div className="text-sm text-muted-foreground">{detection.date}</div>
                          </div>
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{detection.condition}</div>
                          <div className="flex items-center gap-2">
                            <Badge variant={getSeverityColor(detection.severity)} className="text-xs">
                              {detection.severity}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {detection.confidence}% confidence
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge variant={getStatusColor(detection.status)} className="capitalize">
                        {detection.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weather Impact */}
            <Card className="bg-gradient-card shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Weather Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Conditions</span>
                  <Badge variant="secondary">{weatherImpact.currentConditions}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Risk Level</span>
                  <Badge variant="secondary">{weatherImpact.riskLevel}</Badge>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Recommendations</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {weatherImpact.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-accent mt-0.5 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-card shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="farm" className="w-full justify-start">
                  <Eye className="mr-2 h-4 w-4" />
                  New Disease Scan
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Inspection
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>

            {/* Summary Stats */}
            <Card className="bg-gradient-card shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">This Month</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Scans Performed</span>
                  <span className="font-semibold">47</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Issues Resolved</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg. Response Time</span>
                  <span className="font-semibold">2.3 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Health Score</span>
                  <span className="font-semibold text-green-600">86%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;