'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../LanguageContext';

export default function MountDoomPage() {
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
            src="/images/gallery/mount-doom.jpg"
            alt={t('mount_doom_page_title')}
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
            {t('mount_doom_page_title')}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-black/80 backdrop-blur-xl rounded-2xl border-2 border-red-700 p-8 mb-8 shadow-2xl"
          >
            <blockquote className="text-xl md:text-2xl text-red-300 mb-4 italic">
              &ldquo;{t('mount_doom_quote')}&rdquo;
            </blockquote>
            <p className="text-lg text-red-400 font-semibold">- {t('mount_doom_quote_author')}</p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            {t('mount_doom_description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button 
              onClick={() => document.getElementById('tarih-ve-onem')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-red-500 text-black font-bold text-lg rounded-full hover:bg-red-400 transition-all duration-300 shadow-lg hover:shadow-red-400/50"
            >
              {t('mount_doom_history_importance')}
            </button>
            <button 
              onClick={() => document.getElementById('fiziksel-ozellikler')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-transparent border-2 border-red-500 text-red-300 font-bold text-lg rounded-full hover:bg-red-500 hover:text-black transition-all duration-300 shadow-lg hover:shadow-red-400/50"
            >
              {t('physical_features')}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative min-h-screen">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/gallery/mount-doom.jpg"
            alt={t('mount_doom_page_title')}
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Tarih ve Önem */}
            <div id="tarih-ve-onem" className="space-y-6">
              <h2 className="text-4xl font-bold text-red-400 mb-6">{t('mount_doom_history_importance')}</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  {t('mount_doom_history_1')}
                </p>
                <p>
                  {t('mount_doom_history_2')}
                </p>
                <p>
                  {t('mount_doom_history_3')}
                </p>
              </div>
            </div>

            {/* Fiziksel Özellikler */}
            <div id="fiziksel-ozellikler" className="space-y-6">
              <h2 className="text-4xl font-bold text-red-400 mb-6">{t('physical_features')}</h2>
              <div className="space-y-4 text-gray-300">
                <div className="bg-red-900 bg-opacity-30 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold text-orange-300 mb-2">{t('mountain_structure_title')}</h3>
                  <p>
                    {t('mountain_structure_desc')}
                  </p>
                </div>
                
                <div className="bg-red-900 bg-opacity-30 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold text-orange-300 mb-2">{t('atmosphere_title')}</h3>
                  <p>
                    {t('atmosphere_desc')}
                  </p>
                </div>
                
                <div className="bg-red-900 bg-opacity-30 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold text-orange-300 mb-2">{t('fire_pit_title')}</h3>
                  <p>
                    {t('fire_pit_desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Önemli Olaylar */}
          <div className="mt-16">
            <h2 className="text-4xl font-bold text-red-400 mb-8 text-center">{t('important_events')}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              
              <div className="bg-gradient-to-br from-red-900 to-red-800 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-orange-300 mb-4">{t('ring_creation_title')}</h3>
                <p className="text-gray-300">
                  {t('ring_creation_desc')}
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-900 to-red-800 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-orange-300 mb-4">{t('frodo_journey_title')}</h3>
                <p className="text-gray-300">
                  {t('frodo_journey_desc')}
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-900 to-red-800 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-orange-300 mb-4">{t('ring_destruction_title')}</h3>
                <p className="text-gray-300">
                  {t('ring_destruction_desc')}
                </p>
              </div>
            </div>
          </div>

          {/* Kültürel Önem */}
          <div className="mt-16">
            <h2 className="text-4xl font-bold text-red-400 mb-8 text-center">{t('cultural_importance')}</h2>
            <div className="bg-gradient-to-r from-red-900 to-red-800 p-8 rounded-lg">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-orange-300 mb-4">{t('symbolic_meaning_title')}</h3>
                  <p className="text-gray-300 mb-4">
                    {t('symbolic_meaning_desc_1')}
                  </p>
                  <p className="text-gray-300">
                    {t('symbolic_meaning_desc_2')}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-orange-300 mb-4">{t('literary_importance_title')}</h3>
                  <p className="text-gray-300 mb-4">
                    {t('literary_importance_desc_1')}
                  </p>
                  <p className="text-gray-300">
                    {t('literary_importance_desc_2')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigasyon */}
          <div className="mt-16 text-center">
            <Link 
              href="/"
              className="inline-block bg-red-800 hover:bg-red-700 text-white px-8 py-4 rounded-lg transition-colors duration-300 text-lg font-semibold"
            >
              {t('return_home')}
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 