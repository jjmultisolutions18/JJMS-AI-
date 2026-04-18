import * as React from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { generateResponse } from '@/src/services/geminiService';
import { Message } from '@/src/types';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';

interface ChatInterfaceProps {
  initialPrompt?: string | null;
  onPromptHandled?: () => void;
}

export function ChatInterface({ initialPrompt, onPromptHandled }: ChatInterfaceProps) {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: '1',
      role: 'model',
      content: "Hello! I am JJMS AI, your Innovation and Business Support Assistant. How can I help you today? You can share an idea, ask for business advice, or request help with document generation.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: 'smooth',
        });
      }
    }
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    const history = messages.map((m) => ({
      role: m.role,
      parts: [{ text: m.content }],
    }));

    const aiResponse = await generateResponse(text, history);

    const modelMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      content: aiResponse,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, modelMessage]);
    setIsLoading(false);
  };

  React.useEffect(() => {
    if (initialPrompt) {
      handleSend(initialPrompt);
      onPromptHandled?.();
    }
  }, [initialPrompt]);

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full bg-white/50 backdrop-blur-sm rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex gap-3 max-w-[85%] ${
                    message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    message.role === 'user' ? 'bg-slate-800 text-white' : 'bg-orange-600 text-white'
                  }`}>
                    {message.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <Card className={`p-4 ${
                    message.role === 'user' 
                      ? 'bg-slate-800 text-white border-none' 
                      : 'bg-white border-slate-200 shadow-sm'
                  }`}>
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                    <div className={`text-[10px] mt-2 opacity-50 ${
                      message.role === 'user' ? 'text-right' : 'text-left'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </Card>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3 items-center text-slate-400 text-sm italic">
                <Loader2 className="animate-spin" size={16} />
                JJMS AI is thinking...
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-slate-200 bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
            setInput('');
          }}
          className="flex gap-2"
        >
          <Input
            placeholder="Type your message here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !input.trim()} size="icon" className="bg-orange-600 hover:bg-orange-700">
            <Send size={18} />
          </Button>
        </form>
        <p className="text-[10px] text-slate-400 mt-2 text-center">
          JJMS AI can provide structured innovation support. Try sharing an idea!
        </p>
      </div>
    </div>
  );
}
