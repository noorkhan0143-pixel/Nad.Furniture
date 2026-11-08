import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ProductItem, ALL_PRODUCTS } from '../data/catalog';

const STORAGE_CATALOG_KEY = 'nad_furniture_catalog_v1';
const STORAGE_OWNER_KEY = 'nad_owner_auth_v1';
const STORAGE_PASSCODE_KEY = 'nad_owner_passcode_v1';
const DEFAULT_PASSCODE = 'NAD@Dubai2026';

interface CatalogContextType {
  products: ProductItem[];
  isOwner: boolean;
  saveStatus: 'idle' | 'saved' | 'saving' | 'error';
  loginAsOwner: (passcode: string) => boolean;
  logoutOwner: () => void;
  updateProduct: (product: ProductItem) => boolean;
  addProduct: (product: Omit<ProductItem, 'id'> & { id?: string }) => ProductItem;
  deleteProduct: (productId: string) => boolean;
  resetToDefaults: () => void;
  exportCatalogJson: () => string;
  downloadCatalogFile: () => void;
  importCatalogJson: (rawJson: string) => { success: boolean; message: string; count?: number };
  changeOwnerPasscode: (currentPass: string, newPass: string) => { success: boolean; message: string };
  openProductEditor: (product?: ProductItem | null) => void;
  editingProduct: ProductItem | null | undefined;
  isEditorOpen: boolean;
  closeProductEditor: () => void;
  isManagerOpen: boolean;
  openManager: () => void;
  closeManager: () => void;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

export const CatalogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<ProductItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_CATALOG_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse cached catalog, using defaults', e);
    }
    return ALL_PRODUCTS;
  });

  const [isOwner, setIsOwner] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_OWNER_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'saving' | 'error'>('idle');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null | undefined>(undefined);
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Sync to localStorage whenever products change
  const persistProducts = useCallback((newProducts: ProductItem[]) => {
    setProducts(newProducts);
    try {
      localStorage.setItem(STORAGE_CATALOG_KEY, JSON.stringify(newProducts));
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (e) {
      console.error('Storage write error', e);
      setSaveStatus('error');
    }

    // Also attempt server sync if running on Node backend
    try {
      const storedPasscode = localStorage.getItem(STORAGE_PASSCODE_KEY) || DEFAULT_PASSCODE;
      fetch('/api/catalog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-owner-key': storedPasscode,
        },
        body: JSON.stringify({ products: newProducts }),
      }).catch(() => {
        // Silent catch for static deploys (e.g. Netlify/GitHub Pages)
      });
    } catch {
      // Ignored in purely client-side static mode
    }
  }, []);

  // Check URL hash for admin shortcuts
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#owner-admin' || window.location.hash === '#admin') {
        if (!isOwner) {
          setIsLoginModalOpen(true);
        } else {
          setIsManagerOpen(true);
        }
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [isOwner]);

  // Keyboard shortcut: Alt + Shift + A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey && e.shiftKey && e.key.toLowerCase() === 'a') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'o')) {
        e.preventDefault();
        if (isOwner) {
          setIsManagerOpen((prev) => !prev);
        } else {
          setIsLoginModalOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOwner]);

  const loginAsOwner = useCallback((passcode: string): boolean => {
    const activePasscode = localStorage.getItem(STORAGE_PASSCODE_KEY) || DEFAULT_PASSCODE;
    if (passcode.trim() === activePasscode.trim()) {
      setIsOwner(true);
      try {
        sessionStorage.setItem(STORAGE_OWNER_KEY, 'true');
      } catch {}
      setIsLoginModalOpen(false);
      return true;
    }
    return false;
  }, []);

  const logoutOwner = useCallback(() => {
    setIsOwner(false);
    try {
      sessionStorage.removeItem(STORAGE_OWNER_KEY);
    } catch {}
    setIsManagerOpen(false);
    setIsEditorOpen(false);
  }, []);

  const changeOwnerPasscode = useCallback((currentPass: string, newPass: string) => {
    const activePasscode = localStorage.getItem(STORAGE_PASSCODE_KEY) || DEFAULT_PASSCODE;
    if (currentPass.trim() !== activePasscode.trim()) {
      return { success: false, message: 'Current passcode is incorrect.' };
    }
    if (!newPass || newPass.trim().length < 6) {
      return { success: false, message: 'New passcode must be at least 6 characters long.' };
    }
    try {
      localStorage.setItem(STORAGE_PASSCODE_KEY, newPass.trim());
      return { success: true, message: 'Owner passcode successfully updated.' };
    } catch {
      return { success: false, message: 'Failed to update passcode in storage.' };
    }
  }, []);

  const updateProduct = useCallback(
    (updatedProduct: ProductItem): boolean => {
      if (!isOwner) return false;
      const index = products.findIndex((p) => p.id === updatedProduct.id);
      if (index === -1) return false;

      const next = [...products];
      next[index] = { ...updatedProduct };
      persistProducts(next);
      return true;
    },
    [isOwner, products, persistProducts]
  );

  const addProduct = useCallback(
    (data: Omit<ProductItem, 'id'> & { id?: string }): ProductItem => {
      const generatedId =
        data.id?.trim() ||
        `${data.category}-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;

      const newProduct: ProductItem = {
        ...data,
        id: generatedId,
        inStock: data.inStock !== false,
      };

      const next = [newProduct, ...products];
      persistProducts(next);
      return newProduct;
    },
    [products, persistProducts]
  );

  const deleteProduct = useCallback(
    (productId: string): boolean => {
      if (!isOwner) return false;
      const filtered = products.filter((p) => p.id !== productId);
      persistProducts(filtered);
      return true;
    },
    [isOwner, products, persistProducts]
  );

  const resetToDefaults = useCallback(() => {
    if (!isOwner) return;
    persistProducts(ALL_PRODUCTS);
  }, [isOwner, persistProducts]);

  const exportCatalogJson = useCallback((): string => {
    return JSON.stringify(products, null, 2);
  }, [products]);

  const downloadCatalogFile = useCallback(() => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `nad_furniture_catalog_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }, [products]);

  const importCatalogJson = useCallback(
    (rawJson: string) => {
      if (!isOwner) return { success: false, message: 'Owner authorization required.' };
      try {
        const parsed = JSON.parse(rawJson);
        if (!Array.isArray(parsed) || parsed.length === 0) {
          return { success: false, message: 'Invalid JSON: Expected a non-empty array of products.' };
        }
        // Basic schema check
        const isValid = parsed.every((item) => item.id && item.title && item.category);
        if (!isValid) {
          return { success: false, message: 'Invalid format: Every product must contain "id", "title", and "category".' };
        }
        persistProducts(parsed);
        return { success: true, message: `Successfully imported ${parsed.length} products!`, count: parsed.length };
      } catch (err: unknown) {
        return { success: false, message: `JSON parse error: ${err instanceof Error ? err.message : String(err)}` };
      }
    },
    [isOwner, persistProducts]
  );

  const openProductEditor = useCallback((product?: ProductItem | null) => {
    setEditingProduct(product || null);
    setIsEditorOpen(true);
  }, []);

  const closeProductEditor = useCallback(() => {
    setIsEditorOpen(false);
    setEditingProduct(undefined);
  }, []);

  const openManager = useCallback(() => setIsManagerOpen(true), []);
  const closeManager = useCallback(() => setIsManagerOpen(false), []);
  const openLoginModal = useCallback(() => setIsLoginModalOpen(true), []);
  const closeLoginModal = useCallback(() => setIsLoginModalOpen(false), []);

  return (
    <CatalogContext.Provider
      value={{
        products,
        isOwner,
        saveStatus,
        loginAsOwner,
        logoutOwner,
        updateProduct,
        addProduct,
        deleteProduct,
        resetToDefaults,
        exportCatalogJson,
        downloadCatalogFile,
        importCatalogJson,
        changeOwnerPasscode,
        openProductEditor,
        editingProduct,
        isEditorOpen,
        closeProductEditor,
        isManagerOpen,
        openManager,
        closeManager,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
};

export function useCatalog() {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error('useCatalog must be used within a CatalogProvider');
  }
  return context;
}
