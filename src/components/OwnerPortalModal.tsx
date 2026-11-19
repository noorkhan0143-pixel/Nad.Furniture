import React, { useState } from 'react';
import { Lock, X, ShieldCheck, AlertCircle } from 'lucide-react';
import { useCatalog } from '../context/CatalogContext';

export const OwnerPortalModal: React.FC = () => {
  const { isLoginModalOpen, closeLoginModal, loginAsOwner } = useCatalog();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isLoginModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError('Please enter your owner password.');
      return;
    }
    setLoading(true);
    const success = await loginAsOwner(password);
    setLoading(false);
    if (success) {
      setError('');
      setPassword('');
    } else {
      setError('Login failed. Check your owner password and confirm the account is enabled as a site owner.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs"
      onClick={closeLoginModal}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-md rounded-xl bg-white p-6 md:p-8 shadow-2xl border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeLoginModal}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#cf251d]/10 text-[#cf251d]">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Owner Access Portal</h2>
            <p className="text-xs text-gray-500">NAD Furniture Store Management</p>
          </div>
        </div>

        <p className="mt-4 text-sm text-gray-600 leading-relaxed">
          Authorized ownership only. Log in to edit product images, prices, specifications, and add new inventory directly on the live website.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">Owner Password</label>
            <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); setError(''); }} placeholder="Enter Supabase account password" className="w-full rounded-lg border border-gray-300 py-2.5 px-4 text-sm focus:border-[#cf251d] focus:outline-none focus:ring-1 focus:ring-[#cf251d]" autoComplete="current-password" />
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded-lg bg-red-50 p-3 text-xs text-red-700 border border-red-200">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#cf251d] py-3 text-sm font-semibold text-white hover:bg-[#b01e17] transition-colors shadow-sm"
            >
              <Lock className="h-4 w-4" />
              <span>{loading ? 'Signing in...' : 'Sign in securely'}</span>
            </button>
          </div>
        </form>

        <div className="mt-4 pt-4 border-t border-gray-100 text-center">
          <p className="text-[11px] text-gray-400">
            Ownership changes are instantly applied to your live website and saved in your secure store profile.
          </p>
        </div>
      </div>
    </div>
  );
};
