import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ProductItem, ALL_PRODUCTS } from '../data/catalog';
import { supabase } from '../lib/supabase';

const STORAGE_CATALOG_KEY = 'nad_furniture_catalog_v2';
interface CatalogContextType {
  products: ProductItem[]; isOwner: boolean; saveStatus: 'idle' | 'saved' | 'saving' | 'error';
  loginAsOwner: (email: string, password: string) => Promise<boolean>; logoutOwner: () => void;
  updateProduct: (product: ProductItem) => boolean; addProduct: (product: Omit<ProductItem, 'id'> & { id?: string }) => ProductItem;
  deleteProduct: (productId: string) => boolean; resetToDefaults: () => void; exportCatalogJson: () => string;
  downloadCatalogFile: () => void; importCatalogJson: (rawJson: string) => { success: boolean; message: string; count?: number };
  changeOwnerPasscode: (currentPass: string, newPass: string) => { success: boolean; message: string };
  openProductEditor: (product?: ProductItem | null) => void; editingProduct: ProductItem | null | undefined;
  isEditorOpen: boolean; closeProductEditor: () => void; isManagerOpen: boolean; openManager: () => void;
  closeManager: () => void; isLoginModalOpen: boolean; openLoginModal: () => void; closeLoginModal: () => void;
}
const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

export const CatalogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<ProductItem[]>(() => {
    try { const saved = localStorage.getItem(STORAGE_CATALOG_KEY); if (saved) return JSON.parse(saved); } catch {}
    return ALL_PRODUCTS;
  });
  const [isOwner, setIsOwner] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'saving' | 'error'>('idle');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null | undefined>(undefined);
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const loadProducts = useCallback(async (migrateIfEmpty = false) => {
    const { data, error } = await supabase.from('nad_products').select('id, product').order('updated_at', { ascending: false });
    if (error) { console.error('Supabase products load failed:', error.message); setSaveStatus('error'); return; }
    if (data?.length) {
      const rows = data.map((row: any) => row.product as ProductItem).filter((p: any) => p?.id && p?.title);
      setProducts(rows); localStorage.setItem(STORAGE_CATALOG_KEY, JSON.stringify(rows));
    } else if (migrateIfEmpty) {
      let legacy: ProductItem[] = ALL_PRODUCTS;
      try { const cached = localStorage.getItem(STORAGE_CATALOG_KEY); if (cached) legacy = JSON.parse(cached); } catch {}
      const { error: insertError } = await supabase.from('nad_products').upsert(
        legacy.map((product) => ({ id: product.id, product, updated_at: new Date().toISOString() }))
      );
      if (insertError) { console.error('Initial catalog migration failed:', insertError.message); setSaveStatus('error'); }
      else { setProducts(legacy); localStorage.setItem(STORAGE_CATALOG_KEY, JSON.stringify(legacy)); }
    } else {
      setProducts(ALL_PRODUCTS);
    }
  }, []);

  const verifyOwner = useCallback(async (userId: string) => {
    const { data, error } = await supabase.from('nad_site_owners').select('user_id').eq('user_id', userId).maybeSingle();
    if (error || !data) { setIsOwner(false); return false; }
    setIsOwner(true); await loadProducts(true); return true;
  }, [loadProducts]);

  useEffect(() => {
    let alive = true;
    supabase.auth.getSession().then(async ({ data }) => {
      if (!alive) return;
      const user = data.session?.user;
      if (user) await verifyOwner(user.id);
      else await loadProducts(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!alive) return;
      if (session?.user) { window.setTimeout(() => { if (alive) void verifyOwner(session.user.id); }, 0); }
      else { setIsOwner(false); void loadProducts(false); }
    });
    return () => { alive = false; listener.subscription.unsubscribe(); };
  }, [loadProducts, verifyOwner]);

  useEffect(() => {
    const handleHash = () => {
      if (['#owner-admin', '#admin'].includes(window.location.hash)) {
        if (!isOwner) setIsLoginModalOpen(true); else setIsManagerOpen(true);
      }
    };
    handleHash(); window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [isOwner]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (((e.altKey && e.shiftKey) || (e.ctrlKey && e.shiftKey)) && e.key.toLowerCase() === 'o') {
        e.preventDefault(); if (isOwner) setIsManagerOpen((v) => !v); else setIsLoginModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown); return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOwner]);

  const loginAsOwner = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error || !data.user) return false;
    const allowed = await verifyOwner(data.user.id);
    if (!allowed) { await supabase.auth.signOut(); return false; }
    setIsLoginModalOpen(false); return true;
  }, [verifyOwner]);

  const logoutOwner = useCallback(() => {
    void supabase.auth.signOut(); setIsOwner(false); setIsManagerOpen(false); setIsEditorOpen(false);
  }, []);

  const saveAllProducts = useCallback(async (items: ProductItem[]) => {
    if (!isOwner) return false;
    setSaveStatus('saving');
    const { error } = await supabase.from('nad_products').upsert(
      items.map((product) => ({ id: product.id, product, updated_at: new Date().toISOString() }))
    );
    if (error) { console.error('Supabase save failed:', error.message); setSaveStatus('error'); return false; }
    setProducts(items); localStorage.setItem(STORAGE_CATALOG_KEY, JSON.stringify(items)); setSaveStatus('saved'); return true;
  }, [isOwner]);

  const updateProduct = useCallback((product: ProductItem) => {
    if (!isOwner) return false;
    const next = products.map((p) => p.id === product.id ? product : p);
    void saveAllProducts(next); return true;
  }, [isOwner, products, saveAllProducts]);

  const addProduct = useCallback((data: Omit<ProductItem, 'id'> & { id?: string }) => {
    if (!isOwner) throw new Error('Owner authorization required.');
    const item: ProductItem = { ...data, id: data.id?.trim() || `${data.category}-${Date.now().toString(36)}`, inStock: data.inStock !== false };
    void saveAllProducts([item, ...products]); return item;
  }, [isOwner, products, saveAllProducts]);

  const deleteProduct = useCallback((id: string) => {
    if (!isOwner) return false;
    const next = products.filter((p) => p.id !== id);
    setProducts(next);
    void supabase.from('nad_products').delete().eq('id', id).then(({ error }) => {
      if (error) setSaveStatus('error'); else { localStorage.setItem(STORAGE_CATALOG_KEY, JSON.stringify(next)); setSaveStatus('saved'); }
    });
    return true;
  }, [isOwner, products]);

  const resetToDefaults = useCallback(() => { if (isOwner) void saveAllProducts(ALL_PRODUCTS); }, [isOwner, saveAllProducts]);
  const exportCatalogJson = useCallback(() => JSON.stringify(products, null, 2), [products]);
  const downloadCatalogFile = useCallback(() => {
    const a = document.createElement('a'); a.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(products, null, 2));
    a.download = `nad_furniture_catalog_${new Date().toISOString().slice(0, 10)}.json`; a.click();
  }, [products]);
  const importCatalogJson = useCallback((raw: string) => {
    if (!isOwner) return { success: false, message: 'Owner authorization required.' };
    try { const parsed = JSON.parse(raw); if (!Array.isArray(parsed) || !parsed.every((p) => p?.id && p?.title && p?.category)) return { success: false, message: 'Invalid product JSON.' };
      void saveAllProducts(parsed); return { success: true, message: `Imported ${parsed.length} products.`, count: parsed.length };
    } catch (e) { return { success: false, message: e instanceof Error ? e.message : 'Invalid JSON.' }; }
  }, [isOwner, saveAllProducts]);

  const openProductEditor = useCallback((p?: ProductItem | null) => { setEditingProduct(p || null); setIsEditorOpen(true); }, []);
  const closeProductEditor = useCallback(() => { setIsEditorOpen(false); setEditingProduct(undefined); }, []);
  const changeOwnerPasscode = useCallback(() => ({ success: false, message: 'Use Supabase Authentication to change your account password.' }), []);
  const openManager = useCallback(() => setIsManagerOpen(true), []);
  const closeManager = useCallback(() => setIsManagerOpen(false), []);
  const openLoginModal = useCallback(() => setIsLoginModalOpen(true), []);
  const closeLoginModal = useCallback(() => setIsLoginModalOpen(false), []);

  return <CatalogContext.Provider value={{ products, isOwner, saveStatus, loginAsOwner, logoutOwner, updateProduct, addProduct, deleteProduct, resetToDefaults, exportCatalogJson, downloadCatalogFile, importCatalogJson, changeOwnerPasscode, openProductEditor, editingProduct, isEditorOpen, closeProductEditor, isManagerOpen, openManager, closeManager, isLoginModalOpen, openLoginModal, closeLoginModal }}>{children}</CatalogContext.Provider>;
};

export function useCatalog() {
  const context = useContext(CatalogContext);
  if (!context) throw new Error('useCatalog must be used within a CatalogProvider');
  return context;
}
