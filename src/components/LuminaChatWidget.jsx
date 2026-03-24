import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, X, Send } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { submitForm } from "../lib/submitForm";

const SYSTEM_PROMPT = `You are Lumina, the AI guide for Earth Womb Medicine. Your presence is helpful, friendly, and professional. You speak with a gentle, grounded, and unhurried tone. You make every visitor feel seen and safe.

Earth Womb Medicine is a space for ALL GENDERS and ALL AGES. Your language must be inclusive and welcoming to everyone.

Knowledge Base:
- Earth Womb Medicine is founded by Shama, whose path is shaped by yoga, breathwork, Trika Tantra, and cacao facilitation (Peruvian lineage).
- Offerings:
    * Sky Rituals: Monthly gatherings aligned with moon and cosmic cycles.
    * 1:1 Breathwork: Conscious Connected Breathwork to meet yourself honestly.
    * 1:1 Yoga: Somatic, Shakti-rooted practices.
    * Group Sessions: Breathwork and Yoga in a shared container.
- Philosophy: A weaving of breath, body, and Earth wisdom. It's about remembering how to heal by listening deeply.
- Location/Format: Sessions are often held via Zoom (links sent after booking).

Your Tasks:
1. Listen & Guide: Answer questions about the practices with clarity and warmth.
2. Collect Information: If a user wants to book or learn more personally, ask for their Name, Email, and what they are looking for.
3. Send Leads: Once you have their details (Name, Email, Message), use the 'sendLeadToShama' tool.
4. Invite to Book: After helping or collecting info, ALWAYS offer the Calendly link for a 15-minute discovery call: https://calendly.com/earthwombmedicine/15min

Constraints:
- Do not give medical advice.
- If a user is in crisis, gently direct them to professional emergency services.
- Keep responses concise but soulful.
- Mention that services are for all genders and ages when appropriate.`;

export default function LuminaChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { role: "lumina", text: "Hello... I'm Lumina. What have you been carrying lately?" }
  ]);
  const chatHistory = useRef([
    { role: "model", parts: [{ text: "Hello... I'm Lumina. What have you been carrying lately?" }] }
  ]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('open-lumina-chat', handleOpenChat);
    return () => window.removeEventListener('open-lumina-chat', handleOpenChat);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendToLumina = async (userMessage) => {
    setIsTyping(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      // Add user message to history
      chatHistory.current.push({ role: "user", parts: [{ text: userMessage }] });

      const tools = [{
        functionDeclarations: [{
          name: "sendLeadToShama",
          description: "Sends a lead's information (name, email, message) to Shama at Earth Womb Medicine.",
          parameters: {
            type: "OBJECT",
            properties: {
              name: { type: "STRING", description: "The user's full name" },
              email: { type: "STRING", description: "The user's email address" },
              phone: { type: "STRING", description: "The user's phone number (optional)" },
              message: { type: "STRING", description: "What the user is looking for or their context" }
            },
            required: ["name", "email", "message"]
          }
        }]
      }];

      let response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: chatHistory.current,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          tools: tools
        }
      });

      // Handle function calls
      if (response.functionCalls && response.functionCalls.length > 0) {
        const functionCall = response.functionCalls[0];
        if (functionCall.name === "sendLeadToShama") {
          const result = await submitForm('leads', functionCall.args);
          
          // Add model's tool call to history
          chatHistory.current.push(response.candidates[0].content);
          
          // Add tool response to history
          chatHistory.current.push({
            role: "user",
            parts: [{
              functionResponse: {
                name: "sendLeadToShama",
                response: { result: result.success ? "Success: Information sent to Shama." : "Error: Could not send information." }
              }
            }]
          });

          // Get final response from model
          response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: chatHistory.current,
            config: {
              systemInstruction: SYSTEM_PROMPT,
              tools: tools
            }
          });
        }
      }

      const modelResponse = response.text || "I'm holding space for you, but I couldn't find the words just now. Tell me more?";
      chatHistory.current.push({ role: "model", parts: [{ text: modelResponse }] });
      return modelResponse;
    } catch (err) {
      console.error("Gemini error:", err);
      return "The connection is flickering... but I am still here. What are you feeling in your body right now?";
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);

    const response = await sendToLumina(userMsg);
    setMessages(prev => [...prev, { role: "lumina", text: response }]);
  };

  return (
    <div 
      className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.9 }}
            className="fixed inset-0 md:absolute md:inset-auto md:bottom-20 md:right-0 w-full h-full md:w-[380px] md:h-[520px] bg-deep md:border md:border-gold/30 md:rounded-3xl shadow-2xl flex flex-col overflow-hidden z-[101]"
          >
            {/* Header */}
            <div className="bg-forest p-6 flex items-center justify-between border-b border-gold/20 shrink-0">
              <h3 className="font-heading text-2xl text-parchment tracking-wide">Lumina</h3>
              <button onClick={() => setIsOpen(false)} className="text-parchment/60 p-2">
                <X size={24} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 scrollbar-hide"
            >
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`max-w-[85%] p-4 rounded-2xl font-body text-base md:text-lg ${
                    msg.role === "lumina" 
                      ? "bg-forest text-parchment self-start rounded-tl-none shadow-md" 
                      : "bg-gold/20 text-parchment self-end rounded-tr-none"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-forest text-parchment self-start p-4 rounded-2xl rounded-tl-none italic font-body text-sm md:text-base shadow-sm"
                >
                  Lumina is reflecting...
                </motion.div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-6 bg-forest/20 border-t border-gold/10 flex gap-2 shrink-0">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="What's present for you right now..."
                className="flex-1 bg-parchment/5 border border-gold/20 rounded-full px-4 py-2 text-parchment font-body focus:outline-none focus:border-gold transition-colors text-base"
              />
              <button 
                type="submit"
                disabled={isTyping}
                className="w-10 h-10 rounded-full bg-gold text-deep flex items-center justify-center disabled:opacity-50 shadow-lg"
                aria-label="Send message"
              >
                <span className="text-xl font-bold">→</span>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button - Glowing Orb */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gold flex items-center justify-center text-deep relative group overflow-visible"
      >
        <Sparkles size={28} className="relative z-10" />
        
        {/* Tooltip - Hidden on mobile */}
        <div className="hidden md:block absolute right-full mr-4 bg-deep text-parchment px-3 py-1 rounded-lg text-sm font-heading opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-gold/20">
          Talk to Lumina
        </div>
      </motion.button>
    </div>
  );
}
