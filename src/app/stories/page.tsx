"use client";
import { motion } from "framer-motion";
import { BookOpenIcon } from "@heroicons/react/24/outline";

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

export default function StoriesPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center justify-center min-h-screen text-white bg-black/60">
        <h1 className="font-[Ringbearer] text-5xl md:text-7xl font-extrabold mb-4 text-yellow-400 drop-shadow-[0_0_20px_gold] text-center z-10">Orta Dünya Efsaneleri</h1>
        <p className="font-[Tengwar] text-2xl md:text-3xl text-yellow-200 text-center mb-8 select-none"></p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl px-4 z-10">
          {stories.map((story, i) => (
            <motion.div
              key={story.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-black/70 backdrop-blur-xl rounded-2xl border-2 border-yellow-700 shadow-xl flex flex-col items-center p-8 hover:scale-105 hover:shadow-yellow-400/30 hover:border-yellow-400 transition-all duration-300 group relative overflow-hidden"
            >
              <BookOpenIcon className="w-12 h-12 text-yellow-400 mb-4 drop-shadow-[0_0_10px_gold]" />
              <h2 className="font-[Ringbearer] text-2xl md:text-3xl text-yellow-300 mb-2 drop-shadow-[0_0_10px_gold] text-center">{story.title}</h2>
              <p className="text-gray-200 text-center text-base md:text-lg">{story.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
} 