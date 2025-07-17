"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../LanguageContext";

const fellowshipMembers = [
  {
    nameKey: "gandalf_name",
    descKey: "gandalf_desc",
    age: "2000+, Orta Dünya'da",
    image: "/images/characters/gandalf.jpg"
  },
  {
    nameKey: "aragorn_name",
    descKey: "aragorn_desc",
    age: "87",
    image: "/images/characters/aragorn.jpg"
  },
  {
    nameKey: "boromir_name",
    descKey: "boromir_desc",
    age: "40",
    image: "/images/characters/boromir.jpg"
  },
  {
    nameKey: "legolas_name",
    descKey: "legolas_desc",
    age: "2000+",
    image: "/images/characters/legolas.jpg"
  },
  {
    nameKey: "gimli_name",
    descKey: "gimli_desc",
    age: "139",
    image: "/images/characters/gimli.jpg"
  },
  {
    nameKey: "frodo_name",
    descKey: "frodo_desc",
    age: "50",
    image: "/images/characters/frodo.jpg"
  },
  {
    nameKey: "sam_name",
    descKey: "sam_desc",
    age: "38",
    image: "/images/characters/sam.jpg"
  },
  {
    nameKey: "merry_name",
    descKey: "merry_desc",
    age: "36",
    image: "/images/characters/merry.jpg"
  },
  {
    nameKey: "pippin_name",
    descKey: "pippin_desc",
    age: "28",
    image: "/images/characters/pippin.jpg"
  }
];

export default function FellowshipPage() {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white"
    >
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Arka plan görseli */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/gallery/fellowship.jpg"
            alt={t('fellowship_page_title')}
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* İçerik */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-[Ringbearer] text-5xl md:text-7xl font-extrabold mb-6 text-yellow-400 drop-shadow-[0_0_20px_gold]"
          >
            {t('fellowship_page_title')}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-black/80 backdrop-blur-xl rounded-2xl border-2 border-yellow-700 p-8 mb-8 shadow-2xl"
          >
            <blockquote className="text-xl md:text-2xl text-yellow-300 mb-4 italic">
              "{t('fellowship_quote')}"
            </blockquote>
            <p className="text-lg text-yellow-400 font-semibold">- {t('fellowship_quote_author')}</p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            {t('fellowship_description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href="#members"
              className="px-8 py-4 bg-yellow-500 text-black font-bold text-lg rounded-full hover:bg-yellow-400 transition-all duration-300 shadow-lg hover:shadow-yellow-400/50"
            >
              {t('view_members')}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Üyeler Bölümü */}
      <div id="members" className="py-20 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-[Ringbearer] text-4xl md:text-6xl font-extrabold text-center mb-12 text-yellow-400 drop-shadow-[0_0_20px_gold]"
        >
          {t('members_title')}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {fellowshipMembers.map((member, index) => (
            <motion.div
              key={member.nameKey}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-black/70 backdrop-blur-xl rounded-xl border-2 border-yellow-700 shadow-xl p-6 hover:scale-105 hover:shadow-yellow-400/30 hover:border-yellow-400 transition-all duration-300 group"
            >
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-yellow-400 group-hover:border-yellow-200 transition-all duration-300">
                <Image
                  src={member.image}
                  alt={t(member.nameKey)}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-[Ringbearer] text-xl font-bold text-yellow-300 mb-2 text-center group-hover:text-yellow-200 transition-colors">
                {t(member.nameKey)}
              </h3>
              <p className="text-gray-300 text-sm mb-3 text-center leading-relaxed group-hover:text-gray-200 transition-colors">
                {t(member.descKey)}
              </p>
              <p className="text-yellow-400 text-xs text-center font-semibold">
                {t('age_label')}: {member.age}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tarih Bölümü */}
      <div className="py-20 px-4 bg-black/40">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-[Ringbearer] text-4xl md:text-6xl font-extrabold text-center mb-12 text-yellow-400 drop-shadow-[0_0_20px_gold]"
          >
            {t('history_title')}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-black/80 backdrop-blur-xl rounded-2xl border-2 border-yellow-700 p-8 shadow-2xl"
          >
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-gray-200 leading-relaxed mb-6">
                {t('fellowship_history_1')}
              </p>
              
              <p className="text-lg text-gray-200 leading-relaxed mb-6">
                {t('fellowship_history_2')}
              </p>

              <p className="text-lg text-gray-200 leading-relaxed mb-6">
                {t('fellowship_history_3')}
              </p>

              <p className="text-lg text-gray-200 leading-relaxed mb-6">
                {t('fellowship_history_4')}
              </p>

              <p className="text-lg text-gray-200 leading-relaxed mb-6">
                {t('fellowship_history_5')}
              </p>

              <p className="text-lg text-gray-200 leading-relaxed mb-6">
                {t('fellowship_history_6')}
              </p>

              <p className="text-lg text-gray-200 leading-relaxed mb-6">
                {t('fellowship_history_7')}
              </p>

              <p className="text-lg text-gray-200 leading-relaxed mb-6">
                {t('fellowship_history_8')}
              </p>

              <p className="text-lg text-gray-200 leading-relaxed mb-6">
                {t('fellowship_history_9')}
              </p>

              <p className="text-lg text-gray-200 leading-relaxed mb-6">
                {t('fellowship_history_10')}
              </p>

              <p className="text-lg text-gray-200 leading-relaxed">
                {t('fellowship_history_11')}
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
            className="px-8 py-4 bg-yellow-500 text-black font-bold text-lg rounded-full hover:bg-yellow-400 transition-all duration-300 shadow-lg hover:shadow-yellow-400/50"
          >
            {t('return_home')}
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
} 