"use client";
import { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';

export default function InstallAppButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Eğer PWA desteği yoksa, kullanıcıya manuel kurulum talimatları ver
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isAndroid = /Android/.test(navigator.userAgent);
      
      let message = 'Bu siteyi ana ekranınıza eklemek için:\n\n';
      
      if (isIOS) {
        message += '1. Safari\'de paylaş butonuna tıklayın\n2. "Ana Ekrana Ekle" seçeneğini seçin';
      } else if (isAndroid) {
        message += '1. Chrome\'da menü butonuna tıklayın\n2. "Ana Ekrana Ekle" seçeneğini seçin';
      } else {
        message += '1. Tarayıcınızın menüsünden "Ana Ekrana Ekle" seçeneğini bulun\n2. Siteyi ana ekranınıza ekleyin';
      }
      
      alert(message);
      return;
    }

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setShowInstallButton(false);
      }
    } catch (error) {
      console.error('PWA kurulum hatası:', error);
    }
  };

  // Test için butonu her zaman göster (geliştirme aşamasında)
  const shouldShowButton = showInstallButton || process.env.NODE_ENV === 'development';

  if (!shouldShowButton) return null;

  return (
    <button
      onClick={handleInstallClick}
      className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-2 px-4 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-yellow-400/50 flex items-center gap-2 text-sm"
      title={t('install_app')}
    >
      <svg 
        className="w-5 h-5" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" 
        />
      </svg>
      <span className="hidden sm:inline">{t('install')}</span>
    </button>
  );
} 