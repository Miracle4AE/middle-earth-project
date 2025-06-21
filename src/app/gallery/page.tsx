"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const galleryImages = [
  { src: "/images/gallery/fellowship.jpg", alt: "Yüzük Kardeşliği" },
  { src: "/images/gallery/shire.jpg", alt: "Shire" },
  { src: "/images/gallery/rivendell.jpg", alt: "Rivendell" },
  { src: "/images/gallery/rohan.jpg", alt: "Rohan" },
  { src: "/images/gallery/gondor.jpg", alt: "Gondor" },
  { src: "/images/gallery/mordor.jpg", alt: "Mordor" },
  { src: "/images/gallery/mt-doom.jpg", alt: "Mount Doom" },
  { src: "/images/gallery/helmsdeep.jpg", alt: "Helm's Deep" },
  { src: "/images/gallery/galadriel.jpg", alt: "Galadriel" },
];

export default function GalleryPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center justify-center min-h-screen text-white bg-black/60">
        <h1 className="font-[Ringbearer] text-5xl md:text-7xl font-extrabold mb-12 text-yellow-400 drop-shadow-[0_0_20px_gold] text-center z-10">Galeri</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl px-4 z-10">
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
      </div>
    </motion.div>
  );
} 