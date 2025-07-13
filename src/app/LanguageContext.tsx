"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'tr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Çeviri verileri
const translations = {
  tr: {
    // Navbar
    'home': 'Anasayfa',
    'characters': 'Karakterler',
    'stories': 'Hikayeler',
    'gallery': 'Galeri',
    'map': 'Harita',
    'shop': 'Ürünlerimiz',
    'login': 'Giriş Yap',
    'register': 'Kayıt Ol',
    'profile': 'Profilim',
    'cart': 'Sepetim',
    'orders': 'Siparişlerim',
    'requests': 'Soru ve Taleplerim',
    'offers': 'Sana Özel Fırsatlar',
    'profile_info': 'Kullanıcı Bilgilerim',
    'reviews': 'Değerlendirmelerim',
    'favorites': 'Beğendiklerim',
    'lists': 'Tüm Listelerim',
    'logout': 'Çıkış Yap',
    'hello': 'Merhaba',
    'menu': 'Menüyü Aç/Kapat',
    
    // Dil seçenekleri
    'language': 'Dil',
    'turkish': 'Türkçe',
    'english': 'İngilizce',

    // Ana Sayfa
    'welcome_title': 'Orta Dünya\'ya Hoş Geldiniz',
    'welcome_subtitle': 'Yüzüklerin Efendisi\'nin büyülü dünyasına adım atın',
    'explore_button': 'Yüzüğü Keşfet',
    'explore_characters': 'Karakterleri Keşfet',
    'explore_stories': 'Hikayeleri Keşfet',
    'explore_gallery': 'Galeriyi Keşfet',
    'explore_map': 'Haritayı Keşfet',
    'explore_shop': 'Ürünleri Keşfet',
    'learn_more': 'Daha Fazla Bilgi',
    'characters_title': 'Efsanevi Karakterler',
    'characters_subtitle': 'Orta Dünya\'nın en unutulmaz kahramanları ve kötüleri',
    'good_characters': 'İyi Karakterler',
    'evil_characters': 'Kötü Karakterler',
    'stories_title': 'Destansı Hikayeler',
    'stories_subtitle': 'Orta Dünya\'nın en büyük maceraları',
    'gallery_title': 'Galeri',
    'gallery_subtitle': 'Orta Dünya\'nın en güzel görselleri',
    'map_title': 'Orta Dünya Haritası',
    'map_subtitle': 'Büyülü toprakları keşfedin',
    'shop_title': 'Ürünlerimiz',
    'shop_subtitle': 'Orta Dünya\'dan özel ürünler',
    'view_all': 'Tümünü Gör',
    'add_to_cart': 'Sepete Ekle',
    'price': 'Fiyat',
    'category': 'Kategori',
    // Shop kategorileri
    'rings': 'Yüzükler',
    'swords': 'Kılıçlar',
    'cloaks': 'Pelerinler',
    'maps': 'Haritalar',
    'figures': 'Figürler',
    'elf_jewelry': 'Elf Takıları',
    'books': 'Orta Dünya Kitapları',
    'hobbit_items': 'Hobbit Eşyaları',
    'elf_bows': 'Elf Yayları',
    'dwarf_axes': 'Cüce Baltaları',
    'nazgul_masks': 'Nazgûl Maskeleri',
    'orc_armors': 'Ork Zırhları',
    'wizard_staffs': 'Büyücü Asaları',
    'gondor_helmets': 'Gondor Miğferleri',
    'rohan_horses': 'Rohan At Figürleri',
    'posters': 'Orta Dünya Posterleri',
    'cards': 'Koleksiyon Kartları',
    'collection_figures': 'Koleksiyon Figürleri',
    'home_office': 'Ev & Ofis',
    'accessories': 'Aksesuar & Takı',
    'clothes': 'Kıyafet',
    'games_puzzles': 'Oyun & Puzzle',
    'kitchen': 'Mutfak',
    'coins_replicas': 'Koleksiyon Paraları & Replikalar',
    'plush_toys': 'Peluş & Oyuncak',
    // Shop butonları
    'buy_now': 'Satın Al',
  },
  en: {
    // Navbar
    'home': 'Home',
    'characters': 'Characters',
    'stories': 'Stories',
    'gallery': 'Gallery',
    'map': 'Map',
    'shop': 'Shop',
    'login': 'Login',
    'register': 'Register',
    'profile': 'Profile',
    'cart': 'Cart',
    'orders': 'My Orders',
    'requests': 'Questions & Requests',
    'offers': 'Special Offers',
    'profile_info': 'User Info',
    'reviews': 'My Reviews',
    'favorites': 'Favorites',
    'lists': 'All Lists',
    'logout': 'Logout',
    'hello': 'Hello',
    'menu': 'Toggle Menu',
    
    // Dil seçenekleri
    'language': 'Language',
    'turkish': 'Turkish',
    'english': 'English',

    // Ana Sayfa
    'welcome_title': 'Welcome to Middle-earth',
    'welcome_subtitle': 'Step into the magical world of The Lord of the Rings',
    'explore_button': 'Explore the Ring',
    'explore_characters': 'Explore Characters',
    'explore_stories': 'Explore Stories',
    'explore_gallery': 'Explore Gallery',
    'explore_map': 'Explore the Map',
    'explore_shop': 'Explore Products',
    'learn_more': 'Learn More',
    'characters_title': 'Legendary Characters',
    'characters_subtitle': 'Middle-earth\'s most unforgettable heroes and villains',
    'good_characters': 'Good Characters',
    'evil_characters': 'Evil Characters',
    'stories_title': 'Epic Stories',
    'stories_subtitle': 'Middle-earth\'s greatest adventures',
    'gallery_title': 'Gallery',
    'gallery_subtitle': 'Middle-earth\'s most beautiful images',
    'map_title': 'Middle-earth Map',
    'map_subtitle': 'Explore the magical lands',
    'shop_title': 'Our Products',
    'shop_subtitle': 'Special products from Middle-earth',
    'view_all': 'View All',
    'add_to_cart': 'Add to Cart',
    'price': 'Price',
    'category': 'Category',
    // Shop kategorileri
    'rings': 'Rings',
    'swords': 'Swords',
    'cloaks': 'Cloaks',
    'maps': 'Maps',
    'figures': 'Figures',
    'elf_jewelry': 'Elf Jewelry',
    'books': 'Middle-earth Books',
    'hobbit_items': 'Hobbit Items',
    'elf_bows': 'Elf Bows',
    'dwarf_axes': 'Dwarf Axes',
    'nazgul_masks': 'Nazgûl Masks',
    'orc_armors': 'Orc Armors',
    'wizard_staffs': 'Wizard Staffs',
    'gondor_helmets': 'Gondor Helmets',
    'rohan_horses': 'Rohan Horse Figures',
    'posters': 'Middle-earth Posters',
    'cards': 'Collection Cards',
    'collection_figures': 'Collection Figures',
    'home_office': 'Home & Office',
    'accessories': 'Accessories & Jewelry',
    'clothes': 'Clothes',
    'games_puzzles': 'Games & Puzzles',
    'kitchen': 'Kitchen',
    'coins_replicas': 'Coins & Replicas',
    'plush_toys': 'Plush & Toys',
    // Shop butonları
    'buy_now': 'Buy Now',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('tr');

  useEffect(() => {
    // LocalStorage'dan dil tercihini al
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && (savedLanguage === 'tr' || savedLanguage === 'en')) {
        setLanguageState(savedLanguage);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
      // HTML lang attribute'unu güncelle
      document.documentElement.lang = lang;
    }
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 