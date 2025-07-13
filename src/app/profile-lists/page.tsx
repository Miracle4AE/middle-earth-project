"use client";
import React, { useState } from "react";
import Toast from "../shop/Toast";
import { useLanguage } from "../LanguageContext";

const initialMockFavorites = [
  { name: "Orta Dünya Koleksiyonum", count: 5 },
  { name: "Elf Takıları", count: 2 },
];
const initialMockShopping = [
  { name: "Doğum Günü Listem", count: 3 },
];
const mockCompare = [
  { name: "Tek Yüzük", desc: "Yüzük", id: 1 },
  { name: "Andúril", desc: "Kılıç", id: 2 },
];
const mockReviews = [
  { name: "Tek Yüzük", comment: "Çok kaliteli!", rating: 5 },
  { name: "Gandalf Figürü", comment: "Detaylar harika.", rating: 4 },
];
const mockShared = [
  { name: "Paylaşılan Koleksiyonum", link: "https://lotr-shop.com/list/123" },
];

export default function ProfileListsPage() {
  const [mockFavorites, setMockFavorites] = useState(initialMockFavorites);
  const [mockShopping, setMockShopping] = useState(initialMockShopping);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'favori' | 'alisveris' | null>(null);
  const [newListName, setNewListName] = useState("");
  const [toast, setToast] = useState<{ message: string; type?: "success" | "error" } | null>(null);
  const { t } = useLanguage();

  const handleNewList = (type: 'favori' | 'alisveris') => {
    setModalType(type);
    setShowModal(true);
    setNewListName("");
  };
  const handleCreateList = () => {
    if (modalType === 'favori') {
      setMockFavorites(prev => [...prev, { name: newListName, count: 0 }]);
    } else if (modalType === 'alisveris') {
      setMockShopping(prev => [...prev, { name: newListName, count: 0 }]);
    }
    setShowModal(false);
    setToast({ message: `Yeni ${modalType === 'favori' ? 'favori' : 'alışveriş'} listesi oluşturuldu!`, type: "success" });
    setNewListName("");
  };

  // Paylaş butonu işlevi
  const handleShare = (listName: string) => {
    const fakeLink = `https://lotr-shop.com/list/${encodeURIComponent(listName)}`;
    navigator.clipboard.writeText(fakeLink);
    setToast({ message: 'Paylaşılabilir link kopyalandı!', type: 'success' });
  };

  // Dışa Aktar butonu işlevi (mock CSV)
  const handleExport = (listName: string) => {
    const csvContent = `Liste Adı\n"${listName}"`;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${listName}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setToast({ message: 'Liste başarıyla dışa aktarıldı!', type: 'success' });
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 pt-24">
      <h1 className="font-[Ringbearer] text-4xl text-yellow-400 mb-8 drop-shadow-[0_0_20px_gold]">{t('all_lists')}</h1>
      <div className="w-full max-w-4xl space-y-10">
        {/* Favori Listelerim */}
        <section>
          <h2 className="text-2xl text-yellow-300 font-bold mb-4">{t('favorite_lists')}</h2>
          <div className="flex gap-4 flex-wrap">
            <button onClick={() => handleNewList('favori')} className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-xl shadow hover:bg-yellow-500 transition ml-2">{t('new_list')}</button>
          </div>
        </section>
        {/* Alışveriş Listelerim */}
        <section>
          <h2 className="text-2xl text-yellow-300 font-bold mb-4">{t('shopping_lists')}</h2>
          <div className="flex gap-4 flex-wrap">
            <button onClick={() => handleNewList('alisveris')} className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-xl shadow hover:bg-yellow-500 transition ml-2">{t('new_list')}</button>
          </div>
        </section>
        {/* Karşılaştırma Listem */}
        <section>
          <h2 className="text-2xl text-yellow-300 font-bold mb-4">{t('compare_list')}</h2>
        </section>
        {/* Yorumladığım Ürünler */}
        <section>
          <h2 className="text-2xl text-yellow-300 font-bold mb-4">{t('reviewed_products')}</h2>
        </section>
        {/* Paylaşılan Listelerim */}
        <section>
          <h2 className="text-2xl text-yellow-300 font-bold mb-4">{t('shared_lists')}</h2>
        </section>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-gradient-to-br from-black via-zinc-900 to-yellow-950 rounded-3xl border-4 border-yellow-400/80 shadow-[0_8px_48px_0_rgba(255,215,0,0.18)] max-w-md w-full relative p-8 ring-2 ring-yellow-900/30" onClick={e => e.stopPropagation()}>
            <button className="absolute top-6 right-8 text-yellow-400 text-3xl font-bold hover:scale-110 transition-transform duration-150" onClick={() => { console.log('Kapat tıklandı'); setShowModal(false); }}>&times;</button>
            <h2 className="text-2xl font-[Ringbearer] text-yellow-300 mb-4 drop-shadow-[0_0_10px_gold] tracking-wide text-center">{t('new_list')} {modalType === 'favori' ? t('favorite_lists') : t('shopping_lists')}</h2>
            <input
              type="text"
              value={newListName}
              onChange={e => setNewListName(e.target.value)}
              placeholder={t('list_name_placeholder')}
              className="w-full p-3 rounded-xl border-2 border-yellow-400 bg-black/40 text-yellow-100 mb-4 focus:outline-none focus:border-yellow-300 text-base shadow-inner placeholder-yellow-200/60"
            />
            <button
              className="w-full mt-2 py-3 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300 text-black font-bold rounded-2xl shadow-lg hover:scale-105 hover:shadow-yellow-400/60 transition-all duration-200 tracking-wide border border-yellow-200/60 text-lg"
              onClick={handleCreateList}
              disabled={!newListName.trim()}
            >
              {t('create')}
            </button>
          </div>
        </div>
      )}
      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
} 