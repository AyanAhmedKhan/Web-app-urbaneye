import { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { MessageCircle, X, Send, Mic, MicOff, Volume2, Bot, Sparkles } from 'lucide-react';
import '../styles/Chatbot.css';

// --- UrbanEye system prompt (context + guardrails) ---
const SYSTEM_PROMPT = `You are UrbanEye AI Assistant — a helpful, concise, and friendly chatbot embedded in the UrbanEye platform.

## About UrbanEye
UrbanEye is an AI-powered civic infrastructure monitoring platform that empowers citizens to report and track urban issues (potholes, garbage, broken streetlights, water leakage, etc.). Key features:
- **AI-Powered Detection**: Users upload photos and UrbanAI Engine auto-detects issue type and severity
- **Real-time Tracking**: Issues are geo-tagged on a live map
- **Department Routing**: AI auto-routes issues to correct government departments
- **Gig Worker Booking**: Citizens can book verified gig workers for express resolution
- **NGO Help**: Request NGO assistance for community issues
- **Gamification**: Users earn XP and compete on leaderboards for reporting issues
- **Role-based Dashboards**: Civilians, Gov Admins, Dept Heads, Field Officers, Super Admins
- **Mobile App**: Available as an Android APK download

## Your Rules
1. **ONLY answer questions related to UrbanEye** — features, usage, civic issues, how-to, troubleshooting
2. If asked off-topic questions (weather, coding, math, sports, etc.), politely say: "I'm the UrbanEye assistant and can only help with UrbanEye and civic issues. How can I help you with that?"
3. **Reply in the SAME language the user writes in**. If they write in Hindi, reply in Hindi. If Tamil, reply in Tamil. Etc.
4. Keep answers **concise** — max 2-3 sentences unless more detail is needed
5. Be **warm, professional, and helpful**
6. When relevant, guide users to specific features (Analyze page, Dashboard, Book Service, etc.)`;

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MAX_HISTORY = 10;

const QUICK_ACTIONS = [
    'How do I report an issue?',
    'What issues can AI detect?',
    'How does XP work?',
    'Book a gig worker',
];

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [speakingId, setSpeakingId] = useState(null);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const recognitionRef = useRef(null);
    const chatRef = useRef(null);
    const genAIRef = useRef(null);

    // Initialize Gemini
    useEffect(() => {
        if (!GEMINI_API_KEY) return;
        try {
            genAIRef.current = new GoogleGenerativeAI(GEMINI_API_KEY);
        } catch (e) {
            console.error('Failed to initialize Gemini:', e);
        }
    }, []);

    // Auto-scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    // Initialize Speech Recognition
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            // Auto-detect language (browser default, works well for Indian languages)
            recognition.lang = '';

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
                setIsRecording(false);
            };

            recognition.onerror = () => {
                setIsRecording(false);
            };

            recognition.onend = () => {
                setIsRecording(false);
            };

            recognitionRef.current = recognition;
        }
    }, []);

    // Text-to-speech
    const speak = useCallback((text, msgId) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 1;
            utterance.pitch = 1;
            utterance.onstart = () => setSpeakingId(msgId);
            utterance.onend = () => setSpeakingId(null);
            utterance.onerror = () => setSpeakingId(null);
            window.speechSynthesis.speak(utterance);
        }
    }, []);

    // Toggle voice recording
    const toggleRecording = () => {
        if (!recognitionRef.current) {
            setError('Voice input is not supported in your browser');
            return;
        }
        if (isRecording) {
            recognitionRef.current.stop();
            setIsRecording(false);
        } else {
            setIsRecording(true);
            recognitionRef.current.start();
        }
    };

    // Send message to Gemini
    const sendMessage = async (text) => {
        const trimmed = (text || input).trim();
        if (!trimmed || isLoading) return;

        if (!GEMINI_API_KEY) {
            setError('Gemini API key not configured. Add VITE_GEMINI_API_KEY to .env');
            return;
        }

        const userMsg = { role: 'user', text: trimmed, id: Date.now() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);
        setError('');

        try {
            const model = genAIRef.current.getGenerativeModel({
                model: 'gemini-2.5-flash',
                systemInstruction: SYSTEM_PROMPT,
            });

            // Build history from last N messages (token optimization)
            const history = messages.slice(-MAX_HISTORY).map(m => ({
                role: m.role === 'user' ? 'user' : 'model',
                parts: [{ text: m.text }],
            }));

            const chat = model.startChat({
                history,
                generationConfig: {
                    maxOutputTokens: 300,
                    temperature: 0.7,
                    topP: 0.9,
                },
            });

            chatRef.current = chat;
            const result = await chat.sendMessage(trimmed);
            const response = result.response.text();

            const botMsg = { role: 'bot', text: response, id: Date.now() + 1 };
            setMessages(prev => [...prev, botMsg]);
        } catch (err) {
            console.error('Gemini error:', err);
            setError('Failed to get response. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const handleQuickAction = (text) => {
        sendMessage(text);
    };

    return (
        <>
            {/* Chat window */}
            {isOpen && (
                <div className="chatbot-window">
                    {/* Header */}
                    <div className="chatbot-header">
                        <div className="chatbot-header-avatar">
                            <Bot size={22} color="white" />
                        </div>
                        <div className="chatbot-header-info">
                            <h3>UrbanEye AI</h3>
                            <p>Ask me about UrbanEye</p>
                        </div>
                        <button className="chatbot-close-btn" onClick={() => setIsOpen(false)}>
                            <X size={16} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="chatbot-messages">
                        {messages.length === 0 && (
                            <>
                                <div className="chatbot-welcome">
                                    <div className="chatbot-welcome-icon">
                                        <Sparkles size={26} color="white" />
                                    </div>
                                    <h4>Welcome to UrbanEye AI!</h4>
                                    <p>I can help you with reporting issues, tracking reports, understanding features, and more.</p>
                                </div>
                                <div className="chatbot-quick-actions">
                                    {QUICK_ACTIONS.map((q, i) => (
                                        <button
                                            key={i}
                                            className="chatbot-quick-chip"
                                            onClick={() => handleQuickAction(q)}
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}

                        {messages.map((msg) => (
                            <div key={msg.id} className={`chatbot-msg ${msg.role}`}>
                                {msg.role === 'bot' && (
                                    <div className="chatbot-bot-avatar">
                                        <Bot />
                                    </div>
                                )}
                                <div>
                                    <div className="chatbot-msg-bubble">{msg.text}</div>
                                    {msg.role === 'bot' && (
                                        <button
                                            className={`chatbot-speak-btn ${speakingId === msg.id ? 'speaking' : ''}`}
                                            onClick={() => speak(msg.text, msg.id)}
                                            title="Listen"
                                        >
                                            <Volume2 size={14} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="chatbot-msg bot">
                                <div className="chatbot-bot-avatar">
                                    <Bot />
                                </div>
                                <div className="chatbot-typing">
                                    <div className="chatbot-typing-dot" />
                                    <div className="chatbot-typing-dot" />
                                    <div className="chatbot-typing-dot" />
                                </div>
                            </div>
                        )}

                        {error && <div className="chatbot-error">{error}</div>}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="chatbot-input-area">
                        <button
                            className={`chatbot-voice-btn ${isRecording ? 'recording' : ''}`}
                            onClick={toggleRecording}
                            title={isRecording ? 'Stop recording' : 'Voice input'}
                        >
                            {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
                        </button>
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder={isRecording ? 'Listening...' : 'Ask about UrbanEye...'}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={isLoading}
                        />
                        <button
                            className="chatbot-send-btn"
                            onClick={() => sendMessage()}
                            disabled={!input.trim() || isLoading}
                        >
                            <Send size={16} />
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="chatbot-footer">
                        Powered by <span>Google Gemini</span>
                    </div>
                </div>
            )}

            {/* FAB */}
            <button
                className={`chatbot-fab ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                title={isOpen ? 'Close chat' : 'Chat with UrbanEye AI'}
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </button>
        </>
    );
};

export default Chatbot;
