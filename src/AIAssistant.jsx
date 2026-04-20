import Footer from './Footer';
import React, { useState } from 'react';
import { useAuth } from './AuthProvider';
import useUser from './hooks/UserHook';

const AIAssistant = () => {
  const { user } = useAuth();
  const { userInfo } = useUser();
  const role = String(userInfo?.role || user?.role || '').toUpperCase();
  if (role !== 'STUDENT') return null;

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'ai', text: '👋 Hi! I am your AI helper. Ask me anything about quizzes or studying.' }
  ]);
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim()) return;
    const next = [...messages, { role: 'user', text: input }];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:8080/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, history: next }),
      });
      const data = await res.json();
      setMessages([...next, { role: 'ai', text: data.response }]);
    } catch {
      setMessages([...next, { role: 'ai', text: 'Sorry, AI is unavailable.' }]);
    }
    setLoading(false);
  };

  return (
    <>
    <div className="flex items-center justify-center min-h-[80vh] bg-gradient-to-br from-slate-900 via-cyan-950 to-blue-900">
      <div className="relative w-full max-w-md rounded-3xl shadow-2xl border border-cyan-200/30 bg-gradient-to-br from-slate-900 via-cyan-950 to-blue-900 p-0">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-100/20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-t-3xl">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-xl font-bold shadow">
              🤖
            </div>
            <div>
              <h3 className="text-base font-bold text-white">AI Assistant</h3>
              <p className="text-xs text-cyan-300">Gemini-powered help for students</p>
            </div>
          </div>
        </div>
        {/* Chat */}
        <div className="h-80 overflow-y-auto px-6 py-4 space-y-3 bg-gradient-to-br from-slate-950/80 to-blue-950/60">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`
                px-4 py-2 rounded-2xl max-w-[80%] text-sm
                ${m.role === 'user'
                  ? 'bg-cyan-400 text-slate-900 rounded-br-none shadow'
                  : 'bg-slate-800 text-cyan-100 rounded-bl-none border border-cyan-100/20 shadow'}
              `}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="px-4 py-2 rounded-2xl bg-slate-800 text-cyan-300 border border-cyan-100/20 animate-pulse">
                Thinking...
              </div>
            </div>
          )}
        </div>
        {/* Input */}
        <div className="border-t border-cyan-100/20 bg-slate-950/80 px-6 py-4 rounded-b-3xl">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              className="flex-1 rounded-xl border border-cyan-100/20 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-400 focus:border-cyan-300 outline-none"
              placeholder="Ask anything about quizzes or studying..."
              disabled={loading}
            />
            <button
              onClick={send}
              className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-3 text-white font-bold shadow hover:scale-105 transition disabled:opacity-50"
              disabled={loading || !input.trim()}
            >
              Send
            </button>
          </div>
        </div>
        
      </div>

    </div>
          <Footer />
          </>
  );
};

export default AIAssistant;