"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "../LanguageContext";

const characters = [
  // İyi karakterler
  {
    name: { tr: "Frodo Baggins", en: "Frodo Baggins" },
    image: "/images/characters/frodo.jpg",
    desc: {
      tr: "Yüzük Taşıyıcısı, Shire'ın cesur hobbit'i.",
      en: "Ring Bearer, the brave hobbit of the Shire."
    },
    type: "good",
  },
  {
    name: { tr: "Samwise Gamgee", en: "Samwise Gamgee" },
    image: "/images/characters/sam.jpg",
    desc: {
      tr: "Frodo'nun sadık dostu ve gerçek kahraman.",
      en: "Frodo's loyal friend and the true hero."
    },
    type: "good",
  },
  {
    name: { tr: "Gandalf", en: "Gandalf" },
    image: "/images/characters/gandalf.jpg",
    desc: {
      tr: "Gri/Beyaz büyücü, Orta Dünya'nın bilgesi ve yol göstericisi.",
      en: "Gandalf the Grey, the Wise, the Wizard of the North."
    },
    type: "good",
  },
  {
    name: { tr: "Aragorn", en: "Aragorn" },
    image: "/images/characters/aragorn.jpg",
    desc: {
      tr: "Isildur'un varisi, Gondor'un kralı ve cesur savaşçı.",
      en: "Aragorn son of Arathorn, King of Gondor."
    },
    type: "good",
  },
  {
    name: { tr: "Legolas", en: "Legolas" },
    image: "/images/characters/legolas.jpg",
    desc: {
      tr: "Mirkwood'un elf prensi, okçuluk ustası.",
      en: "Legolas Greenleaf, Prince of Mirkwood, Master of the Bow."
    },
    type: "good",
  },
  {
    name: { tr: "Gimli", en: "Gimli" },
    image: "/images/characters/gimli.jpg",
    desc: {
      tr: "Cüce savaşçı, sadık dost.",
      en: "Gimli son of Gloin, Dwarf warrior, loyal friend."
    },
    type: "good",
  },
  {
    name: { tr: "Boromir", en: "Boromir" },
    image: "/images/characters/boromir.jpg",
    desc: {
      tr: "Gondor'un kahramanı, Yüzük Kardeşliği üyesi.",
      en: "Boromir son of Denethor, Steward of Gondor."
    },
    type: "good",
  },
  {
    name: { tr: "Meriadoc Brandybuck (Merry)", en: "Meriadoc Brandybuck (Merry)" },
    image: "/images/characters/merry.jpg",
    desc: {
      tr: "Yüzük Kardeşliği'nin neşeli hobbit üyesi.",
      en: "Merry Brandybuck, the cheerful Hobbit of the Fellowship."
    },
    type: "good",
  },
  {
    name: { tr: "Peregrin Took (Pippin)", en: "Peregrin Took (Pippin)" },
    image: "/images/characters/pippin.jpg",
    desc: {
      tr: "Yüzük Kardeşliği'nin en genç hobbit üyesi.",
      en: "Pippin Took, the youngest Hobbit of the Fellowship."
    },
    type: "good",
  },
  {
    name: { tr: "Arwen", en: "Arwen" },
    image: "/images/characters/arwen.jpg",
    desc: {
      tr: "Rivendell'in elf prensesi, Aragorn'un aşkı.",
      en: "Arwen Undómiel, Princess of Rivendell, Aragorn's love."
    },
    type: "good",
  },
  {
    name: { tr: "Galadriel", en: "Galadriel" },
    image: "/images/characters/galadriel.jpg",
    desc: {
      tr: "Lothlórien'in hanımı, kudretli elf.",
      en: "Galadriel, Lady of Lórien, powerful Elf."
    },
    type: "good",
  },
  {
    name: { tr: "Elrond", en: "Elrond" },
    image: "/images/characters/elrond.jpg",
    desc: {
      tr: "Rivendell'in efendisi, bilge elf.",
      en: "Elrond, Lord of Rivendell, wise Elf."
    },
    type: "good",
  },
  {
    name: { tr: "Faramir", en: "Faramir" },
    image: "/images/characters/faramir.jpg",
    desc: {
      tr: "Boromir'in kardeşi, Gondor'un kaptanı.",
      en: "Faramir son of Denethor, Captain of Gondor."
    },
    type: "good",
  },
  {
    name: { tr: "Éowyn", en: "Éowyn" },
    image: "/images/characters/eowyn.jpg",
    desc: {
      tr: "Rohan'ın kızı, cesur savaşçı.",
      en: "Éowyn, the daughter of Éomer, brave warrior."
    },
    type: "good",
  },
  {
    name: { tr: "Éomer", en: "Éomer" },
    image: "/images/characters/eomer.jpg",
    desc: {
      tr: "Rohan'ın savaşçısı, Éowyn'in kardeşi.",
      en: "Éomer, the Captain of the Rohirrim, Éowyn's brother."
    },
    type: "good",
  },
  {
    name: { tr: "Théoden", en: "Théoden" },
    image: "/images/characters/theoden.jpg",
    desc: {
      tr: "Rohan'ın kralı.",
      en: "Théoden, King of Rohan."
    },
    type: "good",
  },
  {
    name: { tr: "Treebeard", en: "Treebeard" },
    image: "/images/characters/treebeard.jpg",
    desc: {
      tr: "Entlerin lideri, Fangorn Ormanı'nın koruyucusu.",
      en: "Treebeard, the leader of the Ents, guardian of Fangorn Forest."
    },
    type: "good",
  },
  {
    name: { tr: "Bilbo Baggins", en: "Bilbo Baggins" },
    image: "/images/characters/bilbo.jpg",
    desc: {
      tr: "Frodo'nun amcası, eski Yüzük Taşıyıcısı.",
      en: "Bilbo Baggins, Frodo's uncle, former Ring-bearer."
    },
    type: "good",
  },
  {
    name: { tr: "Haldir", en: "Haldir" },
    image: "/images/characters/haldir.jpg",
    desc: {
      tr: "Lothlórien'in elf koruyucusu.",
      en: "Haldir, the Elf of Lothlórien, guardian."
    },
    type: "good",
  },
  {
    name: { tr: "Glorfindel", en: "Glorfindel" },
    image: "/images/characters/glorfindel.jpg",
    desc: {
      tr: "Rivendell'in kudretli elf savaşçısı.",
      en: "Glorfindel, the powerful Elf warrior of Rivendell."
    },
    type: "good",
  },
  {
    name: { tr: "Rosie Cotton", en: "Rosie Cotton" },
    image: "/images/characters/rosie.jpg",
    desc: {
      tr: "Sam'in aşkı, Shire'ın güzel hobbit'i.",
      en: "Rosie Cotton, Sam's love, the beautiful Hobbit of the Shire."
    },
    type: "good",
  },
  {
    name: { tr: "King of the Dead", en: "King of the Dead" },
    image: "/images/characters/kingofthedead.jpg",
    desc: {
      tr: "Ölüler Ordusu'nun kralı.",
      en: "King of the Dead, the ruler of the Army of the Dead."
    },
    type: "good",
  },
  // Kötü karakterler
  {
    name: { tr: "Sauron", en: "Sauron" },
    image: "/images/characters/sauron.jpg",
    desc: {
      tr: "Karanlık Lord, Tek Yüzük'ün efendisi.",
      en: "Sauron, the Dark Lord, Lord of Mordor, the Ring-bearer."
    },
    type: "evil",
  },
  {
    name: { tr: "Saruman", en: "Saruman" },
    image: "/images/characters/saruman.jpg",
    desc: {
      tr: "Beyaz büyücü, ihanetin simgesi.",
      en: "Saruman the White, the Wizard of Mordor, the betrayer of the West."
    },
    type: "evil",
  },
  {
    name: { tr: "Gollum (Sméagol)", en: "Gollum (Sméagol)" },
    image: "/images/characters/gollum.jpg",
    desc: {
      tr: "Yüzük tarafından yozlaştırılmış zavallı hobbit.",
      en: "Gollum, the deformed Hobbit, corrupted by the Ring."
    },
    type: "evil",
  },
  {
    name: { tr: "Nazgûl (Ringwraiths)", en: "Nazgûl (Ringwraiths)" },
    image: "/images/characters/nazgul.jpg",
    desc: {
      tr: "Sauron'un ölümsüz hizmetkarları.",
      en: "Nazgûl, the Ringwraiths, Sauron's immortal servants."
    },
    type: "evil",
  },
  {
    name: { tr: "Witch-king of Angmar", en: "Witch-king of Angmar" },
    image: "/images/characters/witchking.jpg",
    desc: {
      tr: "Nazgûl'lerin lideri, korkunun efendisi.",
      en: "Witch-king of Angmar, the leader of the Nazgûl, the bearer of fear."
    },
    type: "evil",
  },
  {
    name: { tr: "Gríma Wormtongue", en: "Gríma Wormtongue" },
    image: "/images/characters/grima.jpg",
    desc: {
      tr: "Théoden'in danışmanı, hain.",
      en: "Gríma Wormtongue, Théoden's advisor, the traitor."
    },
    type: "evil",
  },
  {
    name: { tr: "Denethor", en: "Denethor" },
    image: "/images/characters/denethor.jpg",
    desc: {
      tr: "Gondor'un vâlisi, karanlığa yenik düşen lider.",
      en: "Denethor, the Viceroy of Gondor, fallen into darkness."
    },
    type: "evil",
  },
  {
    name: { tr: "Balrog", en: "Balrog" },
    image: "/images/characters/balrog.jpg",
    desc: {
      tr: "Moria'nın derinliklerinde uyanan kadim kötülük.",
      en: "Balrog, the ancient evil in the depths of Moria."
    },
    type: "evil",
  },
  {
    name: { tr: "Shelob", en: "Shelob" },
    image: "/images/characters/shelob.jpg",
    desc: {
      tr: "Karanlık mağaraların dev örümceği.",
      en: "Shelob, the giant spider in the dark caves."
    },
    type: "evil",
  },
  {
    name: { tr: "Gothmog", en: "Gothmog" },
    image: "/images/characters/gothmog.jpg",
    desc: {
      tr: "Minas Tirith kuşatmasının ork komutanı.",
      en: "Gothmog, the orc commander of Minas Tirith's siege."
    },
    type: "evil",
  },
  {
    name: { tr: "Lurtz", en: "Lurtz" },
    image: "/images/characters/lurtz.jpg",
    desc: {
      tr: "Uruk-hai lideri.",
      en: "Lurtz, the leader of the Uruk-hai."
    },
    type: "evil",
  },
  {
    name: { tr: "Mouth of Sauron", en: "Mouth of Sauron" },
    image: "/images/characters/mouthofsauron.jpg",
    desc: {
      tr: "Sauron'un sözcüsü.",
      en: "Mouth of Sauron, the mouthpiece of Sauron."
    },
    type: "evil",
  },
  {
    name: { tr: "Uglúk", en: "Uglúk" },
    image: "/images/characters/ugluk.jpg",
    desc: {
      tr: "Uruk-hai komutanı.",
      en: "Uglúk, the orc commander."
    },
    type: "evil",
  },
  {
    name: { tr: "Shagrat", en: "Shagrat" },
    image: "/images/characters/shagrat.jpg",
    desc: {
      tr: "Cirith Ungol'un ork komutanı.",
      en: "Shagrat, the orc commander of Cirith Ungol."
    },
    type: "evil",
  },
  {
    name: { tr: "Gorbag", en: "Gorbag" },
    image: "/images/characters/gorbag.jpg",
    desc: {
      tr: "Minas Morgul'un ork lideri.",
      en: "Gorbag, the leader of the orcs of Minas Morgul."
    },
    type: "evil",
  },
  {
    name: { tr: "Grishnákh", en: "Grishnákh" },
    image: "/images/characters/grishnakh.jpg",
    desc: {
      tr: "Ork lideri.",
      en: "Grishnákh, the orc leader."
    },
    type: "evil",
  },
  {
    name: { tr: "Orc General", en: "Orc General" },
    image: "/images/characters/orcgeneral.jpg",
    desc: {
      tr: "Sauron'un ordularının generali.",
      en: "Orc General, the general of Sauron's army."
    },
    type: "evil",
  },
  {
    name: { tr: "Orc Captain", en: "Orc Captain" },
    image: "/images/characters/orccaptain.jpg",
    desc: {
      tr: "Sauron'un ordularının kaptanı.",
      en: "Orc Captain, the captain of Sauron's army."
    },
    type: "evil",
  },
];

const pageTitles = {
  main: { tr: "KARAKTERLER", en: "CHARACTERS" },
  good: { tr: "İYİ KARAKTERLER", en: "GOOD CHARACTERS" },
  evil: { tr: "KÖTÜ KARAKTERLER", en: "EVIL CHARACTERS" },
};

export default function CharactersPage() {
  const { language } = useLanguage();
  const goodChars = characters.filter((c) => c.type === "good");
  const evilChars = characters.filter((c) => c.type === "evil");



  return (
    <div className="relative min-h-screen w-full">
      {/* Sabit arka plan yüzük görseli */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <Image
          src="/images/one-ring.png"
          alt="One Ring"
          fill
          style={{ objectFit: "contain", opacity: 0.18, filter: "drop-shadow(0 0 80px gold) blur(2px)" }}
          priority
        />
      </div>
      {/* Karakterler içeriği */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="relative flex flex-col items-center justify-center min-h-screen text-white overflow-hidden z-10"
      >
        <h1 className="font-[Ringbearer] text-5xl md:text-7xl font-extrabold mb-8 text-yellow-400 drop-shadow-[0_0_20px_gold] text-center">{pageTitles.main[language] || pageTitles.main.tr}</h1>
        <div className="flex flex-row justify-between items-center w-full max-w-4xl mx-auto mb-6 gap-4">
          <h2 className="font-[Ringbearer] text-2xl md:text-3xl text-yellow-300 text-center drop-shadow-[0_0_10px_gold] w-1/2">{pageTitles.good[language] || pageTitles.good.tr}</h2>
          <h2 className="font-[Ringbearer] text-2xl md:text-3xl text-red-400 text-center drop-shadow-[0_0_10px_red] w-1/2">{pageTitles.evil[language] || pageTitles.evil.tr}</h2>
        </div>
        <div className="w-full max-w-4xl mx-auto px-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* İyi karakterler sütunu */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {goodChars.map((char, i) => (
                <motion.div
                  key={char.name.tr}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className={`bg-black/60 backdrop-blur-xl rounded-lg border border-yellow-600 shadow-lg flex flex-col items-center p-3 transition-all duration-300 hover:scale-105 hover:shadow-yellow-400/30 hover:border-yellow-400 group relative overflow-hidden`}
                >
                  <div className="w-28 h-28 mb-2 rounded-full overflow-hidden border border-yellow-400 group-hover:border-yellow-200 transition-all duration-300 shadow">
                    <Image
                      src={char.image}
                      alt={char.name.tr}
                      width={112}
                      height={112}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-[Ringbearer] text-base font-bold text-yellow-300 mb-1 text-center group-hover:text-yellow-200 transition-colors">{char.name[language] || char.name.tr}</h3>
                  <p className="text-xs text-gray-300 text-center leading-relaxed group-hover:text-gray-200 transition-colors">{char.desc[language] || char.desc.tr}</p>
                </motion.div>
              ))}
            </div>
          </div>
          {/* Kötü karakterler sütunu */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {evilChars.map((char, i) => (
                <motion.div
                  key={char.name.tr}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className={`bg-black/60 backdrop-blur-xl rounded-lg border border-red-600 shadow-lg flex flex-col items-center p-3 transition-all duration-300 hover:scale-105 hover:shadow-red-400/30 hover:border-red-400 group relative overflow-hidden`}
                >
                  <div className="w-28 h-28 mb-2 rounded-full overflow-hidden border border-red-400 group-hover:border-red-200 transition-all duration-300 shadow">
                    <Image
                      src={char.image}
                      alt={char.name.tr}
                      width={112}
                      height={112}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-[Ringbearer] text-base font-bold text-red-300 mb-1 text-center group-hover:text-red-200 transition-colors">{char.name[language] || char.name.tr}</h3>
                  <p className="text-xs text-gray-300 text-center leading-relaxed group-hover:text-gray-200 transition-colors">{char.desc[language] || char.desc.tr}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      {/* Tümünü Gör butonu */}
      <div className="mt-10 flex justify-center">
        <a
          href="/characters"
          className="px-8 py-4 rounded-full bg-yellow-500 text-black font-bold text-lg shadow-lg transition-all duration-300 hover:bg-yellow-400 hover:text-gray-900"
        >
          {language === 'tr' ? 'Tümünü Gör' : 'View All'}
        </a>
      </div>
    </div>
  );
} 