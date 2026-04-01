import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Star, Lock, Zap, Shield, Heart, HeartHandshake, CheckCircle2, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import productImage from "@assets/Gemini_Generated_Image_sc4dwfsc4dwfsc4d-removebg-preview_1775067577891.png";

export default function Home() {
  const [checkboxes, setCheckboxes] = useState({
    learn: false,
    values: false,
    routine: false,
    negative: false,
    focus: false,
  });
  const [allChecked, setAllChecked] = useState(false);
  const [upsellOpen, setUpsellOpen] = useState(false);
  useEffect(() => {
    const all = Object.values(checkboxes).every((v) => v);
    setAllChecked(all);
  }, [checkboxes]);

  const handleCheckout = (plan: string) => {
    // In a real app this would go to checkout
    console.log("Proceeding to checkout with plan:", plan);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] font-sans selection:bg-primary selection:text-white overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 mb-8"
        >
          <div className="flex gap-1 text-yellow-400">
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
          </div>
          <span className="text-sm font-medium text-gray-700">Mais de 1.000 famílias impactadas</span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10 w-full max-w-2xl"
        >
          <img 
            src={productImage} 
            alt="365 Atividades Bíblicas" 
            className="w-full h-auto drop-shadow-2xl rounded-2xl"
          />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#2C3E35] mb-6 leading-tight max-w-4xl"
        >
          Ensine seu filho no caminho de Deus com 365 atividades bíblicas simples — <span className="text-primary italic font-serif">apenas 10 minutos por dia</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed"
        >
          Um plano prático para fortalecer a fé do seu filho, desenvolver bons valores e criar uma rotina com Deus desde cedo.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-md"
        >
          <Button 
            size="lg" 
            className="w-full text-lg h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90 text-white font-semibold"
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
          >
            QUERO ENSINAR MEU FILHO COM DEUS
          </Button>
          
          <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-gray-500 font-medium">
            <span className="flex items-center gap-1.5"><Lock className="w-4 h-4" /> Compra 100% segura</span>
            <span className="flex items-center gap-1.5"><Zap className="w-4 h-4" /> Acesso imediato</span>
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4" /> Garantia de 7 dias</span>
          </div>
        </motion.div>
      </section>

      {/* 2. EMOTIONAL CONNECTION SECTION */}
      <section className="py-24 bg-white/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div {...fadeInUp}>
            <Heart className="w-12 h-12 text-accent mx-auto mb-8 opacity-80" />
            <p className="text-2xl md:text-3xl font-serif text-[#2C3E35] leading-relaxed italic">
              "Em um mundo cheio de distrações e influências negativas… muitos pais têm se perguntado: como ensinar valores cristãos aos filhos desde cedo? A verdade é que não basta apenas falar… é preciso criar momentos diários com propósito."
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. SOLUTION SECTION */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E35] mb-4">Método 10 Minutos com Deus</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-8"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Um sistema simples e prático que ajuda pais a ensinarem seus filhos no caminho de Deus através de atividades leves, educativas e com propósito espiritual.
          </p>
        </motion.div>
      </section>

      {/* 4 & 5. WHAT YOU GET & BENEFITS SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-20">
          <motion.div {...fadeInUp}>
            <h3 className="text-2xl font-bold text-[#2C3E35] mb-8 flex items-center gap-3">
              <CheckCircle2 className="text-primary w-8 h-8" /> O que você vai receber
            </h3>
            <ul className="space-y-6">
              {[
                "365 atividades bíblicas prontas para imprimir",
                "Organização por dias",
                "Fácil aplicação",
                "Conteúdo educativo e cristão"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-full mt-1">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-lg text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
            <h3 className="text-2xl font-bold text-[#2C3E35] mb-8 flex items-center gap-3">
              <HeartHandshake className="text-accent w-8 h-8" /> Benefícios
            </h3>
            <ul className="space-y-6">
              {[
                "Fortalece a fé desde cedo",
                "Ensina valores cristãos",
                "Cria rotina com Deus",
                "Aproxima pais e filhos",
                "Desenvolve disciplina e foco"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="bg-accent/10 p-2 rounded-full mt-1">
                    <Star className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-lg text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* 6. TESTIMONIALS SECTION */}
      <section className="py-24 bg-[#FAFAF7]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 {...fadeInUp} className="text-3xl md:text-4xl font-bold text-center text-[#2C3E35] mb-16">
            Famílias transformadas
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: "Meu filho agora pede para fazer as atividades todos os dias!",
                name: "Mariana S.",
                desc: "Mãe de 2 filhos",
                initials: "MS"
              },
              {
                text: "Criamos um momento com Deus aqui em casa. Simplesmente incrível!",
                name: "Roberto L.",
                desc: "Pai",
                initials: "RL"
              },
              {
                text: "Simples e muito eficaz. Recomendo para todas as famílias cristãs!",
                name: "Ana Paula M.",
                desc: "Mãe",
                initials: "AM"
              }
            ].map((testimonial, i) => (
              <motion.div 
                key={i} 
                {...fadeInUp} 
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-none shadow-lg bg-white relative">
                  <div className="absolute -top-4 -left-4 text-4xl text-accent opacity-30 font-serif">"</div>
                  <CardHeader>
                    <div className="flex gap-1 text-yellow-400 mb-4">
                      {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-current" />)}
                    </div>
                    <CardDescription className="text-lg font-medium text-gray-800 italic">
                      "{testimonial.text}"
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex items-center gap-4 mt-auto">
                    <Avatar className="w-10 h-10 bg-primary/20">
                      <AvatarFallback className="text-primary font-bold">{testimonial.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-[#2C3E35] text-sm">{testimonial.name}</p>
                      <p className="text-xs text-gray-500">{testimonial.desc}</p>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. INTERACTIVE CHECKBOX SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div {...fadeInUp} className="bg-[#FAFAF7] rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#2C3E35] mb-3">O que você quer para o futuro do seu filho?</h2>
              <p className="text-gray-600">Marque todas as opções para desbloquear o acesso especial</p>
            </div>

            <div className="space-y-4 mb-10">
              {[
                { id: "learn", label: "Quero que meu filho aprenda o caminho de Deus" },
                { id: "values", label: "Quero ensinar valores cristãos desde cedo" },
                { id: "routine", label: "Quero criar uma rotina com Deus" },
                { id: "negative", label: "Quero diminuir influências negativas" },
                { id: "focus", label: "Quero que meu filho tenha mais foco e disciplina" }
              ].map((item) => (
                <div 
                  key={item.id}
                  className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 border cursor-pointer ${
                    checkboxes[item.id as keyof typeof checkboxes] 
                      ? "bg-primary/5 border-primary/30" 
                      : "bg-white border-gray-200 hover:border-primary/30"
                  }`}
                  onClick={() => setCheckboxes(prev => ({ ...prev, [item.id]: !prev[item.id as keyof typeof checkboxes] }))}
                >
                  <Checkbox 
                    id={item.id} 
                    checked={checkboxes[item.id as keyof typeof checkboxes]}
                    onCheckedChange={(checked) => {
                      setCheckboxes(prev => ({ ...prev, [item.id]: !!checked }));
                    }}
                    className="w-6 h-6 rounded-md data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <label 
                    htmlFor={item.id}
                    className="text-base md:text-lg font-medium text-gray-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {item.label}
                  </label>
                </div>
              ))}
            </div>

            <div className="h-20 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {allChecked ? (
                  <motion.div
                    key="button"
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -10 }}
                    className="w-full"
                  >
                    <Button 
                      size="lg" 
                      className="w-full text-lg h-16 rounded-full shadow-xl bg-primary hover:bg-primary/90 text-white font-bold"
                      onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      QUERO COMEÇAR A JORNADA COM DEUS AGORA
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center text-gray-400 font-medium"
                  >
                    Complete as opções acima para continuar...
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 8. PRICING SECTION */}
      <section id="pricing" className="py-24 bg-[#2C3E35] relative overflow-hidden">
        {/* Abstract background blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Escolha o melhor plano para sua família</h2>
            <p className="text-gray-300 text-lg">Oferta especial por tempo limitado</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto items-center">
            {/* Basic Plan */}
            <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
              <Card className="bg-white/5 border-white/10 text-white shadow-none backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-100">PLANO ESSENCIAL COM DEUS</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-4xl font-bold">
                    <span className="text-xl text-gray-400 font-normal">R$</span> 9,99
                  </div>
                  <ul className="space-y-4">
                    {[
                      "365 atividades bíblicas",
                      "Entrega via e-mail",
                      "Suporte por e-mail"
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-300">
                        <Check className="w-5 h-5 text-primary" /> {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full h-14 text-base font-bold bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white"
                    onClick={() => setUpsellOpen(true)}
                  >
                    QUERO COMEÇAR COM O ESSENCIAL
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Premium Plan */}
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              <Card className="bg-white border-primary shadow-2xl relative transform md:-translate-y-4">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white px-6 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider shadow-md">
                  Mais escolhido
                </div>
                <CardHeader className="pt-8">
                  <CardTitle className="text-2xl font-bold text-[#2C3E35]">PLANO JORNADA COM DEUS 365</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-5xl font-bold text-[#2C3E35]">
                    <span className="text-2xl text-gray-500 font-normal">R$</span> 27,00
                  </div>
                  <ul className="space-y-3">
                    {[
                      "365 atividades bíblicas",
                      "Cartões bíblicos",
                      "Rotina cristã infantil",
                      "21 histórias bíblicas",
                      "Guia para pais",
                      "🎥 Vídeos animados cristãos",
                      "🎵 Músicas infantis cristãs",
                      "Entrega via Drive + Email + WhatsApp",
                      "Grupo VIP",
                      "Suporte prioritário"
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                        <Check className="w-5 h-5 text-primary shrink-0" /> {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full h-16 text-lg font-bold bg-primary hover:bg-primary/90 text-white shadow-xl rounded-full"
                    onClick={() => handleCheckout('premium')}
                  >
                    QUERO O COMPLETO AGORA
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 10. GUARANTEE SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div {...fadeInUp} className="flex flex-col items-center">
            <div className="w-24 h-24 bg-[#FAFAF7] rounded-full flex items-center justify-center mb-6 shadow-sm border border-gray-100">
              <Shield className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-[#2C3E35] mb-4">Garantia Incondicional de 7 Dias</h2>
            <p className="text-xl text-gray-600">
              Se não gostar, devolvemos seu dinheiro sem perguntas. Você tem acesso imediato e risco zero.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 11. FAQ SECTION */}
      <section className="py-24 bg-[#FAFAF7]">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E35] mb-4">Perguntas Frequentes</h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
          </motion.div>

          <motion.div {...fadeInUp}>
            <Accordion type="single" collapsible className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
              {[
                {
                  q: "Como recebo meu acesso?",
                  a: "Após o pagamento, você receberá um e-mail com as instruções de acesso imediatamente."
                },
                {
                  q: "Preciso de internet para acessar?",
                  a: "O plano essencial é enviado por e-mail em PDF, você pode imprimir e usar offline. O plano completo inclui acesso ao Drive."
                },
                {
                  q: "As atividades são difíceis?",
                  a: "Não! Todas as atividades foram desenvolvidas para serem simples e fáceis, perfeitas para crianças."
                },
                {
                  q: "Funciona para qualquer idade?",
                  a: "Sim! As atividades são adaptáveis para crianças de 4 a 12 anos."
                },
                {
                  q: "E se eu não gostar?",
                  a: "Você tem 7 dias de garantia total. Se não ficar satisfeito, devolvemos 100% do seu dinheiro."
                },
                {
                  q: "Preciso acompanhar meu filho?",
                  a: "Recomendamos que sim, pois cria um momento especial em família. Mas as atividades são simples o suficiente para a criança fazer com pouca supervisão."
                }
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b-0 px-4">
                  <AccordionTrigger className="text-lg font-medium text-[#2C3E35] hover:text-primary py-6 text-left">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 text-base pb-6 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* 12. FINAL CTA SECTION */}
      <section className="py-24 bg-white text-center px-6">
        <motion.div {...fadeInUp} className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C3E35] mb-8 leading-tight">
            Chegou a hora de investir na <span className="text-primary">fé do seu filho</span>
          </h2>
          <Button 
            size="lg" 
            className="h-20 px-8 md:px-12 text-xl font-bold rounded-full shadow-2xl bg-primary hover:bg-primary/90 text-white w-full md:w-auto"
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
          >
            QUERO COMEÇAR A JORNADA COM DEUS AGORA
          </Button>
          <p className="mt-6 text-sm text-gray-500 font-medium flex items-center justify-center gap-2">
            <Lock className="w-4 h-4" /> Pagamento seguro via Pix ou Cartão
          </p>
        </motion.div>
      </section>

      {/* 9. UPSELL POPUP */}
      <Dialog open={upsellOpen} onOpenChange={setUpsellOpen}>
        <DialogContent className="sm:max-w-md rounded-3xl overflow-hidden p-0 border-0">
          <div className="bg-accent p-6 text-center text-white">
            <DialogTitle className="text-2xl font-bold mb-2">Espere! Libere o acesso completo com desconto</DialogTitle>
            <DialogDescription className="text-white/90 text-lg">
              Por apenas mais R$10 você leva todos os bônus
            </DialogDescription>
          </div>
          
          <div className="p-8 bg-white">
            <div className="text-center mb-8">
              <div className="text-5xl font-bold text-[#2C3E35] mb-2">R$ 19,99</div>
              <p className="text-gray-500 font-medium uppercase tracking-widest text-sm">Plano Completo Especial</p>
            </div>

            <div className="space-y-4">
              <Button 
                className="w-full h-16 text-lg font-bold bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg"
                onClick={() => {
                  setUpsellOpen(false);
                  handleCheckout('upsell');
                }}
              >
                SIM, QUERO O COMPLETO
              </Button>
              
              <Button 
                variant="ghost"
                className="w-full h-12 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
                onClick={() => {
                  setUpsellOpen(false);
                  handleCheckout('basic');
                }}
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
