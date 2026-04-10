"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Home, MessageSquare, ChevronLeft, SendHorizontal } from "lucide-react";
import { chatAction } from "@/app/actions/chat";

interface Message {
  id: string;
  type: "bot" | "user";
  text: string;
  timestamp: Date;
}

type View = "home" | "messages";

const PythiaIcon = ({ isOpen }: { isOpen: boolean }) => (
  <div className="relative flex items-center justify-center">
    <motion.div
      animate={isOpen ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
      className="flex items-center gap-[3px]"
    >
      {[0.4, 0.7, 0.5, 0.8, 0.4].map((h, i) => (
        <motion.div
          key={i}
          animate={{
            height: [12 * h, 24 * h, 12 * h],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
          className="w-[3px] bg-white rounded-full"
        />
      ))}
    </motion.div>
  </div>
);

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [view, setView] = useState<View>("home");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      text: "Hi there! 👋 Welcome to Pythia. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userMessageCount, setUserMessageCount] = useState(0);
  const [globalApiCount, setGlobalApiCount] = useState(0);
  const [usedQuickActions, setUsedQuickActions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // --- CLICK OUTSIDE TO CLOSE ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && chatContainerRef.current && !chatContainerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // --- PERSISTENCE: LOAD ---
  useEffect(() => {
    const savedMessages = localStorage.getItem("pythia_chat_messages");
    const savedCount = localStorage.getItem("pythia_chat_count");
    const savedActions = localStorage.getItem("pythia_chat_actions");
    const savedGlobalCount = localStorage.getItem("pythia_api_call_count");

    if (savedMessages) {
      const parsed = JSON.parse(savedMessages).map((m: Message) => ({
        ...m,
        timestamp: new Date(m.timestamp)
      }));
      setMessages(parsed);
    }
    if (savedCount) setUserMessageCount(parseInt(savedCount));
    if (savedActions) setUsedQuickActions(JSON.parse(savedActions));
    if (savedGlobalCount) setGlobalApiCount(parseInt(savedGlobalCount));
  }, []);

  // --- PERSISTENCE: SAVE ---
  useEffect(() => {
    if (messages.length > 1 || userMessageCount > 0) {
      localStorage.setItem("pythia_chat_messages", JSON.stringify(messages));
      localStorage.setItem("pythia_chat_count", userMessageCount.toString());
      localStorage.setItem("pythia_chat_actions", JSON.stringify(usedQuickActions));
    }
  }, [messages, userMessageCount, usedQuickActions]);

  // --- PERSISTENCE: SAVE GLOBAL COUNT ---
  useEffect(() => {
    localStorage.setItem("pythia_api_call_count", globalApiCount.toString());
  }, [globalApiCount]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && view === "messages" && messages.length > 0) {
      scrollToBottom();
    }
  }, [isOpen, view, messages]);

  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
      setView("messages");
    };

    window.addEventListener("open-pythia-chat", handleOpenChat);
    return () => window.removeEventListener("open-pythia-chat", handleOpenChat);
  }, []);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsLoading(true);
    setUserMessageCount(prev => prev + 1);

    // Track used quick actions
    if (quickActions.includes(text)) {
      setUsedQuickActions(prev => [...prev, text]);
    }

    // --- ZERO-TOKEN LOCAL HANDLER (Saves API Costs Completely) ---
    const localResponses: Record<string, string> = {
      "Book a Demo": "I can help you with that! You can see Pythia in action by scheduling a 15-minute live demo. Please use the link below to find a time that works for you.",
      "Schedule a Meeting": "Great! You can pick a time for a meeting directly on our calendar using the link below.",
      "Pricing Info": "Pythia starts as low as $129/month per location. For detailed enterprise quotes covering 100+ stores, we recommend a quick discovery call.",
      "Talk to Sales": "I'd love to connect you with our sales team! The best way is to pick a time on our calendar so we're ready for you.",
      "How Pythia Works": "Pythia uses discreet audio intelligence devices at your checkout counter to analyze customer interactions. It then provides real-time insights to help managers catch issues where they start - at the register.",
      "Features": "Our core features include:\n- Voice to Ticket automation\n- 100% Interaction Scoring\n- Same-Day Manager Dashboards\n- Direct POS Integration (PDI, Verifone, Gilbarco)",
      "Privacy & Security": "Privacy is our foundation:\n- 100% Local processing (Edge AI)\n- No voice stored or sent to cloud\n- Ensures complete control over in-store data",
      "POS Integrations": "Pythia integrates seamlessly with leading Point-of-Sale systems including Verifone, Gilbarco, and PDI. This allows us to link transaction data directly with interaction insights.",
      "Audio Analytics Details": "Our Edge AI devices analyze checkout conversations in real-time. It detects tone, script compliance (like upselling), and friction points without recording or storing actual voices, ensuring total privacy.",
      "Hardware Requirements": "We provide proprietary Edge AI sensors that stick directly to the checkout counter. No servers or complex networking required, just a simple power connection.",
      "Voice-to-Ticket Automation": "If a customer mentions an operational issue (e.g., 'Pump 4 is broken'), Pythia instantly analyzes the voice intent and automatically creates a service ticket for your team. Zero manual entry needed.",
      "Performance Tracking": "Every shift generates a 'Daily Scorecard' for managers. It highlights top performers, missed upsell opportunities, and specific coaching moments to help you train your best talent.",
      "Deployment Timeline": "Our plug-and-play hardware allows for extremely fast deployment. Most stores are up and running within 48 hours of receiving the devices, with zero disruption to your daily operations."
    };

    if (localResponses[text]) {
      setTimeout(() => {
        const botReply: Message = {
          id: Date.now().toString(),
          type: "bot",
          text: localResponses[text],
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botReply]);
        setIsLoading(false);

        // Custom Hook for Bookings
        if (["Book a Demo", "Schedule a Meeting", "Talk to Sales"].includes(text)) {
          setMessages(prev => [...prev, {
            id: 'demo-hook-static',
            type: "bot",
            text: "You can book directly here:",
            timestamp: new Date(),
          }]);
        }
      }, 600);
      return;
    }

    if (globalApiCount >= 10) {
      setTimeout(() => {
        const limitReply: Message = {
          id: 'limit-hook',
          type: "bot",
          text: "You've asked some great questions! To keep our support focused, we limit the automated chat to 10 automated answers. Would you like to schedule a 15-minute live demo to get deeper technical answers?",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, limitReply]);
        setIsLoading(false);
      }, 1000);
      return;
    }

    setGlobalApiCount(prev => prev + 1);

    try {
      const result = await chatAction(
        text,
        messages.map(m => ({ role: m.type === 'bot' ? 'assistant' as const : 'user' as const, content: m.text }))
      );

      const botReply: Message = {
        id: Date.now().toString(),
        type: "bot",
        text: 'text' in result ? result.text : "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      console.error("Chat Error:", error);
    } finally {
      setIsLoading(false);
    }

    // --- CONVERSION TRIGGER ---
    if (userMessageCount === 4) { // This was the 5th user message
      setTimeout(() => {
        const demoMessage: Message = {
          id: 'demo-hook',
          type: "bot",
          text: "It looks like you have some great questions! Would you like to book a quick 15-minute live demo to see these features in action?",
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, demoMessage]);
      }, 1500);
    }
  };

  const handleNewConversation = () => {
    localStorage.removeItem("pythia_chat_messages");
    localStorage.removeItem("pythia_chat_count");
    localStorage.removeItem("pythia_chat_actions");
    setMessages([
      {
        id: "1",
        type: "bot",
        text: "Hi there! 👋 Welcome to Pythia. How can I help you today?",
        timestamp: new Date(),
      },
    ]);
    setUserMessageCount(0);
    setUsedQuickActions([]);
    setView("messages");
  };

  const quickActions = [
    "Book a Demo",
    "Schedule a Meeting",
    "Pricing Info",
    "Talk to Sales",
    "How Pythia Works",
    "Features",
    "Privacy & Security",
    "POS Integrations",
    "Audio Analytics Details",
    "Hardware Requirements",
    "Voice-to-Ticket Automation",
    "Performance Tracking",
    "Deployment Timeline",
  ];

  return (
    <div ref={chatContainerRef} className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed inset-0 sm:relative sm:inset-auto sm:mb-4 w-full h-[100dvh] sm:w-[400px] sm:h-[600px] bg-white rounded-none sm:rounded-[32px] shadow-none sm:shadow-[0_32px_80px_rgba(0,0,0,0.2)] border-0 sm:border sm:border-slate-100 flex flex-col overflow-hidden z-[120]"
          >
            {/* Dynamic Header */}
            <div className={`transition-all duration-300 bg-brand-navy flex-shrink-0 relative z-10 ${view === 'home' ? 'h-[180px] p-8 pt-10' : 'h-[72px] px-5 flex items-center'}`}>
              {view === "home" ? (
                <div className="space-y-4">
                  <button 
                    onClick={() => setIsOpen(false)} 
                    className="absolute top-4 right-4 p-2 text-white/80 hover:text-white sm:hidden z-20"
                    aria-label="Close Chat"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <div className="flex -space-x-3">
                    {[1, 2].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-brand-navy overflow-hidden bg-brand-teal shadow-md">
                        <div className="w-full h-full flex items-center justify-center scale-75">
                          <PythiaIcon isOpen={false} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="text-[32px] inline-block animate-bounce flex-shrink-0 mt-1">👋</span>
                      <div className="space-y-0.5">
                        <p className="text-[16px] sm:text-[17px] font-semibold text-white/90 leading-snug">We&apos;re online and ready to help you catch what&apos;s slipping.</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full flex items-center justify-between">
                  <button
                    onClick={() => setView("home")}
                    className="text-white/60 hover:text-white transition-colors flex items-center gap-1 -ml-1"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="text-sm font-bold">Messages</span>
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Container for content */}
            <div className="flex-1 relative bg-slate-50/50 flex flex-col min-h-0">
              <AnimatePresence mode="wait">
                {view === "home" ? (
                  <motion.div
                    key="home"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex-1 overflow-y-auto p-5 no-scrollbar relative z-20"
                  >
                    {/* Stacked Card (No Overlap) */}
                    <div className="relative z-30 bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-slate-100 group cursor-pointer active:scale-[0.98] transition-all hover:border-brand-teal/20"
                      onClick={handleNewConversation}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-extrabold text-slate-900 text-lg">New Conversation</h4>
                        <SendHorizontal className="w-5 h-5 text-brand-teal rotate-0 group-hover:translate-x-1 transition-all" />
                      </div>
                      <p className="text-slate-500 text-sm font-medium">We typically reply in a few minutes</p>
                    </div>

                    <div className="mt-8">
                      <div className="flex flex-wrap justify-center gap-2 animate-in fade-in duration-500 w-full">
                        {(() => {
                          const availableActions = quickActions.filter(action => !usedQuickActions.includes(action));
                          
                          if (availableActions.length > 0) {
                            return availableActions.slice(0, 7).map((action) => (
                              <button
                                key={action}
                                onClick={() => {
                                  setView("messages");
                                  handleSend(action);
                                }}
                                className="px-4 py-2 bg-white border border-slate-200 rounded-full text-[12px] font-bold text-brand-navy hover:border-brand-teal/40 hover:bg-slate-50 transition-all shadow-sm whitespace-nowrap"
                              >
                                {action}
                              </button>
                            ));
                          }
                          
                          return (
                            <div className="bg-brand-teal/10 rounded-2xl p-5 text-center border border-brand-teal/20 w-full mt-2">
                              <p className="text-[13px] font-medium text-brand-navy leading-relaxed">
                                I hope we cleared up most of your questions about Pythia! 🌟<br/><br/>
                                If you still have any doubts or need specific details, please feel free to use the messages section. Our AI bot is always here to help you. 💙
                              </p>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="chat"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="absolute inset-0 flex flex-col"
                  >
                    <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
                      <div className="text-center py-6">
                        <h4 className="text-[15px] font-bold text-slate-800">Start a new chat</h4>
                      </div>
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${msg.type === "user"
                              ? "bg-brand-navy text-white rounded-tr-none"
                              : "bg-white border border-slate-100 text-slate-700 shadow-sm rounded-tl-none"
                              }`}
                          >
                            <div style={{ whiteSpace: "pre-line" }}>
                              {msg.text}
                            </div>
                            {(msg.id === 'demo-hook' || msg.id === 'demo-hook-static' || msg.id === 'limit-hook') && (
                              <button
                                onClick={() => window.open('https://calendly.com/nick-pythiascorecard/new-meeting', '_blank')}
                                className="mt-3 w-full py-2 bg-brand-teal text-brand-navy font-bold rounded-lg text-xs hover:bg-brand-teal/90 transition-all flex items-center justify-center gap-2"
                              >
                                Book a Live Demo 🚀
                              </button>
                            )}
                          </div>
                        </div>
                      ))}


                      {/* Loading Indicator */}
                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                className="w-1.5 h-1.5 bg-slate-300 rounded-full"
                              />
                            ))}
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    <div className="p-4 bg-white border-t border-slate-100">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSend(inputValue);
                        }}
                        className="relative"
                      >
                        <input
                          type="text"
                          placeholder="Type a message..."
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-brand-teal/40 transition-colors text-slate-700"
                        />
                        <button
                          type="submit"
                          disabled={!inputValue.trim()}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-brand-navy text-white flex items-center justify-center disabled:opacity-30 transition-all hover:bg-slate-800"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Tabs */}
            <div className="bg-white border-t border-slate-100 px-8 py-4 flex justify-around items-center">
              <button
                onClick={() => setView("home")}
                className={`flex flex-col items-center gap-1 transition-all ${view === 'home' ? 'text-brand-teal scale-110' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <Home className="w-6 h-6" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Home</span>
              </button>
              <button
                onClick={() => setView("messages")}
                className={`flex flex-col items-center gap-1 transition-all ${view === 'messages' ? 'text-brand-teal scale-110' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <MessageSquare className="w-6 h-6" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Messages</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Tooltip */}
        <AnimatePresence>
          {!isOpen && isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.8 }}
              className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap px-4 py-2 bg-brand-navy text-white text-xs font-bold rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] pointer-events-none z-[110]"
            >
              <div className="flex items-center gap-2">
                <span>Pythia Chatbot. We&apos;re here to help! 👋</span>
                <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-brand-navy rotate-45" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!isOpen && (
          <motion.div
            animate={{ scale: [1, 1.4, 1.2, 1.5, 1], opacity: [0.3, 0.1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 bg-brand-teal rounded-full"
          />
        )}

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 relative z-10 ${isOpen ? "bg-white text-brand-navy" : "bg-brand-navy text-white"
            }`}
          aria-label="Open chat"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                className="flex items-center justify-center"
              >
                <PythiaIcon isOpen={false} />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-teal rounded-full border-2 border-brand-navy" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
