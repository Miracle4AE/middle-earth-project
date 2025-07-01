import React from 'react';

interface FooterProps {
  onCharactersClick?: () => void;
  onStoriesClick?: () => void;
  onMapClick?: () => void;
  onShopClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({
  onCharactersClick,
  onStoriesClick,
  onMapClick,
  onShopClick,
}) => {
  return (
    <footer className="bg-gradient-to-t from-gray-900 to-black border-t border-yellow-600/30 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Ana Footer İçeriği */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* İletişim Bilgileri */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-yellow-500 mb-4" style={{ fontFamily: 'Ringbearer' }}>
              Gandalf&apos;ın Mesajı
            </h3>
            <div className="space-y-3 text-gray-300">
              <p className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-yellow-500">🧙‍♂️</span>
                <span>Atakan Şahin</span>
              </p>
              <p className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-yellow-500">📞</span>
                <a href="tel:+905342002084" className="hover:text-yellow-400 transition-colors">
                  +90 534 200 20 84
                </a>
              </p>
              <p className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-yellow-500">✉️</span>
                <a href="mailto:sahin_atakan@hotmail.com" className="hover:text-yellow-400 transition-colors">
                  sahin_atakan@hotmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Hızlı Linkler */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-yellow-500 mb-4" style={{ fontFamily: 'Ringbearer' }}>
              Middle-earth Haritası
            </h3>
            <div className="space-y-2 text-gray-300 flex flex-col items-center">
              <button
                onClick={onCharactersClick}
                className="block text-center hover:text-yellow-400 transition-colors bg-transparent border-none outline-none cursor-pointer py-1 px-0"
              >
                🧝‍♂️ Karakterler
              </button>
              <button
                onClick={onStoriesClick}
                className="block text-center hover:text-yellow-400 transition-colors bg-transparent border-none outline-none cursor-pointer py-1 px-0"
              >
                📖 Hikayeler
              </button>
              <button
                onClick={onMapClick}
                className="block text-center hover:text-yellow-400 transition-colors bg-transparent border-none outline-none cursor-pointer py-1 px-0"
              >
                🗺️ Harita
              </button>
              <button
                onClick={onShopClick}
                className="block text-center hover:text-yellow-400 transition-colors bg-transparent border-none outline-none cursor-pointer py-1 px-0"
              >
                🛒 Mağaza
              </button>
            </div>
          </div>

          {/* Sosyal Medya */}
          <div className="text-center md:text-right">
            <h3 className="text-2xl font-bold text-yellow-500 mb-4" style={{ fontFamily: 'Ringbearer' }}>
              Palant&iacute;r Bağlantıları
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
            <p className="text-sm text-gray-500 mt-4">
              &quot;Bir Yüzük hepsini yönetir,<br/>
              Bir Yüzük hepsini bulur,<br/>
              Bir Yüzük hepsini bir araya getirir<br/>
              Ve karanlıkta onları birbirine bağlar&quot;
            </p>
          </div>
        </div>

        {/* Alt Kısım */}
        <div className="border-t border-yellow-600/30 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Middle-earth Projesi. Bu web sitesi ve içeriği <span className="text-yellow-500">Atakan Şahin</span> tarafından oluşturulmuştur. 
            Tüm hakları saklıdır. Shire&apos;dan Rivendell&apos;e kadar hizmetinizdeyiz.
          </p>
          <p className="text-xs text-gray-600 mt-2">
            &quot;Yolculuk başlamakla başlar&quot; - Bilbo Baggins
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 