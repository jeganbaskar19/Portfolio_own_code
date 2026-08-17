import { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi';
import { askAssistant, suggestedQuestions } from './qaEngine';
import { personal } from '../../data';
import './AIAssistant.css';

const INITIAL_MESSAGE = {
  role: 'bot',
  text: `Hi! I'm ${personal.firstName}'s AI assistant. Ask me about his skills, experience, projects or how to reach him.`,
  source: 'ai'
};

// Max conversation history to send to the AI (keeps token usage low)
const MAX_HISTORY = 6;

// Instant cosmetic delay (100ms max)
const THINK_DELAY = () => 100;

function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [draft, setDraft] = useState('');
  const [typing, setTyping] = useState(false);
  const [aiMode, setAiMode] = useState(false); // true = AI responded at least once
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, typing]);

  // Build history array in OpenAI format for the API
  const buildHistory = useCallback((currentMessages) => {
    return currentMessages
      .filter((m) => m.role === 'user' || m.role === 'bot')
      .slice(-MAX_HISTORY)
      .map((m) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.text
      }));
  }, []);

  const send = useCallback(
    async (text) => {
      const trimmed = text.trim();
      if (!trimmed || typing) return;

      // Add user message immediately
      const userMsg = { role: 'user', text: trimmed };
      setMessages((prev) => [...prev, userMsg]);
      setDraft('');
      setTyping(true);

      // Fast check: If local QA engine has a matching answer, answer instantly (~100ms)
      const localReply = askAssistant(trimmed);
      const isFallback = localReply.startsWith("I'm not sure about that one");

      if (!isFallback) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { role: 'bot', text: localReply, source: 'local' }
          ]);
          setTyping(false);
        }, THINK_DELAY());
        return;
      }

      // Capture history BEFORE adding user message
      const history = buildHistory(messages);

      try {
        // Call the Vercel serverless function with fast 4.5s timeout
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: trimmed, history }),
          signal: AbortSignal.timeout(4500)
        });

        const data = await response.json();

        // If AI returned a real answer — use it
        if (data.source === 'ai' && data.answer) {
          setAiMode(true);
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              { role: 'bot', text: data.answer, source: 'ai', provider: data.provider }
            ]);
            setTyping(false);
          }, THINK_DELAY());
          return;
        }

        // Rate limit message
        if (data.source === 'ratelimit') {
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              { role: 'bot', text: data.error, source: 'ratelimit' }
            ]);
            setTyping(false);
          }, THINK_DELAY());
          return;
        }

        throw new Error(data?.error || 'AI fallback requested');
      } catch (err) {
        console.warn('[AIAssistant] Live AI unavailable, using local Q&A fallback:', err?.message || err);
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { role: 'bot', text: localReply, source: 'local' }
          ]);
          setTyping(false);
        }, THINK_DELAY());
      }
    },
    [typing, messages, buildHistory]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    send(draft);
  };

  return (
    <div className="assistant">
      <AnimatePresence>
        {open && (
          <motion.div
            className="assistant__panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <header className="assistant__header">
              <div className="assistant__header-info">
                <span className="assistant__dot" />
                <div>
                  <p className="assistant__title">
                    {personal.firstName} AI
                    {aiMode && <span className="assistant__ai-badge">✦ AI</span>}
                  </p>
                  <p className="assistant__subtitle">Answers about my work, live</p>
                </div>
              </div>
              <button
                className="assistant__icon-btn"
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
              >
                <FiX size={18} />
              </button>
            </header>

            <div className="assistant__body" ref={scrollRef}>
              <AnimatePresence initial={false}>
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    className={`assistant__bubble assistant__bubble--${m.role}`}
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                  >
                    {m.text}
                  </motion.div>
                ))}

                {typing && (
                  <motion.div
                    key="typing"
                    className="assistant__bubble assistant__bubble--bot assistant__bubble--typing"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <span className="assistant__typing-dot" />
                    <span className="assistant__typing-dot" />
                    <span className="assistant__typing-dot" />
                  </motion.div>
                )}
              </AnimatePresence>

              {messages.length === 1 && (
                <div className="assistant__suggestions">
                  {suggestedQuestions.map((q) => (
                    <button key={q} className="assistant__chip" onClick={() => send(q)}>
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form className="assistant__input-row" onSubmit={handleSubmit}>
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Ask a question..."
                aria-label="Ask the assistant a question"
                maxLength={500}
              />
              <button
                type="submit"
                aria-label="Send"
                className="assistant__icon-btn assistant__icon-btn--send"
                disabled={typing}
              >
                <FiSend size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="assistant__toggle"
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label={open ? 'Close assistant' : `Ask ${personal.firstName} AI`}
      >
        {open ? <FiX size={22} /> : <FiMessageCircle size={22} />}
        {!open && <span className="assistant__toggle-label">{personal.firstName} AI</span>}
      </motion.button>
    </div>
  );
}

export default AIAssistant;
