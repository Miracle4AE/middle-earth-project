"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../LanguageContext";

const rivendellFeatures = [
  {
    nameKey: "elronds_house_name",
    descKey: "elronds_house_desc",
    image: "/images/characters/elrond.jpg"
  },
  {
    nameKey: "waterfalls_name",
    descKey: "waterfalls_desc",
    image: "/images/gallery/rivendell.jpg"
  },
  {
    nameKey: "bridges_name",
    descKey: "bridges_desc",
    image: "/images/characters/legolas.jpg"
  },
  {
    nameKey: "library_name",
    descKey: "library_desc",
    image: "/images/characters/gandalf.jpg"
  },
  {
    nameKey: "gardens_name",
    descKey: "gardens_desc",
    image: "/images/characters/arwen.jpg"
  },
  {
    nameKey: "healing_rooms_name",
    descKey: "healing_rooms_desc",
    image: "/images/characters/galadriel.jpg"
  }
];

const elfCulture = [
  {
    titleKey: "elf_wisdom_title",
    descKey: "elf_wisdom_desc"
  },
  {
    titleKey: "elf_architecture_title",
    descKey: "elf_architecture_desc"
  },
  {
    titleKey: "elf_art_title",
    descKey: "elf_art_desc"
  },
  {
    titleKey: "immortality_title",
    descKey: "immortality_desc"
  }
];

export default function RivendellPage() {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white"
    >
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Arka plan görseli */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/gallery/rivendell.jpg"
            alt={t('rivendell_page_title')}
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-800/70 to-slate-900/80"></div>
        </div>

        {/* İçerik */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-[Ringbearer] text-5xl md:text-7xl font-extrabold mb-6 text-amber-300 drop-shadow-[0_0_20px_amber]"
          >
            {t('rivendell_page_title')}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 mb-8 shadow-2xl"
          >
            <blockquote className="text-xl md:text-2xl text-amber-200 mb-4 italic">
              "{t('rivendell_quote')}"
            </blockquote>
            <p className="text-lg text-amber-300 font-semibold">- {t('rivendell_quote_author')}</p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            {t('rivendell_description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="#features"
              className="px-8 py-4 bg-amber-500 text-black font-bold text-lg rounded-full hover:bg-amber-400 transition-all duration-300 shadow-lg hover:shadow-amber-400/50"
            >
              {t('explore_features')}
            </Link>
            <Link
              href="#culture"
              className="px-8 py-4 bg-transparent border-2 border-amber-500 text-amber-300 font-bold text-lg rounded-full hover:bg-amber-500 hover:text-black transition-all duration-300 shadow-lg hover:shadow-amber-400/50"
            >
              {t('elf_culture')}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Özellikler Bölümü */}
      <div id="features" className="py-20 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-[Ringbearer] text-4xl md:text-6xl font-extrabold text-center mb-12 text-amber-300 drop-shadow-[0_0_20px_amber]"
        >
          {t('rivendell_features')}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {rivendellFeatures.map((feature, index) => (
            <motion.div
              key={feature.nameKey}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 shadow-xl p-6 hover:scale-105 hover:shadow-amber-400/30 hover:border-amber-400 transition-all duration-300 group"
            >
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-amber-400 group-hover:border-amber-200 transition-all duration-300">
                <Image
                  src={feature.image}
                  alt={t(feature.nameKey)}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-[Ringbearer] text-xl font-bold text-amber-300 mb-2 text-center group-hover:text-amber-200 transition-colors">
                {t(feature.nameKey)}
              </h3>
              <p className="text-gray-300 text-sm text-center leading-relaxed group-hover:text-gray-200 transition-colors">
                {t(feature.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Elf Kültürü Bölümü */}
      <div id="culture" className="py-20 px-4 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-[Ringbearer] text-4xl md:text-6xl font-extrabold text-center mb-12 text-amber-300 drop-shadow-[0_0_20px_amber]"
          >
            {t('elf_culture')}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {elfCulture.map((item, index) => (
              <motion.div
                key={item.titleKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 shadow-xl hover:scale-105 hover:shadow-amber-400/30 hover:border-amber-400 transition-all duration-300"
              >
                <h3 className="font-[Ringbearer] text-2xl font-bold text-amber-300 mb-4 text-center">
                  {t(item.titleKey)}
                </h3>
                <p className="text-gray-200 text-lg leading-relaxed text-center">
                  {t(item.descKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Tarih Bölümü */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-[Ringbearer] text-4xl md:text-6xl font-extrabold text-center mb-12 text-amber-300 drop-shadow-[0_0_20px_amber]"
          >
            {t('rivendell_history')}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 shadow-2xl"
          >
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-gray-200 leading-relaxed mb-6">
                {t('rivendell_history_1')}
              </p>
              
              <p className="text-lg text-gray-200 leading-relaxed mb-6">
                {t('rivendell_history_2')}
              </p>

              <p className="text-lg text-gray-200 leading-relaxed mb-6">
                {t('rivendell_history_3')}
              </p>

              <p className="text-lg text-gray-200 leading-relaxed mb-6">
                {t('rivendell_history_4')}
              </p>

              <p className="text-lg text-gray-200 leading-relaxed mb-6">
                {t('rivendell_history_5')}
              </p>

              <p className="text-lg text-gray-200 leading-relaxed">
                {t('rivendell_history_6')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Geri Dön Butonu */}
      <div className="py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Link
            href="/"
            className="px-8 py-4 bg-amber-500 text-black font-bold text-lg rounded-full hover:bg-amber-400 transition-all duration-300 shadow-lg hover:shadow-amber-400/50"
          >
            {t('return_home')}
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
} 