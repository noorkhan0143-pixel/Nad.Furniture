import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

interface AiAssistantChatProps {
  onOpenBulkQuote: () => void;
}

const QUICK_PROMPTS = [
  'Bunk bed bulk supply',
  'Steel lockers & wardrobes',
  'UAE delivery & quote',
];

function getStaticFallbackReply(query: string): string {
  const q = query.toLowerCase();
  if (q.includes('bunk') || q.includes('bed')) {
    return 'We manufacture heavy-duty 2-tier and 3-tier steel bunk beds (including 27 kg & 32 kg models) and single beds for labour camps and staff accommodations. Click "Request Bulk Quote" below or message +971 50 631 6560 on WhatsApp for wholesale pricing.';
  }
  if (q.includes('locker') || q.includes('wardrobe') || q.includes('cabinet')) {
    return 'We supply 2-door, 3-door, 4-door, 6-door, 8-door, and 12-door steel lockers as well as 2-door and 3-door wooden wardrobes. Reach us at info@nad.furniture or +971 50 631 6560 for bulk project rates.';
  }
  if (q.includes('office') || q.includes('desk') || q.includes('workstation')) {
    return 'Our office furniture range includes executive tables, tables with drawers, L-shaped desks, and 4-person & 6-person modular workstations with UAE-wide delivery.';
  }
  return 'NAD Furniture UAE (NAD Building, Naif Street, Dubai) offers factory-direct wholesale furniture with prompt delivery across all UAE emirates. Contact info@nad.furniture or WhatsApp +971 50 631 6560 for an instant quote.';
}

export const AiAssistantChat: React.FC<AiAssistantChatProps> = ({
  onOpenBulkQuote,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: 'Hello! Welcome to NAD Furniture UAE. Ask me about our steel bunk beds, lockers, wardrobes, office furniture, or bulk project quotes.',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  const sendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: 'user', text: trimmed },
    ];
    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'model',
            text: getStaticFallbackReply(trimmed),
          },
        ]);
        return;
      }

      const data = (await res.json()) as { reply?: string; error?: string };

      if (!res.ok || !data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'model',
            text:
              data.error ||
              getStaticFallbackReply(trimmed),
          },
        ]);
      } else {
        setMessages((prev) => [...prev, { role: 'model', text: data.reply! }]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: getStaticFallbackReply(trimmed),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void sendMessage(input);
  };

  return (
    <>
      {/* Floating AI Assistant Button positioned below the WhatsApp logo */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open NAD Furniture AI Assistant"
          title="AI Furniture Assistant"
          className="fixed bottom-[16px] lg:bottom-[140px] right-[10px] z-40 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#b82105] text-white shadow-lg hover:bg-[#8a1803] transition-colors cursor-pointer"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      )}

      {/* Chat Drawer */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="NAD Furniture AI Assistant"
          className="fixed bottom-[16px] lg:bottom-[140px] right-[10px] z-50 flex w-[calc(100vw-20px)] max-w-[370px] flex-col overflow-hidden rounded-lg border border-[#2D3748] bg-white shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-[#131313] px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-extrabold tracking-tight text-[#cf251d]">
                NAD
              </span>
              <span className="text-sm font-semibold text-white">
                Furniture Assistant
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close AI Assistant"
              className="flex h-8 w-8 items-center justify-center rounded-md text-[#CBD5E0] hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto p-4 max-h-[340px] bg-white">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-[#b82105] text-white'
                      : 'bg-[#f7f8f9] text-[#1A202C] border border-[#e5e7eb]'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-lg border border-[#e5e7eb] bg-[#f7f8f9] px-3.5 py-2 text-xs text-[#718096]">
                  Typing...
                </div>
              </div>
            )}

            {messages.length === 1 && !isLoading && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => void sendMessage(prompt)}
                    className="rounded-md border border-[#e5e7eb] bg-[#f7f8f9] px-2.5 py-1 text-xs font-medium text-[#2D3748] hover:border-[#b82105] hover:text-[#b82105] transition-colors cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Bulk Quote bar */}
          <div className="flex items-center justify-between border-t border-[#EDF2F7] bg-[#f7f8f9] px-4 py-1.5 text-xs text-[#4A5568]">
            <span>Need a formal quotation?</span>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onOpenBulkQuote();
              }}
              className="font-semibold text-[#b82105] hover:underline cursor-pointer"
            >
              Request Bulk Quote
            </button>
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-[#EDF2F7] bg-white p-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about bunk beds, lockers, delivery..."
              aria-label="Ask NAD Furniture Assistant"
              className="flex-1 rounded-md border border-[#e5e7eb] px-3 py-2 text-sm text-[#1A202C] placeholder:text-[#718096] focus:border-[#b82105] focus:outline-none"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#b82105] text-white hover:bg-[#8a1803] disabled:opacity-50 transition-colors cursor-pointer"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
