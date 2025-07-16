"use client";
import React from 'react';
import { useLanguage } from "./LanguageContext";

interface FooterProps {
  onCharactersClick?: () => void;
  onStoriesClick?: () => void;
  onMapClick?: () => void;
  onShopClick?: () => void;
}

const texts = {
  contactTitle: { tr: "Gandalf'ın Mesajı", en: "Gandalf's Message" },
  name: { tr: "Atakan Şahin", en: "Atakan Şahin" },
  phone: { tr: "+90 534 200 20 84", en: "+90 534 200 20 84" },
  email: { tr: "sahin_atakan@hotmail.com", en: "sahin_atakan@hotmail.com" },
  mapTitle: { tr: "Middle-earth Haritası", en: "Middle-earth Map" },
  characters: { tr: "Karakterler", en: "Characters" },
  stories: { tr: "Hikayeler", en: "Stories" },
  map: { tr: "Harita", en: "Map" },
  shop: { tr: "Mağaza", en: "Shop" },
  socialTitle: { tr: "Palantír Bağlantıları", en: "Palantír Links" },
  ringPoem: {
    tr: `"Bir Yüzük hepsini yönetir,<br/>Bir Yüzük hepsini bulur,<br/>Bir Yüzük hepsini bir araya getirir<br/>Ve karanlıkta onları birbirine bağlar"`,
    en: `"One Ring to rule them all,<br/>One Ring to find them,<br/>One Ring to bring them all<br/>And in the darkness bind them"`
  },
  copyright: {
    tr: `© 2025 Middle-earth Projesi. Bu web sitesi ve içeriği <span class='text-yellow-500'>Atakan Şahin</span> tarafından oluşturulmuştur. Tüm hakları saklıdır. Shire'dan Rivendell'e kadar hizmetinizdeyiz.`,
    en: `© 2025 Middle-earth Project. This website and its content were created by <span class='text-yellow-500'>Atakan Şahin</span>. All rights reserved. At your service from the Shire to Rivendell.`
  },
  quote: {
    tr: `"Yolculuk başlamakla başlar" - Bilbo Baggins`,
    en: `"The journey begins with a single step" - Bilbo Baggins`
  }
};

const Footer: React.FC<FooterProps> = ({
  onCharactersClick,
  onStoriesClick,
  onMapClick,
  onShopClick,
}) => {
  const { language } = useLanguage();
  
  // Eğer scroll fonksiyonları yoksa, sayfa linklerine yönlendir
  const handleCharactersClick = () => {
    if (onCharactersClick) {
      onCharactersClick();
    } else {
      window.location.href = '/#characters-section';
    }
  };

  const handleStoriesClick = () => {
    if (onStoriesClick) {
      onStoriesClick();
    } else {
      window.location.href = '/#stories-section';
    }
  };

  const handleMapClick = () => {
    if (onMapClick) {
      onMapClick();
    } else {
      window.location.href = '/#map-section';
    }
  };

  const handleShopClick = () => {
    if (onShopClick) {
      onShopClick();
    } else {
      window.location.href = '/shop';
    }
  };

  return (
    <footer className="bg-gradient-to-t from-gray-900 to-black border-t border-yellow-600/30 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Ana Footer İçeriği */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* İletişim Bilgileri */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-yellow-500 mb-4" style={{ fontFamily: 'Ringbearer' }}>
              {texts.contactTitle[language]}
            </h3>
            <div className="space-y-3 text-gray-300">
              <p className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-yellow-500">🧙‍♂️</span>
                <span>{texts.name[language]}</span>
              </p>
              <p className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-yellow-500">📞</span>
                <a href="tel:+905342002084" className="hover:text-yellow-400 transition-colors">
                  {texts.phone[language]}
                </a>
              </p>
              <p className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-yellow-500">✉️</span>
                <a href="mailto:sahin_atakan@hotmail.com" className="hover:text-yellow-400 transition-colors">
                  {texts.email[language]}
                </a>
              </p>
            </div>
          </div>

          {/* Hızlı Linkler */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-yellow-500 mb-4" style={{ fontFamily: 'Ringbearer' }}>
              {texts.mapTitle[language]}
            </h3>
            <div className="space-y-2 text-gray-300 flex flex-col items-center">
              <button
                onClick={handleCharactersClick}
                className="block text-center hover:text-yellow-400 transition-colors bg-transparent border-none outline-none cursor-pointer py-1 px-0"
              >
                🧝‍♂️ {texts.characters[language]}
              </button>
              <button
                onClick={handleStoriesClick}
                className="block text-center hover:text-yellow-400 transition-colors bg-transparent border-none outline-none cursor-pointer py-1 px-0"
              >
                📖 {texts.stories[language]}
              </button>
              <button
                onClick={handleMapClick}
                className="block text-center hover:text-yellow-400 transition-colors bg-transparent border-none outline-none cursor-pointer py-1 px-0"
              >
                🗺️ {texts.map[language]}
              </button>
              <button
                onClick={handleShopClick}
                className="block text-center hover:text-yellow-400 transition-colors bg-transparent border-none outline-none cursor-pointer py-1 px-0"
              >
                🛒 {texts.shop[language]}
              </button>
            </div>
          </div>

          {/* Sosyal Medya */}
          <div className="text-center md:text-right">
            <h3 className="text-2xl font-bold text-yellow-500 mb-4" style={{ fontFamily: 'Ringbearer' }}>
              {texts.socialTitle[language]}
            </h3>
            <div className="flex justify-center md:justify-end gap-4">
              <a href="#" className="text-2xl hover:text-yellow-400 transition-colors">
                📘
              </a>
              <a href="#" className="text-2xl hover:text-yellow-400 transition-colors">
                📷
              </a>
              <a href="#" className="text-2xl hover:text-yellow-400 transition-colors">
                🐦
              </a>
              <a href="#" className="text-2xl hover:text-yellow-400 transition-colors">
                💼
              </a>
            </div>
            <p className="text-sm text-gray-500 mt-4" dangerouslySetInnerHTML={{ __html: texts.ringPoem[language] }} />
          </div>
        </div>

        {/* Alt Kısım */}
        <div className="border-t border-yellow-600/30 pt-8 text-center">
          <p className="text-gray-400 text-sm" dangerouslySetInnerHTML={{ __html: texts.copyright[language] }} />
          <p className="text-xs text-gray-600 mt-2">
            {texts.quote[language]}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 