"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Preloader from "./Preloader";
import Footer from "./Footer";

const MotionLink = motion(Link);

// Karakterler verisi
const characters = [
  // İyi karakterler
  {
    name: "Frodo Baggins",
    image: "/images/characters/frodo.jpg",
    desc: "Yüzük Taşıyıcısı, Shire'ın cesur hobbit'i.",
    type: "good",
  },
  {
    name: "Samwise Gamgee",
    image: "/images/characters/sam.jpg",
    desc: "Frodo'nun sadık dostu ve gerçek kahraman.",
    type: "good",
  },
  {
    name: "Gandalf",
    image: "/images/characters/gandalf.jpg",
    desc: "Gri büyücü, Orta Dünya'nın bilgesi ve yol göstericisi.",
    type: "good",
  },
  {
    name: "Aragorn",
    image: "/images/characters/aragorn.jpg",
    desc: "Isildur'un varisi, Gondor'un kralı ve cesur savaşçı.",
    type: "good",
  },
  {
    name: "Legolas",
    image: "/images/characters/legolas.jpg",
    desc: "Mirkwood'un elf prensi, okçuluk ustası.",
    type: "good",
  },
  {
    name: "Gimli",
    image: "/images/characters/gimli.jpg",
    desc: "Cüce savaşçı, sadık dost.",
    type: "good",
  },
  // Kötü karakterler
  {
    name: "Sauron",
    image: "/images/characters/sauron.jpg",
    desc: "Karanlık Lord, Tek Yüzük'ün efendisi.",
    type: "evil",
  },
  {
    name: "Saruman",
    image: "/images/characters/saruman.jpg",
    desc: "Beyaz büyücü, ihanetin simgesi.",
    type: "evil",
  },
  {
    name: "Gollum",
    image: "/images/characters/gollum.jpg",
    desc: "Yüzük tarafından yozlaştırılmış zavallı yaratık.",
    type: "evil",
  },
  {
    name: "Nazgûl (Ringwraiths)",
    image: "/images/characters/nazgul.jpg",
    desc: "Sauron'un ölümsüz hizmetkarları.",
    type: "evil",
  },
];

// Hikayeler verisi
const stories = [
  {
    title: "Tek Yüzük'ün Yaratılışı",
    desc: "Sauron tarafından dövülen Tek Yüzük'ün Orta Dünya üzerindeki etkisi ve laneti.",
  },
  {
    title: "Yüzük Kardeşliği'nin Yolculuğu",
    desc: "Frodo ve dostlarının yüzüğü yok etmek için çıktıkları destansı yolculuk.",
  },
  {
    title: "Helm's Deep Savaşı",
    desc: "Rohan'ın savunması, Orta Dünya'nın en büyük savaşlarından biri.",
  },
  {
    title: "Gondor'un Kuşatılması",
    desc: "Sauron'un ordularının Minas Tirith'e saldırısı ve büyük direniş.",
  },
  {
    title: "Gollum'un Trajedisi",
    desc: "Yüzüğün yozlaştırdığı Gollum'un acıklı hikayesi.",
  },
  {
    title: "Kara Kapı'da Son Direniş",
    desc: "Orta Dünya'nın özgürlüğü için yapılan son büyük savaş.",
  },
];

// Galeri verisi
const galleryImages = [
  { src: "/images/gallery/fellowship.jpg", alt: "Yüzük Kardeşliği" },
  { src: "/images/gallery/shire.jpg", alt: "Shire" },
  { src: "/images/gallery/rivendell.jpg", alt: "Rivendell" },
  { src: "/images/gallery/rohan.jpg", alt: "Rohan" },
  { src: "/images/gallery/gondor.jpg", alt: "Gondor" },
  { src: "/images/gallery/mordor.jpg", alt: "Mordor" },
  { src: "/images/gallery/mt-doom.jpg", alt: "Mount Doom" },
  { src: "/images/gallery/helmsdeep.jpg", alt: "Helm's Deep" },
  { src: "/images/gallery/galadriel.jpg", alt: "Galadriel"   },
];

// Öne çıkan ürünler verisi
const featuredProducts = [
  { 
    name: "Tek Yüzük", 
    price: "99.999₺", 
    img: "/images/one-ring.png", 
    desc: "Sauron'un kudretiyle dövülmüş efsanevi yüzük.",
    category: "Yüzükler"
  },
  { 
    name: "Andúril", 
    price: "79.999₺", 
    img: "/images/gallery/aragorn.jpg", 
    desc: "Aragorn'un efsanevi kılıcı.",
    category: "Kılıçlar"
  },
  { 
    name: "Sting", 
    price: "29.999₺", 
    img: "/images/gallery/frodo.jpg", 
    desc: "Frodo'nun mavi parlayan kılıcı.",
    category: "Kılıçlar"
  },
  { 
    name: "Glamdring", 
    price: "39.999₺", 
    img: "/images/gallery/gandalf.jpg", 
    desc: "Gandalf'ın kılıcı, ork avcısı.",
    category: "Kılıçlar"
  },
  { 
    name: "Elf Pelerini", 
    price: "9.999₺", 
    img: "/images/gallery/legolas.jpg", 
    desc: "Görünmezlik sağlayan elf pelerini.",
    category: "Pelerinler"
  },
  { 
    name: "Orta Dünya Haritası", 
    price: "1.999₺", 
    img: "/images/middle-earth-map.jpg", 
    desc: "Orta Dünya'nın detaylı haritası.",
    category: "Haritalar"
  },
];

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const charactersRef = useRef<HTMLDivElement>(null);
  const storiesRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const shopRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");
  const [showOverlay, setShowOverlay] = useState(true);
  const [pageLoadTime, setPageLoadTime] = useState<number>(0);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Smooth scroll fonksiyonları
  const scrollToCharacters = () => {
    if (charactersRef.current) {
      charactersRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
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

  const scrollToStories = () => {
    if (storiesRef.current) {
      storiesRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
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

  const scrollToGallery = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
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

  const scrollToMap = () => {
    if (mapRef.current) {
      mapRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
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

  const scrollToShop = () => {
    if (shopRef.current) {
      shopRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
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

  // URL'den karakterler bölümüne scroll kontrolü
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#characters') {
      setTimeout(() => {
        scrollToCharacters();
      }, 1000);
    }
  }, [isLoaded]);

  useEffect(() => {
    const videoUrl = "/video/lotr-intro.mp4";

    async function fetchVideo() {
      const response = await fetch(videoUrl);
      if (!response.ok) {
        console.error("Video yüklenemedi!");
        setIsLoaded(true);
        setVideoSrc(videoUrl);
        return;
      }

      const contentLength = response.headers.get("content-length");
      if (!contentLength || !response.body) {
        setIsLoaded(true);
        setVideoSrc(videoUrl);
        return;
      }

      const reader: ReadableStreamDefaultReader<Uint8Array> = response.body.getReader();
      const stream = new ReadableStream({
        start(controller) {
          function push() {
            reader.read().then(({ done, value }: { done: boolean; value?: Uint8Array }) => {
              if (done) {
                controller.close();
                return;
              }
              controller.enqueue(value);
              push();
            });
          }
          push();
        },
      });

      const videoBlob = await new Response(stream).blob();
      const blobUrl = URL.createObjectURL(videoBlob);
      setVideoSrc(blobUrl);
      setIsLoaded(true);
      setPageLoadTime(Date.now());
    }

    fetchVideo();
  }, []);

  // Overlay'i 25 saniye sonra gizle ve scroll kontrolü
  useEffect(() => {
    if (isLoaded && pageLoadTime > 0) {
      const timer = setTimeout(() => setShowOverlay(false), 25000);
      
      // Scroll pozisyonuna göre overlay'i kontrol et
      const handleScroll = () => {
        const videoSection = document.querySelector('div[style*="100vh"]');
        if (videoSection) {
          const rect = videoSection.getBoundingClientRect();
          // Video bölümü görünür durumda ve overlay süresi dolmadıysa göster
          if (rect.top >= -100 && rect.bottom <= window.innerHeight + 100) {
            const elapsed = Date.now() - pageLoadTime;
            if (elapsed < 25000) {
              setShowOverlay(true);
            }
          }
        }
      };

      window.addEventListener('scroll', handleScroll);
      
      return () => {
        clearTimeout(timer);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isLoaded, pageLoadTime]);

  const handleToggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
      videoRef.current.volume = videoRef.current.muted ? 0 : 1;
      videoRef.current.play();
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (typeof (videoRef.current as HTMLVideoElement & { webkitRequestFullscreen?: () => void }).webkitRequestFullscreen === 'function') {
        (videoRef.current as HTMLVideoElement & { webkitRequestFullscreen: () => void }).webkitRequestFullscreen();
      } else if (typeof (videoRef.current as HTMLVideoElement & { msRequestFullscreen?: () => void }).msRequestFullscreen === 'function') {
        (videoRef.current as HTMLVideoElement & { msRequestFullscreen: () => void }).msRequestFullscreen();
      }
    }
  };

  if (!isLoaded) {
    return <Preloader />;
  }

  const goodChars = characters.filter((c) => c.type === "good");
  const evilChars = characters.filter((c) => c.type === "evil");

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section - Video Background */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            height: typeof window !== "undefined" && window.innerWidth < 768
              ? "calc(100dvh - 56px)"
              : "100vh"
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 min-w-full min-h-full w-auto h-auto object-cover"
            src={videoSrc}
          >
            Tarayıcınız video etiketini desteklemiyor.
          </video>

          {/* Overlay: 25 saniye sonra fade out - Sadece video bölümünde */}
          <motion.main
            className="flex flex-col items-center justify-center bg-black/60 text-white absolute inset-0 z-10 px-2 sm:px-8"
            style={{ 
              pointerEvents: showOverlay ? 'auto' : 'none' 
            }}
            initial={{ opacity: 1 }}
            animate={{ opacity: showOverlay ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="font-[Ringbearer] text-2xl sm:text-5xl md:text-7xl font-extrabold mb-2 sm:mb-4 text-yellow-400 drop-shadow-[0_0_20px_gold] text-center animate-pulse leading-tight"
            >
              The Lord of the Rings
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-base sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 text-gray-200 text-center leading-tight"
            >
              Orta Dünya&apos;ya Hoş Geldin
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="max-w-xl text-center mb-6 sm:mb-8 text-sm sm:text-lg md:text-xl text-gray-300 leading-relaxed px-2"
            >
              Efsanelerin, kahramanların ve yüzüğün peşindeki yolculuğun başladığı yere adım attın. Orta Dünya&apos;nın büyülü atmosferine hazır mısın?
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-4">
              <MotionLink
                href="/shop"
                whileHover={{ scale: 1.1, boxShadow: "0 0 20px #FFD700" }}
                className="px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-yellow-500 text-black font-bold text-base sm:text-lg shadow-lg transition-all duration-300 hover:bg-yellow-400 hover:text-gray-900"
              >
                Yüzüğü Keşfet
              </MotionLink>
              <motion.button
                onClick={scrollToCharacters}
                whileHover={{ scale: 1.1, boxShadow: "0 0 20px #FFD700" }}
                className="px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-transparent border-2 border-yellow-500 text-yellow-400 font-bold text-base sm:text-lg shadow-lg transition-all duration-300 hover:bg-yellow-500 hover:text-black"
              >
                Karakterleri Keşfet
              </motion.button>
              <motion.button
                onClick={scrollToStories}
                whileHover={{ scale: 1.1, boxShadow: "0 0 20px #FFD700" }}
                className="px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-transparent border-2 border-yellow-500 text-yellow-400 font-bold text-base sm:text-lg shadow-lg transition-all duration-300 hover:bg-yellow-500 hover:text-black"
              >
                Hikayeleri Keşfet
              </motion.button>
              <motion.button
                onClick={scrollToGallery}
                whileHover={{ scale: 1.1, boxShadow: "0 0 20px #FFD700" }}
                className="px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-transparent border-2 border-yellow-500 text-yellow-400 font-bold text-base sm:text-lg shadow-lg transition-all duration-300 hover:bg-yellow-500 hover:text-black"
              >
                Galeriyi Keşfet
              </motion.button>
              <motion.button
                onClick={scrollToMap}
                whileHover={{ scale: 1.1, boxShadow: "0 0 20px #FFD700" }}
                className="px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-transparent border-2 border-yellow-500 text-yellow-400 font-bold text-base sm:text-lg shadow-lg transition-all duration-300 hover:bg-yellow-500 hover:text-black"
              >
                Haritayı Keşfet
              </motion.button>
              <motion.button
                onClick={scrollToShop}
                whileHover={{ scale: 1.1, boxShadow: "0 0 20px #FFD700" }}
                className="px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-transparent border-2 border-yellow-500 text-yellow-400 font-bold text-base sm:text-lg shadow-lg transition-all duration-300 hover:bg-yellow-500 hover:text-black"
              >
                Ürünleri Keşfet
              </motion.button>
            </div>
          </motion.main>
        </div>

        {/* Mobilde ses ve tam ekran butonları */}
        <div className="fixed bottom-4 right-4 z-50 flex gap-2 sm:bottom-8 sm:right-8">
          <button
            onClick={handleToggleMute}
            className="px-3 py-2 rounded-full bg-yellow-500 text-black font-bold shadow-lg hover:bg-yellow-400 transition-all duration-300 text-base sm:text-lg"
          >
            <span className="hidden sm:inline">{isMuted ? "Sesi Aç " : "Sesi Kapat "}</span>
            {isMuted ? "🔊" : "🔇"}
          </button>
          {/* Sadece mobilde tam ekran butonu */}
          {isMobile && (
            <button
              onClick={handleFullscreen}
              className="px-3 py-2 rounded-full bg-yellow-500 text-black font-bold shadow-lg hover:bg-yellow-400 transition-all duration-300 text-base"
              aria-label="Tam Ekran"
            >
              ⛶
            </button>
          )}
        </div>

        {/* Karakterler Bölümü */}
        <div 
          id="characters-section"
          ref={charactersRef} 
          className="relative min-h-screen w-full bg-gradient-to-b from-black via-gray-900 to-black"
        >
          {/* Karakterler bölümü arka plan yüzük görseli */}
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
            <Image
              src="/images/one-ring.png"
              alt="One Ring"
              fill
              style={{ objectFit: "contain", opacity: 0.18, filter: "drop-shadow(0 0 80px gold) blur(2px)" }}
              priority
            />
          </div>

          {/* Karakterler içeriği */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex flex-col items-center justify-center min-h-screen text-white overflow-hidden z-10 pt-20"
          >
            <motion.h1 
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-[Ringbearer] text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 md:mb-12 text-yellow-400 drop-shadow-[0_0_20px_gold] text-center"
            >
              Karakterler
            </motion.h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full max-w-7xl px-4">
              {/* İyi karakterler sol sütun */}
              <div className="flex flex-col gap-8">
                <motion.h2 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="font-[Ringbearer] text-2xl md:text-3xl text-yellow-300 mb-4 text-center drop-shadow-[0_0_10px_gold]"
                >
                  İyi Karakterler
                </motion.h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {goodChars.map((char, i) => (
                    <motion.div
                      key={char.name}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className="bg-black/60 backdrop-blur-xl rounded-xl border-2 border-yellow-600 shadow-2xl flex flex-col items-center p-6 transition-all duration-300 hover:scale-105 hover:shadow-yellow-400/30 hover:border-yellow-400 group"
                    >
                      <div className="w-20 h-20 mb-4 rounded-full overflow-hidden border-2 border-yellow-400 group-hover:border-yellow-200 transition-all duration-300 shadow-lg">
                        <Image
                          src={char.image}
                          alt={char.name}
                          width={80}
                          height={80}
                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <h3 className="font-[Ringbearer] text-lg font-bold text-yellow-300 mb-2 text-center group-hover:text-yellow-200 transition-colors">
                        {char.name}
                      </h3>
                      <p className="text-sm text-gray-300 text-center leading-relaxed group-hover:text-gray-200 transition-colors">
                        {char.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Kötü karakterler sağ sütun */}
              <div className="flex flex-col gap-8">
                <motion.h2 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="font-[Ringbearer] text-2xl md:text-3xl text-red-400 mb-4 text-center drop-shadow-[0_0_10px_red]"
                >
                  Kötü Karakterler
                </motion.h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {evilChars.map((char, i) => (
                    <motion.div
                      key={char.name}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className="bg-black/60 backdrop-blur-xl rounded-xl border-2 border-red-600 shadow-2xl flex flex-col items-center p-6 transition-all duration-300 hover:scale-105 hover:shadow-red-400/30 hover:border-red-400 group"
                    >
                      <div className="w-20 h-20 mb-4 rounded-full overflow-hidden border-2 border-red-400 group-hover:border-red-200 transition-all duration-300 shadow-lg">
                        <Image
                          src={char.image}
                          alt={char.name}
                          width={80}
                          height={80}
                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <h3 className="font-[Ringbearer] text-lg font-bold text-red-300 mb-2 text-center group-hover:text-red-200 transition-colors">
                        {char.name}
                      </h3>
                      <p className="text-sm text-gray-300 text-center leading-relaxed group-hover:text-gray-200 transition-colors">
                        {char.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Hikayeler Bölümü */}
        <div 
          id="stories-section"
          ref={storiesRef} 
          className="relative min-h-screen w-full bg-gradient-to-b from-black via-gray-800 to-black"
        >
          {/* Hikayeler içeriği */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex flex-col items-center justify-center min-h-screen text-white overflow-hidden z-10 pt-20"
          >
            <motion.h1 
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-[Ringbearer] text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 md:mb-12 text-yellow-400 drop-shadow-[0_0_20px_gold] text-center"
            >
              Orta Dünya Efsaneleri
            </motion.h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl px-4">
              {stories.map((story, i) => (
                <motion.div
                  key={story.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-black/70 backdrop-blur-xl rounded-2xl border-2 border-yellow-700 shadow-xl flex flex-col items-center p-8 hover:scale-105 hover:shadow-yellow-400/30 hover:border-yellow-400 transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="w-16 h-16 mb-6 rounded-full bg-yellow-400/20 flex items-center justify-center group-hover:bg-yellow-400/30 transition-all duration-300">
                    <span className="text-2xl">📖</span>
                  </div>
                  <h2 className="font-[Ringbearer] text-xl md:text-2xl text-yellow-300 mb-4 drop-shadow-[0_0_10px_gold] text-center group-hover:text-yellow-200 transition-colors">
                    {story.title}
                  </h2>
                  <p className="text-gray-200 text-center text-sm md:text-base leading-relaxed group-hover:text-gray-100 transition-colors">
                    {story.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Galeri Bölümü */}
        <div 
          id="gallery-section"
          ref={galleryRef} 
          className="relative min-h-screen w-full bg-gradient-to-b from-black via-gray-900 to-black"
        >
          {/* Galeri içeriği */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex flex-col items-center justify-center min-h-screen text-white overflow-hidden z-10 pt-20"
          >
            <motion.h1 
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-[Ringbearer] text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 md:mb-12 text-yellow-400 drop-shadow-[0_0_20px_gold] text-center"
            >
              Galeri
            </motion.h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-7xl px-4">
              {galleryImages.map((img, i) => (
                <motion.div
                  key={img.src}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="relative overflow-hidden rounded-2xl shadow-xl border-2 border-yellow-700 bg-black/70 group hover:scale-105 hover:shadow-yellow-400/30 hover:border-yellow-400 transition-all duration-300"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover group-hover:opacity-90 group-hover:blur-[1px] transition duration-300"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 text-center">
                    <span className="font-[Ringbearer] text-lg md:text-2xl text-yellow-300 drop-shadow-[0_0_10px_gold]">{img.alt}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Harita Bölümü */}
        <div 
          id="map-section"
          ref={mapRef} 
          className="relative min-h-screen w-full bg-gradient-to-b from-black via-gray-900 to-black"
        >
          {/* Harita içeriği */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex flex-col items-center justify-center min-h-screen text-white overflow-hidden z-10 pt-20"
          >
            <motion.h1 
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-[Ringbearer] text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 md:mb-12 text-yellow-400 drop-shadow-[0_0_20px_gold] text-center"
            >
              Orta Dünya Haritası
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-6xl px-4"
            >
              <div className="relative w-full rounded-xl overflow-hidden shadow-2xl border-4 border-yellow-700 hover:scale-105 transition-transform duration-500 bg-black/70">
                <Image
                  src="/images/middle-earth-map.jpg"
                  alt="Orta Dünya Haritası"
                  width={1600}
                  height={900}
                  className="w-full h-auto object-cover opacity-95 hover:opacity-100 transition duration-500"
                />
              </div>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg md:text-xl text-gray-200 mt-8 text-center font-[Ringbearer]"
              >
                Harita üzerinde gezinebilir ve Orta Dünya&apos;nın büyüsünü keşfedebilirsin!
              </motion.p>
            </motion.div>
          </motion.div>
        </div>

        {/* Ürünlerimiz Bölümü */}
        <div 
          id="shop-section"
          ref={shopRef} 
          className="relative min-h-screen w-full bg-gradient-to-b from-black via-gray-900 to-black"
        >
          {/* Ürünlerimiz içeriği */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex flex-col items-center justify-center min-h-screen text-white overflow-hidden z-10 pt-20"
          >
            <motion.h1 
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-[Ringbearer] text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 md:mb-12 text-yellow-400 drop-shadow-[0_0_20px_gold] text-center"
            >
              Ürünlerimiz
            </motion.h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl px-4">
              {featuredProducts.map((product, i) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-black/70 backdrop-blur-xl rounded-2xl border-2 border-yellow-700 shadow-xl flex flex-col items-center p-6 hover:scale-105 hover:shadow-yellow-400/30 hover:border-yellow-400 transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="w-32 h-32 mb-4 rounded-xl overflow-hidden border-2 border-yellow-400 group-hover:border-yellow-200 transition-all duration-300 shadow-lg">
                    <Image
                      src={product.img}
                      alt={product.name}
                      width={128}
                      height={128}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="font-[Ringbearer] text-xl md:text-2xl text-yellow-300 mb-2 drop-shadow-[0_0_10px_gold] group-hover:text-yellow-200 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-300 mb-3 leading-relaxed group-hover:text-gray-200 transition-colors">
                      {product.desc}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-[Ringbearer] text-lg text-yellow-400 font-bold">
                        {product.price}
                      </span>
                      <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
                        {product.category}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12"
            >
              <MotionLink
                href="/shop"
                whileHover={{ scale: 1.1, boxShadow: "0 0 20px #FFD700" }}
                className="px-8 py-4 rounded-full bg-yellow-500 text-black font-bold text-lg shadow-lg transition-all duration-300 hover:bg-yellow-400 hover:text-gray-900"
              >
                Tüm Ürünleri Gör
              </MotionLink>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      <Footer
        onCharactersClick={scrollToCharacters}
        onStoriesClick={scrollToStories}
        onMapClick={scrollToMap}
        onShopClick={scrollToShop}
      />
    </>
  );
}
