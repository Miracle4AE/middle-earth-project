'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../LanguageContext';

export default function HelmsDeepPage() {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white"
    >
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Arka plan görseli */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/gallery/helms-deep.jpg"
            alt={t('helms_deep_page_title')}
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gray-900/60"></div>
        </div>

        {/* İçerik */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-[Ringbearer] text-5xl md:text-7xl font-extrabold mb-6 text-gray-300 drop-shadow-[0_0_20px_gray]"
          >
            {t('helms_deep_page_title')}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-black/80 backdrop-blur-xl rounded-2xl border-2 border-gray-700 p-8 mb-8 shadow-2xl"
          >
            <blockquote className="text-xl md:text-2xl text-gray-300 mb-4 italic">
              &ldquo;{t('helms_deep_quote')}&rdquo;
            </blockquote>
            <p className="text-lg text-gray-400 font-semibold">- {t('helms_deep_quote_author')}</p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            {t('helms_deep_description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button 
              onClick={() => document.getElementById('tarih-ve-onem')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-gray-600 text-white font-bold text-lg rounded-full hover:bg-gray-500 transition-all duration-300 shadow-lg hover:shadow-gray-400/50"
            >
              {t('history_and_importance_helms')}
            </button>
            <button 
              onClick={() => document.getElementById('savas')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-transparent border-2 border-gray-500 text-gray-300 font-bold text-lg rounded-full hover:bg-gray-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-gray-400/50"
            >
              {t('great_battle')}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative min-h-screen">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/gallery/helms-deep.jpg"
            alt={t('helms_deep_page_title')}
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Tarih ve Önem */}
            <div id="tarih-ve-onem" className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-400 mb-6">{t('history_and_importance_helms')}</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  {t('helms_deep_history_1')}
                </p>
                <p>
                  {t('helms_deep_history_2')}
                </p>
                <p>
                  {t('helms_deep_history_3')}
                </p>
              </div>
            </div>

            {/* Büyük Savaş */}
            <div id="savas" className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-400 mb-6">{t('battle_of_helms_deep')}</h2>
              <div className="space-y-4 text-gray-300">
                <div className="bg-gray-900 bg-opacity-30 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">{t('battle_start_title')}</h3>
                  <p>
                    {t('battle_start_desc')}
                  </p>
                </div>
                
                <div className="bg-gray-900 bg-opacity-30 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">{t('defense_title')}</h3>
                  <p>
                    {t('defense_desc')}
                  </p>
                </div>
                
                <div className="bg-gray-900 bg-opacity-30 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">{t('gandalf_arrival_title')}</h3>
                  <p>
                    {t('gandalf_arrival_desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Kale Özellikleri */}
          <div className="mt-16">
            <h2 className="text-4xl font-bold text-gray-400 mb-8 text-center">{t('fortress_features')}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-300 mb-4">{t('hornburg_title')}</h3>
                <p className="text-gray-300">
                  {t('hornburg_desc')}
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-300 mb-4">{t('deeping_wall_title')}</h3>
                <p className="text-gray-300">
                  {t('deeping_wall_desc')}
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-300 mb-4">{t('deeping_coomb_title')}</h3>
                <p className="text-gray-300">
                  {t('deeping_coomb_desc')}
                </p>
              </div>
            </div>
          </div>

          {/* Kahramanlar */}
          <div className="mt-16">
            <h2 className="text-4xl font-bold text-gray-400 mb-8 text-center">{t('battle_heroes')}</h2>
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 rounded-lg">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-300 mb-4">{t('aragorn_hero_title')}</h3>
                  <p className="text-gray-300 mb-4">
                    {t('aragorn_hero_desc_1')}
                  </p>
                  <p className="text-gray-300">
                    &ldquo;{t('aragorn_hero_quote')}&rdquo;
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-gray-300 mb-4">{t('legolas_gimli_title')}</h3>
                  <p className="text-gray-300 mb-4">
                    {t('legolas_gimli_desc_1')}
                  </p>
                  <p className="text-gray-300">
                    {t('legolas_gimli_desc_2')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigasyon */}
          <div className="mt-16 text-center">
            <Link 
              href="/"
              className="inline-block bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-lg transition-colors duration-300 text-lg font-semibold"
            >
              {t('return_home')}
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 