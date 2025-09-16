import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Send, 
  MessageSquare, 
  Bot, 
  User, 
  Lightbulb,
  Leaf,
  Bug,
  Droplets,
  Sun,
  Truck
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI farming assistant. I can help you with crop diseases, pest management, weather advice, fertilizer recommendations, and general farming questions. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date(),
      suggestions: [
        "My tomato leaves are turning yellow",
        "What's the best time to plant corn?",
        "How to prevent pest infestations?",
        "Organic fertilizer recommendations"
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    { icon: Bug, text: "Pest identification help", category: "pest" },
    { icon: Leaf, text: "Disease diagnosis", category: "disease" },
    { icon: Droplets, text: "Irrigation advice", category: "water" },
    { icon: Sun, text: "Seasonal planting guide", category: "planting" },
    { icon: Truck, text: "Harvest timing", category: "harvest" }
  ];

  const mockResponses = {
    "yellow leaves": "Yellow leaves on tomatoes can indicate several issues: 1) Overwatering - Check soil drainage and reduce watering frequency. 2) Nitrogen deficiency - Apply nitrogen-rich fertilizer. 3) Early blight disease - Remove affected leaves and apply fungicide. 4) Natural aging - Lower leaves naturally yellow as plants mature. For best results, check soil moisture and examine leaf patterns closely.",
    "corn planting": "The best time to plant corn depends on your location: 1) Soil temperature should be consistently above 60°F (15°C). 2) Plant 2-3 weeks after last frost date. 3) In temperate regions, this is typically late April to mid-May. 4) For sweet corn, plant every 2 weeks for continuous harvest. 5) Choose varieties suited to your growing season length.",
    "pest prevention": "Effective pest prevention strategies: 1) Companion planting - Marigolds, basil, and nasturtiums repel many pests. 2) Beneficial insects - Encourage ladybugs, lacewings, and parasitic wasps. 3) Crop rotation - Breaks pest life cycles. 4) Regular monitoring - Weekly inspections catch problems early. 5) Organic sprays - Neem oil and insecticidal soap for early intervention.",
    "organic fertilizer": "Excellent organic fertilizer options: 1) Compost - Provides slow-release nutrients and improves soil structure. 2) Fish emulsion - High in nitrogen for leafy growth. 3) Bone meal - Phosphorus for root development and flowering. 4) Kelp meal - Potassium and micronutrients. 5) Worm castings - Gentle, balanced nutrition. Apply according to soil test results for best outcomes.",
    "default": "I understand you're looking for farming advice. Could you provide more specific details about your crops, location, or the particular issue you're facing? This will help me give you more targeted recommendations. You can also try one of the quick questions below for common farming topics."
  };

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('yellow') && lowerMessage.includes('leaves')) {
      return mockResponses["yellow leaves"];
    } else if (lowerMessage.includes('corn') && (lowerMessage.includes('plant') || lowerMessage.includes('grow'))) {
      return mockResponses["corn planting"];
    } else if (lowerMessage.includes('pest') && (lowerMessage.includes('prevent') || lowerMessage.includes('control'))) {
      return mockResponses["pest prevention"];
    } else if (lowerMessage.includes('organic') && lowerMessage.includes('fertilizer')) {
      return mockResponses["organic fertilizer"];
    } else {
      return mockResponses["default"];
    }
  };

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(messageText),
        sender: 'bot',
        timestamp: new Date(),
        suggestions: [
          "Tell me more about this",
          "What about other crops?",
          "Any preventive measures?",
          "Organic alternatives?"
        ]
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputMessage);
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            AI Farm Assistant
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get instant answers to your farming questions from our intelligent AI assistant.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Quick Questions Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-card shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lightbulb className="h-5 w-5 text-accent" />
                  Quick Questions
                </CardTitle>
                <CardDescription>
                  Common farming topics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickQuestions.map((question, index) => {
                  const Icon = question.icon;
                  return (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start text-left h-auto p-3"
                      onClick={() => handleSuggestionClick(question.text)}
                    >
                      <Icon className="h-4 w-4 mr-2 text-accent flex-shrink-0" />
                      <span className="text-sm">{question.text}</span>
                    </Button>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col bg-gradient-card shadow-soft">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-accent" />
                  Chat with AI Assistant
                </CardTitle>
                <CardDescription>
                  Ask questions in simple language for personalized farming advice
                </CardDescription>
              </CardHeader>

              {/* Messages Area */}
              <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea className="flex-1 px-6">
                  <div className="space-y-4 pb-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${
                          message.sender === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        {message.sender === 'bot' && (
                          <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                            <Bot className="h-4 w-4 text-accent" />
                          </div>
                        )}
                        
                        <div
                          className={`max-w-[80%] rounded-lg p-4 ${
                            message.sender === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          
                          {message.suggestions && message.sender === 'bot' && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {message.suggestions.map((suggestion, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors text-xs"
                                  onClick={() => handleSuggestionClick(suggestion)}
                                >
                                  {suggestion}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>

                        {message.sender === 'user' && (
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                        )}
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex gap-3 justify-start">
                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                          <Bot className="h-4 w-4 text-accent" />
                        </div>
                        <div className="bg-muted rounded-lg p-4">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-accent rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="border-t p-4">
                  <form onSubmit={handleSubmit} className="flex gap-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Ask me anything about farming..."
                      className="flex-1"
                      disabled={isTyping}
                    />
                    <Button 
                      type="submit" 
                      variant="farm"
                      disabled={!inputMessage.trim() || isTyping}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                  
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Ask about crop diseases, pest control, weather, fertilizers, or general farming advice
                  </p>
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