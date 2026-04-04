import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Star, Lock, Zap, Shield, Heart, HeartHandshake, CheckCircle2, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

import productImage from "@assets/Gemini_Generated_Image_sc4dwfsc4dwfsc4d-removebg-preview_1775067577891.png";
import act1 from "@assets/a8bfbf1b7124173a5e7dafe42c02cb49_1775072312454.jpg";
import act2 from "@assets/3017c4596614d5ba827be7442d730698_1775072312454.jpg";
import act3 from "@assets/49aaf433f5464a5e5efc72fbdaad2879_1775072312454.jpg";
import act4 from "@assets/07be2bd8224e7c8102b5e6379c2197b9_1775072312455.jpg";
import act5 from "@assets/4debfcc2071331c826c1133b10cf64b6_1775072312455.jpg";
import act6 from "@assets/ecb9d86148872ca33335caa387223443_1775072312455.jpg";
import kidImage from "@assets/Gemini_Generated_Image_jqq4tpjqq4tpjqq4_(1)_1775136240250.png";
import activitiesCollage from "@assets/Gemini_Generated_Image_1js7gf1js7gf1js7_(1)_1775331167959.png";
import whatsappIcon from "@assets/icone-redondo-do-aplicativo-whatsapp-mensageiro-popular-logo-_1775073841533.avif";
import guaranteeBadge from "@assets/7-dias-garantia_1775073364898.webp";
import bonus1 from "@assets/ChatGPT_Image_1_de_abr._de_2026,_17_18_30_1775075294438.png";
import bonus2 from "@assets/ChatGPT_Image_1_de_abr._de_2026,_17_20_31_1775075294438.png";
import bonus3 from "@assets/ChatGPT_Image_1_de_abr._de_2026,_17_22_04_1775075294438.png";
import bonus4 from "@assets/ChatGPT_Image_1_de_abr._de_2026,_17_23_55_1775075294437.png";

const ACTIVITY_IMAGES = [
  { src: act1, label: "O que é a Quaresma?" },
  { src: act2, label: "História da Páscoa" },
  { src: act3, label: "Cruzadinha da Páscoa" },
  { src: act4, label: "Minha Atividade — Semana Santa" },
  { src: act5, label: "Atividade Bíblica — Noé e Davi" },
  { src: act6, label: "Palavras-Cruzadas — Jó" },
];

function ActivityCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const posRef = useRef(0);
  const pausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragScrollRef = useRef(0);

  // Duplicate images for seamless infinite loop
  const items = [...ACTIVITY_IMAGES, ...ACTIVITY_IMAGES, ...ACTIVITY_IMAGES];

  const CARD_W = 260;
  const GAP = 20;
  const UNIT = CARD_W + GAP;
  const LOOP_WIDTH = ACTIVITY_IMAGES.length * UNIT;
  const SPEED = 0.45; // px per frame — slow and harmonious

  const tick = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    if (!pausedRef.current && !isDraggingRef.current) {
      posRef.current += SPEED;
      if (posRef.current >= LOOP_WIDTH) posRef.current -= LOOP_WIDTH;
      track.style.transform = `translateX(${-posRef.current}px)`;
    }
    rafRef.current = requestAnimationFrame(tick);
  }, [LOOP_WIDTH]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  const nudge = (dir: 1 | -1) => {
    posRef.current = Math.max(0, posRef.current + dir * UNIT);
    if (posRef.current >= LOOP_WIDTH) posRef.current -= LOOP_WIDTH;
    if (trackRef.current) trackRef.current.style.transform = `translateX(${-posRef.current}px)`;
  };

  // Mouse drag
  const onMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragScrollRef.current = posRef.current;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const delta = dragStartXRef.current - e.clientX;
    posRef.current = dragScrollRef.current + delta;
    if (posRef.current < 0) posRef.current += LOOP_WIDTH;
    if (posRef.current >= LOOP_WIDTH) posRef.current -= LOOP_WIDTH;
    if (trackRef.current) trackRef.current.style.transform = `translateX(${-posRef.current}px)`;
  };
  const onMouseUp = () => { isDraggingRef.current = false; };

  // Touch drag
  const onTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.touches[0].clientX;
    dragScrollRef.current = posRef.current;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const delta = dragStartXRef.current - e.touches[0].clientX;
    posRef.current = dragScrollRef.current + delta;
    if (posRef.current < 0) posRef.current += LOOP_WIDTH;
    if (posRef.current >= LOOP_WIDTH) posRef.current -= LOOP_WIDTH;
    if (trackRef.current) trackRef.current.style.transform = `translateX(${-posRef.current}px)`;
  };
  const onTouchEnd = () => { isDraggingRef.current = false; };

  return (
    <div className="relative w-full">
      {/* Arrow left */}
      <button
        onClick={() => nudge(-1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 border border-border shadow-md rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-150"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Arrow right */}
      <button
        onClick={() => nudge(1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 border border-border shadow-md rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-150"
        aria-label="Próxima"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Viewport */}
      <div
        className="overflow-hidden cursor-grab active:cursor-grabbing px-12"
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; isDraggingRef.current = false; }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Track */}
        <div
          ref={trackRef}
          className="flex will-change-transform"
          style={{ gap: GAP, userSelect: "none" }}
        >
          {items.map((img, i) => (
            <div
              key={i}
              className="shrink-0 rounded-xl overflow-hidden shadow-md border border-border bg-white"
              style={{ width: CARD_W }}
            >
              <img
                src={img.src}
                alt={img.label}
                draggable={false}
                className="w-full object-cover"
                style={{ height: 340 }}
                loading="lazy"
              />
              <div className="px-3 py-2 text-xs font-medium text-muted-foreground text-center">
                {img.label}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

const TESTIMONIALS = [
  {
    text: "Meu filho agora pede para fazer as atividades todos os dias! É incrível ver a fé crescendo nele.",
    name: "Mariana S.",
    desc: "Mãe de 2 filhos",
    photo: "https://randomuser.me/api/portraits/women/72.jpg",
  },
  {
    text: "Criamos um momento com Deus aqui em casa. Simplesmente incrível! Nossa família mudou.",
    name: "Roberto L.",
    desc: "Pai",
    photo: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    text: "Simples e muito eficaz. Recomendo para todas as famílias cristãs! Vale cada centavo.",
    name: "Ana Paula M.",
    desc: "Mãe",
    photo: "https://randomuser.me/api/portraits/women/58.jpg",
  },
];

const CHECKBOXES = [
  { id: "learn", label: "Quero que meu filho aprenda o caminho de Deus" },
  { id: "values", label: "Quero ensinar valores cristãos desde cedo" },
  { id: "routine", label: "Quero criar uma rotina com Deus" },
  { id: "negative", label: "Quero diminuir influências negativas" },
  { id: "focus", label: "Quero que meu filho tenha mais foco e disciplina" },
];

const FAQS = [
  { q: "Como recebo meu acesso?", a: "Após o pagamento, você receberá um e-mail com as instruções de acesso imediatamente." },
  { q: "Preciso de internet para acessar?", a: "O plano essencial é enviado por e-mail em PDF, você pode imprimir e usar offline. O plano completo inclui acesso ao Drive." },
  { q: "As atividades são difíceis?", a: "Não! Todas as atividades foram desenvolvidas para serem simples e fáceis, perfeitas para crianças de qualquer nível." },
  { q: "Funciona para qualquer idade?", a: "Sim! As atividades são adaptáveis para crianças de 4 a 12 anos." },
  { q: "E se eu não gostar?", a: "Você tem 7 dias de garantia total. Se não ficar satisfeito, devolvemos 100% do seu dinheiro sem perguntas." },
  { q: "Preciso acompanhar meu filho?", a: "Recomendamos que sim, pois cria um momento especial em família. Mas as atividades são simples o suficiente para a criança fazer com pouca supervisão." },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: "easeOut" },
};

export default function Home() {
  const [checked, setChecked] = useState<Record<string, boolean>>({
    learn: false, values: false, routine: false, negative: false, focus: false,
  });
  const [upsellOpen, setUpsellOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const allChecked = CHECKBOXES.every((c) => checked[c.id]);
  const checkedCount = CHECKBOXES.filter((c) => checked[c.id]).length;

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const scrollToPricing = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ───── PROMO BANNER ───── */}
      <div
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(30,27,75,0.55)" : "hsl(228 58% 28%)",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          padding: scrolled ? "6px 16px" : "10px 16px",
        }}
      >
        <p className="text-center font-bold uppercase text-white/95 transition-all duration-500 truncate"
          style={{ fontSize: scrolled ? "9px" : "11px", letterSpacing: scrolled ? "0.12em" : "0.18em" }}>
          PROMOÇÃO APENAS NESSA PÁGINA
        </p>
      </div>

      {/* spacer for fixed banner */}
      <div className="h-10" />

      {/* ───── HERO ───── */}
      <section className="w-full px-4 pt-10 pb-16 flex flex-col items-center text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-border mb-8"
        >
          <div className="flex gap-0.5 text-amber-400">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
          </div>
          <span className="text-sm font-semibold text-foreground">+1.000 famílias impactadas</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.55 }}
          className="w-full max-w-xl mb-10"
        >
          <img
            src={productImage}
            alt="365 Atividades Bíblicas para Crianças"
            className="w-full h-auto drop-shadow-2xl rounded-2xl"
            loading="eager"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-foreground mb-5 max-w-3xl"
        >
          Ensine seu filho no caminho de Deus com 365 atividades bíblicas simples —{" "}
          <span className="text-primary font-serif italic">apenas 10 minutos por dia</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="text-base sm:text-lg text-muted-foreground mb-10 max-w-xl leading-relaxed"
        >
          Um plano prático para fortalecer a fé do seu filho, desenvolver bons valores e criar uma rotina com Deus desde cedo.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <Button
            size="lg"
            className="w-full h-14 text-base sm:text-lg rounded-full shadow-lg font-bold bg-primary hover:bg-primary/90 text-white"
            onClick={scrollToPricing}
            data-testid="button-hero-cta"
          >
            QUERO ENSINAR MEU FILHO COM DEUS
          </Button>
          <div className="flex flex-wrap justify-center gap-3 mt-5 text-xs sm:text-sm text-muted-foreground font-medium">
            <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /> Compra 100% segura</span>
            <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> Acesso imediato</span>
            <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Garantia de 7 dias</span>
          </div>
        </motion.div>
      </section>

      {/* ───── EMOTIONAL CONNECTION ───── */}
      <section className="w-full py-20 bg-primary/5 border-y border-primary/10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div {...fadeUp}>
            <Heart className="w-10 h-10 text-accent mx-auto mb-6" />
            <p className="text-xl sm:text-2xl md:text-3xl font-serif italic text-foreground leading-relaxed">
              "Em um mundo cheio de distrações e influências negativas… muitos pais têm se perguntado:
              como ensinar valores cristãos aos filhos desde cedo? A verdade é que não basta apenas falar…
              é preciso criar momentos diários com propósito."
            </p>
          </motion.div>
        </div>
      </section>

      {/* ───── SOLUTION ───── */}
      <section className="w-full py-20 px-4 bg-primary/3">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">Método 10 Minutos com Deus</h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-6" />
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Um sistema simples e prático que ajuda pais a ensinarem seus filhos no caminho de Deus
              através de atividades leves, educativas e com propósito espiritual.
            </p>
          </motion.div>

          {/* Steps row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {[
              { step: "01", icon: "🕐", title: "10 minutos por dia", desc: "Atividades curtas, pensadas para a rotina real das famílias" },
              { step: "02", icon: "📖", title: "Baseado na Bíblia", desc: "Cada atividade conecta a criança a um ensinamento bíblico" },
              { step: "03", icon: "✝️", title: "Resultado que fica", desc: "Fé e valores que crescem com a criança dia após dia" },
            ].map((s, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-border text-center"
              >
                <div className="text-3xl mb-3">{s.icon}</div>
                <span className="text-xs font-bold text-primary/50 tracking-widest uppercase">Passo {s.step}</span>
                <h3 className="text-base font-bold text-foreground mt-1 mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Two images side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden shadow-md"
            >
              <img
                src={kidImage}
                alt="Criança fazendo atividades bíblicas na mesa"
                className="w-full h-64 sm:h-72 object-cover"
                loading="lazy"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="rounded-2xl overflow-hidden shadow-md"
            >
              <img
                src={activitiesCollage}
                alt="Crianças explorando atividades bíblicas"
                className="w-full h-64 sm:h-72 object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───── LIFESTYLE PHRASES ───── */}
      <section className="w-full py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 flex flex-col gap-8 items-center text-center">
            {[
              {
                icon: "✝️",
                title: "Fé que cresce todo dia",
                text: "Cada atividade é uma semente plantada no coração do seu filho. Em apenas 10 minutos, você cria um momento eterno.",
                delay: 0.1,
              },
              {
                icon: "📖",
                title: "A Bíblia de um jeito simples",
                text: "Histórias, cruzadinhas e desafios que tornam a Palavra de Deus divertida, viva e inesquecível para as crianças.",
                delay: 0.25,
              },
              {
                icon: "🏠",
                title: "Um lar com propósito",
                text: "Pais que ensinam o caminho de Deus em casa constroem raízes que nenhuma influência do mundo consegue arrancar.",
                delay: 0.4,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: item.delay, ease: "easeOut" }}
                className="flex flex-col sm:flex-row gap-4 items-center lg:items-start"
              >
                <div className="text-3xl shrink-0">{item.icon}</div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.55 }}
            >
              <Button
                size="lg"
                className="h-13 px-8 text-sm sm:text-base font-bold rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg"
                onClick={scrollToPricing}
              >
                QUERO ESSA TRANSFORMAÇÃO
              </Button>
            </motion.div>
        </div>
      </section>

      {/* ───── ACTIVITY PREVIEW ───── */}
      <section className="w-full py-16 bg-white border-y border-border overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center mb-10">
          <motion.div {...fadeUp}>
            <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              Prévia das Atividades
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
              Veja como são as atividades
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
              Arraste ou use as setas para explorar uma amostra das 365 atividades bíblicas do seu filho.
            </p>
          </motion.div>
        </div>
        <motion.div {...fadeUp} transition={{ delay: 0.15 }}>
          <ActivityCarousel />
        </motion.div>
      </section>

      {/* ───── WHAT YOU GET + BENEFITS ───── */}
      <section className="w-full py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(228 58% 96%) 0%, hsl(40 88% 97%) 100%)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-20"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, hsl(228 58% 70%) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(40 88% 70%) 0%, transparent 45%)" }} />

        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="inline-block bg-white border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 shadow-sm">
              Tudo que você vai receber
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              Uma jornada completa de fé para seu filho
            </h2>
          </motion.div>

          {/* Receive cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            {[
              { icon: "📋", title: "365 Atividades", desc: "Prontas para imprimir, organizadas por dia do ano" },
              { icon: "📖", title: "Conteúdo Bíblico", desc: "Histórias, cruzadinhas e desafios da Palavra de Deus" },
              { icon: "🗓️", title: "Rotina Diária", desc: "10 minutos por dia constroem uma vida com Deus" },
              { icon: "✝️", title: "Valores Cristãos", desc: "Fé, amor, perdão e bondade ensinados com leveza" },
            ].map((card, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 text-center shadow-sm border border-white/80 hover:shadow-md transition-shadow duration-200"
              >
                <div className="text-4xl mb-3">{card.icon}</div>
                <h4 className="font-bold text-foreground mb-1 text-base">{card.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Benefits */}
          <motion.div {...fadeUp} className="bg-white rounded-2xl p-8 shadow-sm border border-white/80">
            <h3 className="text-xl font-bold text-foreground text-center mb-8 flex items-center justify-center gap-2">
              <HeartHandshake className="text-accent w-6 h-6" /> Benefícios para toda a família
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: "🌱", text: "Fortalece a fé desde cedo" },
                { icon: "🕊️", text: "Traz paz e propósito ao lar" },
                { icon: "❤️", text: "Aproxima pais e filhos" },
                { icon: "🎯", text: "Desenvolve disciplina e foco" },
                { icon: "🛡️", text: "Protege de influências negativas" },
                { icon: "🙏", text: "Cria uma rotina com Deus" },
              ].map((b, i) => (
                <motion.div
                  key={i}
                  {...fadeUp}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-primary/4 border border-primary/10"
                >
                  <span className="text-2xl shrink-0">{b.icon}</span>
                  <span className="text-sm font-medium text-foreground/85">{b.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───── FOR WHOM ───── */}
      <section className="w-full py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 border border-primary/20">
              ✝️ PARA QUEM É
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              O 365 Atividades Bíblicas para Crianças é para{" "}
              <span className="text-primary">você?</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            {/* Yes card */}
            <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
              <Card className="h-full bg-green-50 border-green-200 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg font-bold text-green-800">
                    ✅ É para você se...
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      "Você quer ensinar seu filho no caminho de Deus desde cedo",
                      "Você deseja fortalecer valores cristãos dentro de casa",
                      "Você busca atividades prontas, educativas e com propósito",
                      "Você quer criar uma rotina com Deus em família",
                      "Você procura uma forma simples de aproximar seu filho da Palavra",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-green-900 text-sm">
                        <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* No card */}
            <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
              <Card className="h-full bg-red-50 border-red-200 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg font-bold text-red-800">
                    ❌ NÃO é para você se...
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      "Você procura apenas um passatempo sem propósito",
                      "Você não valoriza princípios cristãos na educação infantil",
                      "Você espera resultado sem participar da rotina da criança",
                      "Você não quer dedicar alguns minutos por dia ao seu filho",
                      "Você busca um material sem base bíblica",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-red-900 text-sm">
                        <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div {...fadeUp} transition={{ delay: 0.3 }} className="flex justify-center">
            <Button
              className="h-14 px-6 text-xs sm:text-sm md:text-base font-bold bg-primary hover:bg-primary/90 text-white shadow-lg rounded-full w-full sm:w-auto"
              onClick={scrollToPricing}
            >
              QUERO COMEÇAR A JORNADA COM DEUS AGORA
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ───── TESTIMONIALS ───── */}
      <section className="w-full py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4">
          <motion.h2 {...fadeUp} className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Famílias transformadas
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }}>
                <Card className="h-full bg-white border-border shadow-sm flex flex-col">
                  <CardContent className="pt-6 flex-1">
                    <div className="flex gap-0.5 text-amber-400 mb-3">
                      {[...Array(5)].map((_, s) => <Star key={s} className="w-4 h-4 fill-current" />)}
                    </div>
                    <CardDescription className="text-base text-foreground/80 italic leading-relaxed">
                      "{t.text}"
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="flex items-center gap-3 pt-0 pb-5 px-6">
                    <img
                      src={t.photo}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                      loading="lazy"
                    />
                    <div>
                      <p className="font-bold text-foreground text-sm">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.desc}</p>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── INTERACTIVE CHECKBOXES ───── */}
      <section className="w-full py-20 bg-primary/5 border-y border-primary/10">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div {...fadeUp} className="bg-white rounded-2xl p-6 sm:p-10 shadow-md border border-border">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                O que você quer para o futuro do seu filho?
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                Marque todas as opções para desbloquear o acesso especial
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {CHECKBOXES.map((item) => {
                const isChecked = checked[item.id];
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggle(item.id)}
                    data-testid={`checkbox-${item.id}`}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left cursor-pointer select-none transition-colors duration-75 ${
                      isChecked
                        ? "bg-primary/8 border-primary/40"
                        : "bg-background border-border hover:border-primary/30"
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 border-2 transition-colors duration-75 ${
                        isChecked ? "bg-primary border-primary" : "bg-white border-muted-foreground/40"
                      }`}
                    >
                      {isChecked && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                    </span>
                    <span className="text-sm sm:text-base font-medium text-foreground leading-snug">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Progress indicator */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                <span>{checkedCount} de {CHECKBOXES.length} marcadas</span>
                {allChecked && <span className="text-primary font-semibold">Completo!</span>}
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${(checkedCount / CHECKBOXES.length) * 100}%` }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {allChecked ? (
                <motion.div
                  key="btn"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                >
                  <Button
                    size="lg"
                    className="w-full min-h-14 h-auto py-4 text-xs sm:text-sm md:text-base rounded-full font-bold bg-primary hover:bg-primary/90 text-white shadow-lg leading-tight whitespace-normal"
                    onClick={scrollToPricing}
                    data-testid="button-checkbox-cta"
                  >
                    QUERO COMEÇAR A JORNADA COM DEUS AGORA
                  </Button>
                </motion.div>
              ) : (
                <motion.p
                  key="hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-sm text-muted-foreground py-3"
                >
                  Marque todas as opções acima para continuar…
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ───── PRICING ───── */}
      <section id="pricing" className="w-full py-20 bg-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 20% 50%, hsl(228 58% 60%), transparent 60%), radial-gradient(ellipse at 80% 30%, hsl(40 88% 55%), transparent 55%)" }}
        />
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
              Escolha o melhor plano para sua família
            </h2>
            <p className="text-white/60 text-sm sm:text-base">Oferta especial por tempo limitado</p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-6 items-stretch">
            {/* Basic Plan */}
            <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="flex-1">
              <Card className="h-full bg-white/15 border border-white/30 text-white backdrop-blur-sm flex flex-col">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg sm:text-xl font-bold text-white/90">
                    PLANO ESSENCIAL COM DEUS
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 space-y-5">
                  <div className="text-4xl font-bold text-white">
                    <span className="text-lg text-white/50 font-normal">R$ </span>9,99
                  </div>
                  <ul className="space-y-3">
                    {[
                      { label: "365 atividades bíblicas", included: true },
                      { label: "Entrega via e-mail", included: true },
                      { label: "Suporte por e-mail", included: true },
                      { label: "Cartões bíblicos", included: false },
                      { label: "Rotina cristã infantil", included: false },
                      { label: "21 histórias bíblicas", included: false },
                      { label: "Guia para pais", included: false },
                      { label: "Vídeos animados cristãos", included: false },
                      { label: "Músicas infantis cristãs", included: false },
                      { label: "Entrega via Drive + Email + WhatsApp", included: false },
                      { label: "Grupo VIP", included: false },
                      { label: "Suporte prioritário", included: false },
                    ].map((f, i) => (
                      <li key={i} className={`flex items-center gap-3 text-sm ${f.included ? "text-white/75" : "text-white/40"}`}>
                        {f.included
                          ? <Check className="w-4 h-4 text-primary shrink-0" />
                          : <X className="w-4 h-4 text-red-500 shrink-0" />
                        }
                        <span className={f.included ? "" : "line-through"}>{f.label}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full h-12 font-bold bg-transparent border-white/25 text-white hover:bg-white/10 hover:text-white text-sm"
                    onClick={() => setUpsellOpen(true)}
                    data-testid="button-plan-basic"
                  >
                    QUERO COMEÇAR COM O ESSENCIAL
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Premium Plan */}
            <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="flex-1">
              <Card className="h-full bg-white border-0 shadow-2xl flex flex-col relative pt-8">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap shadow-md">
                  ⭐ Mais escolhido
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg sm:text-xl font-bold text-foreground">
                    PLANO JORNADA COM DEUS 365
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 space-y-5">
                  <div className="text-4xl font-bold text-foreground">
                    <span className="text-lg text-muted-foreground font-normal">R$ </span>27,00
                  </div>
                  <ul className="space-y-2.5">
                    {[
                      "365 atividades bíblicas",
                      "Cartões bíblicos",
                      "Rotina cristã infantil",
                      "21 histórias bíblicas",
                      "Guia para pais",
                      "Vídeos animados cristãos",
                      "Músicas infantis cristãs",
                      "Entrega via Drive + Email + WhatsApp",
                      "Grupo VIP",
                      "Suporte prioritário",
                    ].map((f, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-foreground/80 text-sm">
                        <Check className="w-4 h-4 text-primary shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full h-14 text-base font-bold bg-primary hover:bg-primary/90 text-white shadow-lg rounded-full"
                    data-testid="button-plan-premium"
                    onClick={() => window.open("https://pay.wiapy.com/AQ_Ja7ZrqE", "_blank")}
                  >
                    QUERO O COMPLETO AGORA
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───── BONUSES ───── */}
      <section className="w-full py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, hsl(228 58% 12%) 0%, hsl(228 58% 22%) 100%)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-15"
          style={{ backgroundImage: "radial-gradient(circle at 80% 20%, hsl(40 88% 60%) 0%, transparent 50%)" }} />

        <div className="max-w-5xl mx-auto px-4 relative z-10">
          {/* Header */}
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="inline-block bg-accent/20 text-accent text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border border-accent/30">
              🎁 Exclusivo no Plano Completo
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
              Bônus que valem muito — e são seus de graça
            </h2>
            <p className="text-white/60 text-base max-w-xl mx-auto">
              Ao escolher o Plano Jornada com Deus 365, você recebe todos esses bônus sem pagar nada a mais.
            </p>
          </motion.div>

          {/* Bonus cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {[
              { img: bonus1, num: "01", name: "Cartões Bíblicos para Memorização", original: 67 },
              { img: bonus2, num: "02", name: "Rotina Cristã Infantil", original: 47 },
              { img: bonus3, num: "03", name: "21 Histórias Bíblicas Ilustradas", original: 35 },
              { img: bonus4, num: "04", name: "Guia para Pais", original: 55 },
            ].map((b, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col backdrop-blur-sm hover:bg-white/10 transition-colors duration-200"
              >
                <div className="relative">
                  <img
                    src={b.img}
                    alt={b.name}
                    className="w-full aspect-[3/4] object-cover object-top"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-accent text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                    BÔNUS {b.num}
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1 items-center text-center gap-2">
                  <p className="text-white font-semibold text-sm leading-snug">{b.name}</p>
                  <div className="mt-auto flex flex-col items-center gap-0.5">
                    <span className="text-white/40 text-xs line-through">De R$ {b.original},00</span>
                    <span className="text-green-400 font-bold text-lg">GRÁTIS 🎉</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Total value banner */}
          <motion.div
            {...fadeUp}
            className="rounded-2xl border border-accent/40 bg-accent/10 px-6 py-5 flex flex-col sm:flex-row items-center justify-center gap-3 text-center"
          >
            <span className="text-3xl">🏆</span>
            <p className="text-white font-bold text-lg sm:text-xl">
              São <span className="text-accent text-2xl">R$ 204,00</span> em bônus exclusivos —{" "}
              <span className="text-green-400">tudo incluso no seu plano!</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ───── WHATSAPP DELIVERY ───── */}
      <section className="w-full py-16 bg-white border-b border-border">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div {...fadeUp} className="rounded-2xl overflow-hidden shadow-lg border border-green-100">
            <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-5 flex items-center gap-4">
              <div className="w-12 h-12 shrink-0">
                <img src={whatsappIcon} alt="WhatsApp" className="w-full h-full object-contain drop-shadow-md" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Acesso direto no seu WhatsApp</h3>
                <p className="text-green-100 text-sm">Plano Jornada com Deus 365 — Entrega imediata</p>
              </div>
            </div>
            <div className="bg-green-50 px-6 py-6">
              <p className="text-foreground/80 text-base leading-relaxed mb-5">
                Após a confirmação do pagamento, você receberá <strong>todos os materiais diretamente no WhatsApp</strong> — sem complicação, sem espera. É só acessar e começar com seu filho!
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { icon: "⚡", label: "Acesso imediato", desc: "Em minutos após o pagamento" },
                  { icon: "📱", label: "Via WhatsApp", desc: "Tudo no seu celular" },
                  { icon: "🔁", label: "Acesso vitalício", desc: "Baixe quando quiser" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-green-100">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="font-bold text-foreground text-sm">{item.label}</p>
                      <p className="text-muted-foreground text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───── GUARANTEE ───── */}
      <section className="w-full py-16 bg-white border-b border-border">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div {...fadeUp} className="flex flex-col sm:flex-row items-center gap-8 bg-amber-50 rounded-2xl p-8 border border-amber-100 shadow-sm">
            <img
              src={guaranteeBadge}
              alt="7 dias de garantia — 100% dinheiro de volta"
              className="w-36 h-36 object-contain shrink-0 drop-shadow-md"
              loading="lazy"
            />
            <div className="text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Garantia Incondicional de 7 Dias</h2>
              <p className="text-base text-foreground/75 leading-relaxed">
                Se por qualquer motivo você não ficar satisfeito, devolvemos <strong>100% do seu dinheiro</strong> sem perguntas dentro de 7 dias. Você tem risco zero — a decisão é totalmente segura.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───── FAQ ───── */}
      <section className="w-full py-20 bg-background">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Perguntas Frequentes</h2>
            <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
          </motion.div>
          <motion.div {...fadeUp}>
            <Accordion type="single" collapsible className="w-full bg-white rounded-2xl shadow-sm border border-border divide-y divide-border">
              {FAQS.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-0 px-5">
                  <AccordionTrigger className="text-sm sm:text-base font-semibold text-foreground hover:text-primary py-5 text-left no-underline hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm sm:text-base text-muted-foreground pb-5 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* ───── FINAL CTA ───── */}
      <section className="w-full py-20 bg-primary/5 border-t border-primary/10 text-center px-4">
        <motion.div {...fadeUp} className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8 leading-tight">
            Chegou a hora de investir na <span className="text-primary">fé do seu filho</span>
          </h2>
          <Button
            size="lg"
            className="w-full max-w-sm mx-auto h-14 px-6 text-sm sm:text-base font-bold rounded-full shadow-xl bg-primary hover:bg-primary/90 text-white leading-tight"
            onClick={scrollToPricing}
            data-testid="button-final-cta"
          >
            COMEÇAR A JORNADA COM DEUS AGORA
          </Button>
          <p className="mt-5 text-xs sm:text-sm text-muted-foreground flex items-center justify-center gap-1.5">
            <Lock className="w-3.5 h-3.5" /> Pagamento seguro via Pix ou Cartão
          </p>
        </motion.div>
      </section>

      {/* ───── FOOTER ───── */}
      <footer className="w-full bg-foreground text-white/50 py-6 px-4">
        <p className="text-center text-xs whitespace-nowrap overflow-hidden text-ellipsis">
          © 2026 365 Atividades Bíblicas — Todos os direitos reservados &nbsp;|&nbsp; <Lock className="w-3 h-3 inline-block align-middle" /> Ambiente 100% seguro e criptografado
        </p>
      </footer>

      {/* ───── UPSELL POPUP ───── */}
      <Dialog open={upsellOpen} onOpenChange={setUpsellOpen}>
        <DialogContent className="max-w-sm w-[calc(100%-2rem)] rounded-2xl overflow-hidden p-0 border-0 shadow-2xl">
          <div className="bg-accent px-6 py-7 text-center">
            <DialogTitle className="text-xl font-bold text-white mb-1">
              Espere! Libere o acesso completo com desconto
            </DialogTitle>
            <DialogDescription className="text-white/85 text-sm">
              Por apenas mais R$10 você leva todos os bônus
            </DialogDescription>
          </div>
          <div className="p-6 bg-white">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-foreground mb-1">R$ 19,99</div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Plano Completo Especial</p>
            </div>
            <div className="space-y-3">
              <Button
                className="w-full h-13 text-base font-bold bg-primary hover:bg-primary/90 text-white rounded-full shadow-md"
                onClick={() => { setUpsellOpen(false); window.open("https://pay.wiapy.com/tX_Emu4qJ", "_blank"); }}
                data-testid="button-upsell-yes"
              >
                SIM, QUERO O COMPLETO
              </Button>
              <Button
                variant="ghost"
                className="w-full h-11 text-muted-foreground hover:text-foreground text-sm rounded-full"
                onClick={() => { setUpsellOpen(false); window.open("https://pay.wiapy.com/TlMWwbG9az", "_blank"); }}
                data-testid="button-upsell-no"
              >
                Não, continuar com o Essencial
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}
