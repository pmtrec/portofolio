import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Minimize2, RotateCcw } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load messages from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      try {
        const parsedMessages: Message[] = JSON.parse(savedMessages).map((msg: Omit<Message, 'timestamp'> & { timestamp: string }) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
        setMessages(parsedMessages);
      } catch (error) {
        console.error('Error loading messages from localStorage:', error);
      }
    }
  }, []);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);


  const projectContext = `Vous êtes un assistant virtuel pour le portfolio de Papa Malick Teuw, développeur full-stack à Dakar.

Compétences clés: React, TypeScript, Node.js, Python, PostgreSQL, MongoDB, Tailwind CSS, Docker, AWS.

Projets: E-commerce (React/Node.js), Dashboard Analytics (React/Python), API Microservices, App Mobile React Native, Portfolio (Next.js), ChatBot IA, Gestion apprenants (PHP), Réseau social JOTAAY, Clone WhatsApp.

Formation: Licence UCAD, Sonatel Academy.

Contact: +221 77-171-90-13, malickteuw.devweb.gmail.com

INSTRUCTION IMPORTANTE: Répondez UNIQUEMENT aux questions concernant ce portfolio et les informations ci-dessus. Si la question n'est PAS liée au portfolio, répondez exactement avec: "Nekkal nitt gua ladj ma louma kham 😊"

Soyez concis et utile pour les questions pertinentes.`;

  const getLocalResponse = (userMessage: string): string | null => {
    const message = userMessage.toLowerCase().trim();

    // Common questions with local responses
    if (message.includes('bonjour') || message.includes('salut') || message.includes('hello') || message.includes('hi')) {
      return "Bonjour ! 👋 Je suis l'assistant virtuel du portfolio de Papa Malick Teuw. Je peux vous renseigner sur ses compétences, projets, expérience ou coordonnées. Que souhaitez-vous savoir ?";
    }

    if (message.includes('compétence') || message.includes('skill') || message.includes('technologie')) {
      return "Papa Malick maîtrise : React, TypeScript, Node.js, Python, PostgreSQL, MongoDB, Tailwind CSS, Docker, AWS. Il a aussi des compétences en UI/UX Design avec Figma et en développement mobile avec React Native.";
    }

    if (message.includes('projet') || message.includes('project')) {
      return "Projets principaux : E-commerce (React/Node.js), Dashboard Analytics (React/Python), API Microservices, App Mobile React Native, Portfolio (Next.js), ChatBot IA, Gestion apprenants (PHP), Réseau social JOTAAY, Clone WhatsApp.";
    }

    if (message.includes('contact') || message.includes('téléphone') || message.includes('email') || message.includes('whatsapp')) {
      return "Coordonnées : Téléphone: +221 77-171-90-13, WhatsApp: +221 76-272-86-52, Email: malickteuw.devweb.gmail.com";
    }

    if (message.includes('expérience') || message.includes('experience') || message.includes('formation')) {
      return "Formation : Licence en Mathématiques, Physique et Informatique à l'UCAD (2022-2024), Formation en cours à Sonatel Academy (Orange Digital Center). Plus de 2 ans d'expérience avec projets académiques et personnels.";
    }

    return null; // No local response found
  };

  const callMistralAPI = async (userMessage: string, conversationHistory: Message[]): Promise<string> => {
    const apiKey = import.meta.env.VITE_MISTRAL_API_KEY || 'your-mistral-api-key-here'; // Replace with actual API key

    // Build messages array with system prompt and recent conversation history
    const messages = [
      {
        role: 'system',
        content: projectContext,
      },
    ];

    // Add recent conversation history (last 5 messages to avoid token limits)
    const recentHistory = conversationHistory.slice(-5);
    recentHistory.forEach((msg) => {
      messages.push({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.text,
      });
    });

    // Add current user message
    messages.push({
      role: 'user',
      content: userMessage,
    });

    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'mistral-small', // faster model for better performance
        messages: messages,
        max_tokens: 300, // reduced for faster responses
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Erreur inconnue lors de l\'appel à l\'API');
      let errorMessage = `Erreur API (${response.status}): ${response.statusText}`;
      try {
        const errorData = JSON.parse(errorText);
        if (errorData.error?.message) {
          errorMessage += ` - ${errorData.error.message}`;
        }
      } catch {
        errorMessage += ` - ${errorText}`;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Check for local response first
      const localResponse = getLocalResponse(inputValue);
      let aiResponse: string;

      if (localResponse) {
        aiResponse = localResponse;
      } else {
        aiResponse = await callMistralAPI(inputValue, messages);
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Erreur API:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Nekkal nitt gua ladj ma louma kham 😊',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleReset = () => {
    setMessages([]);
    localStorage.removeItem('chatMessages');
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 group">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-6 rounded-full shadow-2xl transition-all duration-300 animate-pulse-chat border-2 border-white hover:scale-110"
            aria-label="Ouvrir le chat"
            title="Cliquez pour discuter avec l'assistant du portfolio"
          >
            <MessageCircle className="w-8 h-8" />
          </button>
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg">
            💬 Discuter avec l'assistant
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-2xl z-50 flex flex-col border-2 border-gray-200 dark:border-gray-600 animate-fadeIn">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b-2 border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-600 rounded-t-lg">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-blue-600" />
              Assistant Portfolio
            </h3>
            <div className="flex gap-2">
              <button
                onClick={handleReset}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Réinitialiser le chat"
                title="Effacer tous les messages"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Réduire"
              >
                <Minimize2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-600 dark:text-gray-300 mt-8 p-6 bg-blue-50 dark:bg-gray-700 rounded-lg border border-blue-200 dark:border-gray-600">
                <MessageCircle className="w-16 h-16 mx-auto mb-4 text-blue-500" />
                <p className="text-lg font-semibold mb-2">Bonjour ! 👋</p>
                <p className="text-base mb-2">Je suis l'assistant virtuel du portfolio de Papa Malick Teuw</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Posez-moi des questions sur ses compétences, projets, expérience ou contact.</p>
              </div>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-4 rounded-2xl shadow-md ${
                    message.isUser
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md'
                      : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 rounded-bl-md'
                  }`}
                >
                  <p className="text-base leading-relaxed whitespace-pre-wrap">{message.text}</p>
                  <p className={`text-xs mt-2 ${
                    message.isUser ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString('fr-FR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-700 p-4 rounded-2xl shadow-md border border-gray-200 dark:border-gray-600 rounded-bl-md">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">L'assistant tape...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t-2 border-blue-200 dark:border-blue-800 bg-gray-50 dark:bg-gray-700 rounded-b-lg">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tapez votre message ici..."
                className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:text-white text-base"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white p-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                aria-label="Envoyer"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBox;