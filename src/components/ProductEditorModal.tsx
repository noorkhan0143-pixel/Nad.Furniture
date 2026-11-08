import React, { useState, useEffect, useRef } from 'react';
import { X, Upload, Plus, Trash2, Check, AlertCircle, Image as ImageIcon, Sparkles } from 'lucide-react';
import { ProductItem, ProductCategory } from '../data/catalog';
import { useCatalog } from '../context/CatalogContext';

const CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: 'bunk-beds', label: 'Bunk Beds' },
  { value: 'steel-lockers', label: 'Steel Lockers' },
  { value: 'wardrobe', label: 'Wardrobes' },
  { value: 'office-furniture', label: 'Office Furniture' },
  { value: 'beds', label: 'Beds & Accommodation' },
];

export const ProductEditorModal: React.FC = () => {
  const { isEditorOpen, editingProduct, closeProductEditor, updateProduct, addProduct, isOwner } = useCatalog();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ProductCategory>('bunk-beds');
  const [categoryLabel, setCategoryLabel] = useState('Bunk Beds');
  const [image, setImage] = useState('');
  const [alt, setAlt] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [minOrder, setMinOrder] = useState('');
  const [tag, setTag] = useState<string>('');
  const [specs, setSpecs] = useState<string[]>([]);
  const [newSpecText, setNewSpecText] = useState('');
  const [inStock, setInStock] = useState(true);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const isNewProduct = editingProduct === null;

  useEffect(() => {
    if (editingProduct) {
      setTitle(editingProduct.title || '');
      setCategory(editingProduct.category || 'bunk-beds');
      setCategoryLabel(editingProduct.categoryLabel || 'Bunk Beds');
      setImage(editingProduct.image || '');
      setAlt(editingProduct.alt || editingProduct.title || '');
      setPrice(editingProduct.price || '');
      setOriginalPrice(editingProduct.originalPrice || '');
      setMinOrder(editingProduct.minOrder || '');
      setTag(editingProduct.tag || '');
      setSpecs(editingProduct.specs && editingProduct.specs.length > 0 ? [...editingProduct.specs] : []);
      setInStock(editingProduct.inStock !== false);
    } else if (isNewProduct) {
      setTitle('');
      setCategory('bunk-beds');
      setCategoryLabel('Bunk Beds');
      setImage('');
      setAlt('');
      setPrice('');
      setOriginalPrice('');
      setMinOrder('');
      setTag('');
      setSpecs(['Commercial heavy-duty construction', 'Durable electrostatic powder coating']);
      setInStock(true);
    }
    setError('');
  }, [editingProduct, isNewProduct]);

  if (!isEditorOpen || !isOwner) return null;

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value as ProductCategory;
    setCategory(val);
    const found = CATEGORIES.find((c) => c.value === val);
    if (found) setCategoryLabel(found.label);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (PNG, JPG, WebP).');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setError('File size too large. Please select an image under 8MB.');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImage(result);
      if (!alt) setAlt(title || file.name.replace(/\.[^/.]+$/, ''));
      setIsUploading(false);
      setError('');
    };
    reader.onerror = () => {
      setError('Failed to read image file.');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleAddSpec = () => {
    if (!newSpecText.trim()) return;
    setSpecs([...specs, newSpecText.trim()]);
    setNewSpecText('');
  };

  const handleRemoveSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const handleSpecChange = (index: number, val: string) => {
    const next = [...specs];
    next[index] = val;
    setSpecs(next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Product title is required.');
      return;
    }
    if (!image.trim()) {
      setError('Product image is required. Provide an image URL or upload a photo.');
      return;
    }

    const payload: ProductItem = {
      id: editingProduct?.id || `${category}-${Date.now().toString(36)}`,
      title: title.trim(),
      category,
      categoryLabel,
      image: image.trim(),
      fallbackImage: image.trim(),
      alt: alt.trim() || title.trim(),
      specs: specs.filter((s) => s.trim().length > 0),
      tag: (tag.trim() as any) || undefined,
      price: price.trim() || undefined,
      originalPrice: originalPrice.trim() || undefined,
      minOrder: minOrder.trim() || undefined,
      inStock,
    };

    if (isNewProduct) {
      addProduct(payload);
    } else {
      updateProduct(payload);
    }

    closeProductEditor();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3 sm:p-4 backdrop-blur-xs overflow-y-auto"
      onClick={closeProductEditor}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-white p-5 sm:p-7 shadow-2xl border border-gray-100 my-8 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeProductEditor}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#cf251d] text-white">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {isNewProduct ? 'Add New Product' : 'Edit Product Details'}
            </h2>
            <p className="text-xs text-gray-500">Owner Inventory & Catalog Control</p>
          </div>
        </div>

        {error && (
          <div className="mt-4 flex items-start gap-2 rounded-lg bg-red-50 p-3 text-xs text-red-700 border border-red-200">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-left">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
              Product Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 32 KG Heavy-Duty Steel Bunk Bed (Naif Edition)"
              className="w-full rounded-lg border border-gray-300 py-2.5 px-3.5 text-sm focus:border-[#cf251d] focus:outline-none focus:ring-1 focus:ring-[#cf251d]"
              required
            />
          </div>

          {/* Category & Badge */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={handleCategoryChange}
                className="w-full rounded-lg border border-gray-300 py-2.5 px-3 text-sm focus:border-[#cf251d] focus:outline-none focus:ring-1 focus:ring-[#cf251d] bg-white"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Badge / Tag (Optional)
              </label>
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="e.g. Best Seller, On Sale, New Arrival"
                className="w-full rounded-lg border border-gray-300 py-2.5 px-3.5 text-sm focus:border-[#cf251d] focus:outline-none focus:ring-1 focus:ring-[#cf251d]"
              />
            </div>
          </div>

          {/* Price & Minimum Order */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Wholesale Price
              </label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. From AED 220"
                className="w-full rounded-lg border border-gray-300 py-2.5 px-3.5 text-sm focus:border-[#cf251d] focus:outline-none focus:ring-1 focus:ring-[#cf251d]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Retail / Strikethrough
              </label>
              <input
                type="text"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="e.g. AED 340"
                className="w-full rounded-lg border border-gray-300 py-2.5 px-3.5 text-sm focus:border-[#cf251d] focus:outline-none focus:ring-1 focus:ring-[#cf251d]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Min. Order Qty
              </label>
              <input
                type="text"
                value={minOrder}
                onChange={(e) => setMinOrder(e.target.value)}
                placeholder="e.g. 5 Units"
                className="w-full rounded-lg border border-gray-300 py-2.5 px-3.5 text-sm focus:border-[#cf251d] focus:outline-none focus:ring-1 focus:ring-[#cf251d]"
              />
            </div>
          </div>

          {/* Product Image */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
              Product Image *
            </label>
            <div className="flex flex-col sm:flex-row gap-3 items-start">
              <div className="flex-1 w-full space-y-2">
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Paste Image URL or click Upload below"
                  className="w-full rounded-lg border border-gray-300 py-2 px-3 text-xs focus:border-[#cf251d] focus:outline-none focus:ring-1 focus:ring-[#cf251d]"
                />
                <div className="flex items-center gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <Upload className="h-3.5 w-3.5 text-gray-500" />
                    <span>{isUploading ? 'Uploading...' : 'Upload Photo from Device'}</span>
                  </button>
                  <span className="text-[11px] text-gray-400">JPG, PNG, WebP</span>
                </div>
              </div>

              {image ? (
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 relative group">
                  <img src={image} alt="Preview" className="h-full w-full object-cover" />
                </div>
              ) : (
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 text-gray-400">
                  <ImageIcon className="h-6 w-6" />
                </div>
              )}
            </div>
          </div>

          {/* Specifications Bullet Points */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-700">
                Product Specifications
              </label>
              <span className="text-[11px] text-gray-400">Bullet points for description</span>
            </div>

            <div className="space-y-2 mb-2 max-h-48 overflow-y-auto pr-1">
              {specs.map((spec, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 select-none">•</span>
                  <input
                    type="text"
                    value={spec}
                    onChange={(e) => handleSpecChange(idx, e.target.value)}
                    className="flex-1 rounded-md border border-gray-200 px-3 py-1.5 text-xs focus:border-[#cf251d] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSpec(idx)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    title="Remove bullet point"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newSpecText}
                onChange={(e) => setNewSpecText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSpec();
                  }
                }}
                placeholder="Add new specification point (e.g. Dimensions: 90 x 190 cm)"
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-xs focus:border-[#cf251d] focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddSpec}
                className="inline-flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* In Stock toggle */}
          <div className="flex items-center gap-3 pt-1">
            <input
              id="instock-checkbox"
              type="checkbox"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-[#cf251d] focus:ring-[#cf251d]"
            />
            <label htmlFor="instock-checkbox" className="text-xs font-medium text-gray-700 cursor-pointer">
              Product is In Stock & Available for Order
            </label>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={closeProductEditor}
              className="rounded-lg border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#cf251d] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#b01e17] transition-colors shadow-sm cursor-pointer"
            >
              <Check className="h-4 w-4" />
              <span>{isNewProduct ? 'Save & Add Product' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
