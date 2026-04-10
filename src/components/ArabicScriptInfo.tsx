"use client";

import { BookOpen, Globe, History, Lightbulb } from "lucide-react";
import { motion } from "motion/react";

export default function ArabicScriptInfo() {
  const mainContent = {
    intro:
      "Farta Carabiga waa nidaam qoraaleedka labaad ee loogu isticmaalka badan yahay adduunka, iyadoo in ka badan 100 luqadood—ay ku jiraan Faaris (Persian), Urdhu (Urdu), Bashto (Pashto), Kurdi (Kurdish), iyo Maalay (Jawi)—ay isticmaalaan iyada ama noocyo ka farcamay, inta badanna lagu daro xarfo gaar ah si ay u metelaan dhawaaqyo u gaar ah luqadahaas. Qiyaasaha guud ee luqadaha, taariikh ahaan iyo haddaba, waxay u dhexeeyaan in ka badan 100 ilaa 200, iyadoo ku xiran qaabka loo kala saaro.",
  };

  const languages = [
    {
      name: "Carabi",
      description: "Luqadda koowaad, oo ay ku jiraan dhammaan lahjadoheeda.",
    },
    {
      name: "Faaris (Farsi/Dari)",
      description: "Waxaa looga hadlaa Iiraan iyo Afgaanistaan.",
    },
    {
      name: "Urdhu",
      description: "Luqadda qaranka ee Bakistaan.",
    },
    {
      name: "Bashto",
      description: "Waxaa looga hadlaa Afgaanistaan iyo Bakistaan.",
    },
    {
      name: "Kurdi",
      description: "Gaar ahaan lahjadda Soraaniga (Sorani).",
    },
    {
      name: "Maalay (Jawi)",
      description:
        "Taariikh ahaan koonfur-bari Aasiya, wali waxaa laga isticmaalaa qaybo ka mid ah Burunaay iyo Malaysiya.",
    },
    {
      name: "Uqhuur (Uyghur)",
      description:
        "Waxaa laga isticmaalaa gobolka Turkistaanta Bari (Xinjiang) ee Shiinaha.",
    },
    {
      name: "Sindhi iyo Bunjaabi",
      description:
        "Lahjado/qaabab gaar ah (tusaale ahaan, Shahmukhi) ee Bakistaan/Hindiya.",
    },
  ];

  const history = [
    {
      title: "Turkigii Cismaaniyiinta",
      content:
        "Waxay si baaxad leh u isticmaali jireen farta Carabiga ilaa sanadkii 1928 oo loo wareegay Laatiin.",
    },
    {
      title: "Luqadaha Afrika",
      content:
        "Taariikh ahaan waxaa loo isticmaali jiray luqado ay ka mid yihiin Hawsa, Mandiinka, Sawaaxili, iyo Fulaani (sida farta Wadaad ee Soomaalida).",
    },
    {
      title: "Faraha La Waafajiyay",
      content:
        "Farta Carabiga (oo inta badan loogu yeero *abjad* sababtoo ah taariikh ahaan waxay mudnaanta siin jirtay shaqalada adag/consonants) ayaa loo waafajiyay sidii nidaam xarfeed dhab ah luqadaha sida Kurdiga iyo Uyquurka, kuwaas oo adeegsada calaamado gaar ah si ay u muujiyaan shaqalada (vowels).",
    },
  ];

  return (
    <section className="mt-16 space-y-10 border-t border-border/40 pt-16">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Farta <span className="text-primary">Carabiga</span> & Luuqadaha Lagu
          Qoro
        </h2>
        <p className="mt-3 text-muted-foreground">
          Macluumaad dheeraad ah oo ku saabsan farta Carabiga iyo sida ay u
          isticmaalaan luqado badan, oo adduunka ah.
        </p>
      </div>

      {/* Intro */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl border border-border/50 bg-background/40 p-6"
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          {mainContent.intro}
        </p>
      </motion.div>

      {/* Major Languages */}
      <div>
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Globe className="h-5 w-5" />
          </div>
          <h3 className="text-xl font-bold text-foreground">
            Luqadaha Waaweyn ee Isticmaala Farta Carabiga
          </h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {languages.map((lang, index) => (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group rounded-xl border border-border/40 bg-background/30 p-5 transition-all hover:border-primary/30 hover:bg-accent/10"
            >
              <h4 className="font-semibold text-foreground">{lang.name}</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                {lang.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* History & Examples */}
      <div>
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <History className="h-5 w-5" />
          </div>
          <h3 className="text-xl font-bold text-foreground">
            Tusaalooyin Kale iyo Taariikh
          </h3>
        </div>
        <div className="space-y-4">
          {history.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              viewport={{ once: true }}
              className="rounded-xl border border-border/40 bg-background/30 p-5"
            >
              <h4 className="font-semibold text-foreground">{item.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Why So Many? */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="rounded-2xl border border-primary/20 bg-linear-to-br from-primary/8 to-transparent p-7"
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Lightbulb className="h-5 w-5" />
          </div>
          <h3 className="text-xl font-bold text-foreground">
            Sababta Ay U Badan Yihiin Luuqaha Lagu Qoro Farta Carabiga?
          </h3>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Fiditaanka farta Carabiga waxay si xooggan ugu xiran tahay faafitaanka
          Islaamka, Jacayl loo Qabo farta Qur&apos;aanku ku qoranyahay. iyo
          Fududayn Bulshada muslimka ah loo fududayno Barashadda, Akhriska iyo
          fahamka Diintooda. taas oo ka dhigtay farta loo doorbido qoraallada
          diiniga ah, taasi oo sababtay in lagu waafajiyo luqadaha maxalliga ah
          ee ku kala baahsan Bariga Dhexe, Aasiyada Dhexe, Afrika, iyo
          Koonfur-bari Aasiya.
        </p>
      </motion.div>
    </section>
  );
}
