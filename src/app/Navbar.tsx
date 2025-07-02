"use client";
import Link from "next/link";
import { useAuth } from "./AuthContext";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";

export default function Navbar() {
  const { user, loading } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
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
    const element = document.getElementById('characters-section');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToStories = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('stories-section');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToGallery = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('gallery-section');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToMap = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('map-section');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToShop = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('shop-section');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    const updateCartCount = () => {
      const cart: { quantity?: number }[] = JSON.parse(localStorage.getItem("lotr-cart") || "[]");
      const total = cart.reduce((sum: number, item: { quantity?: number }) => sum + (item.quantity || 1), 0);
      setCartCount(total);
    };
    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    // Sepete ekleme sonrası da güncellenmesi için interval ekle
    const interval = setInterval(updateCartCount, 500);
    return () => {
      window.removeEventListener("storage", updateCartCount);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = async () => {
    try {
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
                      <Link href="#" className="px-4 py-2 hover:bg-yellow-100/10 border-b border-yellow-700">{t('reviews')}</Link>
                      <Link href="#" className="px-4 py-2 hover:bg-yellow-100/10 border-b border-yellow-700">{t('favorites')}</Link>
                      <Link href="#" className="px-4 py-2 hover:bg-yellow-100/10 border-b border-yellow-700">{t('lists')}</Link>
                      <button onClick={handleLogout} className="px-4 py-2 text-left hover:bg-red-600 hover:text-white rounded-b-xl">{t('logout')}</button>
                    </div>
                  )}
                </div>
                <Link href="/cart">
                  <button className="bg-yellow-400 text-black font-bold py-1 px-4 rounded ml-4 hover:bg-yellow-500 transition text-base md:text-lg relative flex items-center">
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
                </Link>
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
          <Link href="/cart">
            <button className="bg-yellow-400 text-black font-bold py-1 px-2 rounded hover:bg-yellow-500 transition text-sm relative flex items-center">
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
          </Link>
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
                      <Link href="#" className="block hover:bg-yellow-100/10 py-2 px-2 rounded" onClick={() => setMobileMenuOpen(false)}>{t('reviews')}</Link>
                      <Link href="#" className="block hover:bg-yellow-100/10 py-2 px-2 rounded" onClick={() => setMobileMenuOpen(false)}>{t('favorites')}</Link>
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
    </nav>
  );
} 