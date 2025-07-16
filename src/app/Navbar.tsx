"use client";
import Link from "next/link";
import { useAuth } from "./AuthContext";
import { auth } from '../lib/firebase';
import { signOut } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";
import Image from "next/image";
import { parsePrice } from "./shop/productsData";

type CartItem = { name: string; nameEn?: string; category: string; price: string; img: string; quantity: number };

export default function Navbar() {
  const { user, loading } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [cartSidebarOpen, setCartSidebarOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [usdRate, setUsdRate] = useState<number | null>(null);
  const profileBtnRef = useRef<HTMLButtonElement>(null);
  let menuTimeout: NodeJS.Timeout | null = null;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState('home');

  // Scroll pozisyonuna göre aktif bölümü belirle
  useEffect(() => {
    const handleScroll = () => {
      const charactersSection = document.getElementById('characters-section');
      const storiesSection = document.getElementById('stories-section');
      const gallerySection = document.getElementById('gallery-section');
      const mapSection = document.getElementById('map-section');
      const shopSection = document.getElementById('shop-section');
      
      if (charactersSection && storiesSection && gallerySection && mapSection && shopSection) {
        const charactersRect = charactersSection.getBoundingClientRect();
        const storiesRect = storiesSection.getBoundingClientRect();
        const galleryRect = gallerySection.getBoundingClientRect();
        const mapRect = mapSection.getBoundingClientRect();
        const shopRect = shopSection.getBoundingClientRect();
        
        if (shopRect.top <= 100) {
          setActiveSection('shop');
        } else if (mapRect.top <= 100) {
          setActiveSection('map');
        } else if (galleryRect.top <= 100) {
          setActiveSection('gallery');
        } else if (storiesRect.top <= 100) {
          setActiveSection('stories');
        } else if (charactersRect.top <= 100) {
          setActiveSection('characters');
        } else {
          setActiveSection('home');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll fonksiyonları
  const scrollToCharacters = (e: React.MouseEvent) => {
    e.preventDefault();
    // Eğer ana sayfada değilsek, ana sayfaya git
    if (pathname !== '/') {
      router.push('/#characters');
    } else {
      const element = document.getElementById('characters-section');
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  const scrollToStories = (e: React.MouseEvent) => {
    e.preventDefault();
    // Eğer ana sayfada değilsek, ana sayfaya git
    if (pathname !== '/') {
      router.push('/#stories');
    } else {
      const element = document.getElementById('stories-section');
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  const scrollToGallery = (e: React.MouseEvent) => {
    e.preventDefault();
    // Eğer ana sayfada değilsek, ana sayfaya git
    if (pathname !== '/') {
      router.push('/#gallery');
    } else {
      const element = document.getElementById('gallery-section');
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  const scrollToMap = (e: React.MouseEvent) => {
    e.preventDefault();
    // Eğer ana sayfada değilsek, ana sayfaya git
    if (pathname !== '/') {
      router.push('/#map');
    } else {
      const element = document.getElementById('map-section');
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  const scrollToShop = (e: React.MouseEvent) => {
    e.preventDefault();
    // Eğer ana sayfada değilsek, ana sayfaya git
    if (pathname !== '/') {
      router.push('/#shop');
    } else {
      const element = document.getElementById('shop-section');
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  useEffect(() => {
    const updateCartCount = () => {
      if (typeof window === 'undefined') return;
      const cart: { quantity?: number }[] = JSON.parse(localStorage.getItem("lotr-cart") || "[]");
      const total = cart.reduce((sum: number, item: { quantity?: number }) => sum + (item.quantity || 1), 0);
      setCartCount(total);
    };
    updateCartCount();
    if (typeof window !== 'undefined') {
      window.addEventListener("storage", updateCartCount);
      // Sepete ekleme sonrası da güncellenmesi için interval ekle
      const interval = setInterval(updateCartCount, 500);
      return () => {
        window.removeEventListener("storage", updateCartCount);
        clearInterval(interval);
      };
    }
  }, []);

  // Sepet verisini okurken de tip belirt
  useEffect(() => {
    const updateCartData = () => {
      if (typeof window === 'undefined') return;
      const cart: CartItem[] = JSON.parse(localStorage.getItem("lotr-cart") || "[]");
      setCartItems(cart);
      let total = 0;
      cart.forEach((item: CartItem) => {
        const price = parsePrice(item.price);
        total += price * item.quantity;
      });
      setCartTotal(total);
    };
    
    updateCartData();
    if (typeof window !== 'undefined') {
      window.addEventListener("storage", updateCartData);
      const interval = setInterval(updateCartData, 500);
      return () => {
        window.removeEventListener("storage", updateCartData);
        clearInterval(interval);
      };
    }
  }, []);

  // USD kuru için
  useEffect(() => {
    if (language === 'en') {
      fetch('/api/exchange-rate')
        .then(res => res.json())
        .then(data => {
          if (data && typeof data.usd === 'number' && !isNaN(data.usd)) {
            setUsdRate(data.usd);
          } else {
            setUsdRate(null);
          }
        })
        .catch(() => {
          setUsdRate(null);
        });
    }
  }, [language]);

  const handleLogout = async () => {
    try {
      if (!auth) {
        console.error("Firebase auth başlatılamadı.");
        return;
      }
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Çıkış yaparken hata oluştu:", error);
    }
  };

  const handleMenuEnter = () => {
    if (menuTimeout) clearTimeout(menuTimeout);
    setMenuOpen(true);
  };
  const handleMenuLeave = () => {
    menuTimeout = setTimeout(() => setMenuOpen(false), 200);
  };

  // Sepet sidebar fonksiyonları
  const handleCartSidebarToggle = () => {
    setCartSidebarOpen(!cartSidebarOpen);
  };

  // Fonksiyon parametrelerinde de CartItem kullan
  const handleIncreaseQuantity = (index: number) => {
    const newCart: CartItem[] = [...cartItems];
    newCart[index].quantity += 1;
    localStorage.setItem("lotr-cart", JSON.stringify(newCart));
    setCartItems(newCart);
    
    let total = 0;
    newCart.forEach((item: CartItem) => {
      const price = parsePrice(item.price);
      total += price * item.quantity;
    });
    setCartTotal(total);
  };

  // Fonksiyon parametrelerinde de CartItem kullan
  const handleDecreaseQuantity = (index: number) => {
    const newCart: CartItem[] = [...cartItems];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
    } else {
      newCart.splice(index, 1);
    }
    localStorage.setItem("lotr-cart", JSON.stringify(newCart));
    setCartItems(newCart);
    
    let total = 0;
    newCart.forEach((item: CartItem) => {
      const price = parsePrice(item.price);
      total += price * item.quantity;
    });
    setCartTotal(total);
  };

  // Fonksiyon parametrelerinde de CartItem kullan
  const handleRemoveItem = (index: number) => {
    const newCart: CartItem[] = cartItems.filter((_, i) => i !== index);
    localStorage.setItem("lotr-cart", JSON.stringify(newCart));
    setCartItems(newCart);
    
    let total = 0;
    newCart.forEach((item: CartItem) => {
      const price = parsePrice(item.price);
      total += price * item.quantity;
    });
    setCartTotal(total);
  };

  const handleCheckout = () => {
    setCartSidebarOpen(false);
    router.push("/checkout");
  };

  // Menü linkleri
  const menuLinks = [
    { href: "/", label: t('home') },
    { href: "/#characters", label: t('characters') },
    { href: "/#stories", label: t('stories') },
    { href: "/#gallery", label: t('gallery') },
    { href: "/#map", label: t('map') },
    { href: "/#shop", label: t('shop') },
  ];

  return (
    <nav className="w-full flex justify-between items-center gap-2 sm:gap-6 py-2 sm:py-4 bg-black/80 border-b border-yellow-700 shadow-lg z-50 font-[Ringbearer] text-sm sm:text-lg md:text-2xl text-yellow-300 fixed top-0 left-0 px-2 sm:px-8">
      {/* Logo/Brand */}
      <div className="flex items-center">
        <Link href="/" className="text-yellow-400 font-bold text-lg sm:text-xl md:text-2xl hover:text-yellow-500 transition">
          LOTR
        </Link>
      </div>
      {/* Menü Linkleri (PC) */}
      <div className="hidden md:flex gap-4 lg:gap-6">
        {menuLinks.map(link => (
          link.href === "/" ? (
            <Link
              key={link.href}
              href={link.href}
              className={
                (activeSection === 'home'
                  ? "bg-yellow-400 text-black font-bold border-b-4 border-yellow-600 shadow-md"
                  : "hover:text-yellow-500 transition") +
                " px-3 py-1 rounded-md whitespace-nowrap"
              }
            >
              {link.label}
            </Link>
          ) : link.href === "/#characters" ? (
            <button
              key={link.href}
              onClick={scrollToCharacters}
              className={
                (activeSection === 'characters'
                  ? "bg-yellow-400 text-black font-bold border-b-4 border-yellow-600 shadow-md"
                  : "hover:text-yellow-500 transition") +
                " px-3 py-1 rounded-md whitespace-nowrap"
              }
            >
              {link.label}
            </button>
          ) : link.href === "/#stories" ? (
            <button
              key={link.href}
              onClick={scrollToStories}
              className={
                (activeSection === 'stories'
                  ? "bg-yellow-400 text-black font-bold border-b-4 border-yellow-600 shadow-md"
                  : "hover:text-yellow-500 transition") +
                " px-3 py-1 rounded-md whitespace-nowrap"
              }
            >
              {link.label}
            </button>
          ) : link.href === "/#gallery" ? (
            <button
              key={link.href}
              onClick={scrollToGallery}
              className={
                (activeSection === 'gallery'
                  ? "bg-yellow-400 text-black font-bold border-b-4 border-yellow-600 shadow-md"
                  : "hover:text-yellow-500 transition") +
                " px-3 py-1 rounded-md whitespace-nowrap"
              }
            >
              {link.label}
            </button>
          ) : link.href === "/#map" ? (
            <button
              key={link.href}
              onClick={scrollToMap}
              className={
                (activeSection === 'map'
                  ? "bg-yellow-400 text-black font-bold border-b-4 border-yellow-600 shadow-md"
                  : "hover:text-yellow-500 transition") +
                " px-3 py-1 rounded-md whitespace-nowrap"
              }
            >
              {link.label}
            </button>
          ) : link.href === "/#shop" ? (
            <button
              key={link.href}
              onClick={scrollToShop}
              className={
                (activeSection === 'shop'
                  ? "bg-yellow-400 text-black font-bold border-b-4 border-yellow-600 shadow-md"
                  : "hover:text-yellow-500 transition") +
                " px-3 py-1 rounded-md whitespace-nowrap"
              }
            >
              {link.label}
            </button>
          ) : (
            <Link
              key={link.href}
              href={link.href}
              className={
                (pathname === link.href
                  ? "bg-yellow-400 text-black font-bold border-b-4 border-yellow-600 shadow-md"
                  : "hover:text-yellow-500 transition") +
                " px-3 py-1 rounded-md whitespace-nowrap"
              }
            >
              {link.label}
            </Link>
          )
        ))}
      </div>
      {/* Auth/Cart (PC) */}
      <div className="hidden md:flex gap-2 lg:gap-4 items-center">
        {/* Dil Seçenekleri */}
        <div className="relative">
          <button
            onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
            className="bg-yellow-400 text-black font-bold py-1 px-3 rounded hover:bg-yellow-500 transition text-sm flex items-center gap-1"
          >
            <span>{language === 'tr' ? '🇹🇷' : '🇺🇸'}</span>
            <span className="hidden lg:inline">{language === 'tr' ? 'TR' : 'EN'}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {languageMenuOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-black border-2 border-yellow-700 rounded-xl shadow-2xl z-50 flex flex-col text-sm">
              <button
                onClick={() => {
                  setLanguage('tr');
                  setLanguageMenuOpen(false);
                }}
                className={`px-3 py-2 text-left hover:bg-yellow-100/10 border-b border-yellow-700 flex items-center gap-2 ${
                  language === 'tr' ? 'bg-yellow-400 text-black font-bold' : 'text-yellow-300'
                }`}
              >
                <span>🇹🇷</span>
                <span>{t('turkish')}</span>
              </button>
              <button
                onClick={() => {
                  setLanguage('en');
                  setLanguageMenuOpen(false);
                }}
                className={`px-3 py-2 text-left hover:bg-yellow-100/10 rounded-b-xl flex items-center gap-2 ${
                  language === 'en' ? 'bg-yellow-400 text-black font-bold' : 'text-yellow-300'
                }`}
              >
                <span>🇺🇸</span>
                <span>{t('english')}</span>
              </button>
            </div>
          )}
        </div>

        {!loading && (
          <>
            {user ? (
              <>
                <span className="text-yellow-200 text-base md:text-lg">{t('hello')}, {user.displayName || user.email}!</span>
                <div className="relative"
                  onMouseEnter={handleMenuEnter}
                  onMouseLeave={handleMenuLeave}
                >
                  <button
                    ref={profileBtnRef}
                    onClick={() => setMenuOpen((v) => !v)}
                    className="bg-yellow-400 text-black font-bold py-1 px-4 rounded ml-4 hover:bg-yellow-500 transition text-base md:text-lg"
                  >
                    {t('profile')}
                  </button>
                  {menuOpen && (
                    <div
                      className="absolute right-0 mt-2 w-56 bg-black border-2 border-yellow-700 rounded-xl shadow-2xl z-50 flex flex-col text-base animate-fade-in"
                    >
                      <Link href="/orders" className="px-4 py-2 hover:bg-yellow-100/10 border-b border-yellow-700">{t('orders')}</Link>
                      <Link href="/requests" className="px-4 py-2 hover:bg-yellow-100/10 border-b border-yellow-700">{t('requests')}</Link>
                      <Link href="/offers" className="px-4 py-2 hover:bg-yellow-100/10 border-b border-yellow-700">{t('offers')}</Link>
                      <Link href="/profile" className="px-4 py-2 hover:bg-yellow-100/10 border-b border-yellow-700">{t('profile_info')}</Link>
                      <Link href="/reviews" className="px-4 py-2 hover:bg-yellow-100/10 border-b border-yellow-700">{t('reviews')}</Link>
                      <Link href="/favorites" className="px-4 py-2 hover:bg-yellow-100/10 border-b border-yellow-700">{t('favorites')}</Link>
                      <Link href="/profile-lists" className="px-4 py-2 hover:bg-yellow-100/10 border-b border-yellow-700">{t('lists')}</Link>
                      <button onClick={handleLogout} className="px-4 py-2 text-left hover:bg-red-600 hover:text-white rounded-b-xl">{t('logout')}</button>
                    </div>
                  )}
                </div>
                <button 
                  onClick={handleCartSidebarToggle}
                  className="bg-yellow-400 text-black font-bold py-1 px-4 rounded ml-4 hover:bg-yellow-500 transition text-base md:text-lg relative flex items-center"
                >
                  {t('cart')}
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="ml-2 bg-red-600 text-white rounded-full px-2 py-0.5 text-xs font-bold shadow-lg border-2 border-yellow-400"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="bg-yellow-400 text-black font-bold py-1 px-4 rounded hover:bg-yellow-500 transition text-base md:text-lg">{t('login')}</Link>
                <Link href="/register" className="bg-yellow-400 text-black font-bold py-1 px-4 rounded hover:bg-yellow-500 transition text-base md:text-lg">{t('register')}</Link>
              </>
            )}
          </>
        )}
      </div>
      {/* Hamburger Menü (Mobil) */}
      <div className="md:hidden flex items-center gap-2">
        {/* Dil Seçenekleri Mobil */}
        <div className="relative">
          <button
            onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
            className="bg-yellow-400 text-black font-bold py-1 px-2 rounded hover:bg-yellow-500 transition text-sm flex items-center gap-1"
          >
            <span>{language === 'tr' ? '🇹🇷' : '🇺🇸'}</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {languageMenuOpen && (
            <div className="absolute right-0 mt-2 w-28 bg-black border-2 border-yellow-700 rounded-xl shadow-2xl z-50 flex flex-col text-sm">
              <button
                onClick={() => {
                  setLanguage('tr');
                  setLanguageMenuOpen(false);
                }}
                className={`px-2 py-1 text-left hover:bg-yellow-100/10 border-b border-yellow-700 flex items-center gap-1 ${
                  language === 'tr' ? 'bg-yellow-400 text-black font-bold' : 'text-yellow-300'
                }`}
              >
                <span>🇹🇷</span>
                <span className="text-xs">{t('turkish')}</span>
              </button>
              <button
                onClick={() => {
                  setLanguage('en');
                  setLanguageMenuOpen(false);
                }}
                className={`px-2 py-1 text-left hover:bg-yellow-100/10 rounded-b-xl flex items-center gap-1 ${
                  language === 'en' ? 'bg-yellow-400 text-black font-bold' : 'text-yellow-300'
                }`}
              >
                <span>🇺🇸</span>
                <span className="text-xs">{t('english')}</span>
              </button>
            </div>
          )}
        </div>

        {/* Sepet butonu mobilde */}
        {!loading && user && (
          <button 
            onClick={handleCartSidebarToggle}
            className="bg-yellow-400 text-black font-bold py-1 px-2 rounded hover:bg-yellow-500 transition text-sm relative flex items-center"
          >
            {t('cart')}
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="ml-1 bg-red-600 text-white rounded-full px-1 py-0.5 text-xs font-bold shadow-lg border border-yellow-400"
              >
                {cartCount}
              </motion.span>
            )}
          </button>
        )}
        {/* Hamburger buton */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-yellow-400 hover:text-yellow-500 transition p-2"
          aria-label={t('menu')}
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {/* Mobil Açılır Menü */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/80 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute top-16 left-0 right-0 bg-black border-b border-yellow-700 p-4 max-h-[70vh] overflow-y-auto rounded-b-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col gap-4 text-yellow-300">
              {menuLinks.map(link => (
                link.href === "/" ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={
                      (activeSection === 'home'
                        ? "bg-yellow-400 text-black font-bold border-l-4 border-yellow-600 shadow-md"
                        : "hover:text-yellow-500 transition") +
                      " py-3 text-lg rounded px-2"
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : link.href === "/#characters" ? (
                  <button
                    key={link.href}
                    onClick={(e) => {
                      scrollToCharacters(e);
                      setMobileMenuOpen(false);
                    }}
                    className={
                      (activeSection === 'characters'
                        ? "bg-yellow-400 text-black font-bold border-l-4 border-yellow-600 shadow-md"
                        : "hover:text-yellow-500 transition") +
                      " py-3 text-lg rounded px-2 text-left"
                    }
                  >
                    {link.label}
                  </button>
                ) : link.href === "/#stories" ? (
                  <button
                    key={link.href}
                    onClick={(e) => {
                      scrollToStories(e);
                      setMobileMenuOpen(false);
                    }}
                    className={
                      (activeSection === 'stories'
                        ? "bg-yellow-400 text-black font-bold border-l-4 border-yellow-600 shadow-md"
                        : "hover:text-yellow-500 transition") +
                      " py-3 text-lg rounded px-2 text-left"
                    }
                  >
                    {link.label}
                  </button>
                ) : link.href === "/#gallery" ? (
                  <button
                    key={link.href}
                    onClick={(e) => {
                      scrollToGallery(e);
                      setMobileMenuOpen(false);
                    }}
                    className={
                      (activeSection === 'gallery'
                        ? "bg-yellow-400 text-black font-bold border-l-4 border-yellow-600 shadow-md"
                        : "hover:text-yellow-500 transition") +
                      " py-3 text-lg rounded px-2 text-left"
                    }
                  >
                    {link.label}
                  </button>
                ) : link.href === "/#map" ? (
                  <button
                    key={link.href}
                    onClick={(e) => {
                      scrollToMap(e);
                      setMobileMenuOpen(false);
                    }}
                    className={
                      (activeSection === 'map'
                        ? "bg-yellow-400 text-black font-bold border-l-4 border-yellow-600 shadow-md"
                        : "hover:text-yellow-500 transition") +
                      " py-3 text-lg rounded px-2 text-left"
                    }
                  >
                    {link.label}
                  </button>
                ) : link.href === "/#shop" ? (
                  <button
                    key={link.href}
                    onClick={(e) => {
                      scrollToShop(e);
                      setMobileMenuOpen(false);
                    }}
                    className={
                      (activeSection === 'shop'
                        ? "bg-yellow-400 text-black font-bold border-l-4 border-yellow-600 shadow-md"
                        : "hover:text-yellow-500 transition") +
                      " py-3 text-lg rounded px-2 text-left"
                    }
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={
                      (pathname === link.href
                        ? "bg-yellow-400 text-black font-bold border-l-4 border-yellow-600 shadow-md"
                        : "hover:text-yellow-500 transition") +
                      " py-3 text-lg rounded px-2"
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              ))}
              {/* Kullanıcı işlemleri ve giriş/çıkış butonları mobilde büyük ve dokunmatik dostu olacak */}
              {!loading && (
                <>
                  {user ? (
                    <>
                      <span className="text-yellow-200 text-base md:text-lg">{t('hello')}, {user.displayName || user.email}!</span>
                      <Link href="/orders" className="block hover:bg-yellow-100/10 py-2 px-2 rounded" onClick={() => setMobileMenuOpen(false)}>{t('orders')}</Link>
                      <Link href="/requests" className="block hover:bg-yellow-100/10 py-2 px-2 rounded" onClick={() => setMobileMenuOpen(false)}>{t('requests')}</Link>
                      <Link href="/offers" className="block hover:bg-yellow-100/10 py-2 px-2 rounded" onClick={() => setMobileMenuOpen(false)}>{t('offers')}</Link>
                      <Link href="/profile" className="block hover:bg-yellow-100/10 py-2 px-2 rounded" onClick={() => setMobileMenuOpen(false)}>{t('profile_info')}</Link>
                      <Link href="/reviews" className="block hover:bg-yellow-100/10 py-2 px-2 rounded" onClick={() => setMobileMenuOpen(false)}>{t('reviews')}</Link>
                      <Link href="/favorites" className="block hover:bg-yellow-100/10 py-2 px-2 rounded" onClick={() => setMobileMenuOpen(false)}>{t('favorites')}</Link>
                      <Link href="#" className="block hover:bg-yellow-100/10 py-2 px-2 rounded" onClick={() => setMobileMenuOpen(false)}>{t('lists')}</Link>
                      <button onClick={handleLogout} className="w-full text-left hover:bg-red-600 hover:text-white py-2 px-2 rounded mt-2">{t('logout')}</button>
                    </>
                  ) : (
                    <div className="border-t border-yellow-700 pt-4 mt-4 flex gap-2">
                      <Link href="/login" className="bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-500 transition text-sm flex-1 text-center" onClick={() => setMobileMenuOpen(false)}>{t('login')}</Link>
                      <Link href="/register" className="bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-500 transition text-sm flex-1 text-center" onClick={() => setMobileMenuOpen(false)}>{t('register')}</Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sepet Sidebar */}
      {cartSidebarOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setCartSidebarOpen(false)}
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-80 md:w-96 bg-black border-l-2 border-yellow-700 shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-[Ringbearer] text-2xl text-yellow-400 drop-shadow-[0_0_10px_gold]">
                  {t('cart')}
                </h2>
                <button
                  onClick={() => setCartSidebarOpen(false)}
                  className="text-yellow-400 hover:text-yellow-300 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              {/* Sepet İçeriği */}
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-yellow-200 text-lg mb-4">{t('no_cart_items')}</div>
                  <button
                    onClick={() => {
                      setCartSidebarOpen(false);
                      router.push('/shop');
                    }}
                    className="bg-yellow-400 text-black font-bold py-2 px-6 rounded hover:bg-yellow-500 transition"
                  >
                    {t('continue_shopping')}
                  </button>
                </div>
              ) : (
                <>
                  {/* Ürün Listesi */}
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item, index) => (
                      <div key={index} className="bg-black/60 border border-yellow-700 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Image
                            src={item.img}
                            alt={item.name}
                            width={60}
                            height={60}
                            className="object-contain rounded border border-yellow-600"
                          />
                                                     <div className="flex-1">
                             <h3 className="font-[Ringbearer] text-yellow-300 text-lg">
                               {language === 'en' && item.nameEn ? item.nameEn : item.name}
                             </h3>
                             <p className="text-yellow-200 text-sm">
                               {language === 'en' ? t(item.category) : item.category}
                             </p>
                            <p className="text-yellow-400 font-bold">
                              {language === 'en' && usdRate 
                                ? `$${(parsePrice(item.price) * usdRate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                                : item.price
                              }
                            </p>
                          </div>
                        </div>
                        
                        {/* Miktar Kontrolleri */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleDecreaseQuantity(index)}
                              className="bg-yellow-400 text-black w-8 h-8 rounded font-bold hover:bg-yellow-500 transition"
                            >
                              -
                            </button>
                            <span className="text-yellow-300 font-bold text-lg px-4">{item.quantity}</span>
                            <button
                              onClick={() => handleIncreaseQuantity(index)}
                              className="bg-yellow-400 text-black w-8 h-8 rounded font-bold hover:bg-yellow-500 transition"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(index)}
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition text-sm"
                          >
                            {t('remove_from_cart')}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Toplam ve Ödeme */}
                  <div className="border-t border-yellow-700 pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-yellow-300 text-lg font-bold">{t('total')}:</span>
                      <span className="text-yellow-400 text-xl font-bold">
                        {language === 'en' && usdRate 
                          ? `$${(cartTotal * usdRate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                          : `${cartTotal.toLocaleString()}₺`
                        }
                      </span>
                    </div>
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 transition text-lg"
                    >
                      {t('checkout')}
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </nav>
  );
} 