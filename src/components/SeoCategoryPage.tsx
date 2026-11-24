import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductItem } from '../data/catalog';
import { ProductCard } from './ProductCard';

export interface SeoCategoryConfig {
  slug: string; title: string; h1: string; description: string; intro: string; categories: string[];
  sections?: { heading: string; body: string }[];
  faqs?: { question: string; answer: string }[];
}
interface Props { config: SeoCategoryConfig; products: ProductItem[]; }

const relatedPages = [
  { href: '/steel-bunk-beds-uae/', label: 'Steel Bunk Beds' },
  { href: '/steel-lockers-uae/', label: 'Steel Lockers' },
  { href: '/mattresses-uae/', label: 'Mattresses' },
  { href: '/beds-uae/', label: 'Beds' },
  { href: '/wardrobes-uae/', label: 'Wardrobes' },
  { href: '/office-furniture-uae/', label: 'Office Furniture' },
  { href: '/school-furniture-uae/', label: 'School Furniture' },
  { href: '/metal-beds-uae/', label: 'Metal Beds' },
];

export const SeoCategoryPage: React.FC<Props> = ({ config, products }) => {
  const navigate = useNavigate();
  const categoryProducts = products.filter((product) => config.categories.includes(product.category));
  return (
    <section className="min-h-[70vh] bg-white py-10 md:py-14">
      <div className="mx-auto max-w-[1290px] px-6">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
          <a href="/" className="hover:text-[#b82105]">Home</a><span className="mx-2">/</span>
          <span className="font-semibold text-[#1A202C]">{config.h1}</span>
        </nav>
        <header className="max-w-4xl border-b border-gray-100 pb-7">
          <h1 className="text-[28px] font-bold leading-tight text-[#1A202C] sm:text-[36px]">{config.h1}</h1>
          <p className="mt-4 text-[15px] leading-7 text-[#4A5568] sm:text-base">{config.intro}</p>
          <p className="mt-3 text-sm leading-6 text-[#4A5568]">For product details, bulk orders and project quotations, contact NAD Furniture in Dubai, UAE.</p>
          <a href="https://wa.me/971506316560" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex rounded-md bg-[#b82105] px-5 py-3 text-sm font-semibold text-white hover:bg-[#8f1a05]">Request a Wholesale Quote</a>
        </header>
        <div className="mt-9">
          <div className="mb-5 flex items-end justify-between gap-3 border-b border-[#EDF2F7] pb-3">
            <h2 className="text-xl font-bold text-[#1A202C]">Available Products</h2>
            <span className="text-xs text-gray-500">{categoryProducts.length} products</span>
          </div>
          {categoryProducts.length ? (
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {categoryProducts.map((product) => <ProductCard key={product.id} product={product} onSelect={(item) => navigate('/?product=' + encodeURIComponent(item.id))} />)}
            </div>
          ) : <p className="rounded-lg border border-gray-100 p-6 text-sm text-gray-600">Product details are being updated. Contact NAD Furniture for current availability and specifications.</p>}
        </div>
        {config.sections?.length ? (
          <section className="mt-12 max-w-4xl space-y-8" aria-label="Product information">
            {config.sections.map((section) => (
              <article key={section.heading}>
                <h2 className="text-xl font-bold text-[#1A202C]">{section.heading}</h2>
                <p className="mt-3 text-[15px] leading-7 text-[#4A5568]">{section.body}</p>
              </article>
            ))}
          </section>
        ) : null}
        {config.faqs?.length ? (
          <section className="mt-12 max-w-4xl border-t border-gray-100 pt-8" aria-labelledby="category-faq-heading">
            <h2 id="category-faq-heading" className="text-xl font-bold text-[#1A202C]">Frequently Asked Questions</h2>
            <div className="mt-5 divide-y divide-gray-200">
              {config.faqs.map((faq) => (
                <details key={faq.question} className="py-4">
                  <summary className="cursor-pointer text-base font-semibold text-[#1A202C]">{faq.question}</summary>
                  <p className="mt-3 text-[15px] leading-7 text-[#4A5568]">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        ) : null}
        <section className="mt-12 border-t border-gray-100 pt-7">
          <h2 className="text-lg font-bold text-[#1A202C]">Explore More NAD Furniture Categories</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {relatedPages.filter((page) => page.href !== '/' + config.slug + '/').map((page) => <a key={page.href} href={page.href} className="rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-[#2D3748] hover:border-[#b82105] hover:text-[#b82105]">{page.label}</a>)}
          </div>
        </section>
      </div>
    </section>
  );
};
