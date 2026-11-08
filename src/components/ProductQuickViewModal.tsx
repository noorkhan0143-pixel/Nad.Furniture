import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, Check, Edit2 } from 'lucide-react';
import { ProductItem, buildWhatsAppUrl } from '../data/catalog';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useCatalog } from '../context/CatalogContext';

interface ProductQuickViewModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onRequestQuote: (productTitle: string) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onRequestQuote,
}) => {
  const { isOwner, openProductEditor } = useCatalog();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && product) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-modal-title"
    >
      <div
        className="relative w-full max-w-3xl rounded-xl bg-white p-6 md:p-8 shadow-2xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
          {isOwner && (
            <button
              type="button"
              onClick={() => {
                onClose();
                openProductEditor(product);
              }}
              className="inline-flex items-center gap-1 rounded-md bg-[#cf251d] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#b01e17] transition-colors cursor-pointer"
            >
              <Edit2 className="h-3.5 w-3.5" />
              <span>Edit Product</span>
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Product Details"
            className="flex h-9 w-9 items-center justify-center rounded-md text-[#4A5568] hover:bg-[#EDF2F7] hover:text-[#1A202C] transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
          <div className="aspect-square w-full overflow-hidden rounded-lg bg-[#F7FAFC] border border-gray-100">
            <img
              src={product.image}
              alt={product.alt}
              referrerPolicy="no-referrer"
              onError={(e) => {
                if (e.currentTarget.src !== product.fallbackImage) {
                  e.currentTarget.src = product.fallbackImage;
                }
              }}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#718096]">
                {product.categoryLabel}
              </span>
            </div>

            <h2
              id="pdp-modal-title"
              className="mt-1 text-2xl font-bold text-[#1A202C] leading-snug"
            >
              {product.title}
            </h2>

            {/* Price section */}
            <div className="mt-3 flex items-baseline gap-3">
              {product.price ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#cf251d]">{product.price}</span>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Wholesale
                  </span>
                </div>
              ) : (
                <span className="text-base font-semibold text-[#cf251d]">
                  Wholesale Price on Request
                </span>
              )}
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {product.originalPrice}
                </span>
              )}
              {product.minOrder && (
                <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                  {product.minOrder}
                </span>
              )}
            </div>

            <div className="mt-4 rounded-lg border border-[#e5e7eb] bg-[#f7f8f9] px-4 py-3">
              <p className="text-xs text-[#666666]">Factory-Direct Wholesale Supply</p>
              <p className="mt-0.5 text-sm font-semibold text-[#1A202C]">
                Direct UAE Delivery &amp; Assembly Across All Emirates
              </p>
            </div>

            {/* Specifications */}
            <div className="mt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                Specifications:
              </h3>
              <ul className="space-y-2">
                {product.specs && product.specs.length > 0 ? (
                  product.specs.map((spec, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-[#4A5568]"
                    >
                      <Check className="h-4 w-4 text-[#cf251d] shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-xs text-gray-400 italic">No specific details added yet.</li>
                )}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-[#EDF2F7]">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm font-medium text-[#2D3748]">Quantity:</span>
                <div className="inline-flex items-center">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-11 w-11 items-center justify-center rounded-l-[6px] border border-[#d9d9d9] bg-[#f5f5f5] text-[#1A202C] hover:bg-[#e9e9e9] transition-colors cursor-pointer"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))
                    }
                    aria-label="Quantity"
                    className="h-11 w-16 border-y border-[#d9d9d9] text-center text-base font-semibold text-[#1A202C] tabular-nums focus:outline-none"
                  />
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex h-11 w-11 items-center justify-center rounded-r-[6px] border border-[#d9d9d9] bg-[#f5f5f5] text-[#1A202C] hover:bg-[#e9e9e9] transition-colors cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <a
                href={buildWhatsAppUrl(product.title, quantity)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full min-h-[50px] items-center justify-center gap-2.5 rounded-[6px] bg-[#25D366] px-5 py-3 text-[15px] font-bold text-white hover:bg-[#1ebe5d] transition-colors cursor-pointer"
              >
                <WhatsAppIcon className="h-5 w-5 shrink-0" />
                <span>Enquire on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onRequestQuote(product.title);
                }}
                className="mt-2.5 flex w-full min-h-[44px] items-center justify-center rounded-[6px] border border-[#cf251d] bg-white px-5 py-2.5 text-sm font-semibold text-[#cf251d] hover:bg-[#cf251d] hover:text-white transition-colors cursor-pointer"
              >
                Request Formal Bulk Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
