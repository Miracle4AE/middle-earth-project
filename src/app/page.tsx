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

      const reader = response.body.getReader();
      const stream = new ReadableStream({
        start(controller) {
          function push() {
            reader.read().then(({ done, value }) => {
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
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={isMuted}
        src={videoSrc}
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
      >
        Tarayıcınız video etiketini desteklemiyor.
      </video>
      <button
        onClick={handleToggleMute}
        className="fixed bottom-8 right-8 z-50 px-6 py-3 rounded-full bg-yellow-500 text-black font-bold shadow-lg hover:bg-yellow-400 transition-all duration-300"
      >
        {isMuted ? "Sesi Aç 🔊" : "Sesi Kapat 🔇"}
      </button>
      {/* Overlay: 5 saniye sonra fade out */}
      <motion.main
        className="flex min-h-screen flex-col items-center justify-center bg-black/60 text-white fixed inset-0 z-10"
        initial={{ opacity: 1 }}
        animate={{ opacity: showOverlay ? 1 : 0 }}
        transition={{ duration: 1 }}
        style={{ pointerEvents: showOverlay ? 'auto' : 'none' }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-[Ringbearer] text-5xl md:text-7xl font-extrabold mb-4 text-yellow-400 drop-shadow-[0_0_20px_gold] text-center animate-pulse"
        >
          The Lord of the Rings
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-2xl md:text-3xl font-semibold mb-6 text-gray-200 text-center"
        >
          Orta Dünya&apos;ya Hoş Geldin
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="max-w-xl text-center mb-8 text-lg md:text-xl text-gray-300"
        >
          Efsanelerin, kahramanların ve yüzüğün peşindeki yolculuğun başladığı yere adım attın. Orta Dünya&apos;nın büyülü atmosferine hazır mısın?
        </motion.p>
        <MotionLink
          href="/shop"
          whileHover={{ scale: 1.1, boxShadow: "0 0 20px #FFD700" }}
          className="px-8 py-4 rounded-full bg-yellow-500 text-black font-bold text-lg shadow-lg transition-all duration-300 hover:bg-yellow-400 hover:text-gray-900"
        >
          Yüzüğü Keşfet
        </MotionLink>
      </motion.main>
    </motion.div>
  );
}
