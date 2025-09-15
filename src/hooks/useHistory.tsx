import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface AnalysisResult {
  id: string;
  cropName: string;
  issue: string;
  confidence: number;
  diagnosis: string;
  treatment: string;
  pesticides?: string[];
  imageUrl?: string;
  timestamp: Date;
}

type HistoryContextType = {
  history: AnalysisResult[];
  addToHistory: (result: Omit<AnalysisResult, 'id' | 'timestamp'>) => void;
  removeFromHistory: (id: string) => void;
  clearHistory: () => void;
};

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export function HistoryProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<AnalysisResult[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('farming-history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setHistory(parsed.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        })));
      } catch (error) {
        console.error('Failed to parse saved history:', error);
      }
    }
  }, []);

  // Save to localStorage whenever history changes
  useEffect(() => {
    localStorage.setItem('farming-history', JSON.stringify(history));
  }, [history]);

  const addToHistory = (result: Omit<AnalysisResult, 'id' | 'timestamp'>) => {
    const newResult: AnalysisResult = {
      ...result,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setHistory(prev => [newResult, ...prev]);
  };

  const removeFromHistory = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <HistoryContext.Provider value={{ history, addToHistory, removeFromHistory, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
}

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
};