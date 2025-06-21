"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function MapPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center justify-center min-h-screen text-white">
        <h1 className="font-[Ringbearer] text-4xl md:text-6xl text-yellow-400 mb-8">Orta Dünya Haritası</h1>
        <div className="relative w-full max-w-5xl rounded-xl overflow-hidden shadow-2xl border-4 border-yellow-700 hover:scale-105 transition-transform duration-500 bg-black/70">
          <Image
            src="/images/middle-earth-map.jpg"
            alt="Orta Dünya Haritası"
            width={1600}
            height={900}
            className="w-full h-auto object-cover opacity-95 hover:opacity-100 transition duration-500"
          />
        </div>
        <p className="text-lg text-gray-200 mt-8">Harita üzerinde gezinebilir ve Orta Dünya&apos;nın büyüsünü keşfedebilirsin!</p>
      </div>
    </motion.div>
  );
} 