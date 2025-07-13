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
  cloaks: [
    { name: { tr: "Elf Pelerini", en: "Elven Cloak" }, price: "9.999₺", img: "/images/gallery/legolas.jpg", desc: { tr: "Görünmezlik sağlayan elf pelerini.", en: "Elven cloak that grants invisibility." }, category: "cloaks" },
  ],
  maps: [
    { name: { tr: "Orta Dünya Haritası", en: "Middle-earth Map" }, price: "1.999₺", img: "/images/middle-earth-map.jpg", desc: { tr: "Orta Dünya'nın detaylı haritası.", en: "Detailed map of Middle-earth." }, category: "maps" },
  ],
  figures: [
    { name: { tr: "Gandalf Figürü", en: "Gandalf Figure" }, price: "5.999₺", img: "/images/gallery/gandalf.jpg", desc: { tr: "Gandalf'ın detaylı figürü.", en: "Detailed figure of Gandalf." }, category: "figures" },
    { name: { tr: "Frodo Figürü", en: "Frodo Figure" }, price: "4.999₺", img: "/images/gallery/frodo.jpg", desc: { tr: "Frodo'nun figürü.", en: "Figure of Frodo." }, category: "figures" },
  ],
  elf_jewelry: [
    { name: { tr: "Arwen'in Kolyesi", en: "Arwen's Necklace" }, price: "2.499₺", img: "/images/gallery/arwen.jpg", desc: { tr: "Arwen'in Evenstar kolyesi.", en: "Arwen's Evenstar necklace." }, category: "elf_jewelry" },
  ],
  books: [
    { name: { tr: "Yüzüklerin Efendisi Kitabı", en: "The Lord of the Rings Book" }, price: "499₺", img: "/images/gallery/bilbo.jpg", desc: { tr: "J.R.R. Tolkien'in başyapıtı.", en: "The masterpiece by J.R.R. Tolkien." }, category: "books" },
  ],
  hobbit_items: [
    { name: { tr: "Hobbit Piposu", en: "Hobbit Pipe" }, price: "799₺", img: "/images/gallery/bilbo.jpg", desc: { tr: "Bilbo'nun piposu.", en: "Bilbo's pipe." }, category: "hobbit_items" },
  ],
  elf_bows: [
    { name: { tr: "Legolas'ın Yayı", en: "Legolas' Bow" }, price: "14.999₺", img: "/images/gallery/legolas.jpg", desc: { tr: "Legolas'ın efsanevi yayı.", en: "Legolas' legendary bow." }, category: "elf_bows" },
  ],
  dwarf_axes: [
    { name: { tr: "Gimli'nin Baltası", en: "Gimli's Axe" }, price: "12.999₺", img: "/images/gallery/gimli.jpg", desc: { tr: "Gimli'nin savaş baltası.", en: "Gimli's battle axe." }, category: "dwarf_axes" },
  ],
  nazgul_masks: [
    { name: { tr: "Nazgûl Maskesi", en: "Nazgûl Mask" }, price: "7.999₺", img: "/images/gallery/nazgul.jpg", desc: { tr: "Kara Süvariler için maske.", en: "Mask for the Black Riders." }, category: "nazgul_masks" },
  ],
  orc_armors: [
    { name: { tr: "Ork Zırhı", en: "Orc Armor" }, price: "8.999₺", img: "/images/gallery/orcgeneral.jpg", desc: { tr: "Ork generali zırhı.", en: "Orc general's armor." }, category: "orc_armors" },
  ],
  wizard_staffs: [
    { name: { tr: "Gandalf'ın Asası", en: "Gandalf's Staff" }, price: "15.999₺", img: "/images/gallery/gandalf.jpg", desc: { tr: "Gandalf'ın büyücü asası.", en: "Gandalf's wizard staff." }, category: "wizard_staffs" },
    { name: { tr: "Saruman'ın Asası", en: "Saruman's Staff" }, price: "15.999₺", img: "/images/gallery/saruman.jpg", desc: { tr: "Saruman'ın büyücü asası.", en: "Saruman's wizard staff." }, category: "wizard_staffs" },
  ],
  gondor_helmets: [
    { name: { tr: "Gondor Miğferi", en: "Gondor Helmet" }, price: "6.999₺", img: "/images/gallery/boromir.jpg", desc: { tr: "Gondor askerlerinin miğferi.", en: "Helmet of Gondor soldiers." }, category: "gondor_helmets" },
  ],
  rohan_horses: [
    { name: { tr: "Rohan At Figürü", en: "Rohan Horse Figure" }, price: "3.999₺", img: "/images/gallery/eomer.jpg", desc: { tr: "Rohan'ın efsanevi atı.", en: "Legendary horse of Rohan." }, category: "rohan_horses" },
  ],
  posters: [
    { name: { tr: "Orta Dünya Posteri", en: "Middle-earth Poster" }, price: "299₺", img: "/images/gallery/aragorn.jpg", desc: { tr: "Orta Dünya haritalı poster.", en: "Poster with Middle-earth map." }, category: "posters" },
  ],
  cards: [
    { name: { tr: "Koleksiyon Kartı: Frodo", en: "Collection Card: Frodo" }, price: "99₺", img: "/images/gallery/frodo.jpg", desc: { tr: "Frodo temalı koleksiyon kartı.", en: "Frodo themed collection card." }, category: "cards" },
  ],
  collection_figures: [
    { name: { tr: "Galadriel Koleksiyon Figürü", en: "Galadriel Collection Figure" }, price: "8.999₺", img: "/images/gallery/galadriel.jpg", desc: { tr: "Galadriel figürü.", en: "Galadriel figure." }, category: "collection_figures" },
  ],
  home_office: [
    { name: { tr: "Yüzük Masa Lambası", en: "Ring Desk Lamp" }, price: "1.499₺", img: "/images/one-ring.png", desc: { tr: "Tek Yüzük temalı masa lambası.", en: "Desk lamp themed after the One Ring." }, category: "home_office" },
  ],
  accessories: [
    { name: { tr: "Elf Broşu", en: "Elven Brooch" }, price: "499₺", img: "/images/gallery/legolas.jpg", desc: { tr: "Elf pelerini broşu.", en: "Elven cloak brooch." }, category: "accessories" },
  ],
  clothes: [
    { name: { tr: "Gondor Tişörtü", en: "Gondor T-shirt" }, price: "299₺", img: "/images/gallery/boromir.jpg", desc: { tr: "Gondor armalı tişört.", en: "T-shirt with Gondor emblem." }, category: "clothes" },
  ],
  games_puzzles: [
    { name: { tr: "Orta Dünya Puzzle", en: "Middle-earth Puzzle" }, price: "399₺", img: "/images/middle-earth-map.jpg", desc: { tr: "1000 parçalık Orta Dünya puzzle'ı.", en: "1000-piece Middle-earth puzzle." }, category: "games_puzzles" },
  ],
  kitchen: [
    { name: { tr: "Hobbit Kupa", en: "Hobbit Mug" }, price: "149₺", img: "/images/gallery/bilbo.jpg", desc: { tr: "Hobbit temalı kupa.", en: "Hobbit themed mug." }, category: "kitchen" },
  ],
  coins_replicas: [
    { name: { tr: "Gondor Parası", en: "Gondor Coin" }, price: "59₺", img: "/images/gallery/boromir.jpg", desc: { tr: "Gondor krallığı parası.", en: "Coin of the Kingdom of Gondor." }, category: "coins_replicas" },
  ],
  plush_toys: [
    { name: { tr: "Gollum Peluş", en: "Gollum Plush" }, price: "249₺", img: "/images/gallery/gollum.jpg", desc: { tr: "Gollum peluş oyuncak.", en: "Gollum plush toy." }, category: "plush_toys" },
  ],
};

// Fiyatı güvenli şekilde sayıya çeviren fonksiyon
export function parsePrice(priceStr: string): number {
  let clean = priceStr.replace(/[₺$,]/g, '').replace(/\./g, '');
  clean = clean.replace(',', '.');
  const num = parseFloat(clean);
  return isNaN(num) ? 0 : num;
} 