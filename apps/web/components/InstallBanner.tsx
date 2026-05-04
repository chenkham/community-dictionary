'use client';

import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

export default function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                         (window.navigator as any).standalone;

    if (isStandalone) return;

    if (isIosDevice) {
      const isSafari = /safari/.test(userAgent) && !/crios|fxios/.test(userAgent);
      if (isSafari) {
        setIsIOS(true);
        setShowBanner(true);
      }
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      alert('To install on iOS: tap the Share icon at the bottom of Safari, then select "Add to Home Screen".');
      return;
    }

    if (!deferredPrompt) {
      alert('Browser install prompt not ready. Please try adding to home screen from your browser menu.');
      return;
    }
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] px-4 py-3 anim-fade-up">
      <div className="mx-auto max-w-[600px] bg-[#2A2B2E] text-white rounded-xl shadow-2xl p-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#3b5998] rounded-full flex items-center justify-center shrink-0">
            <Download className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-[16px] leading-tight mb-0.5">Install App</span>
            <span className="text-sm text-gray-400 leading-tight">Tai Khamyang Hub</span>
          </div>
        </div>
        
        <button 
          onClick={handleInstallClick}
          className="text-[#7ea6fc] font-medium text-[15px] hover:text-white transition-colors px-3 py-2"
        >
          Install
        </button>
      </div>
    </div>
  );
}
