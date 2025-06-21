"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const characters = [
  // İyi karakterler
  {
    name: "Frodo Baggins",
    image: "/images/characters/frodo.jpg",
    desc: "Yüzük Taşıyıcısı, Shire'ın cesur hobbit'i.",
    type: "good",
  },
  {
    name: "Samwise Gamgee",
    image: "/images/characters/sam.jpg",
    desc: "Frodo'nun sadık dostu ve gerçek kahraman.",
    type: "good",
  },
  {
    name: "Gandalf",
    image: "/images/characters/gandalf.jpg",
    desc: "Gri büyücü, Orta Dünya'nın bilgesi ve yol göstericisi.",
    type: "good",
  },
  {
    name: "Aragorn",
    image: "/images/characters/aragorn.jpg",
    desc: "Isildur'un varisi, Gondor'un kralı ve cesur savaşçı.",
    type: "good",
  },
  {
    name: "Legolas",
    image: "/images/characters/legolas.jpg",
    desc: "Mirkwood'un elf prensi, okçuluk ustası.",
    type: "good",
  },
  {
    name: "Gimli",
    image: "/images/characters/gimli.jpg",
    desc: "Cüce savaşçı, sadık dost.",
    type: "good",
  },
  {
    name: "Boromir",
    image: "/images/characters/boromir.jpg",
    desc: "Gondor'un kahramanı, Yüzük Kardeşliği üyesi.",
    type: "good",
  },
  {
    name: "Arwen",
    image: "/images/characters/arwen.jpg",
    desc: "Rivendell'in elf prensesi, Aragorn'un aşkı.",
    type: "good",
  },
  {
    name: "Galadriel",
    image: "/images/characters/galadriel.jpg",
    desc: "Lothlórien'in hanımı, kudretli elf.",
    type: "good",
  },
  {
    name: "Elrond",
    image: "/images/characters/elrond.jpg",
    desc: "Rivendell'in efendisi, bilge elf.",
    type: "good",
  },
  {
    name: "Faramir",
    image: "/images/characters/faramir.jpg",
    desc: "Boromir'in kardeşi, Gondor'un kaptanı.",
    type: "good",
  },
  {
    name: "Éowyn",
    image: "/images/characters/eowyn.jpg",
    desc: "Rohan'ın kızı, cesur savaşçı.",
    type: "good",
  },
  {
    name: "Éomer",
    image: "/images/characters/eomer.jpg",
    desc: "Rohan'ın savaşçısı, Éowyn'in kardeşi.",
    type: "good",
  },
  {
    name: "Théoden",
    image: "/images/characters/theoden.jpg",
    desc: "Rohan'ın kralı.",
    type: "good",
  },
  {
    name: "Treebeard",
    image: "/images/characters/treebeard.jpg",
    desc: "Entlerin lideri, Fangorn Ormanı'nın koruyucusu.",
    type: "good",
  },
  // Kötü karakterler
  {
    name: "Sauron",
    image: "/images/characters/sauron.jpg",
    desc: "Karanlık Lord, Tek Yüzük'ün efendisi.",
    type: "evil",
  },
  {
    name: "Saruman",
    image: "/images/characters/saruman.jpg",
    desc: "Beyaz büyücü, ihanetin simgesi.",
    type: "evil",
  },
  {
    name: "Gollum",
    image: "/images/characters/gollum.jpg",
    desc: "Yüzük tarafından yozlaştırılmış zavallı yaratık.",
    type: "evil",
  },
  {
    name: "Nazgûl (Ringwraiths)",
    image: "/images/characters/nazgul.jpg",
    desc: "Sauron'un ölümsüz hizmetkarları.",
    type: "evil",
  },
  {
    name: "Witch-king of Angmar",
    image: "/images/characters/witchking.jpg",
    desc: "Nazgûl'lerin lideri, korkunun efendisi.",
    type: "evil",
  },
  {
    name: "Gríma Wormtongue",
    image: "/images/characters/grima.jpg",
    desc: "Théoden'in danışmanı, hain.",
    type: "evil",
  },
  {
    name: "Denethor",
    image: "/images/characters/denethor.jpg",
    desc: "Gondor'un vâlisi, karanlığa yenik düşen lider.",
    type: "evil",
  },
  {
    name: "Balrog",
    image: "/images/characters/balrog.jpg",
    desc: "Moria'nın derinliklerinde uyanan kadim kötülük.",
    type: "evil",
  },
  {
    name: "Shelob",
    image: "/images/characters/shelob.jpg",
    desc: "Karanlık mağaraların dev örümceği.",
    type: "evil",
  },
];

export default function CharactersPage() {
  const goodChars = characters.filter((c) => c.type === "good");
  const evilChars = characters.filter((c) => c.type === "evil");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative flex flex-col items-center justify-center min-h-screen text-white overflow-hidden">
        {/* Arka plan yüzük görseli */}
        <Image
          src="/images/one-ring.png"
          alt="One Ring"
          layout="fill"
          objectFit="contain"
          className="opacity-25 z-0 pointer-events-none"
          style={{
            filter: "drop-shadow(0 0 80px gold) blur(2px)"
          }}
          priority
        />
        <h1 className="font-[Ringbearer] text-5xl md:text-7xl font-extrabold mb-12 text-yellow-400 drop-shadow-[0_0_20px_gold] text-center z-10">Karakterler</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl px-4 z-10">
          {/* İyi karakterler sol sütun */}
          <div className="flex flex-col gap-12">
            <h2 className="font-[Ringbearer] text-3xl md:text-4xl text-yellow-300 mb-1 text-center drop-shadow-[0_0_10px_gold]">İyi Karakterler</h2>
            <p className="font-[Tengwar] text-xl md:text-2xl text-yellow-200 text-center mb-4 select-none"> </p>
            {goodChars.map((char, i) => (
              <motion.div
                key={char.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className={`bg-black/60 backdrop-blur-xl rounded-2xl border-2 border-yellow-600 shadow-2xl flex flex-col items-center p-8 transition-all duration-300 hover:scale-105 hover:shadow-yellow-400/30 hover:border-yellow-400 group relative overflow-hidden`}
              >
                <div className="w-32 h-32 mb-4 rounded-full overflow-hidden border-2 border-yellow-400 group-hover:border-yellow-200 transition-all duration-300 shadow-lg">
                  <Image
                    src={char.image}
                    alt={char.name}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-[Ringbearer] text-2xl md:text-3xl text-yellow-300 mb-2 drop-shadow-[0_0_10px_gold]">{char.name}</h3>
                <p className="text-gray-200 text-center text-base md:text-lg">{char.desc}</p>
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-60 transition-opacity duration-500 bg-gradient-to-br from-yellow-400 via-yellow-100 to-transparent blur-sm" />
              </motion.div>
            ))}
          </div>
          {/* Kötü karakterler sağ sütun */}
          <div className="flex flex-col gap-12">
            <h2 className="font-[Ringbearer] text-3xl md:text-4xl text-red-400 mb-1 text-center drop-shadow-[0_0_10px_red]">Kötü Karakterler</h2>
            <p className="font-[Tengwar] text-xl md:text-2xl text-red-200 text-center mb-4 select-none"> </p>
            {evilChars.map((char, i) => (
              <motion.div
                key={char.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className={`bg-black/60 backdrop-blur-xl rounded-2xl border-2 border-red-600 shadow-2xl flex flex-col items-center p-8 transition-all duration-300 hover:scale-105 hover:shadow-red-400/30 hover:border-red-400 group relative overflow-hidden`}
              >
                <div className="w-32 h-32 mb-4 rounded-full overflow-hidden border-2 border-red-400 group-hover:border-red-200 transition-all duration-300 shadow-lg">
                  <Image
                    src={char.image}
                    alt={char.name}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-[Ringbearer] text-2xl md:text-3xl text-red-400 mb-2 drop-shadow-[0_0_10px_red]">{char.name}</h3>
                <p className="text-gray-200 text-center text-base md:text-lg">{char.desc}</p>
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-60 transition-opacity duration-500 bg-gradient-to-br from-red-400 via-red-100 to-transparent blur-sm" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
} 