import React, { useEffect, useState } from 'react';
import { Lock, X, ShieldCheck, AlertCircle, KeyRound } from 'lucide-react';
import { useCatalog } from '../context/CatalogContext';
import { supabase } from '../lib/supabase';

export const OwnerPortalModal: React.FC = () => {
  const { isLoginModalOpen, openLoginModal, closeLoginModal, loginAsOwner } = useCatalog();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'forgot' | 'update'>('login');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const checkRecovery = () => {
      if (window.location.hash.includes('type=recovery')) {
        setMode('update');
        openLoginModal();
      }
    };
    checkRecovery();
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setMode('update');
        openLoginModal();
      }
    });
    return () => listener.subscription.unsubscribe();
  }, [openLoginModal]);

  if (!isLoginModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      if (mode === 'forgot') {
        if (!email.trim()) throw new Error('Enter the registered owner account email.');
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: 'https://noorkhan0143-pixel.github.io/Nad.Furniture/',
        });
        if (resetError) throw resetError;
        setMessage('Password reset link sent. Open the email and follow the link to set a new password. This is a reset link, not an OTP.');
      } else if (mode === 'update') {
        if (newPassword.length < 8) throw new Error('New password must be at least 8 characters.');
        const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
        if (updateError) throw updateError;
        setMessage('Password updated. You can now sign in with your new password.');
        setMode('login');
        setPassword('');
        setNewPassword('');
      } else {
        if (!password) throw new Error('Please enter your owner password.');
        const success = await loginAsOwner(password);
        if (success) {
          setError('');
          setPassword('');
        } else {
          throw new Error('Login failed. Use Forgot password to reset the registered owner account password.');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to complete the request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const heading = mode === 'forgot' ? 'Reset Owner Password' : mode === 'update' ? 'Create New Password' : 'Owner Access Portal';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs" onClick={closeLoginModal} role="dialog" aria-modal="true">
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 md:p-8 shadow-2xl border border-gray-100" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={closeLoginModal} className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors" aria-label="Close">
          <X className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#cf251d]/10 text-[#cf251d]"><ShieldCheck className="h-6 w-6" /></div>
          <div><h2 className="text-xl font-bold text-gray-900">{heading}</h2><p className="text-xs text-gray-500">NAD Furniture Store Management</p></div>
        </div>
        <p className="mt-4 text-sm text-gray-600 leading-relaxed">
          {mode === 'forgot' ? 'Enter the registered owner account email. We will send a secure password-reset link; no login OTP is used.' : mode === 'update' ? 'Choose a new password for your owner account.' : 'Authorized ownership only. Sign in to manage products and inventory.'}
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {mode === 'login' && <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">Owner Password</label>
            <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); setError(''); }} placeholder="Enter owner password" className="w-full rounded-lg border border-gray-300 py-2.5 px-4 text-sm focus:border-[#cf251d] focus:outline-none focus:ring-1 focus:ring-[#cf251d]" autoComplete="current-password" />
          </div>}
          {mode === 'forgot' && <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">Registered Owner Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter registered account email" className="w-full rounded-lg border border-gray-300 py-2.5 px-4 text-sm focus:border-[#cf251d] focus:outline-none focus:ring-1 focus:ring-[#cf251d]" autoComplete="email" />
          </div>}
          {mode === 'update' && <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">New Password</label>
            <input type="password" required minLength={8} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Create new password (8+ characters)" className="w-full rounded-lg border border-gray-300 py-2.5 px-4 text-sm focus:border-[#cf251d] focus:outline-none focus:ring-1 focus:ring-[#cf251d]" autoComplete="new-password" />
          </div>}
          {error && <div className="flex items-start gap-2 rounded-lg bg-red-50 p-3 text-xs text-red-700 border border-red-200"><AlertCircle className="h-4 w-4 shrink-0 mt-0.5" /><span>{error}</span></div>}
          {message && <div className="rounded-lg bg-green-50 p-3 text-xs text-green-800 border border-green-200">{message}</div>}
          <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#cf251d] py-3 text-sm font-semibold text-white hover:bg-[#b01e17] transition-colors shadow-sm">
            {mode === 'login' ? <Lock className="h-4 w-4" /> : <KeyRound className="h-4 w-4" />}
            <span>{loading ? 'Please wait...' : mode === 'login' ? 'Sign in securely' : mode === 'forgot' ? 'Send password reset link' : 'Save new password'}</span>
          </button>
        </form>
        <div className="mt-4 text-center text-xs">
          {mode === 'login' ? <button type="button" onClick={() => { setMode('forgot'); setError(''); setMessage(''); }} className="font-semibold text-[#cf251d] hover:underline">Forgot password?</button> : <button type="button" onClick={() => { setMode('login'); setError(''); setMessage(''); }} className="font-semibold text-gray-600 hover:underline">Back to owner login</button>}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 text-center"><p className="text-[11px] text-gray-400">Only registered site-owner accounts can access store management.</p></div>
      </div>
    </div>
  );
};
