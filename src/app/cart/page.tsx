"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLanguage } from "../LanguageContext";
import { parsePrice } from "../shop/productsData";

type CartItem = { name: string; category: string; price: string; img: string; quantity: number };

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
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
  }, []);

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

  const updateCart = (newCart: CartItem[]) => {
    setCart(newCart);
    if (typeof window !== 'undefined') {
      localStorage.setItem("lotr-cart", JSON.stringify(newCart));
    }
    let t = 0;
    newCart.forEach((item: CartItem) => {
      const price = parseInt(item.price.replace(/[^0-9]/g, ""));
      t += price * item.quantity;
    });
    setTotal(t);
  };

  const handleIncrease = (index: number) => {
    const newCart = [...cart];
    newCart[index].quantity += 1;
    updateCart(newCart);
  };

  const handleDecrease = (index: number) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
      updateCart(newCart);
    } else {
      handleRemove(index);
    }
  };

  const handleRemove = (index: number) => {
    const newCart = cart.filter((_, i) => i !== index);
    updateCart(newCart);
  };

  const handleBuy = () => {
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-start p-8">
      <h1 className="font-[Ringbearer] text-4xl text-yellow-400 mb-8 drop-shadow-[0_0_20px_gold]">{t('cart')}</h1>
      {cart.length === 0 ? (
        <div className="text-yellow-200 text-xl">{t('no_cart_items')}</div>
      ) : (
        <div className="w-full max-w-2xl">
          <table className="w-full text-yellow-200 mb-6">
            <thead>
              <tr className="border-b border-yellow-700">
                <th className="p-2">{t('product')}</th>
                <th className="p-2">{t('category')}</th>
                <th className="p-2">{t('price')}</th>
                <th className="p-2">{t('quantity')}</th>
                <th className="p-2">{t('action')}</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, i) => (
                <tr key={i} className="border-b border-yellow-800">
                  <td className="p-2 flex items-center gap-2">
                    <Image src={item.img} alt={item.name} width={48} height={48} className="object-contain rounded" />
                    <span>{item.name}</span>
                  </td>
                  <td className="p-2">{item.category}</td>
                  <td className="p-2">{language === 'en' && usdRate ? `$${(parsePrice(item.price) * usdRate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : item.price}</td>
                  <td className="p-2 flex items-center gap-2">
                    <button onClick={() => handleDecrease(i)} className="bg-yellow-400 text-black px-2 rounded font-bold">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrease(i)} className="bg-yellow-400 text-black px-2 rounded font-bold">+</button>
                  </td>
                  <td className="p-2">
                    <button onClick={() => handleRemove(i)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition">{t('remove_from_cart')}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-right text-yellow-300 text-xl font-bold mb-4">
            {t('total')}: {language === 'en' && usdRate ? `$${(total * usdRate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : `${total.toLocaleString()}₺`}
          </div>
          <button onClick={handleBuy} className="bg-yellow-400 text-black font-bold py-2 px-8 rounded hover:bg-yellow-500 transition">{t('buy_now')}</button>
        </div>
      )}
    </div>
  );
} 