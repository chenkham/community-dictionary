'use client';

import { useState } from 'react';
import { X, Check, AlertTriangle } from 'lucide-react';

interface AddWordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddWordModal({ isOpen, onClose }: AddWordModalProps) {
  const [formData, setFormData] = useState({ taiWord: '', englishWord: '', assameseWord: '', pronunciation: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setTimeout(() => {
      setFormData({ taiWord: '', englishWord: '', assameseWord: '', pronunciation: '' });
      setSubmitSuccess(false);
      onClose();
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClass = 'w-full px-3 py-2 border border-[var(--border)] rounded-lg text-sm bg-[var(--bg)] outline-none transition-all focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/10';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
      <div className="bg-[var(--modal-bg)] rounded-xl shadow-xl shadow-black/10 max-w-lg w-full max-h-[90vh] overflow-y-auto border border-[var(--border)]">
        {/* Header */}
        <div className="sticky top-0 bg-[var(--modal-bg)] border-b border-[var(--border)] px-5 py-3.5 flex items-center justify-between rounded-t-xl">
          <div>
            <h2 className="font-heading text-lg font-bold">Contribute a Word</h2>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">Help grow our community dictionary</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-md text-[var(--text-light)] hover:text-[var(--text)] hover:bg-[var(--bg-soft)] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          {submitSuccess ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#059669]/10 mb-3">
                <Check className="w-6 h-6 text-[#059669]" />
              </div>
              <h3 className="font-heading text-lg font-bold mb-1">Thank You!</h3>
              <p className="text-sm text-[var(--text-muted)]">Your contribution has been submitted for review.</p>
            </div>
          ) : (
            <>
              {/* Demo Notice */}
              <div className="relative pl-4">
                <div className="absolute left-0 top-0.5 bottom-0.5 w-0.5 rounded-full bar-amber" />
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#D97706] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold">Demo Mode</p>
                    <p className="text-[11px] text-[var(--text-muted)]">This is a demo form. Submissions will not be saved yet.</p>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="taiWord" className="block text-[11px] font-semibold text-[var(--text-light)] uppercase tracking-wider mb-1.5">
                  Tai Khamyang Word <span className="text-[#DC2626]">*</span>
                </label>
                <input type="text" id="taiWord" name="taiWord" value={formData.taiWord} onChange={handleChange} required className={inputClass} placeholder="Enter word in Tai Khamyang" />
              </div>

              <div>
                <label htmlFor="englishWord" className="block text-[11px] font-semibold text-[var(--text-light)] uppercase tracking-wider mb-1.5">
                  English Translation <span className="text-[#DC2626]">*</span>
                </label>
                <input type="text" id="englishWord" name="englishWord" value={formData.englishWord} onChange={handleChange} required className={inputClass} placeholder="Enter English translation" />
              </div>

              <div>
                <label htmlFor="assameseWord" className="block text-[11px] font-semibold text-[var(--text-light)] uppercase tracking-wider mb-1.5">
                  Assamese Translation <span className="text-[#DC2626]">*</span>
                </label>
                <input type="text" id="assameseWord" name="assameseWord" value={formData.assameseWord} onChange={handleChange} required className={inputClass} placeholder="Enter Assamese translation" />
              </div>

              <div>
                <label htmlFor="pronunciation" className="block text-[11px] font-semibold text-[var(--text-light)] uppercase tracking-wider mb-1.5">
                  Pronunciation <span className="text-[var(--text-light)] font-normal normal-case">(optional)</span>
                </label>
                <input type="text" id="pronunciation" name="pronunciation" value={formData.pronunciation} onChange={handleChange} className={inputClass} placeholder='e.g., /wɔːtər/' />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border border-[var(--border)] text-sm font-medium rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-soft)] transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="flex-1 btn-ocean text-white text-sm font-semibold px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Word'
                  )}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
