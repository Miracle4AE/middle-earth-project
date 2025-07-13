export type Product = { name: { tr: string; en: string }; price: string; img: string; desc: { tr: string; en: string }; category: string };

export const initialProducts: Record<string, Product[]> = {
  rings: [
    { name: { tr: "Tek Yüzük", en: "The One Ring" }, price: "99.999₺", img: "/images/one-ring.png", desc: { tr: "Sauron'un kudretiyle dövülmüş efsanevi yüzük.", en: "The legendary ring forged by Sauron's power." }, category: "rings" },
    { name: { tr: "Nenya", en: "Nenya" }, price: "49.999₺", img: "/images/gallery/galadriel.jpg", desc: { tr: "Galadriel'in yüzüğü, saflığın ve gücün simgesi.", en: "Galadriel's ring, symbol of purity and power." }, category: "rings" },
  ],
  swords: [
    { name: { tr: "Andúril", en: "Andúril" }, price: "79.999₺", img: "/images/gallery/aragorn.jpg", desc: { tr: "Aragorn'un efsanevi kılıcı.", en: "Aragorn's legendary sword." }, category: "swords" },
    { name: { tr: "Sting", en: "Sting" }, price: "29.999₺", img: "/images/gallery/frodo.jpg", desc: { tr: "Frodo'nun mavi parlayan kılıcı.", en: "Frodo's blue-glowing sword." }, category: "swords" },
    { name: { tr: "Glamdring", en: "Glamdring" }, price: "39.999₺", img: "/images/gallery/gandalf.jpg", desc: { tr: "Gandalf'ın kılıcı, ork avcısı.", en: "Gandalf's sword, orc hunter." }, category: "swords" },
  ],
  // ... (tüm diğer kategoriler ve ürünler aynı şekilde buraya taşınacak)
};

// Fiyatı güvenli şekilde sayıya çeviren fonksiyon
export function parsePrice(priceStr: string): number {
  let clean = priceStr.replace(/[₺$,]/g, '').replace(/\./g, '');
  clean = clean.replace(',', '.');
  const num = parseFloat(clean);
  return isNaN(num) ? 0 : num;
} 