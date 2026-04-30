
import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from "motion/react";
import {
  Target,
  Palette,
  Zap,
  Users,
  Lock,
  Lightbulb,
  ChevronRight,
  Apple,
  Menu,
  X,
  ArrowDown,
} from "lucide-react";
import { twMerge } from "tailwind-merge";
import {
  STATS,
  TIMELINE,
  PRODUCTS,
  STRATEGIES,
  QUOTES,
} from "../src/data";

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Story", href: "#story" },
    { name: "Timeline", href: "#timeline" },
    { name: "Products", href: "#products" },
    { name: "Strategies", href: "#strategies" },
    { name: "Legacy", href: "#legacy" },
  ];

  return (
    <nav
      className={twMerge(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 px-6 md:px-12 flex justify-between items-center",
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent",
      )}
    >
      <div className="flex items-center gap-2">
        <Apple
          className={twMerge(
            "w-8 h-8 transition-colors",
            isScrolled ? "text-black" : "text-white",
          )}
        />
        <span
          className={twMerge(
            "text-xl font-bold uppercase tracking-widest",
            isScrolled ? "text-black" : "text-white",
          )}
        >
          Jobs
        </span>
      </div>

      <div className="hidden md:flex gap-8">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className={twMerge(
              "text-sm font-medium uppercase tracking-widest hover:opacity-70 transition-opacity",
              isScrolled ? "text-black" : "text-white",
            )}
          >
            {link.name}
          </a>
        ))}
      </div>

      <button
        className="md:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <X
            className={twMerge(
              "w-6 h-6",
              isScrolled ? "text-black" : "text-white",
            )}
          />
        ) : (
          <Menu
            className={twMerge(
              "w-6 h-6",
              isScrolled ? "text-black" : "text-white",
            )}
          />
        )}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-bold text-black uppercase tracking-widest"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <img
          src="/steve2.jpg"
          alt="Steve Jobs"
          className="w-full h-full object-cover opacity-60 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-4"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-white/80 text-xl md:text-2xl font-light tracking-[0.3em] uppercase mb-4"
        >
          Visionary. Pioneer. Icon.
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-white text-7xl md:text-[10rem] font-black uppercase tracking-tighter leading-none mb-4"
        >
          STEVE JOBS
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="h-1 w-24 bg-white mx-auto mb-8 origin-center"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-white/60 text-lg md:text-xl font-medium tracking-widest uppercase mb-12"
        >
          1955 — 2011
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col md:flex-row gap-4 justify-center items-center"
        >
          <button className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white/90 transition-colors flex items-center gap-2 group">
            Explore His Life
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="border border-white/30 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
            Watch Tribute
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
      >
        <ArrowDown className="w-8 h-8" />
      </motion.div>
    </section>
  );
};

const StatsBar = () => {
  return (
    <section className="bg-black py-20 px-6 border-y border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
        {STATS.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="text-white text-5xl md:text-6xl font-black mb-2 flex justify-center items-baseline">
              <Counter value={stat.value} />
              <span className="text-2xl ml-1 text-white/60">{stat.suffix}</span>
            </div>
            <div className="text-white/40 uppercase tracking-[0.2em] text-sm font-bold">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Counter = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayValue(end);
          clearInterval(timer);
        } else {
          setDisplayValue(Number(start.toFixed(1)));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return <span ref={ref}>{displayValue}</span>;
};

const EarlyLife = () => {
  return (
    <section id="story" className="py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-gray-100 -z-10 rounded-full" />
          <img
            src="/steve1.jpg"
            alt="Young Steve Jobs"
            className="w-full rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4 block">
            1955 — 1975
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-black mb-8 leading-tight">
            Искра <br /> Кремниевой долины.
          </h2>
          <p className="text-gray-600 text-xl leading-relaxed mb-8">
            Стив Джобс родился в Сан-Франциско и был усыновлен Полом и Кларой Джобс. Он вырос в самом сердце Маунтин-Вью, в окружении инженеров и бурно развивающейся технологической революции. Его любознательность привела его от экспериментов с электроникой в ​​гараже отца к изучению дзен-буддизма в Индии.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              "Adoption",
              "Reed College",
              "India",
              "Zen",
              "Atari",
              "Calligraphy",
            ].map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-gray-100 rounded-full text-sm font-bold uppercase tracking-wider text-black"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const AppleIsBorn = () => {
  return (
    <section className="bg-black py-32 px-6 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
        <div className="md:w-1/2">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white text-5xl md:text-7xl font-black mb-8 uppercase"
          >
            Гараж, <br /> два Стива, <br /> одно видение.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="border-l-4 border-white pl-8 mb-8"
          >
            <p className="text-white/80 text-2xl italic font-light leading-relaxed">
              «Мы основали Apple в гараже моих родителей, когда мне было 20 лет. Мы много работали, и за 10 лет Apple выросла из компании, состоящей всего из нас двоих, в компанию с оборотом в 2 миллиарда долларов»
            </p>
          </motion.div>
          <p className="text-white/40 text-lg">
            В 1976 году Джобс и Возняк основали компанию Apple Computer. Apple I и II были не просто компьютерами; они стали первыми шагами на пути к персональным компьютерам для всех.
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="md:w-1/2 relative"
        >
          <img
            src="/woz1.jpg"
            alt="Apple Garage"
            className="rounded-2xl shadow-2xl opacity-80"
          />
          <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay rounded-2xl" />
        </motion.div>
      </div>
    </section>
  );
};

const TimelineSection = () => {
  const [activeTab, setActiveTab] = useState(TIMELINE[0].id);

  return (
    <section id="timeline" className="py-32 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-6xl font-black text-black uppercase mb-4 tracking-tighter">
            The Life Cycle
          </h2>
          <p className="text-gray-500 text-xl tracking-widest uppercase">
            Four Eras of Innovation
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {TIMELINE.map((era) => (
            <button
              key={era.id}
              onClick={() => setActiveTab(era.id)}
              className={twMerge(
                "px-8 py-4 rounded-full font-bold uppercase tracking-widest transition-all duration-300",
                activeTab === era.id
                  ? "bg-black text-white shadow-xl scale-105"
                  : "bg-white text-black hover:bg-gray-100 border border-gray-200",
              )}
            >
              {era.years}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl overflow-hidden min-h-[600px]">
          <AnimatePresence mode="wait">
            {TIMELINE.map(
              (era) =>
                era.id === activeTab && (
                  <motion.div
                    key={era.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="grid md:grid-cols-2 gap-16 items-center"
                  >
                    <div>
                      <img
                        src={era.image}
                        alt={era.title}
                        className="w-full h-[500px] object-cover rounded-[2rem] shadow-lg"
                      />
                    </div>
                    <div>
                      <h3 className="text-4xl font-black text-black mb-2 uppercase">
                        {era.title}
                      </h3>
                      <p className="text-blue-600 font-bold mb-6">
                        {era.years}
                      </p>
                      <p className="text-gray-600 text-xl leading-relaxed mb-8">
                        {era.description}
                      </p>
                      <ul className="space-y-4">
                        {era.events.map((event, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-4 text-gray-800 font-medium"
                          >
                            <div className="w-2 h-2 bg-black rounded-full" />
                            {event}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ),
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const TheExile = () => {
  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-20 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <h2 className="text-6xl font-black text-black uppercase mb-8 leading-none">
              Изгнание & <br /> Воскресение.
            </h2>
            <p className="text-gray-600 text-xl leading-relaxed mb-8">
              «Увольнение из Apple стало лучшим, что могло со мной случиться. Тяжесть успеха сменилась легкостью возвращения к статусу новичка».
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-8 bg-black text-white rounded-3xl">
                <div className="text-4xl font-black mb-2">1986</div>
                <div className="text-sm uppercase tracking-widest opacity-50">
                  приобрела Pixar.
                </div>
              </div>
              <div className="p-8 bg-purple-600 text-white rounded-3xl">
                <div className="text-4xl font-black mb-2">$10M</div>
                <div className="text-sm uppercase tracking-widest opacity-50">
                  NeXT Capital
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <img
              src="/firedSt.jpg"
              alt="Steve Jobs at NeXT"
              className="w-full rounded-[3rem] shadow-2xl grayscale"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const iPhoneMoment = () => {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Steve_Jobs_presents_iPhone.jpg"
          alt="iPhone Keynote"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 text-center max-w-4xl px-6"
      >
        <h2 className="text-white text-5xl md:text-7xl font-black uppercase mb-8 leading-tight">
          "Today Apple is going to reinvent the phone."
        </h2>
        <div className="h-1 w-24 bg-white mx-auto mb-8" />
        <p className="text-white/80 text-xl tracking-widest uppercase font-bold">
          January 9, 2007 — Moscone Center
        </p>
      </motion.div>
    </section>
  );
};

const ProductShowcase = () => {
  return (
    <section id="products" className="py-32 px-6 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-7xl font-black uppercase mb-4">
            Шедевры
          </h2>
          <p className="text-white/40 text-xl tracking-widest uppercase">
            Товары, изменившие мир
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {PRODUCTS.map((product, idx) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden group"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
              </div>
              <div className="p-8">
                <div className="text-white/40 font-bold mb-2 uppercase tracking-widest">
                  {product.year}
                </div>
                <h3 className="text-3xl font-black mb-4 uppercase">
                  {product.name}
                </h3>
                <p className="text-white/60 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Strategies = () => {
  const icons = { Target, Palette, Zap, Users, Lock, Lightbulb };

  return (
    <section id="strategies" className="py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-7xl font-black text-black uppercase mb-4">
            ДНК
          </h2>
          <p className="text-gray-400 text-xl tracking-widest uppercase">
            Основная философия и стратегии
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {STRATEGIES.map((strategy, idx) => {
            const IconComp = icons[strategy.icon];
            return (
              <motion.div
                key={strategy.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-10 bg-gray-50 rounded-[3rem] hover:bg-black group transition-all duration-500"
              >
                <div className="w-16 h-16 bg-black group-hover:bg-white rounded-2xl flex items-center justify-center mb-8 transition-colors">
                  <IconComp className="w-8 h-8 text-white group-hover:text-black transition-colors" />
                </div>
                <h3 className="text-2xl font-black text-black group-hover:text-white uppercase mb-4 transition-colors">
                  {strategy.title}
                </h3>
                <p className="text-gray-500 group-hover:text-white/50 text-sm italic mb-6 transition-colors">
                  {strategy.quote}
                </p>
                <p className="text-gray-600 group-hover:text-white/70 leading-relaxed mb-6 transition-colors">
                  {strategy.description}
                </p>
                <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 group-hover:text-blue-400">
                  Impact: {strategy.impact}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const StanfordSpeech = () => {
  return (
    <section className="py-32 px-6 bg-black text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 pointer-events-none">
        <img
          src="/stanford1.jpg"
          alt="Steve Jobs Speaking"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="md:w-2/3">
          <h2 className="text-5xl md:text-7xl font-black uppercase mb-12">
            Стэнфорд, 2005.
          </h2>
          <div className="space-y-12">
            {[
              {
                title: "Соединяя точки",
                text: "Нельзя соединить точки, глядя в будущее; это можно сделать, только оглядываясь назад. Нужно верить, что в будущем все точки каким-то образом соединятся.",
              },
              {
                title: "Любовь и утрата",
                text: "Иногда жизнь бьет тебя по голове кирпичом. Не теряй веру. Я убежден, что единственное, что поддерживало меня, — это любовь к тому, что я делаю.",
              },
              {
                title: "Смерть",
                text: "Смерть, по всей видимости, является лучшим изобретением жизни. Она – движущая сила перемен в жизни. Она убирает старое, чтобы освободить место для нового.",
              },
            ].map((story, i) => (
              <motion.div
                key={story.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex gap-8"
              >
                <div className="text-4xl font-black text-white/20">
                  0{i + 1}
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase mb-4 text-blue-500">
                    {story.title}
                  </h3>
                  <p className="text-xl text-white/70 leading-relaxed font-light">
                    {story.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const QuotesCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % QUOTES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="h-screen bg-white relative overflow-hidden flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img
            src={QUOTES[current].image}
            alt="Steve Jobs"
            className="flex justify-center object-center h-full w-200 grayscale opacity-20"
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 max-w-5xl px-6 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="text-black text-4xl md:text-6xl font-black uppercase leading-tight tracking-tighter">
              {QUOTES[current].text}
            </div>
            <div className="flex justify-center gap-2">
              {QUOTES.map((_, i) => (
                <div
                  key={i}
                  className={twMerge(
                    "w-12 h-1 rounded-full transition-all duration-500",
                    i === current ? "bg-black" : "bg-gray-200",
                  )}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

const Legacy = () => {
  return (
    <section
      id="legacy"
      className="py-32 px-6 bg-black relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none opacity-10 flex items-center justify-center">
        <img
          src="/think.jpg"
          alt="Steve Jobs Portrait"
          className="w-full h-full object-cover scale-150"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-7xl font-black text-white uppercase mb-4 tracking-tighter">
            Наследие
          </h2>
          <p className="text-white/40 text-xl tracking-widest uppercase">
            Изменяем мир к лучшему
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {[
            { label: "Пик рыночной капитализации", value: "$3.5T" },
            { label: "Имеющиеся патенты", value: "458+" },
            { label: "Глобальная розничная торговля", value: "500+" },
            { label: "Активные устройства", value: "2B+" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 border border-white/20 rounded-[2rem] bg-white/5 backdrop-blur-sm text-center"
            >
              <div className="text-4xl font-black text-white mb-2">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-widest text-white/40 font-bold">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white text-3xl md:text-5xl font-light italic mb-8 max-w-4xl mx-auto leading-tight"
          >
            «Быть ​​самым богатым человеком на кладбище для меня не имеет значения. Важно ложиться спать с мыслью, что мы сделали что-то замечательное».
          </motion.p>
          <div className="h-1 w-24 bg-white mx-auto" />
        </div>
      </div>
    </section>
  );
};

const TributeMosaic = () => {
  const images = [
    "/macin.jpg",
    "/ipod.jpg",
    "/nextSteve.jpg",
    "/iphone.jpg",
    "/steve1.jpg",
    "/steveAp.jpg"
  ];

  return (
    <section className="py-20 bg-white">
      <div className="grid grid-cols-2 md:grid-cols-6 h-64 md:h-96">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="overflow-hidden  transition-all duration-700"
          >
            <img
              src={img}
              alt="Tribute"
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>
      <div className="py-32 px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-black text-3xl md:text-8xl font-black uppercase tracking-tighter leading-none"
        >
          Оставайтесь голодными, <br /> оставайтесь безрассудными.
        </motion.h2>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 px-6 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <Apple className="text-white w-6 h-6" />
          <span className="text-white font-bold uppercase tracking-widest text-sm">
            Jobs — Documentary Series
          </span>
        </div>
        <div className="text-white/40 text-xs uppercase tracking-widest font-medium">
         © 2026 Tribute Foundation.Made with the soul by Magzhan
        </div>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Resources"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-white/40 hover:text-white transition-colors text-xs uppercase tracking-widest"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};


export default function SteveJobsPresentation() {
  return (
    <main className="bg-black min-h-screen selection:bg-blue-500 selection:text-white">
      <Navbar />
      <Hero />
      <StatsBar />
      <EarlyLife />
      <AppleIsBorn />
      <TimelineSection />
      <TheExile />
      <ProductShowcase />
      <Strategies />
      <StanfordSpeech />
      <QuotesCarousel />
      <Legacy />
      <TributeMosaic />
      <Footer />
    </main>
  );
}
