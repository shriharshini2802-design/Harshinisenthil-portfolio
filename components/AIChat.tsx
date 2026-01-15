
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Welcome to my purple domain! 💜 How can I help you explore my work today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendMessageToGemini(input);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] w-full glass rounded-[32px] overflow-hidden shadow-2xl border border-white/10">
      <div className="bg-white/5 px-6 py-4 border-b border-white/5 flex items-center gap-3">
        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
          <i className="fa-solid fa-ghost text-white text-sm"></i>
        </div>
        <div>
          <h3 className="text-white font-bold text-sm tracking-wide">Purple Guide</h3>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
            <span className="text-[10px] text-purple-300/50 font-bold uppercase">Online</span>
          </div>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth"
      >
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} gap-1`}
          >
            <div className={`max-w-[85%] px-4 py-3 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-purple-600 text-white rounded-tr-none' 
                : 'bg-white/10 text-purple-100 rounded-tl-none border border-white/5'
            }`}>
              <p className="text-sm leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1.5">
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce delay-100"></div>
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-black/20 border-t border-white/5">
        <div className="flex gap-2 bg-white/5 rounded-xl p-1.5 focus-within:ring-1 ring-purple-500/50 transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 bg-transparent border-none px-3 py-1 text-sm text-white placeholder-purple-300/30 focus:outline-none"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="bg-purple-600 hover:bg-purple-500 text-white w-9 h-9 rounded-lg transition-all disabled:opacity-50 flex items-center justify-center shadow-lg"
          >
            <i className="fa-solid fa-paper-plane text-xs"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
