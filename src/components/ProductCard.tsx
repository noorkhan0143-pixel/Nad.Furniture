import React from 'react';
import { Edit2 } from 'lucide-react';
import { ProductItem, buildWhatsAppUrl } from '../data/catalog';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useCatalog } from '../context/CatalogContext';

interface ProductCardProps {
  product: ProductItem;
  onSelect: (product: ProductItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { isOwner, openProductEditor } = useCatalog();

  return (
    <article className="group relative flex flex-col justify-between bg-white shadow-[0_15px_15px_-10px_rgba(0,0,0,0.05)] border border-[#EDF2F7] transition-transform duration-200 hover:-translate-y-0.5 rounded-lg overflow-hidden">
      {/* Owner Edit Floating Button */}
      {isOwner && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            openProductEditor(product);
          }}
          title="Edit Product"
          className="absolute top-2.5 right-2.5 z-20 inline-flex items-center gap-1 rounded-md bg-[#cf251d] px-2.5 py-1 text-xs font-semibold text-white shadow-md hover:bg-[#b01e17] transition-colors cursor-pointer"
        >
          <Edit2 className="h-3 w-3" />
          <span>Edit</span>
        </button>
      )}

      <div>
        <button
          type="button"
          onClick={() => onSelect(product)}
          className="block w-full aspect-square overflow-hidden bg-white text-left cursor-pointer relative"
        >
          <img
            src={product.image}
            alt={product.alt}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src !== product.fallbackImage) {
                target.src = product.fallbackImage;
              }
            }}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </button>

        <div className="p-4 pb-1">
          <span className="block text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1">
            {product.categoryLabel}
          </span>
          <h3 className="font-sans text-[16px] font-semibold leading-snug text-[#1A202C]">
            <button
              type="button"
              onClick={() => onSelect(product)}
              className="text-left hover:text-[#cf251d] transition-colors cursor-pointer line-clamp-2"
            >
              {product.title}
            </button>
          </h3>

          {/* Price display */}
          <div className="mt-2 flex items-baseline gap-2">
            {product.price ? (
              <span className="text-[16px] font-bold text-[#cf251d]">
                {product.price}
              </span>
            ) : (
              <span className="text-xs font-medium text-gray-500">
                Wholesale Quote on Request
              </span>
            )}
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                {product.originalPrice}
              </span>
            )}
            {product.minOrder && (
              <span className="text-[11px] text-gray-500">
                • {product.minOrder}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 pt-2">
        <a
          href={buildWhatsAppUrl(product.title)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Enquire about ${product.title} on WhatsApp`}
          className="flex w-full min-h-[44px] items-center justify-center gap-[7px] rounded-[5px] bg-[#25d366] px-2 py-2.5 text-[14px] font-bold leading-[1.2] text-white hover:bg-[#1ebe5d] transition-colors cursor-pointer"
        >
          <WhatsAppIcon className="h-5 w-5 shrink-0" />
          <span>Enquire on WhatsApp</span>
        </a>
      </div>
    </article>
  );
};
