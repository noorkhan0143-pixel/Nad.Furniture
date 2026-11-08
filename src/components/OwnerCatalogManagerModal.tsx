import React, { useState } from 'react';
import { X, Search, Plus, Edit2, Trash2, Download, Copy, Check, RotateCcw } from 'lucide-react';
import { useCatalog } from '../context/CatalogContext';
import { ProductItem } from '../data/catalog';

export const OwnerCatalogManagerModal: React.FC = () => {
  const {
    isManagerOpen,
    closeManager,
    products,
    openProductEditor,
    deleteProduct,
    resetToDefaults,
    exportCatalogJson,
    downloadCatalogFile,
    isOwner,
  } = useCatalog();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copied, setCopied] = useState(false);

  if (!isManagerOpen || !isOwner) return null;

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.specs.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (p.price && p.price.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCat =
      selectedCategory === 'all' ||
      p.category === selectedCategory ||
      (selectedCategory === 'beds' && ['beds', 'king-beds', 'queen-beds', 'double-beds', 'single-beds'].includes(p.category)) ||
      (selectedCategory === 'office-furniture' && ['office-tables', 'office-workstation', 'office-furniture'].includes(p.category));
    return matchesSearch && matchesCat;
  });


  const handleCopyJson = () => {
    const json = exportCatalogJson();
    navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = (product: ProductItem) => {
    if (confirm(`Are you sure you want to delete "${product.title}"?`)) {
      deleteProduct(product.id);
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all products to the original factory catalog? Any custom edits will be replaced.')) {
      resetToDefaults();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3 sm:p-5 backdrop-blur-xs"
      onClick={closeManager}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative flex flex-col w-full max-w-5xl rounded-2xl bg-white shadow-2xl border border-gray-100 max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 bg-gray-50/50">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <span>Catalog & Inventory Manager</span>
              <span className="rounded-full bg-[#cf251d]/10 px-2.5 py-0.5 text-xs font-semibold text-[#cf251d]">
                {products.length} Items
              </span>
            </h2>
            <p className="text-xs text-gray-500">
              Manage product images, wholesale pricing, and bullet specifications.
            </p>
          </div>
          <button
            type="button"
            onClick={closeManager}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-200/60 hover:text-gray-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-4 sm:px-6 border-b border-gray-100 flex flex-wrap gap-3 items-center justify-between bg-white">
          <div className="flex flex-wrap gap-2 items-center flex-1 min-w-[280px]">
            <div className="relative flex-1 min-w-[180px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products by title, price, or spec..."
                className="w-full rounded-lg border border-gray-300 py-1.5 pl-9 pr-3 text-xs focus:border-[#cf251d] focus:outline-none"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-lg border border-gray-300 py-1.5 px-3 text-xs focus:border-[#cf251d] focus:outline-none bg-white"
            >
              <option value="all">All Categories ({products.length})</option>
              <option value="bunk-beds">Bunk Beds</option>
              <option value="steel-lockers">Steel Lockers & Cabinets</option>
              <option value="mattress">Camp & Medicated Mattresses</option>
              <option value="office-tables">Office Tables & Desks</option>
              <option value="office-workstation">Office Workstations</option>
              <option value="wardrobe">Wardrobes</option>
              <option value="beds">All Bedroom Beds</option>
              <option value="king-beds">King Size Beds</option>
              <option value="queen-beds">Queen Size Beds</option>
              <option value="double-beds">Double Beds</option>
              <option value="single-beds">Single Beds</option>
            </select>

          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => openProductEditor(null)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#cf251d] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#b01e17] transition-colors shadow-sm cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add New Product</span>
            </button>
            <button
              type="button"
              onClick={handleCopyJson}
              className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-gray-400" />}
              <span>{copied ? 'Copied' : 'Copy JSON'}</span>
            </button>
            <button
              type="button"
              onClick={downloadCatalogFile}
              className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <Download className="h-3.5 w-3.5 text-gray-400" />
              <span>Export</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              title="Reset to initial factory defaults"
              className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50/50 px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Product List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 divide-y divide-gray-100">
          {filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-sm text-gray-500">
              No products found matching your search.
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/70 p-2 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.alt}
                      onError={(e) => {
                        if (e.currentTarget.src !== product.fallbackImage) {
                          e.currentTarget.src = product.fallbackImage;
                        }
                      }}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                        {product.categoryLabel}
                      </span>
                      {product.tag && (
                        <span className="rounded bg-amber-100 px-1.5 py-0.2 text-[10px] font-bold text-amber-800">
                          {product.tag}
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-gray-900 truncate">{product.title}</h4>
                    <p className="text-xs text-gray-500">
                      {product.price ? (
                        <span className="font-semibold text-[#cf251d]">{product.price}</span>
                      ) : (
                        <span className="italic text-gray-400">Price on request</span>
                      )}
                      {product.minOrder && <span className="ml-2 text-gray-400">({product.minOrder})</span>}
                      <span className="ml-2 text-gray-400">• {product.specs?.length || 0} specifications</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    type="button"
                    onClick={() => openProductEditor(product)}
                    className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:border-[#cf251d] hover:text-[#cf251d] transition-colors cursor-pointer"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(product)}
                    className="inline-flex items-center justify-center rounded-lg border border-gray-200 p-1.5 text-gray-400 hover:border-red-300 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                    title="Delete product"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 px-6 py-3 bg-gray-50 flex items-center justify-between text-xs text-gray-500">
          <span>Showing {filteredProducts.length} of {products.length} products</span>
          <button
            type="button"
            onClick={closeManager}
            className="rounded-lg bg-gray-900 px-4 py-1.5 font-semibold text-white hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
