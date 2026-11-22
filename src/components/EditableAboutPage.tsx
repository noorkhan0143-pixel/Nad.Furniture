import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Image as ImageIcon, Plus, Save, Trash2, Upload, Video, X } from 'lucide-react';
import { useCatalog } from '../context/CatalogContext';
import { supabase } from '../lib/supabase';

type AboutMedia = {
  title: string;
  description: string;
  type: 'image' | 'video' | 'pdf';
  url: string;
  path?: string;
};
type AboutContent = {
  heading: string;
  subheading: string;
  paragraphs: string[];
  profilePdfUrl: string;
  profilePdfPath?: string;
  media: AboutMedia[];
};

const DEFAULT_CONTENT: AboutContent = {
  heading: 'About Us',
  subheading: 'Your Trusted Furniture Supplier in the UAE',
  paragraphs: [
    'NAD Furniture is a trusted furniture supplier in the UAE, providing reliable furniture solutions for businesses, contractors, accommodation facilities, offices, retailers and residential customers.',
    'As part of the established NAD Group of Companies, we combine extensive industry experience with a wide product selection and strong supply capabilities to meet furniture requirements of all sizes — from individual orders to complete commercial and accommodation projects.',
    'With access to 5,000+ furniture products, an established network of showrooms and extensive warehousing facilities, NAD Furniture is well positioned to serve customers across Dubai, Abu Dhabi, Sharjah, Ajman and the wider UAE.',
    'Our focus is simple: quality furniture, competitive pricing, dependable supply and professional customer service.',
  ],
  profilePdfUrl: '/corporate-profile.pdf',
  media: [],
};

const BUCKET = 'nad-site-images';
const MAX_IMAGE = 8 * 1024 * 1024;
const MAX_VIDEO = 100 * 1024 * 1024;
const MAX_PDF = 25 * 1024 * 1024;

export const EditableAboutPage: React.FC = () => {
  const { isOwner } = useCatalog();
  const navigate = useNavigate();
  const [content, setContent] = useState<AboutContent>(DEFAULT_CONTENT);
  const [draft, setDraft] = useState<AboutContent>(DEFAULT_CONTENT);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [pendingDeletes, setPendingDeletes] = useState<string[]>([]);

  useEffect(() => {
    let active = true;
    const load = async () => {
      const { data, error } = await supabase.from('nad_site_content').select('content').eq('id', 'about').maybeSingle();
      if (!active) return;
      if (!error && data?.content) {
        const value = data.content as Partial<AboutContent>;
        const safe: AboutContent = {
          heading: value.heading || DEFAULT_CONTENT.heading,
          subheading: value.subheading || DEFAULT_CONTENT.subheading,
          paragraphs: Array.isArray(value.paragraphs) ? value.paragraphs : DEFAULT_CONTENT.paragraphs,
          profilePdfUrl: value.profilePdfUrl || DEFAULT_CONTENT.profilePdfUrl,
          profilePdfPath: value.profilePdfPath,
          media: Array.isArray(value.media) ? value.media : [],
        };
        setContent(safe);
        setDraft(safe);
      }
      setLoading(false);
    };
    void load();
    return () => { active = false; };
  }, []);

  const updateMedia = (index: number, field: keyof AboutMedia, value: string) => {
    setDraft(current => ({
      ...current,
      media: current.media.map((item, i) => i === index ? { ...item, [field]: value } : item),
    }));
  };

  const uploadFile = async (file: File | undefined, kind: 'profile' | 'media', index?: number) => {
    if (!file) return;
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    if (kind === 'profile' && !isPdf) { setMessage('Corporate profile ke liye PDF file select karein.'); return; }
    if (kind === 'media' && !isImage && !isVideo && !isPdf) { setMessage('Only image, video or PDF files are supported.'); return; }
    if (isImage && file.size > MAX_IMAGE) { setMessage('Image maximum 8 MB honi chahiye.'); return; }
    if (isVideo && file.size > MAX_VIDEO) { setMessage('Video maximum 100 MB honi chahiye.'); return; }
    if (isPdf && file.size > MAX_PDF) { setMessage('PDF maximum 25 MB honi chahiye.'); return; }

    const type: AboutMedia['type'] = isImage ? 'image' : isVideo ? 'video' : 'pdf';
    const safeName = file.name.toLowerCase().replace(/[^a-z0-9.-]/g, '-');
    const path = `site-content/about/${Date.now()}-${Math.random().toString(36).slice(2)}-${safeName}`;
    setMessage('Uploading file...');
    const { error } = await supabase.storage.from(BUCKET).upload(path, file, { upsert: false, contentType: file.type || (isPdf ? 'application/pdf' : undefined) });
    if (error) { setMessage(error.message); return; }
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);

    if (kind === 'profile') {
      if (draft.profilePdfPath) setPendingDeletes(current => [...current, draft.profilePdfPath!]);
      setDraft(current => ({ ...current, profilePdfUrl: data.publicUrl, profilePdfPath: path }));
    } else if (typeof index === 'number') {
      const previous = draft.media[index];
      if (previous?.path) setPendingDeletes(current => [...current, previous.path!]);
      setDraft(current => ({
        ...current,
        media: current.media.map((item, i) => i === index ? { ...item, type, url: data.publicUrl, path } : item),
      }));
    } else {
      setDraft(current => ({
        ...current,
        media: [...current.media, { title: file.name.replace(/\.[^.]+$/, ''), description: '', type, url: data.publicUrl, path }],
      }));
    }
    setMessage('Upload complete. Website par publish karne ke liye Save changes click karein.');
  };

  const removeMedia = (index: number) => {
    const item = draft.media[index];
    if (item?.path) setPendingDeletes(current => [...current, item.path!]);
    setDraft(current => ({ ...current, media: current.media.filter((_, i) => i !== index) }));
  };

  const save = async () => {
    if (!isOwner) return;
    setSaving(true);
    setMessage('');
    const { error } = await supabase.from('nad_site_content').upsert({
      id: 'about',
      content: draft,
      updated_at: new Date().toISOString(),
    });
    setSaving(false);
    if (error) { setMessage(error.message); return; }
    if (pendingDeletes.length) {
      const { error: deleteError } = await supabase.storage.from(BUCKET).remove([...new Set(pendingDeletes)]);
      if (deleteError) setMessage('Content saved, but an old media file could not be removed: ' + deleteError.message);
    }
    setPendingDeletes([]);
    setContent(draft);
    setEditing(false);
    if (!message) setMessage('About Us content saved successfully.');
  };

  return (
    <section className="min-h-[70vh] bg-white py-12 px-6">
      <div className="mx-auto max-w-[1000px]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4 mb-8">
          <div className="flex items-center gap-2 text-sm text-[#718096]">
            <button type="button" onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#b82105] transition-colors cursor-pointer">Home</button>
            <span>/</span><span className="text-[#1A202C] font-semibold">About Us</span>
          </div>
          <div className="flex items-center gap-3">
            {isOwner && <button type="button" onClick={() => {
              if (editing) setPendingDeletes([]);
              setDraft(content);
              setMessage('');
              setEditing(value => !value);
            }} className="rounded-md bg-[#b82105] px-4 py-2 text-sm font-semibold text-white hover:bg-[#8f1a05]">
              {editing ? 'Cancel editing' : 'Edit page content'}
            </button>}
            <button type="button" onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-xs font-semibold text-[#b82105] hover:underline cursor-pointer">← Back to Home</button>
          </div>
        </div>

        {editing && isOwner ? (
          <div className="space-y-5">
            <label className="block text-sm font-semibold text-[#1A202C]">Main heading
              <input value={draft.heading} onChange={e => setDraft(v => ({ ...v, heading: e.target.value }))} className="mt-1 w-full rounded border border-gray-300 p-3 font-normal" />
            </label>
            <label className="block text-sm font-semibold text-[#1A202C]">Subheading
              <input value={draft.subheading} onChange={e => setDraft(v => ({ ...v, subheading: e.target.value }))} className="mt-1 w-full rounded border border-gray-300 p-3 font-normal" />
            </label>
            <div className="space-y-3">
              <div className="text-sm font-semibold text-[#1A202C]">About Us paragraphs</div>
              {draft.paragraphs.map((paragraph, index) => (
                <div key={index} className="flex gap-2">
                  <textarea value={paragraph} onChange={e => setDraft(v => ({ ...v, paragraphs: v.paragraphs.map((p, i) => i === index ? e.target.value : p) }))} rows={3} className="w-full rounded border border-gray-300 p-3 font-normal" />
                  <button type="button" onClick={() => setDraft(v => ({ ...v, paragraphs: v.paragraphs.filter((_, i) => i !== index) }))} className="text-red-700" aria-label="Delete paragraph"><Trash2 size={17} /></button>
                </div>
              ))}
              <button type="button" onClick={() => setDraft(v => ({ ...v, paragraphs: [...v.paragraphs, ''] }))} className="inline-flex items-center gap-2 rounded border border-gray-300 px-3 py-2 text-sm font-semibold"><Plus size={16} /> Add paragraph</button>
            </div>

            <div className="rounded-lg border border-gray-200 p-4 space-y-3">
              <div className="font-semibold text-[#1A202C]">Corporate Profile PDF</div>
              <div className="flex flex-wrap items-center gap-3">
                <a href={draft.profilePdfUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-[#b82105] underline"><FileText size={17} /> View current PDF</a>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded bg-gray-100 px-3 py-2 text-sm font-semibold"><Upload size={16} /> Upload / Replace PDF<input type="file" accept="application/pdf,.pdf" className="hidden" onChange={e => void uploadFile(e.target.files?.[0], 'profile')} /></label>
                {draft.profilePdfPath && <button type="button" onClick={() => { setPendingDeletes(v => draft.profilePdfPath ? [...v, draft.profilePdfPath] : v); setDraft(v => ({ ...v, profilePdfUrl: '', profilePdfPath: undefined })); }} className="text-sm text-red-700">Remove uploaded PDF</button>}
              </div>
              <p className="text-xs text-gray-500">PDF maximum 25 MB. Existing default corporate profile remains available unless replaced.</p>
            </div>

            <div className="space-y-4">
              <div className="font-semibold text-[#1A202C]">Images, videos and additional PDFs</div>
              {draft.media.map((item, index) => (
                <div key={index} className="rounded-lg border border-gray-200 p-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase text-gray-500">{item.type}</span>
                    <button type="button" onClick={() => removeMedia(index)} className="inline-flex items-center gap-1 text-sm text-red-700"><X size={15} /> Remove file</button>
                  </div>
                  {item.type === 'image' && <img src={item.url} alt={item.title} className="max-h-48 rounded object-contain" />}
                  {item.type === 'video' && <video controls preload="metadata" src={item.url} className="max-h-56 w-full rounded bg-black" />}
                  {item.type === 'pdf' && <a href={item.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-[#b82105] underline"><FileText size={17} /> Open PDF</a>}
                  <input value={item.title} onChange={e => updateMedia(index, 'title', e.target.value)} placeholder="Title" className="w-full rounded border border-gray-300 p-2" />
                  <textarea value={item.description} onChange={e => updateMedia(index, 'description', e.target.value)} placeholder="Description (optional)" rows={2} className="w-full rounded border border-gray-300 p-2" />
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded bg-gray-100 px-3 py-2 text-sm font-semibold"><Upload size={16} /> Replace file<input type="file" accept="image/*,video/*,application/pdf,.pdf" className="hidden" onChange={e => void uploadFile(e.target.files?.[0], 'media', index)} /></label>
                </div>
              ))}
              <label className="inline-flex cursor-pointer items-center gap-2 rounded border border-gray-300 px-4 py-3 text-sm font-semibold text-[#1A202C] hover:bg-gray-50"><Plus size={17} /> Add image / video / PDF<input type="file" accept="image/*,video/*,application/pdf,.pdf" className="hidden" onChange={e => void uploadFile(e.target.files?.[0], 'media')} /></label>
              <p className="text-xs text-gray-500">Images max 8 MB · Videos max 100 MB · PDFs max 25 MB. Uploads save after clicking Save changes.</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button type="button" disabled={saving} onClick={() => void save()} className="inline-flex items-center gap-2 rounded-md bg-[#b82105] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"><Save size={16} /> {saving ? 'Saving...' : 'Save changes'}</button>
              {message && <span className="text-sm text-gray-600">{message}</span>}
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-[32px] sm:text-[38px] md:text-[42px] font-bold text-[#1A202C] leading-tight">{content.heading}</h1>
            <h2 className="mt-3 text-[20px] sm:text-[24px] md:text-[26px] font-bold text-[#c2171a]">{content.subheading}</h2>
            <div className="mt-6 space-y-4 text-[16px] sm:text-[17px] leading-relaxed text-[#2D3748]">
              {content.paragraphs.map((paragraph, index) => <p key={index} className={index === content.paragraphs.length - 1 ? 'font-semibold text-[#1A202C]' : ''}>{paragraph}</p>)}
            </div>
            <div className="mt-8 space-y-4">
              <h2 className="text-2xl font-bold text-[#1A202C]">NAD Furniture Corporate Profile</h2>
              {content.profilePdfUrl ? <>
                <iframe src={content.profilePdfUrl} title="NAD Furniture Corporate Profile" className="w-full h-[700px] border border-gray-200 rounded-lg" />
                <a href={content.profilePdfUrl} download="NAD_Corporate_Profile.pdf" className="inline-block bg-[#c2171a] text-white px-6 py-3 rounded-lg font-semibold">Download Corporate Profile (PDF)</a>
              </> : <p className="text-sm text-gray-500">Corporate profile PDF is currently unavailable.</p>}
            </div>
            {content.media.length > 0 && <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {content.media.map((item, index) => <article key={index} className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                {item.type === 'image' && <img src={item.url} alt={item.title || 'NAD Furniture'} className="max-h-80 w-full object-cover" />}
                {item.type === 'video' && <video controls preload="metadata" src={item.url} className="aspect-video w-full bg-black" aria-label={item.title || 'NAD Furniture video'} />}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-[#1A202C]">{item.title}</h3>
                  {item.description && <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-[#2D3748]">{item.description}</p>}
                  {item.type === 'pdf' && <a href={item.url} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#b82105] underline"><FileText size={16} /> View PDF document</a>}
                </div>
              </article>)}
            </div>}
            {loading && <p className="mt-8 text-sm text-gray-500">Loading About Us content...</p>}
            {isOwner && !editing && <p className="mt-5 text-xs text-gray-400">Owner Mode: use “Edit page content” to update this page.</p>}
          </div>
        )}
      </div>
    </section>
  );
};
