import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Sprout, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Calendar,
  Thermometer,
  Droplets,
  Sun
} from 'lucide-react';

interface DashboardProps {
  className?: string;
}

export const Dashboard = ({ className }: DashboardProps) => {
  const recentScans = [
    { id: 1, crop: 'Tomato', issue: 'Early Blight', confidence: 92, status: 'treated', date: '2024-01-15' },
    { id: 2, crop: 'Corn', issue: 'Healthy', confidence: 98, status: 'healthy', date: '2024-01-14' },
    { id: 3, crop: 'Wheat', issue: 'Aphids', confidence: 87, status: 'monitoring', date: '2024-01-13' },
  ];

  const farmMetrics = {
    totalScans: 45,
    healthyPercentage: 78,
    issuesResolved: 12,
    activeTreatments: 3
  };

  const weatherData = {
    temperature: '24°C',
    humidity: '68%',
    rainfall: '12mm',
    sunshine: '7.5hrs'
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Farm Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
            <Sprout className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{farmMetrics.totalScans}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Healthy Crops</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{farmMetrics.healthyPercentage}%</div>
            <Progress value={farmMetrics.healthyPercentage} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Issues Resolved</CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{farmMetrics.issuesResolved}</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Treatments</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{farmMetrics.activeTreatments}</div>
            <p className="text-xs text-muted-foreground">Require monitoring</p>
          </CardContent>
        </Card>
      </div>

      {/* Weather & Recent Scans */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weather Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-accent" />
              Today's Weather
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-orange-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Temperature</p>
                  <p className="font-semibold">{weatherData.temperature}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Humidity</p>
                  <p className="font-semibold">{weatherData.humidity}</p>
                </div>
              </div>
            </div>
            <div className="pt-2 border-t">
              <p className="text-sm text-muted-foreground mb-1">Rainfall: {weatherData.rainfall}</p>
              <p className="text-sm text-muted-foreground">Sunshine: {weatherData.sunshine}</p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Scans */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Recent Crop Scans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentScans.map((scan) => (
                <div key={scan.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Sprout className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{scan.crop}</p>
                      <p className="text-sm text-muted-foreground">{scan.issue}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={scan.status === 'healthy' ? 'default' : 
                              scan.status === 'treated' ? 'secondary' : 'outline'}
                      className={
                        scan.status === 'healthy' ? 'bg-success text-success-foreground' :
                        scan.status === 'treated' ? 'bg-accent text-accent-foreground' : ''
                      }
                    >
                      {scan.status}
                    </Badge>
                    <span className="text-sm font-medium">{scan.confidence}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};