"use client";
import { useState, useEffect } from "react";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const c = JSON.parse(localStorage.getItem("lotr-cart") || "[]");
    setCart(c);
    let t = 0;
    c.forEach((item: any) => {
      const price = parseInt(item.price.replace(/[^0-9]/g, ""));
      t += price;
    });
    setTotal(t);
  }, []);

  const handleBuy = () => {
    setMessage("Satın alma işlemi başarıyla tamamlandı! (Tabii ki şaka :) )");
    localStorage.removeItem("lotr-cart");
    setCart([]);
    setTotal(0);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-start p-8">
      <h1 className="font-[Ringbearer] text-4xl text-yellow-400 mb-8 drop-shadow-[0_0_20px_gold]">Sepetim</h1>
      {cart.length === 0 ? (
        <div className="text-yellow-200 text-xl">Sepetinizde ürün yok.</div>
      ) : (
        <div className="w-full max-w-2xl">
          <table className="w-full text-yellow-200 mb-6">
            <thead>
              <tr className="border-b border-yellow-700">
                <th className="p-2">Ürün</th>
                <th className="p-2">Kategori</th>
                <th className="p-2">Fiyat</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, i) => (
                <tr key={i} className="border-b border-yellow-800">
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.category}</td>
                  <td className="p-2">{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-right text-yellow-300 text-xl font-bold mb-4">Toplam: {total.toLocaleString()}₺</div>
          <button onClick={handleBuy} className="bg-yellow-400 text-black font-bold py-2 px-8 rounded hover:bg-yellow-500 transition">Satın Al</button>
          {message && <div className="text-green-400 font-bold text-center mt-4">{message}</div>}
        </div>
      )}
    </div>
  );
} 