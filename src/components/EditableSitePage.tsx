import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Save, Trash2, Upload, Image as ImageIcon, Video, X } from 'lucide-react';
import { useCatalog } from '../context/CatalogContext';
import { supabase } from '../lib/supabase';

type ContentItem = { title: string; description: string; image: string; videoUrl?: string; videoPath?: string };
type PageContent = { heading: string; intro: string; items: ContentItem[] };

const DEFAULTS: Record<string, PageContent> = {
  projects: { heading: 'Project Gallery', intro: 'Explore selected NAD Furniture projects and supply installations across the UAE.', items: [] },
  manufacturing: { heading: 'Manufacturing', intro: 'Discover our manufacturing facility, machinery, production capabilities and quality processes.', items: [] },
  services: { heading: 'Request a Furniture Quote', intro: 'Tell us about your furniture requirements. Our team can support project supply, bulk orders and tailored furniture solutions.', items: [] },
};


export const EditableSitePage: React.FC<{ pageKey: 'projects' | 'manufacturing' | 'services'; onQuoteClick?: () => void }> = ({ pageKey, onQuoteClick }) => {
  const { isOwner } = useCatalog();
  const navigate = useNavigate();
  const [content, setContent] = useState<PageContent>(DEFAULTS[pageKey]);
  const [draft, setDraft] = useState<PageContent>(DEFAULTS[pageKey]);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [pendingVideoDeletes, setPendingVideoDeletes] = useState<string[]>([]);
  const uploadVideo = async (index: number, file?: File) => {
    if (!file) return;
    if (!file.type.startsWith('video/')) { setMessage('Please select a valid video file.'); return; }
    if (file.size > 100 * 1024 * 1024) { setMessage('Video must be 100 MB or smaller.'); return; }
    const oldPath = draft.items[index]?.videoPath;
    const extension = file.name.split('.').pop()?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'mp4';
    const path = `site-videos/${pageKey}/${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;
    setMessage('Uploading video...');
    const { error } = await supabase.storage.from('nad-site-images').upload(path, file, { upsert: false, contentType: file.type });
    if (error) { setMessage(error.message); return; }
    const { data } = supabase.storage.from('nad-site-images').getPublicUrl(path);
    setDraft(current => ({ ...current, items: current.items.map((item, i) => i === index ? { ...item, videoUrl: data.publicUrl, videoPath: path } : item) }));
    if (oldPath) setPendingVideoDeletes(current => [...current, oldPath]);
    setMessage('Video uploaded. Click Save changes to publish it.');
  };

  const removeVideo = async (index: number) => {
    const oldPath = draft.items[index]?.videoPath;
    if (oldPath) setPendingVideoDeletes(current => [...current, oldPath]);
    setDraft(current => ({ ...current, items: current.items.map((item, i) => i === index ? { ...item, videoUrl: undefined, videoPath: undefined } : item) }));
    setMessage('Video removed. Save changes to publish the update.');
  };

  const removeItem = async (index: number) => {
    const item = draft.items[index];
    if (item?.videoPath) setPendingVideoDeletes(current => [...current, item.videoPath!]);
    setDraft(current => ({ ...current, items: current.items.filter((_, i) => i !== index) }));
  };


  useEffect(() => {
    let active = true;
    const load = async () => {
      const { data, error } = await supabase.from('nad_site_content').select('content').eq('id', pageKey).maybeSingle();
      if (!active) return;
      if (!error && data?.content) {
        const value = data.content as PageContent;
        const safe = { heading: value.heading || DEFAULTS[pageKey].heading, intro: value.intro || DEFAULTS[pageKey].intro, items: Array.isArray(value.items) ? value.items : [] };
        setContent(safe);
        setDraft(safe);
      }
      setLoading(false);
    };
    void load();
    return () => { active = false; };
  }, [pageKey]);

  const updateItem = (index: number, field: keyof ContentItem, value: string) => {
    setDraft(current => ({ ...current, items: current.items.map((item, i) => i === index ? { ...item, [field]: value } : item) }));
  };

  const uploadImage = async (index: number, file?: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/') || file.size > 8 * 1024 * 1024) {
      setMessage('Please choose an image under 8 MB.');
      return;
    }
    const path = `site-content/${pageKey}/${Date.now()}-${file.name.toLowerCase().replace(/[^a-z0-9.-]/g, '-')}`;
    const { error } = await supabase.storage.from('nad-site-images').upload(path, file, { upsert: false, contentType: file.type });
    if (error) { setMessage(error.message); return; }
    const { data } = supabase.storage.from('nad-site-images').getPublicUrl(path);
    updateItem(index, 'image', data.publicUrl);
    setMessage('Image uploaded. Save changes to publish it.');
  };

  const save = async () => {
    setSaving(true);
    setMessage('');
    const { error } = await supabase.from('nad_site_content').upsert({ id: pageKey, content: draft, updated_at: new Date().toISOString() });
    setSaving(false);
    if (error) { setMessage(error.message); return; }
    if (pendingVideoDeletes.length) await supabase.storage.from('nad-site-images').remove([...new Set(pendingVideoDeletes)]);
    setPendingVideoDeletes([]);
    setContent(draft);
    setEditing(false);
    setMessage('Content saved.');
  };

  const addItem = () => setDraft(current => ({ ...current, items: [...current.items, { title: '', description: '', image: '' }] }));

  return (
    <section className="min-h-[70vh] bg-white py-12 px-6">
      <div className="mx-auto max-w-[1290px]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4 mb-8">
          <div className="text-sm text-[#718096]"><button type="button" onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="cursor-pointer hover:text-[#b82105]">Home</button><span className="mx-2">/</span><span className="font-semibold text-[#1A202C]">{content.heading}</span></div>
          {isOwner && <button type="button" onClick={() => { if (editing) setPendingVideoDeletes([]); setDraft(content); setEditing(value => !value); }} className="rounded-md bg-[#b82105] px-4 py-2 text-sm font-semibold text-white hover:bg-[#8f1a05]">{editing ? 'Cancel editing' : 'Edit page content'}</button>}
        </div>
        {editing ? (
          <div className="space-y-5">
            <label className="block text-sm font-semibold text-[#1A202C]">Page heading<input value={draft.heading} onChange={e => setDraft(v => ({ ...v, heading: e.target.value }))} className="mt-1 w-full rounded border border-gray-300 p-3 font-normal" /></label>
            <label className="block text-sm font-semibold text-[#1A202C]">Page description<textarea value={draft.intro} onChange={e => setDraft(v => ({ ...v, intro: e.target.value }))} rows={4} className="mt-1 w-full rounded border border-gray-300 p-3 font-normal" /></label>
            <div className="space-y-4">
              {draft.items.map((item, index) => (
                <div key={index} className="grid gap-3 rounded-lg border border-gray-200 p-4 md:grid-cols-[180px_1fr]">
                  <div>
                    {item.image ? <img src={item.image} alt={item.title || 'Page content'} className="h-32 w-full rounded object-cover" /> : <div className="flex h-32 items-center justify-center rounded bg-gray-100 text-gray-400"><ImageIcon /></div>}
                    <label className="mt-2 inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#b82105]"><Upload size={16} /> Upload image<input type="file" accept="image/*" className="hidden" onChange={e => void uploadImage(index, e.target.files?.[0])} /></label>
                    <input value={item.image} onChange={e => updateItem(index, 'image', e.target.value)} placeholder="Or paste image URL" className="mt-2 w-full rounded border border-gray-300 p-2 text-xs" />
                  </div>
                  <div className="space-y-3">
                    <input value={item.title} onChange={e => updateItem(index, 'title', e.target.value)} placeholder="Title (e.g. CNC cutting machine)" className="w-full rounded border border-gray-300 p-3" />
                    <textarea value={item.description} onChange={e => updateItem(index, 'description', e.target.value)} placeholder="Content / details" rows={3} className="w-full rounded border border-gray-300 p-3" />
                    {pageKey !== 'services' && <>
                      <div className="rounded-lg border border-dashed border-gray-300 p-3">
                        <label className="inline-flex cursor-pointer items-center gap-2 rounded bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-200"><Video size={16} /> {item.videoUrl ? 'Replace video from computer' : 'Upload video from computer'}<input type="file" accept="video/mp4,video/webm,video/ogg,video/quicktime" className="hidden" onChange={e => void uploadVideo(index, e.target.files?.[0])} /></label>
                        <p className="mt-2 text-xs text-gray-500">MP4, WebM, MOV or OGG · maximum 100 MB per video</p>
                        {item.videoUrl && <div className="mt-3 space-y-2"><video controls preload="metadata" className="max-h-56 w-full rounded bg-black" src={item.videoUrl} /><button type="button" onClick={() => void removeVideo(index)} className="inline-flex items-center gap-1 text-xs font-semibold text-red-700"><X size={14} /> Delete video</button></div>}
                      </div>
                    </>}
                    <button type="button" onClick={() => void removeItem(index)} className="inline-flex items-center gap-2 text-sm text-red-700"><Trash2 size={15} /> Remove item</button>
                  </div>
                </div>
              ))}
              <button type="button" onClick={addItem} className="inline-flex items-center gap-2 rounded border border-gray-300 px-4 py-2 text-sm font-semibold text-[#1A202C]"><Plus size={16} /> Add photo and content</button>
            </div>
            <div className="flex flex-wrap items-center gap-3"><button type="button" disabled={saving} onClick={() => void save()} className="inline-flex items-center gap-2 rounded-md bg-[#b82105] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"><Save size={16} /> {saving ? 'Saving...' : 'Save changes'}</button>{message && <span className="text-sm text-gray-600">{message}</span>}</div>
          </div>
        ) : (
          <div>
            <h1 className="text-[32px] sm:text-[38px] md:text-[42px] font-bold leading-tight text-[#1A202C]">{content.heading}</h1>
            <p className="mt-4 max-w-4xl text-[16px] sm:text-[17px] leading-relaxed text-[#2D3748]">{content.intro}</p>
            {loading ? <p className="mt-8 text-sm text-gray-500">Loading content...</p> : content.items.length > 0 ? (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{content.items.map((item, index) => <article key={index} className="overflow-hidden rounded-lg border border-gray-200 bg-white">{item.image && <img src={item.image} alt={item.title} className="h-56 w-full object-cover" />}{item.videoUrl && <video controls preload="metadata" className="aspect-video w-full bg-black" src={item.videoUrl} aria-label={item.title ? item.title + " video" : "NAD Furniture video " + (index + 1)} />}<div className="p-5"><h2 className="text-xl font-bold text-[#1A202C]">{item.title}</h2><p className="mt-2 whitespace-pre-line text-[15px] leading-relaxed text-[#2D3748]">{item.description}</p></div></article>)}</div>
            ) : isOwner ? <p className="mt-8 text-sm text-gray-500">Use “Edit page content” to add photos, videos and details.</p> : null}
            {pageKey === 'services' && onQuoteClick && <button type="button" onClick={onQuoteClick} className="mt-8 rounded-md bg-[#b82105] px-6 py-3 text-sm font-semibold text-white hover:bg-[#8f1a05]">Open Furniture Quote Form</button>}\n            {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
          </div>
        )}
      </div>
    </section>
  );
};
