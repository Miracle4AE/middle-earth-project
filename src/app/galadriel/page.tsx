'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../LanguageContext';

export default function GaladrielPage() {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-slate-900 via-gray-900 to-slate-900 text-white"
    >
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Arka plan görseli */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/gallery/galadriel.jpg"
            alt="Galadriel - Lothlórien'in Kraliçesi"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>

        </div>

        {/* İçerik */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-[Ringbearer] text-5xl md:text-7xl font-extrabold mb-6 text-white drop-shadow-[0_0_20px_white]"
          >
            {t('galadriel_page_title')}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-black/60 backdrop-blur-xl rounded-2xl border border-white/20 p-8 mb-8 shadow-2xl"
          >
            <blockquote className="text-xl md:text-2xl text-white mb-4 italic">
              &ldquo;{t('galadriel_quote')}&rdquo;
            </blockquote>
            <p className="text-lg text-gray-300 font-semibold">- {t('galadriel_quote_author')}</p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            {t('galadriel_description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button 
              onClick={() => document.getElementById('tarih-ve-onem')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold text-lg rounded-full hover:bg-white/20 transition-all duration-300 shadow-lg border border-white/20"
            >
              {t('history_and_importance')}
            </button>
            <button 
              onClick={() => document.getElementById('guc-ve-buyu')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-transparent border border-white/30 text-white font-bold text-lg rounded-full hover:bg-white/10 transition-all duration-300 shadow-lg"
            >
              {t('power_and_magic')}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative min-h-screen">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/gallery/galadriel.jpg"
            alt="Galadriel Background"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-black/60"></div>

        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Tarih ve Önem */}
            <div id="tarih-ve-onem" className="space-y-6">
              <h2 className="text-4xl font-bold text-white mb-6">{t('history_and_importance')}</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  {t('galadriel_history_1')}
                </p>
                <p>
                  {t('galadriel_history_2')}
                </p>
                <p>
                  {t('galadriel_history_3')}
                </p>
              </div>
            </div>

            {/* Güç ve Büyü */}
            <div id="guc-ve-buyu" className="space-y-6">
              <h2 className="text-4xl font-bold text-white mb-6">{t('power_and_magic')}</h2>
              <div className="space-y-4 text-gray-300">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold text-white mb-2">{t('nenya_ring_title')}</h3>
                  <p>
                    {t('nenya_ring_desc')}
                  </p>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold text-white mb-2">{t('magic_power_title')}</h3>
                  <p>
                    {t('magic_power_desc')}
                  </p>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold text-white mb-2">{t('lothlorien_protector_title')}</h3>
                  <p>
                    {t('lothlorien_protector_desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Önemli Olaylar */}
          <div className="mt-16">
            <h2 className="text-4xl font-bold text-white mb-8 text-center">{t('important_events_title')}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-4">{t('departure_from_valinor_title')}</h3>
                <p className="text-gray-300">
                  {t('departure_from_valinor_desc')}
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-4">{t('lothlorien_foundation_title')}</h3>
                <p className="text-gray-300">
                  {t('lothlorien_foundation_desc')}
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-4">{t('fellowship_hosting_title')}</h3>
                <p className="text-gray-300">
                  {t('fellowship_hosting_desc')}
                </p>
              </div>
            </div>
          </div>

          {/* Lothlórien */}
          <div className="mt-16">
            <h2 className="text-4xl font-bold text-white mb-8 text-center">{t('lothlorien_title')}</h2>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-lg">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">{t('golden_forest_title')}</h3>
                  <p className="text-gray-300 mb-4">
                    {t('golden_forest_desc_1')}
                  </p>
                  <p className="text-gray-300">
                    {t('golden_forest_desc_2')}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">{t('caras_galadhon_title')}</h3>
                  <p className="text-gray-300 mb-4">
                    {t('caras_galadhon_desc_1')}
                  </p>
                  <p className="text-gray-300">
                    {t('caras_galadhon_desc_2')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigasyon */}
          <div className="mt-16 text-center">
            <Link 
              href="/"
              className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-lg hover:bg-white/20 transition-all duration-300 text-lg font-semibold"
            >
              {t('return_home')}
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 