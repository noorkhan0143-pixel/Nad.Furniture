import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, MessageCircle, Mail } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/catalog';
import { WhatsAppIcon } from './WhatsAppIcon';

interface BulkQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: string;
}

export const BulkQuoteModal: React.FC<BulkQuoteModalProps> = ({
  isOpen,
  onClose,
  initialProduct = '',
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [requirement, setRequirement] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialProduct) {
      setRequirement(`Looking for quotation on: ${initialProduct}`);
    } else {
      setRequirement('');
    }
  }, [initialProduct]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const buildWhatsAppText = () => {
    return encodeURIComponent(
      `*Furniture Quote Request - NAD Furniture UAE*\n\n` +
      `*Name:* ${name.trim() || 'N/A'}\n` +
      `*Phone:* ${phone.trim() || 'N/A'}\n` +
      (email.trim() ? `*Email:* ${email.trim()}\n` : '') +
      `*Requirement:* ${requirement.trim() || 'General furniture quote inquiry'}`
    );
  };

  const buildEmailHref = () => {
    const subject = encodeURIComponent(`Furniture Quote Request from ${name.trim() || 'Customer'}`);
    const body = encodeURIComponent(
      `Dear NAD Furniture Team,\n\n` +
      `I would like to request a furniture quote with the following details:\n\n` +
      `• Name: ${name.trim() || 'N/A'}\n` +
      `• Phone: ${phone.trim() || 'N/A'}\n` +
      (email.trim() ? `• Email: ${email.trim()}\n` : '') +
      `• Requirement:\n${requirement.trim() || 'General furniture quote inquiry'}\n\n` +
      `Please contact me at your earliest convenience with pricing and availability.\n\n` +
      `Best regards,\n${name.trim()}`
    );
    return `mailto:info@NAD.furniture?subject=${subject}&body=${body}`;
  };

  const handleSendViaWhatsApp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppText()}`;
    window.open(url, '_blank');
    setSubmitted(true);
  };

  const handleSendViaEmail = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('Please enter your name and phone number to send a quote.');
      return;
    }
    window.location.href = buildEmailHref();
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs"
      onClick={handleResetAndClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="furniture-quote-modal-title"
    >
      <div
        className="relative w-full max-w-[680px] rounded-[10px] bg-white shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar matching screenshot */}
        <div className="bg-[#131313] px-6 py-5 text-center relative border-b border-white/10 shrink-0">
          <h2
            id="furniture-quote-modal-title"
            className="text-[22px] sm:text-[26px] font-bold text-white tracking-tight leading-snug"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Request a Furniture Quote
          </h2>
          <button
            type="button"
            onClick={handleResetAndClose}
            aria-label="Close"
            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-md text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {submitted ? (
            <div className="py-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#1A202C] mb-2">
                Quote Request Ready
              </h3>
              <p className="text-[15px] text-[#4A5568] max-w-md mx-auto mb-6">
                Thank you, <span className="font-semibold text-[#1A202C]">{name}</span>. You can dispatch your quote details directly through WhatsApp or Email:
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppText()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-[#25D366] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1ebe5d] transition-colors"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  <span>Send via WhatsApp (+971 50 631 6560)</span>
                </a>
                <a
                  href={buildEmailHref()}
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-[#131313] px-5 py-3 text-sm font-semibold text-white hover:bg-[#b82105] transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>Send via Email (info@NAD.furniture)</span>
                </a>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="text-sm font-medium text-gray-500 hover:text-[#b82105] transition-colors cursor-pointer"
                >
                  Close &amp; Back to Catalog
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#4A5568] mb-6">
                Need furniture for your office, labour camp, staff accommodation, home or commercial project? Send us your requirements and our team will contact you with pricing and availability.
              </p>

              <form onSubmit={handleSendViaWhatsApp} className="space-y-4">
                {/* 1. Your Name * */}
                <div>
                  <label
                    htmlFor="quote-input-name"
                    className="block text-[14px] font-medium text-[#1A202C] mb-1.5"
                  >
                    Your Name <span className="text-[#c2171a] font-bold">*</span>
                  </label>
                  <input
                    id="quote-input-name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-[6px] border border-[#CBD5E0] bg-white px-3.5 py-2.5 text-[14px] text-[#1A202C] placeholder:text-[#A0AEC0] focus:border-[#b82105] focus:outline-none transition-colors"
                  />
                </div>

                {/* 2. Phone * */}
                <div>
                  <label
                    htmlFor="quote-input-phone"
                    className="block text-[14px] font-medium text-[#1A202C] mb-1.5"
                  >
                    Phone <span className="text-[#c2171a] font-bold">*</span>
                  </label>
                  <input
                    id="quote-input-phone"
                    type="tel"
                    required
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-[6px] border border-[#CBD5E0] bg-white px-3.5 py-2.5 text-[14px] text-[#1A202C] placeholder:text-[#A0AEC0] focus:border-[#b82105] focus:outline-none transition-colors"
                  />
                </div>

                {/* 3. Email */}
                <div>
                  <label
                    htmlFor="quote-input-email"
                    className="block text-[14px] font-medium text-[#1A202C] mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    id="quote-input-email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-[6px] border border-[#CBD5E0] bg-white px-3.5 py-2.5 text-[14px] text-[#1A202C] placeholder:text-[#A0AEC0] focus:border-[#b82105] focus:outline-none transition-colors"
                  />
                </div>

                {/* 4. Your Requirement */}
                <div>
                  <label
                    htmlFor="quote-input-requirement"
                    className="block text-[14px] font-medium text-[#1A202C] mb-1.5"
                  >
                    Your Requirement
                  </label>
                  <textarea
                    id="quote-input-requirement"
                    rows={4}
                    placeholder="Tell us what furniture you need, quantity & delivery location"
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    className="w-full rounded-[6px] border border-[#CBD5E0] bg-white px-3.5 py-2.5 text-[14px] text-[#1A202C] placeholder:text-[#A0AEC0] focus:border-[#b82105] focus:outline-none resize-y transition-colors"
                  />
                </div>

                {/* Submit Actions: Main Red Button + Direct WhatsApp & Email Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    type="submit"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center rounded-[6px] bg-[#b82105] py-3 px-6 text-[15px] font-semibold text-white shadow-sm hover:bg-[#8f1904] transition-colors cursor-pointer"
                  >
                    Request a Quote
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSendViaWhatsApp()}
                    className="inline-flex items-center justify-center gap-2 rounded-[6px] bg-[#25D366] py-3 px-4 text-[14px] font-semibold text-white hover:bg-[#1ebe5d] transition-colors cursor-pointer"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    <span>via WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSendViaEmail}
                    className="inline-flex items-center justify-center gap-2 rounded-[6px] border border-[#CBD5E0] bg-white py-3 px-4 text-[14px] font-semibold text-[#2D3748] hover:border-[#b82105] hover:text-[#b82105] transition-colors cursor-pointer"
                  >
                    <Mail className="h-4 w-4" />
                    <span>via Email</span>
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
