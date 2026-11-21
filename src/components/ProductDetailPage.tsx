import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { ProductItem, buildWhatsAppUrl } from '../data/catalog';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useCatalog } from '../context/CatalogContext';

interface Props {
  product: ProductItem;
  onBack: () => void;
  onRequestQuote: (title: string) => void;
}

export const ProductDetailPage: React.FC<Props> = ({ product, onBack, onRequestQuote }) => {
  const { isOwner, openProductEditor } = useCatalog();
  const location = useLocation();
  const navigate = useNavigate();
  const requestedTab = new URLSearchParams(location.search).get('tab');
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>(requestedTab === 'reviews' ? 'reviews' : 'description');
  useEffect(() => {
    setActiveTab(requestedTab === 'reviews' ? 'reviews' : 'description');
  }, [requestedTab, product.id]);
  const selectTab = (tab: 'description' | 'reviews') => {
    setActiveTab(tab);
    navigate('/?product=' + encodeURIComponent(product.id) + '&tab=' + tab);
  };
  const [quantity, setQuantity] = useState(1);

  return (
    <section className="min-h-[70vh] bg-white py-8 md:py-12 px-4 sm:px-6">
      <div className="mx-auto max-w-[1180px]">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-gray-500"><button type="button" onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="cursor-pointer hover:text-[#cf251d]">Home</button><span className="mx-2">/</span><span className="font-semibold text-[#1A202C]">{product.title}</span></nav>
        <div className="mb-7 flex items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <button type="button" onClick={onBack} className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#cf251d]">
            <ArrowLeft className="h-4 w-4" /> Back to products
          </button>
          {isOwner && <button type="button" onClick={() => openProductEditor(product)} className="rounded-md bg-[#cf251d] px-3 py-2 text-xs font-semibold text-white">Edit Product</button>}
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          <div className="overflow-hidden rounded-lg border border-gray-100 bg-[#F7FAFC]">
            <img src={product.image} alt={product.alt} className="aspect-square w-full object-contain" onError={(e) => { if (e.currentTarget.src !== product.fallbackImage) e.currentTarget.src = product.fallbackImage; }} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">{product.categoryLabel}</p>
            <h1 className="mt-2 text-2xl font-bold leading-snug text-[#1A202C] md:text-3xl">{product.title}</h1>
            <h2 className="mt-6 mb-3 text-xs font-bold uppercase tracking-wider text-gray-700">Specifications &amp; Key Features</h2>
            <ul className="space-y-2">
              {(product.specs || []).map((spec, i) => <li key={i} className="flex items-start gap-2 text-sm leading-6 text-[#4A5568]"><Check className="mt-1 h-4 w-4 shrink-0 text-[#cf251d]" /><span>{spec}</span></li>)}
            </ul>
            <div className="mt-7 flex items-center gap-3">
              <label htmlFor="product-quantity" className="text-sm font-medium text-gray-700">Quantity</label>
              <input id="product-quantity" type="number" min="1" value={quantity} onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))} className="h-10 w-20 rounded border border-gray-300 px-2 text-center" />
            </div>
            <a href={buildWhatsAppUrl(product.title, quantity)} target="_blank" rel="noopener noreferrer" className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-5 py-3 text-sm font-bold text-white hover:bg-[#1ebe5d]">
              <WhatsAppIcon className="h-5 w-5" /> Enquire on WhatsApp
            </a>
            <button type="button" onClick={() => onRequestQuote(product.title)} className="mt-2 w-full rounded-md border border-[#cf251d] px-5 py-3 text-sm font-semibold text-[#cf251d] hover:bg-[#cf251d] hover:text-white">Request a Furniture Quote</button>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-6">
          <div className="flex gap-7 border-b border-gray-200" role="tablist" aria-label="Product information">
            <button type="button" role="tab" aria-selected={activeTab === 'description'} onClick={() => selectTab('description')} className={activeTab === 'description' ? 'border-b-2 border-[#cf251d] pb-3 text-sm font-semibold text-[#cf251d]' : 'pb-3 text-sm font-semibold text-gray-500'}>Description</button>
            <button type="button" role="tab" aria-selected={activeTab === 'reviews'} onClick={() => selectTab('reviews')} className={activeTab === 'reviews' ? 'border-b-2 border-[#cf251d] pb-3 text-sm font-semibold text-[#cf251d]' : 'pb-3 text-sm font-semibold text-gray-500'}>Reviews (0)</button>
          </div>
          {activeTab === 'description' ? (
            <div className="max-w-4xl space-y-4 py-6 text-sm leading-7 text-[#4A5568]">
              <h2 className="text-xl font-bold text-[#1A202C]">{product.title}</h2>
              {product.description ? <div className="whitespace-pre-line">{product.description}</div> : <p className="text-gray-600">Product-specific description is being verified against the matching NAD Furniture catalogue page. Confirmed specifications are shown above; unverified product claims are not added.</p>}
              {product.specs?.length > 0 && <><h3 className="pt-2 font-bold text-[#1A202C]">Key Features</h3><ul className="list-disc space-y-1 pl-5">{product.specs.map((spec, i) => <li key={i}>{spec}</li>)}</ul></>}
            </div>
          ) : <div className="py-7 text-sm text-[#4A5568]">There are no reviews yet.</div>}
        </div>
      </div>
    </section>
  );
};
