import React, { useState } from 'react';
import {
  ShieldAlert,
  Plus,
  Layers,
  Download,
  Upload,
  LogOut,
  CheckCircle2,
  Key,
} from 'lucide-react';
import { useCatalog } from '../context/CatalogContext';

export const OwnerControlBar: React.FC = () => {
  const {
    isOwner,
    logoutOwner,
    openProductEditor,
    openManager,
    downloadCatalogFile,
    importCatalogJson,
    changeOwnerPasscode,
    saveStatus,
    products,
  } = useCatalog();

  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passMsg, setPassMsg] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isOwner) return null;

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        const res = importCatalogJson(text);
        if (res.success) {
          alert(`Catalog updated! ${res.message}`);
        } else {
          alert(`Import failed: ${res.message}`);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = changeOwnerPasscode(currentPass, newPass);
    if (res.success) {
      setPassMsg({ text: res.message, isError: false });
      setTimeout(() => {
        setShowPasswordDialog(false);
        setPassMsg(null);
        setCurrentPass('');
        setNewPass('');
      }, 1500);
    } else {
      setPassMsg({ text: res.message, isError: true });
    }
  };

  return (
    <>
      <aside aria-label="Owner Admin Controls" className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#111827] px-4 py-3 text-white shadow-2xl border border-gray-700/60 backdrop-blur-md">
          {/* Status info */}
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#cf251d] text-white font-bold text-xs">
              👑
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-white">Owner Mode</span>
                <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-300">
                  {products.length} Products Live
                </span>
              </div>
              <p className="text-[11px] text-gray-400 flex items-center gap-1">
                {saveStatus === 'saved' ? (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 inline" /> Changes Saved
                  </span>
                ) : (
                  'Click "Edit" on any product card or add new items'
                )}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center flex-wrap gap-2">
            <button
              type="button"
              onClick={() => openProductEditor(null)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#cf251d] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#b01e17] transition-colors shadow-sm cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Product</span>
            </button>

            <button
              type="button"
              onClick={openManager}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gray-800 px-3 py-1.5 text-xs font-semibold text-gray-200 hover:bg-gray-700 transition-colors border border-gray-700 cursor-pointer"
            >
              <Layers className="h-3.5 w-3.5 text-gray-400" />
              <span>Manage All</span>
            </button>

            <button
              type="button"
              onClick={downloadCatalogFile}
              title="Download full catalog as JSON file"
              className="inline-flex items-center gap-1 rounded-lg bg-gray-800 px-2.5 py-1.5 text-xs font-medium text-gray-300 hover:bg-gray-700 transition-colors border border-gray-700 cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Export</span>
            </button>

            <button
              type="button"
              onClick={handleImport}
              title="Import products from a JSON file"
              className="inline-flex items-center gap-1 rounded-lg bg-gray-800 px-2.5 py-1.5 text-xs font-medium text-gray-300 hover:bg-gray-700 transition-colors border border-gray-700 cursor-pointer"
            >
              <Upload className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Import</span>
            </button>

            <button
              type="button"
              onClick={() => setShowPasswordDialog(true)}
              title="Change owner passcode"
              className="inline-flex items-center gap-1 rounded-lg bg-gray-800 px-2.5 py-1.5 text-xs font-medium text-gray-300 hover:bg-gray-700 transition-colors border border-gray-700 cursor-pointer"
            >
              <Key className="h-3.5 w-3.5" />
            </button>

            <button
              type="button"
              onClick={logoutOwner}
              title="Exit owner mode"
              className="inline-flex items-center gap-1 rounded-lg bg-red-950/60 text-red-300 hover:bg-red-900 px-2.5 py-1.5 text-xs font-medium transition-colors border border-red-800/60 cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Exit</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Password Change Dialog */}
      {showPasswordDialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs"
          onClick={() => setShowPasswordDialog(false)}
        >
          <div
            className="w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl text-gray-900 border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base font-bold text-gray-900">Change Owner Passcode</h3>
            <p className="text-xs text-gray-500 mt-1">Set a new secret passcode for your owner portal.</p>

            <form onSubmit={handlePasswordSubmit} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Current Passcode</label>
                <input
                  type="password"
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 py-2 px-3 text-xs focus:border-[#cf251d] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">New Passcode (min 6 characters)</label>
                <input
                  type="password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 py-2 px-3 text-xs focus:border-[#cf251d] focus:outline-none"
                  required
                />
              </div>

              {passMsg && (
                <div
                  className={`text-xs p-2.5 rounded-lg border ${
                    passMsg.isError ? 'bg-red-50 text-red-700 border-red-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}
                >
                  {passMsg.text}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordDialog(false)}
                  className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#cf251d] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#b01e17]"
                >
                  Update Passcode
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
