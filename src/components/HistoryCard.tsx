import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2, Calendar, Leaf } from 'lucide-react';
import { useHistory, type AnalysisResult } from '@/hooks/useHistory';
import { useLanguage } from '@/hooks/useLanguage';

interface HistoryCardProps {
  result: AnalysisResult;
}

export const HistoryCard = ({ result }: HistoryCardProps) => {
  const { removeFromHistory } = useHistory();
  const { translate } = useLanguage();

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-base">
          <div className="flex items-center gap-2">
            <Leaf className="h-4 w-4 text-primary" />
            <span>{result.cropName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={result.issue === 'Healthy' ? 'default' : 'secondary'}>
              {result.issue}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeFromHistory(result.id)}
              className="h-6 w-6"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>{result.timestamp.toLocaleDateString()}</span>
          <span>•</span>
          <span>{result.confidence}% confidence</span>
        </div>
        
        <p className="text-sm leading-relaxed">{result.diagnosis}</p>
        
        {result.pesticides && result.pesticides.length > 0 && (
          <div className="pt-2">
            <p className="text-xs font-medium text-muted-foreground mb-2">
              Recommended treatments:
            </p>
            <div className="flex flex-wrap gap-1">
              {result.pesticides.map((pesticide, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {pesticide}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};