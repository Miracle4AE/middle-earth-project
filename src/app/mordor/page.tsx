"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../LanguageContext";

const mordorLocations = [
  {
    nameKey: "barad_dur_name",
    descKey: "barad_dur_desc",
    image: "/images/gallery/mordor.jpg"
  },
  {
    nameKey: "mount_doom_name",
    descKey: "mount_doom_desc",
    image: "/images/characters/sauron.jpg"
  },
  {
    nameKey: "minas_morgul_mordor_name",
    descKey: "minas_morgul_mordor_desc",
    image: "/images/characters/nazgul.jpg"
  },
  {
    nameKey: "cirith_ungol_name",
    descKey: "cirith_ungol_desc",
    image: "/images/characters/shelob.jpg"
  },
  {
    nameKey: "udun_name",
    descKey: "udun_desc",
    image: "/images/characters/orcgeneral.jpg"
  },
  {
    nameKey: "gorgoroth_name",
    descKey: "gorgoroth_desc",
    image: "/images/characters/orccaptain.jpg"
  }
];

const mordorForces = [
  {
    titleKey: "orcs_title",
    descKey: "orcs_desc"
  },
  {
    titleKey: "nazgul_title",
    descKey: "nazgul_desc"
  },
  {
    titleKey: "trolls_title",
    descKey: "trolls_desc"
  },
  {
    titleKey: "fellbeasts_title",
    descKey: "fellbeasts_desc"
  }
];

export default function MordorPage() {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-red-900 via-black to-red-900 text-white"
    >
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Arka plan görseli */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/gallery/mordor.jpg"
            alt={t('mordor_page_title')}
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-red-900/60"></div>
        </div>

        {/* İçerik */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-[Ringbearer] text-5xl md:text-7xl font-extrabold mb-6 text-red-300 drop-shadow-[0_0_20px_red]"
          >
            {t('mordor_page_title')}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-black/80 backdrop-blur-xl rounded-2xl border-2 border-red-700 p-8 mb-8 shadow-2xl"
          >
            <blockquote className="text-xl md:text-2xl text-red-300 mb-4 italic">
              &ldquo;{t('mordor_quote')}&rdquo;
            </blockquote>
            <p className="text-lg text-red-400 font-semibold">- {t('mordor_quote_author')}</p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            {t('mordor_description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="#locations"
              className="px-8 py-4 bg-red-500 text-black font-bold text-lg rounded-full hover:bg-red-400 transition-all duration-300 shadow-lg hover:shadow-red-400/50"
            >
              {t('explore_locations')}
            </Link>
            <Link
              href="#forces"
              className="px-8 py-4 bg-transparent border-2 border-red-500 text-red-300 font-bold text-lg rounded-full hover:bg-red-500 hover:text-black transition-all duration-300 shadow-lg hover:shadow-red-400/50"
            >
              {t('learn_forces')}
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
          className="font-[Ringbearer] text-4xl md:text-6xl font-extrabold text-center mb-12 text-red-300 drop-shadow-[0_0_20px_red]"
        >
          {t('mordor_locations')}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {mordorLocations.map((location, index) => (
            <motion.div
              key={location.nameKey}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-black/70 backdrop-blur-xl rounded-xl border-2 border-red-700 shadow-xl p-6 hover:scale-105 hover:shadow-red-400/30 hover:border-red-400 transition-all duration-300 group"
            >
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-red-400 group-hover:border-red-200 transition-all duration-300">
                <Image
                  src={location.image}
                  alt={t(location.nameKey)}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-[Ringbearer] text-xl font-bold text-red-300 mb-2 text-center group-hover:text-red-200 transition-colors">
                {t(location.nameKey)}
              </h3>
              <p className="text-gray-300 text-sm text-center leading-relaxed group-hover:text-gray-200 transition-colors">
                {t(location.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Güçler Bölümü */}
      <div id="forces" className="py-20 px-4 bg-black/40">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-[Ringbearer] text-4xl md:text-6xl font-extrabold text-center mb-12 text-red-300 drop-shadow-[0_0_20px_red]"
          >
            {t('mordor_forces')}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mordorForces.map((item, index) => (
              <motion.div
                key={item.titleKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-black/80 backdrop-blur-xl rounded-xl border-2 border-red-700 p-6 shadow-xl hover:scale-105 hover:shadow-red-400/30 hover:border-red-400 transition-all duration-300"
              >
                <h3 className="font-[Ringbearer] text-2xl font-bold text-red-300 mb-4 text-center">
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
            className="font-[Ringbearer] text-4xl md:text-6xl font-extrabold text-center mb-12 text-red-300 drop-shadow-[0_0_20px_red]"
          >
            {t('mordor_history')}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-black/80 backdrop-blur-xl rounded-2xl border-2 border-red-700 p-8 shadow-2xl"
          >
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-gray-200 leading-relaxed mb-6">
                {t('mordor_history_1')}
              </p>
              
              <p className="text-lg text-gray-200 leading-relaxed mb-6">
                {t('mordor_history_2')}
              </p>

              <p className="text-lg text-gray-200 leading-relaxed mb-6">
                {t('mordor_history_3')}
              </p>

              <p className="text-lg text-gray-200 leading-relaxed mb-6">
                {t('mordor_history_4')}
              </p>

              <p className="text-lg text-gray-200 leading-relaxed mb-6">
                {t('mordor_history_5')}
              </p>

              <p className="text-lg text-gray-200 leading-relaxed">
                {t('mordor_history_6')}
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
            className="px-8 py-4 bg-red-500 text-black font-bold text-lg rounded-full hover:bg-red-400 transition-all duration-300 shadow-lg hover:shadow-red-400/50"
          >
            {t('return_home')}
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
} 