"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../LanguageContext";

const rohanLocations = [
  {
    nameKey: "edoras_name",
    descKey: "edoras_desc",
    image: "/images/gallery/rohan.jpg"
  },
  {
    nameKey: "meduseld_name",
    descKey: "meduseld_desc",
    image: "/images/characters/theoden.jpg"
  },
  {
    nameKey: "helms_deep_name",
    descKey: "helms_deep_desc",
    image: "/images/characters/eomer.jpg"
  },
  {
    nameKey: "aldburg_name",
    descKey: "aldburg_desc",
    image: "/images/characters/eowyn.jpg"
  },
  {
    nameKey: "westfold_name",
    descKey: "westfold_desc",
    image: "/images/characters/aragorn.jpg"
  },
  {
    nameKey: "eastfold_name",
    descKey: "eastfold_desc",
    image: "/images/characters/legolas.jpg"
  }
];

const rohanCulture = [
  {
    titleKey: "horse_culture_title",
    descKey: "horse_culture_desc"
  },
  {
    titleKey: "warrior_spirit_title",
    descKey: "warrior_spirit_desc"
  },
  {
    titleKey: "meadow_life_title",
    descKey: "meadow_life_desc"
  },
  {
    titleKey: "heroism_tradition_title",
    descKey: "heroism_tradition_desc"
  }
];

export default function RohanPage() {
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
            src="/images/gallery/rohan.jpg"
            alt={t('rohan_page_title')}
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-slate-900/70"></div>
        </div>

        {/* İçerik */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-[Ringbearer] text-5xl md:text-7xl font-extrabold mb-6 text-slate-200 drop-shadow-[0_0_20px_slate]"
          >
            {t('rohan_page_title')}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-600 p-8 mb-8 shadow-2xl"
          >
            <blockquote className="text-xl md:text-2xl text-slate-200 mb-4 italic">
              &ldquo;{t('rohan_quote')}&rdquo;
            </blockquote>
            <p className="text-lg text-slate-400 font-semibold">- {t('rohan_quote_author')}</p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            {t('rohan_description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="#locations"
              className="px-8 py-4 bg-slate-700 text-slate-100 font-bold text-lg rounded-full hover:bg-slate-600 transition-all duration-300 shadow-lg hover:shadow-slate-600/50 border border-slate-600"
            >
              {t('explore_locations')}
            </Link>
            <Link
              href="#culture"
              className="px-8 py-4 bg-transparent border-2 border-slate-600 text-slate-200 font-bold text-lg rounded-full hover:bg-slate-700 hover:text-slate-100 transition-all duration-300 shadow-lg hover:shadow-slate-600/50"
            >
              {t('learn_culture')}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Yerler Bölümü */}
      <div id="locations" className="py-20 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-[Ringbearer] text-4xl md:text-6xl font-extrabold text-center mb-12 text-slate-200 drop-shadow-[0_0_20px_slate]"
        >
          {t('rohan_locations')}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {rohanLocations.map((location, index) => (
            <motion.div
              key={location.nameKey}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-slate-800/80 backdrop-blur-xl rounded-xl border border-slate-600 shadow-xl p-6 hover:scale-105 hover:shadow-slate-600/30 hover:border-slate-500 transition-all duration-300 group"
            >
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-slate-500 group-hover:border-slate-400 transition-all duration-300">
                <Image
                  src={location.image}
                  alt={t(location.nameKey)}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-[Ringbearer] text-xl font-bold text-slate-200 mb-2 text-center group-hover:text-slate-100 transition-colors">
                {t(location.nameKey)}
              </h3>
              <p className="text-slate-400 text-sm text-center leading-relaxed group-hover:text-slate-300 transition-colors">
                {t(location.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Kültür Bölümü */}
      <div id="culture" className="py-20 px-4 bg-slate-800/40">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-[Ringbearer] text-4xl md:text-6xl font-extrabold text-center mb-12 text-slate-200 drop-shadow-[0_0_20px_slate]"
          >
            {t('rohan_culture')}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rohanCulture.map((item, index) => (
              <motion.div
                key={item.titleKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800/90 backdrop-blur-xl rounded-xl border border-slate-600 p-6 shadow-xl hover:scale-105 hover:shadow-slate-600/30 hover:border-slate-500 transition-all duration-300"
              >
                <h3 className="font-[Ringbearer] text-2xl font-bold text-slate-200 mb-4 text-center">
                  {t(item.titleKey)}
                </h3>
                <p className="text-slate-300 text-lg leading-relaxed text-center">
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
            className="font-[Ringbearer] text-4xl md:text-6xl font-extrabold text-center mb-12 text-slate-200 drop-shadow-[0_0_20px_slate]"
          >
            {t('rohan_history')}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-600 p-8 shadow-2xl"
          >
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                {t('rohan_history_1')}
              </p>
              
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                {t('rohan_history_2')}
              </p>

              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                {t('rohan_history_3')}
              </p>

              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                {t('rohan_history_4')}
              </p>

              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                {t('rohan_history_5')}
              </p>

              <p className="text-lg text-slate-300 leading-relaxed">
                {t('rohan_history_6')}
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
            className="px-8 py-4 bg-slate-700 text-slate-100 font-bold text-lg rounded-full hover:bg-slate-600 transition-all duration-300 shadow-lg hover:shadow-slate-600/50 border border-slate-600"
          >
            {t('return_home')}
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
} 