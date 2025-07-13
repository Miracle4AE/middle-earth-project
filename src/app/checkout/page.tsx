"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLanguage } from "../LanguageContext";
import { parsePrice } from "../shop/productsData";

// Sepet item tipi
interface CartItem {
  name: string;
  category: string;
  price: string;
  img: string;
  quantity: number;
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [form, setForm] = useState({
    name: "",
    card: "",
    expiry: "",
    cvc: "",
    address: "",
    email: ""
  });
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { t, language } = useLanguage();
  const [usdRate, setUsdRate] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const c: CartItem[] = JSON.parse(localStorage.getItem("lotr-cart") || "[]");
    setCart(c);
    let t = 0;
    c.forEach((item: CartItem) => {
      const price = parseInt(item.price.replace(/[^0-9]/g, ""));
      t += price * item.quantity;
    });
    setTotal(t);
    if (c.length === 0) {
      router.replace("/cart");
    }
  }, [router]);

  useEffect(() => {
    if (language === 'en') {
      fetch('/api/exchange-rate')
        .then(res => res.json())
        .then(data => {
          if (data && typeof data.usd === 'number' && !isNaN(data.usd)) {
            setUsdRate(data.usd);
          } else {
            setUsdRate(null);
          }
        })
        .catch(() => {
          setUsdRate(null);
        });
    }
  }, [language]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    if (typeof window !== 'undefined') {
      localStorage.removeItem("lotr-cart");
    }
    setCart([]);
  };

  if (success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-yellow-300">
        <h1 className="font-[Ringbearer] text-4xl mb-6 drop-shadow-[0_0_20px_gold]">{t('payment_success')}</h1>
        <p className="text-lg mb-8">{t('payment_success_desc')}</p>
        <button onClick={() => router.push("/")} className="bg-yellow-400 text-black font-bold py-2 px-8 rounded hover:bg-yellow-500 transition">{t('go_home')}</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black py-12 px-4">
      <h1 className="font-[Ringbearer] text-4xl text-yellow-400 mb-8 drop-shadow-[0_0_20px_gold]">{t('checkout')}</h1>
      <div className="w-full max-w-3xl bg-black/80 border-2 border-yellow-700 rounded-xl shadow-2xl p-8 flex flex-col md:flex-row gap-8">
        {/* Sepet Özeti */}
        <div className="flex-1">
          <h2 className="text-yellow-300 font-bold text-2xl mb-4">{t('cart_summary')}</h2>
          {cart.length === 0 ? (
            <div className="text-yellow-200">{t('no_cart_items')}</div>
          ) : (
            <ul className="divide-y divide-yellow-800 mb-4">
              {cart.map((item, i) => (
                <li key={i} className="flex items-center gap-4 py-3">
                  <Image src={item.img} alt={item.name} width={48} height={48} className="rounded object-contain" />
                  <div className="flex-1">
                    <div className="font-bold text-yellow-200">{item.name}</div>
                    <div className="text-yellow-400 text-sm">{item.category}</div>
                  </div>
                  <div className="text-yellow-300 font-bold">
                    {language === 'en' && usdRate ? `$${(parsePrice(item.price) * usdRate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : item.price} x {item.quantity}
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="text-right text-yellow-400 text-xl font-bold mt-4">
            {t('total')}: {language === 'en' && usdRate ? `$${(total * usdRate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : `${total.toLocaleString()}₺`}
          </div>
        </div>
        {/* Ödeme Formu */}
        <form className="flex-1 flex flex-col gap-4" onSubmit={handleSubmit}>
          <h2 className="text-yellow-300 font-bold text-2xl mb-4">{t('card_info')}</h2>
          <input name="name" value={form.name} onChange={handleChange} required placeholder={t('card_name_placeholder')} className="p-3 rounded bg-black/60 border border-yellow-700 text-yellow-100" />
          <input name="card" value={form.card} onChange={handleChange} required placeholder={t('card_number_placeholder')} maxLength={19} className="p-3 rounded bg-black/60 border border-yellow-700 text-yellow-100" />
          <div className="flex gap-4">
            <input name="expiry" value={form.expiry} onChange={handleChange} required placeholder={t('expiry_placeholder')} maxLength={5} className="p-3 rounded bg-black/60 border border-yellow-700 text-yellow-100 w-1/2" />
            <input name="cvc" value={form.cvc} onChange={handleChange} required placeholder={t('cvc_placeholder')} maxLength={4} className="p-3 rounded bg-black/60 border border-yellow-700 text-yellow-100 w-1/2" />
          </div>
          <input name="email" value={form.email} onChange={handleChange} required placeholder={t('email_placeholder')} type="email" className="p-3 rounded bg-black/60 border border-yellow-700 text-yellow-100" />
          <textarea name="address" value={form.address} onChange={handleChange} required placeholder={t('address_placeholder')} className="p-3 rounded bg-black/60 border border-yellow-700 text-yellow-100 resize-none" rows={3} />
          <button type="submit" className="bg-yellow-400 text-black font-bold py-3 rounded mt-4 hover:bg-yellow-500 transition">{t('complete_payment')}</button>
        </form>
      </div>
    </div>
  );
} 