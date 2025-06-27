"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Preloader from "./Preloader";

const MotionLink = motion(Link);

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");
  const [showOverlay, setShowOverlay] = useState(true);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

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
    }

    fetchVideo();
  }, []);

  // Overlay'i 25 saniye sonra gizle
  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => setShowOverlay(false), 25000);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

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
      } else if ((videoRef.current as any).webkitRequestFullscreen) {
        (videoRef.current as any).webkitRequestFullscreen();
      } else if ((videoRef.current as any).msRequestFullscreen) {
        (videoRef.current as any).msRequestFullscreen();
      }
    }
  };

  if (!isLoaded) {
    return <Preloader />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Responsive Video Wrapper */}
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
      {/* Overlay: 5 saniye sonra fade out */}
      <motion.main
        className="flex min-h-screen flex-col items-center justify-center bg-black/60 text-white fixed inset-0 z-10 px-2 sm:px-8"
        initial={{ opacity: 1 }}
        animate={{ opacity: showOverlay ? 1 : 0 }}
        transition={{ duration: 1 }}
        style={{ pointerEvents: showOverlay ? 'auto' : 'none' }}
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
        <MotionLink
          href="/shop"
          whileHover={{ scale: 1.1, boxShadow: "0 0 20px #FFD700" }}
          className="px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-yellow-500 text-black font-bold text-base sm:text-lg shadow-lg transition-all duration-300 hover:bg-yellow-400 hover:text-gray-900"
        >
          Yüzüğü Keşfet
        </MotionLink>
      </motion.main>
    </motion.div>
  );
}
