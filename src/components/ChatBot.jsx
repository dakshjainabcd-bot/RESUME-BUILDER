import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles, Loader } from 'lucide-react';
import { hasApiKey, getApiKey } from '../utils/geminiApi';
import './ChatBot.css';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const SYSTEM_PROMPT = `You are ResumeAI Assistant — a helpful, friendly, and concise AI career coach embedded in a resume builder app. Your role:
- Help users write better resumes, cover letters, and LinkedIn profiles
- Give specific, actionable resume tips (not generic)
- Suggest improvements to bullet points, summaries, and skills
- Share industry-specific hiring insights
- Answer questions about ATS optimization, formatting, and best practices
- Be encouraging but honest

Rules:
- Keep responses concise (2-4 sentences max unless asked for detail)
- Use bullet points for lists
- Never ask for personal information like addresses or phone numbers
- If the user asks something unrelated to careers/resumes, gently redirect
- Use a warm, professional tone`;

const WELCOME_MSG = {
  role: 'assistant',
  text: "Hey! 👋 I'm your AI career coach. Ask me anything about resume writing, interview prep, or job search strategy. How can I help?",
};

async function chatWithGemini(messages, resumeData) {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('Please set your Gemini API key first.');

  let prompt = SYSTEM_PROMPT;
  if (resumeData) {
    prompt += `\n\nUser's current resume data in JSON format:\n${JSON.stringify(resumeData, null, 2)}\nUse this context to give personalized advice and suggest improvements for their specific background!`;
  }

  const contents = [
    { role: 'user', parts: [{ text: prompt }] },
    { role: 'model', parts: [{ text: 'Understood! I\'m ready to help with resume and career questions.' }] },
    ...messages.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.text }],
    })),
  ];

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      generationConfig: { temperature: 0.8, maxOutputTokens: 512 },
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error: ${response.status}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I couldn\'t generate a response.';
}

export default function ChatBot({ onOpenApiKey, resumeData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MSG]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isTyping) return;

    if (!hasApiKey()) {
      setMessages((prev) => [
        ...prev,
        { role: 'user', text },
        { role: 'assistant', text: '🔑 You need to add your Gemini API key first. Click the button below to set it up!' },
      ]);
      setInput('');
      return;
    }

    const userMsg = { role: 'user', text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    try {
      // Only send last 10 messages for context
      const contextMessages = updatedMessages.slice(-10);
      const reply = await chatWithGemini(contextMessages, resumeData);
      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: `⚠️ ${err.message}` },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickPrompts = [
    'How to write a strong summary?',
    'Best action verbs for resumes',
    'Tips for ATS optimization',
  ];

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button className="chatbot-fab" onClick={() => setIsOpen(true)} aria-label="Open AI Assistant">
          <MessageCircle size={22} />
          <span className="chatbot-fab-pulse"></span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <Sparkles size={14} />
              </div>
              <div>
                <div className="chatbot-header-title">AI Career Coach</div>
                <div className="chatbot-header-status">
                  <span className="chatbot-status-dot"></span> Online
                </div>
              </div>
            </div>
            <button className="chatbot-close" onClick={() => setIsOpen(false)}>
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-msg chatbot-msg--${msg.role}`}>
                <div className="chatbot-msg-icon">
                  {msg.role === 'assistant' ? <Bot size={14} /> : <User size={14} />}
                </div>
                <div className="chatbot-msg-bubble">
                  {msg.text.split('\n').map((line, j) => (
                    <p key={j}>{line}</p>
                  ))}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chatbot-msg chatbot-msg--assistant">
                <div className="chatbot-msg-icon"><Bot size={14} /></div>
                <div className="chatbot-msg-bubble chatbot-typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          {messages.length <= 1 && (
            <div className="chatbot-quick-prompts">
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  className="chatbot-quick-btn"
                  onClick={() => {
                    setInput(prompt);
                    setTimeout(() => {
                      setInput(prompt);
                      handleSend();
                    }, 50);
                  }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="chatbot-input-area">
            {!hasApiKey() && (
              <button className="chatbot-apikey-btn" onClick={onOpenApiKey}>
                🔑 Set API Key to enable AI chat
              </button>
            )}
            <div className="chatbot-input-row">
              <input
                ref={inputRef}
                className="chatbot-input"
                placeholder="Ask about resumes, careers..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isTyping}
              />
              <button
                className="chatbot-send"
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
              >
                {isTyping ? <Loader size={16} className="spin-icon" /> : <Send size={16} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
