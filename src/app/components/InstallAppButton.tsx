"use client";
import { useLanguage } from '../LanguageContext';

export default function InstallAppButton() {
  const { t } = useLanguage();

  const handleInstallClick = () => {
    // Manuel kurulum talimatları göster
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    
    let message = 'Bu siteyi ana ekranınıza eklemek için:\n\n';
    
    if (isIOS) {
      message += '1. Safari\'de paylaş butonuna tıklayın (kare ve ok işareti)\n2. "Ana Ekrana Ekle" seçeneğini seçin\n3. "Ekle" butonuna tıklayın';
    } else if (isAndroid) {
      message += '1. Chrome\'da menü butonuna tıklayın (üç nokta)\n2. "Ana Ekrana Ekle" seçeneğini seçin\n3. "Ekle" butonuna tıklayın';
    } else {
      message += '1. Tarayıcınızın adres çubuğundaki yıldız işaretine tıklayın\n2. "Ana Ekrana Ekle" seçeneğini seçin\n3. Siteyi ana ekranınıza ekleyin';
    }
    
    alert(message);
  };

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