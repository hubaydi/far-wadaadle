"use client";

import { History, BookOpen, Settings, Languages, Quote } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

export default function ScriptInfo() {
  const sections = [
    {
      title: "Taariikhda Far-Wadaadka",
      icon: History,
      content:
        "Far-Wadaadku waa hab qoraal ku salaysan xarfaha Carabiga, kaas oo loo isticmaali jiray qorista Af-Soomaaliga boqolaal sano ka hor intaanan la qaadan farta Laatiinka sannadkii 1972. Waxay ahayd habka ugu muhiimsan ee ay culimada, ganacsatada, iyo gabayaagu u isticmaali jireen diiwaangelinta taariikhda iyo aqoonta Soomaalida.",
    },
    {
      title: "Yaa Isticmaali Jiray?",
      icon: BookOpen,
      content:
        "waxa Wax ku qori jiray Culimadii Soomaaliyeed sida Sh. Yuusuf axmed Al-kownayn, Sayid Maxamed Cabdulle Xasan, Sh. Uways al-Barawi iyo kuwo kale oo badan. Qoreyaal Soomaliyeed oo kala duwan ayaa alifay habab lagu waafajinayo xarfaha Carabiga codadka gaarka ah ee Af-Soomaaliga.",
    },
    {
      title: "Sidee u Shaqeeyaa?",
      icon: Settings,
      content:
        "Beddelehan wuxuu isticmaalaa hab-raaca casriga ah ee Far-Wadaadka. Tusaale ahaan, shaqallada dheer (aa, ee, ii, oo, uu) waxaa loo beddelaa xarfo iyo calaamado is-raacsan, halka shibbaneyaasha labanlaaban la saaro 'Shaddah' ( ّ ). Habkan wuxuu ilaalinayaa dhawaaqa saxda ah ee afka.",
    },
    {
      title: "Luuqado Kale",
      icon: Languages,
      content:
        "Af-Soomaaliga iyo Af-carabiga ma ahan luuqaddaha kaliya ee adeegsada/jiray xarfaha Carabiga; afaf badan oo Afrikaan iyo Aasiyaan ah sida Swahili (Ajami), Faarisi, Urdu, Pashto Hausa, iyo Wolof ayaa iyaguna leh taariikh dheer oo ay ku qori jireen farta Carabiga. Tani waxay muujinaysaa xiriirka qotada dheer ee ka dhexeeya dhaqanka, diinta iyo farta.",
    },
  ];

  return (
    <section className="mt-16 space-y-8 border-t border-border/40 pt-16">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Baro farta <span className="text-primary">Far-Wadaad</span>
        </h2>
        <p className="mt-3 text-muted-foreground">
          Xog dheeri ah ka ogow Far-Wadaad, qoraalka Soomaaliga ee ku salaysan
          xarfaha Carabiga.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {sections.map((section, index) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-background/40 p-6 transition-all hover:border-primary/40 hover:bg-accent/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-foreground">{section.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {section.content}
              </p>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 mb-12 overflow-hidden rounded-3xl border border-border/50 bg-background/40 transition-all hover:bg-accent/10 hover:border-primary/40 group relative"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image Side */}
          <div className="relative min-h-95 w-full border-b lg:border-b-0 lg:border-r border-border/30 p-8 flex items-center justify-center bg-linear-to-br from-primary/5 to-transparent overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-primary-100)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,var(--color-primary-900)_0%,transparent_70%)] opacity-20" />

            {/* Tilted Photo Frame */}
            <div className="relative w-full max-w-70 sm:max-w-xs aspect-3/4 rounded-sm bg-[#f9f5ed] dark:bg-[#e6dcc5] shadow-lg rotate-3 transition-all duration-500 group-hover:rotate-0 group-hover:scale-[1.02] group-hover:shadow-xl border border-black/10 dark:border-white/10 p-2 lg:p-3 z-10">
              <div className="relative h-full w-full overflow-hidden border border-black/5 dark:border-black/20">
                <Image
                  src="/warqad-1932.png"
                  alt="Warqad la qoray 1932 oo ku qoran Far-Wadaad"
                  fill
                  className="object-cover object-top opacity-90 contrast-[1.05] sepia-[0.1] transition-all duration-500 group-hover:opacity-100 group-hover:sepia-0"
                />
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary w-fit mb-6">
              <History className="h-4 w-4" />
              <span>Warqad Taariikhi ah (1932)</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-4">
              Dhaxal La Ilaaliyay
            </h3>

            <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
              <p>
                Sawirkani wuxuu muujinayaa warqad la qoray sanadkii{" "}
                <strong>1932-dii</strong>, oo uu qoray Nin ku sugnaa Berbera una
                diray xaaskiisa oo ku sugnayd Burco. warqadda waxay ku
                qorantahay far wadaad. taas oo tusaale nool u ah sida
                Far-Wadaadka loogu adeegsan jiray isgaarsiinta xilli aad u fog.
              </p>
              <p>
                Qoraalka dhexdiisa, waxaad ku arkaysaa sida farsamada iyo
                silsilada leh ee xarfaha carabiga loogu qaabeeyay dhawaaqa
                Af-Soomaaliga,taasoo ah bilicda iyo sooyaalka uu mashruucani soo
                noolaynayo. Una taaganyahay dhowriddiisa
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="rounded-3xl bg-linear-to-br from-primary/10 to-transparent p-8 text-center border border-primary/10"
      >
        <Quote className="mx-auto mb-4 h-8 w-8 text-primary/40" />
        <p className="mx-auto max-w-2xl text-lg font-medium italic text-foreground/90">
          &quot;Asc, waxaa Alle mahaddii ah inaanu ugu danbayn Hirgalinnay
          Mareegtan Ummada soomaaliyeed u fududaynaysa in Qoraal kasta oo
          Far-Soomaali Laatiin ku qoran si fudud ugu beddeli karaan Far-Wadaad
          (carabi). ... .&quot;
        </p>
        <p className="mx-auto mt-2 max-w-2xl text-lg font-medium italic text-foreground/90">
          &quot;Waxaanu u hadyaday-naynaa cid kasta oo danaynaysa fartaan.
          jecelna in Af-kooda Hodanka ah ay ku qoraan farta hodanka ah ee
          Carabiga... .&quot;
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Tijaabada aan mariinnay Mashiinka waxa ay tilmaamaysaa in wax ku dhow
          100% uu si sax ah u qabanayo beddelidda.
        </p>
        <div className="mt-4 text-sm text-muted-foreground">
          — Developer-ka Mareegta
        </div>
      </motion.div>
    </section>
  );
}
