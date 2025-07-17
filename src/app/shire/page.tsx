"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../LanguageContext";

const shireLocations = [
  {
    nameKey: "hobbiton_name",
    descKey: "hobbiton_desc",
    image: "/images/gallery/shire.jpg"
  },
  {
    nameKey: "bag_end_name",
    descKey: "bag_end_desc",
    image: "/images/characters/bilbo.jpg"
  },
  {
    nameKey: "green_dragon_name",
    descKey: "green_dragon_desc",
    image: "/images/characters/frodo.jpg"
  },
  {
    nameKey: "brandy_hall_name",
    descKey: "brandy_hall_desc",
    image: "/images/characters/merry.jpg"
  },
  {
    nameKey: "tookland_name",
    descKey: "tookland_desc",
    image: "/images/characters/pippin.jpg"
  },
  {
    nameKey: "michel_delving_name",
    descKey: "michel_delving_desc",
    image: "/images/characters/sam.jpg"
  }
];

const shireCulture = [
  {
    titleKey: "hobbit_lifestyle_title",
    descKey: "hobbit_lifestyle_desc"
  },
  {
    titleKey: "hobbit_holes_title",
    descKey: "hobbit_holes_desc"
  },
  {
    titleKey: "shire_calendar_title",
    descKey: "shire_calendar_desc"
  },
  {
    titleKey: "hobbit_cuisine_title",
    descKey: "hobbit_cuisine_desc"
  }
];

export default function ShirePage() {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-green-900 via-green-800 to-green-900 text-white"
    >
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Arka plan görseli */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/gallery/shire.jpg"
            alt={t('shire_page_title')}
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-green-900/60"></div>
        </div>

        {/* İçerik */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-[Ringbearer] text-5xl md:text-7xl font-extrabold mb-6 text-green-300 drop-shadow-[0_0_20px_green]"
          >
            {t('shire_page_title')}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-black/80 backdrop-blur-xl rounded-2xl border-2 border-green-700 p-8 mb-8 shadow-2xl"
          >
            <blockquote className="text-xl md:text-2xl text-green-300 mb-4 italic">
              &ldquo;{t('shire_quote')}&rdquo;
            </blockquote>
            <p className="text-lg text-green-400 font-semibold">- {t('shire_quote_author')}</p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            {t('shire_description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="#locations"
              className="px-8 py-4 bg-green-500 text-black font-bold text-lg rounded-full hover:bg-green-400 transition-all duration-300 shadow-lg hover:shadow-green-400/50"
            >
              {t('explore_locations')}
            </Link>
            <Link
              href="#culture"
              className="px-8 py-4 bg-transparent border-2 border-green-500 text-green-300 font-bold text-lg rounded-full hover:bg-green-500 hover:text-black transition-all duration-300 shadow-lg hover:shadow-green-400/50"
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
          className="font-[Ringbearer] text-4xl md:text-6xl font-extrabold text-center mb-12 text-green-300 drop-shadow-[0_0_20px_green]"
        >
          {t('important_locations')}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {shireLocations.map((location, index) => (
            <motion.div
              key={location.nameKey}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-black/70 backdrop-blur-xl rounded-xl border-2 border-green-700 shadow-xl p-6 hover:scale-105 hover:shadow-green-400/30 hover:border-green-400 transition-all duration-300 group"
            >
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-green-400 group-hover:border-green-200 transition-all duration-300">
                <Image
                  src={location.image}
                  alt={t(location.nameKey)}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-[Ringbearer] text-xl font-bold text-green-300 mb-2 text-center group-hover:text-green-200 transition-colors">
                {t(location.nameKey)}
              </h3>
              <p className="text-gray-300 text-sm text-center leading-relaxed group-hover:text-gray-200 transition-colors">
                {t(location.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Kültür Bölümü */}
      <div id="culture" className="py-20 px-4 bg-black/40">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-[Ringbearer] text-4xl md:text-6xl font-extrabold text-center mb-12 text-green-300 drop-shadow-[0_0_20px_green]"
          >
            {t('hobbit_culture')}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {shireCulture.map((item, index) => (
              <motion.div
                key={item.titleKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-black/80 backdrop-blur-xl rounded-xl border-2 border-green-700 p-6 shadow-xl hover:scale-105 hover:shadow-green-400/30 hover:border-green-400 transition-all duration-300"
              >
                <h3 className="font-[Ringbearer] text-2xl font-bold text-green-300 mb-4 text-center">
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
            className="font-[Ringbearer] text-4xl md:text-6xl font-extrabold text-center mb-12 text-green-300 drop-shadow-[0_0_20px_green]"
          >
            {t('shire_history')}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-black/80 backdrop-blur-xl rounded-2xl border-2 border-green-700 p-8 shadow-2xl"
          >
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-gray-200 leading-relaxed mb-6">
                {t('shire_history_1')}
              </p>
              
              <p className="text-lg text-gray-200 leading-relaxed mb-6">
                {t('shire_history_2')}
              </p>

              <p className="text-lg text-gray-200 leading-relaxed mb-6">
                {t('shire_history_3')}
              </p>

              <p className="text-lg text-gray-200 leading-relaxed mb-6">
                {t('shire_history_4')}
              </p>

              <p className="text-lg text-gray-200 leading-relaxed mb-6">
                {t('shire_history_5')}
              </p>

              <p className="text-lg text-gray-200 leading-relaxed">
                {t('shire_history_6')}
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
            className="px-8 py-4 bg-green-500 text-black font-bold text-lg rounded-full hover:bg-green-400 transition-all duration-300 shadow-lg hover:shadow-green-400/50"
          >
            {t('return_home')}
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
} 