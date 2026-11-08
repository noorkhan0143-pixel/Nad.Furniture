import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, MessageCircle } from 'lucide-react';
import { UAE_LOCATIONS, WHATSAPP_NUMBER } from '../data/catalog';

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
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [productName, setProductName] = useState(initialProduct);
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');
  const [project, setProject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setProductName(initialProduct);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  const whatsappSummary = encodeURIComponent(
    `Bulk Quote Request:\nName: ${name}\nPhone: ${phone}\nEmail: ${email || 'N/A'}\nCompany: ${companyName || 'N/A'}\nProduct: ${productName || 'General Furniture'}\nQuantity: ${quantity || 'N/A'}\nLocation: ${location || 'UAE'}\nProject: ${project || 'N/A'}\nMessage: ${message || 'N/A'}`
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs"
      onClick={handleResetAndClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="bulk-quote-modal-title"
    >
      <div
        className="relative w-full max-w-[760px] rounded-lg bg-white p-6 md:p-8 shadow-2xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleResetAndClose}
          aria-label="Close Modal"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-md text-[#4A5568] hover:bg-[#EDF2F7] hover:text-[#1A202C] transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h2
              id="bulk-quote-modal-title"
              className="text-2xl font-bold text-[#1A202C] mb-2"
            >
              Quote Request Received
            </h2>
            <p className="text-sm text-[#4A5568] max-w-md mx-auto mb-6">
              Thank you, <span className="font-semibold text-[#1A202C]">{name}</span>. Our
              commercial sales team in Dubai will review your requirements and contact you
              shortly with factory-direct pricing and delivery schedules.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappSummary}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#25D366] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1ebe5d] transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                Send Details on WhatsApp Now
              </a>
              <button
                type="button"
                onClick={handleResetAndClose}
                className="inline-flex items-center justify-center rounded-md border border-[#CBD5E0] bg-white px-5 py-3 text-sm font-semibold text-[#2D3748] hover:bg-[#F7FAFC] transition-colors cursor-pointer"
              >
                Back to Catalog
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2
              id="bulk-quote-modal-title"
              className="text-[24px] md:text-[26px] font-bold text-[#b82105] text-center"
            >
              Request a Bulk Quote
            </h2>
            <p className="mt-1 mb-6 text-center text-[15px] text-[#555555]">
              Tell us what you need, and our team will contact you with pricing,
              availability, and delivery details.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Your Name *"
                  aria-label="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-[6px] border border-[#CBD5E0] bg-white px-3.5 py-2.5 text-[14px] text-[#1A202C] placeholder:text-[#718096] focus:border-[#b82105] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder="Email"
                  aria-label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-[6px] border border-[#CBD5E0] bg-white px-3.5 py-2.5 text-[14px] text-[#1A202C] placeholder:text-[#718096] focus:border-[#b82105] focus:outline-none"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone *"
                  aria-label="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-[6px] border border-[#CBD5E0] bg-white px-3.5 py-2.5 text-[14px] text-[#1A202C] placeholder:text-[#718096] focus:border-[#b82105] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Company Name"
                  aria-label="Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full rounded-[6px] border border-[#CBD5E0] bg-white px-3.5 py-2.5 text-[14px] text-[#1A202C] placeholder:text-[#718096] focus:border-[#b82105] focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Product Name"
                  aria-label="Product Name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full rounded-[6px] border border-[#CBD5E0] bg-white px-3.5 py-2.5 text-[14px] text-[#1A202C] placeholder:text-[#718096] focus:border-[#b82105] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Expected Quantity"
                  aria-label="Expected Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full rounded-[6px] border border-[#CBD5E0] bg-white px-3.5 py-2.5 text-[14px] text-[#1A202C] placeholder:text-[#718096] focus:border-[#b82105] focus:outline-none"
                />
                <select
                  aria-label="Select Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-[6px] border border-[#CBD5E0] bg-white px-3.5 py-2.5 text-[14px] text-[#1A202C] focus:border-[#b82105] focus:outline-none"
                >
                  <option value="" disabled>
                    Select Location
                  </option>
                  {UAE_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Company / Project"
                  aria-label="Company / Project"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  className="w-full rounded-[6px] border border-[#CBD5E0] bg-white px-3.5 py-2.5 text-[14px] text-[#1A202C] placeholder:text-[#718096] focus:border-[#b82105] focus:outline-none"
                />
              </div>

              <div>
                <textarea
                  rows={3}
                  placeholder="Message"
                  aria-label="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-[6px] border border-[#CBD5E0] bg-white px-3.5 py-2.5 text-[14px] text-[#1A202C] placeholder:text-[#718096] focus:border-[#b82105] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-[8px] bg-[#b82105] py-3 px-6 text-[16px] font-semibold text-white hover:bg-[#8f1904] transition-colors cursor-pointer"
              >
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
