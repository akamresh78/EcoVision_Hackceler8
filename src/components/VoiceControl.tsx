import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';
import { useVoiceControl } from '@/hooks/useVoiceControl';
import { useToast } from '@/hooks/use-toast';

interface VoiceControlProps {
  onResult?: (transcript: string) => void;
  language?: string;
}

export function VoiceControl({ onResult, language = 'en-US' }: VoiceControlProps) {
  const { toast } = useToast();
  const [isActive, setIsActive] = useState(false);

  const { isListening, startListening, stopListening } = useVoiceControl({
    language,
    onResult: (transcript) => {
      onResult?.(transcript);
      setIsActive(false);
      toast({
        title: "Voice Input Received",
        description: `"${transcript.substring(0, 50)}${transcript.length > 50 ? '...' : ''}"`,
      });
    },
    onError: (error) => {
      setIsActive(false);
      toast({
        title: "Voice Recognition Error",
        description: error,
        variant: "destructive",
      });
    },
  });

  const toggleListening = () => {
    if (isListening) {
      stopListening();
      setIsActive(false);
    } else {
      startListening();
      setIsActive(true);
    }
  };

  return (
    <Button
      variant={isActive ? "destructive" : "outline"}
      size="icon"
      onClick={toggleListening}
      className={`${isListening ? 'animate-pulse' : ''}`}
    >
      {isListening ? (
        <MicOff className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Mic className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className="sr-only">Toggle voice control</span>
    </Button>
  );
}