"use client";

import { History, BookOpen, Settings, Languages, Quote } from "lucide-react";
import { motion } from "motion/react";

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
        "Culimadii Soomaaliyeed sida Sh. Yuusuf axmed Al-kownayn, Sayid Maxamed Cabdulle Xasan, Sheikh Uwais al-Barawi iyo kuwo kale oo badan. Qorayaal kala duwan ayaa alifay habab lagu waafajinayo xarfaha Carabiga codadka gaarka ah ee Af-Soomaaliga. Waxaa loo isticmaali jiray qoraallada diinta, tixaha gabayada, iyo xiriirka caalamiga ah ee lala lahaa dunida kale.",
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
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="rounded-3xl bg-linear-to-br from-primary/10 to-transparent p-8 text-center border border-primary/10"
      >
        <Quote className="mx-auto mb-4 h-8 w-8 text-primary/40" />
        <p className="mx-auto max-w-2xl text-lg font-medium italic text-foreground/90">
          &quot;Farta Far-Wadaadku ... .&quot;
        </p>
        <div className="mt-4 text-sm text-muted-foreground">
          — Developer-ka Mareegta
        </div>
      </motion.div>
    </section>
  );
}
