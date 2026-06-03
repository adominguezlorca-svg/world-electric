import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Zap, Shield, Lightbulb, Cpu, Wind, Flame, Network, Building2, Factory, Home as HomeIcon, HardHat,
  Award, Headphones, CheckCircle2, ArrowRight, Phone, Mail, MapPin, Clock, ChevronRight, ChevronLeft, Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { EmailPicker } from "@/components/email-picker";
import { GradientCard } from "@/components/ui/gradient-card";
import { TestimonialsSection } from "@/components/testimonials-section";
import { Lightning } from "@/components/ui/lightning";
import { ImageAutoSlider } from "@/components/ui/image-auto-slider";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <WhyUs />
      <TestimonialsSection />
      <QuoteWizard />
      <Contact />
      <Toaster richColors position="top-center" />
    </>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <section className="relative overflow-hidden bg-[#05070d] text-white">
      {/* Lightning WebGL background */}
      <div className="absolute inset-0">
        <Lightning hue={220} speed={1.1} intensity={1} size={1.2} />
      </div>
      {/* Vignettes */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05070d]/40 via-transparent to-[#05070d]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#05070d_85%)]" />
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-28 md:py-36">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur px-3 py-1 text-xs font-semibold text-accent uppercase tracking-wider">
            <Zap className="h-3.5 w-3.5" fill="currentColor" /> Instaladora Autorizada Junta de Andalucía
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
            Instalaciones Eléctricas Profesionales y{" "}
            <span className="text-accent">Sistemas de Seguridad</span> Avanzados
          </h1>
          <p className="mt-6 text-lg text-white/80 max-w-2xl">
            Más de 20 años de experiencia como Instaladora Autorizada en Sevilla y toda España.
            Proyectos industriales, comerciales y domésticos con máxima garantía.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button size="lg" onClick={() => scrollTo("presupuesto")} className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30">
              Solicitar Presupuesto Gratuito <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollTo("servicios")} className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white">
              Ver Nuestros Servicios
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- STATS ---------- */
function Stats() {
  const items = [
    { value: 20, suffix: "+", label: "Años de Experiencia", icon: Award },
    { value: 500, suffix: "+", label: "Proyectos Completados", icon: CheckCircle2 },
    { value: 100, suffix: "%", label: "Instalador Autorizado", icon: Shield },
    { value: 24, suffix: "/7", label: "Soporte Técnico Especializado", icon: Headphones },
  ];
  return (
    <section className="bg-secondary text-secondary-foreground py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        {items.map((it) => (
          <Counter key={it.label} {...it} />
        ))}
      </div>
    </section>
  );
}

function Counter({ value, suffix, label, icon: Icon }: { value: number; suffix: string; label: string; icon: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const dur = 1500;
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min((t - t0) / dur, 1);
          setN(Math.floor(value * (0.5 - Math.cos(p * Math.PI) / 2)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);
  return (
    <div ref={ref} className="text-center">
      <Icon className="h-8 w-8 mx-auto text-accent" />
      <div className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
        {n}<span className="text-accent">{suffix}</span>
      </div>
      <p className="mt-2 text-sm text-white/70">{label}</p>
    </div>
  );
}

/* ---------- SERVICES ---------- */
function Services() {
  return (
    <section id="servicios" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Nuestros Servicios</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-secondary">Soluciones para cada proyecto</h2>
          <p className="mt-4 text-muted-foreground">Cubrimos todo el ciclo, desde el diseño hasta la puesta en marcha y mantenimiento.</p>
        </div>
      </div>
      <div className="mt-14">
        <ImageAutoSlider />
      </div>
    </section>
  );
}

/* ---------- QUIÉNES SOMOS / POR QUÉ ELEGIRNOS ---------- */
function WhyUs() {
  const items = [
    {
      icon: Award,
      title: "Instaladora Autorizada",
      description: "Acreditados por la Junta de Andalucía con todas las garantías legales y certificaciones oficiales.",
      badgeText: "Certificación oficial",
      badgeColor: "#F59E0B",
      gradient: "gold" as const,
    },
    {
      icon: Shield,
      title: "Seguridad Total",
      description: "Cumplimos al 100% con la normativa REBT y los más altos estándares de seguridad en cada instalación.",
      badgeText: "Normativa REBT",
      badgeColor: "#2563EB",
      gradient: "blue" as const,
    },
    {
      icon: Headphones,
      title: "Trato de Primera Mano",
      description: "Sin intermediarios. Atención directa, personal y cercana del equipo técnico en cada proyecto.",
      badgeText: "Sin intermediarios",
      badgeColor: "#475569",
      gradient: "slate" as const,
    },
    {
      icon: CheckCircle2,
      title: "Mejora Continua",
      description: "Formación constante y tecnologías de última generación al servicio del cliente y la eficiencia.",
      badgeText: "Innovación",
      badgeColor: "#10B981",
      gradient: "emerald" as const,
    },
  ];
  return (
    <section id="quienes-somos" className="py-24 bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left column — Quiénes somos */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Quiénes Somos</span>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary leading-tight">
              Más de 20 años liderando instalaciones eléctricas en toda España
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Empresa con sede en <strong className="text-secondary">Sevilla</strong>, operando en toda España. Somos <strong className="text-secondary">Instaladora Autorizada</strong>, expertos en montaje e instalación de sistemas eléctricos y de seguridad, tanto a nivel industrial como doméstico.
              </p>
              <p>
                Trabajamos en obras de gran envergadura con total profesionalidad: edificios de viviendas, centros comerciales, locales comerciales, todo tipo de iluminaciones y provisionales de obra.
              </p>
              <p>
                Comprometidos exclusivamente con su seguridad, nuestro equipo cuenta con una amplia experiencia de más de 20 años en el sector. Nos caracterizamos por tener <strong className="text-secondary">contacto de primera mano</strong> con el cliente para atender cualquier necesidad.
              </p>
              <p>
                Nuestro compromiso se basa en la <strong className="text-secondary">mejora continua</strong> para lograr la máxima satisfacción de nuestros clientes, ofreciendo un servicio óptimo y de calidad.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
                <Users className="h-5 w-5" />
              </div>
              <div className="text-sm">
                <p className="font-semibold text-secondary">Equipo World Electric</p>
                <p className="text-muted-foreground">Sevilla · Toda España</p>
              </div>
            </div>
          </div>

          {/* Right column — Por qué elegirnos cards */}
          <div className="lg:col-span-7">
            <div className="mb-8">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Por Qué Elegirnos</span>
              <h3 className="mt-2 text-2xl md:text-3xl font-bold text-secondary leading-tight">
                Compromiso, confianza y profesionalidad
              </h3>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {items.map((it) => (
                <GradientCard
                  key={it.title}
                  icon={it.icon}
                  title={it.title}
                  description={it.description}
                  badgeText={it.badgeText}
                  badgeColor={it.badgeColor}
                  gradient={it.gradient}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- QUOTE WIZARD ---------- */
function QuoteWizard() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    projectType: "",
    service: "",
    name: "", phone: "", email: "", province: "", message: "",
    privacy: false,
  });
  const update = (k: string, v: any) => setData((d) => ({ ...d, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.privacy) { toast.error("Debes aceptar la Política de Privacidad."); return; }
    if (!data.name || !data.phone || !data.email) { toast.error("Completa los datos de contacto."); return; }
    toast.success("¡Solicitud enviada! Te contactaremos en menos de 24h.");
    setData({ projectType: "", service: "", name: "", phone: "", email: "", province: "", message: "", privacy: false });
    setStep(1);
  };

  const projectTypes = [
    { id: "residencial", label: "Residencial", icon: HomeIcon },
    { id: "industrial", label: "Industrial", icon: Factory },
    { id: "comercial", label: "Comercial", icon: Building2 },
    { id: "obra", label: "Obra Nueva", icon: HardHat },
  ];
  const services = [
    { id: "electricidad", label: "Electricidad", icon: Zap },
    { id: "climatizacion", label: "Climatización", icon: Wind },
    { id: "seguridad", label: "Seguridad / Incendios", icon: Shield },
    { id: "domotica", label: "Domótica", icon: Cpu },
  ];

  return (
    <section id="presupuesto" className="py-24 bg-secondary text-secondary-foreground relative overflow-hidden">
      <div className="absolute inset-0 circuit-grid opacity-10" />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">Presupuesto sin compromiso</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold">Cuéntanos sobre tu proyecto</h2>
          <p className="mt-3 text-white/70">Te respondemos en menos de 24 horas con una propuesta a medida.</p>
        </div>

        <Card className="mt-10 p-6 md:p-8 bg-background text-foreground">
          {/* Stepper */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1 last:flex-none">
                <div className={`grid h-9 w-9 place-items-center rounded-full text-sm font-semibold transition-colors ${step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{s}</div>
                {s < 3 && <div className={`flex-1 h-0.5 mx-2 transition-colors ${step > s ? "bg-primary" : "bg-muted"}`} />}
              </div>
            ))}
          </div>

          <form onSubmit={submit}>
            {step === 1 && (
              <div>
                <h3 className="font-semibold text-secondary">¿Qué tipo de proyecto es?</h3>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {projectTypes.map((p) => (
                    <button type="button" key={p.id} onClick={() => update("projectType", p.id)}
                      className={`flex flex-col items-center gap-2 p-5 rounded-lg border-2 transition-all ${data.projectType === p.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}>
                      <p.icon className={`h-7 w-7 ${data.projectType === p.id ? "text-primary" : "text-muted-foreground"}`} />
                      <span className="text-sm font-medium">{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {step === 2 && (
              <div>
                <h3 className="font-semibold text-secondary">¿Qué servicio necesitas?</h3>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {services.map((p) => (
                    <button type="button" key={p.id} onClick={() => update("service", p.id)}
                      className={`flex flex-col items-center gap-2 p-5 rounded-lg border-2 transition-all ${data.service === p.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}>
                      <p.icon className={`h-7 w-7 ${data.service === p.id ? "text-primary" : "text-muted-foreground"}`} />
                      <span className="text-sm font-medium text-center">{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-secondary">Tus datos de contacto</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><Label htmlFor="name">Nombre *</Label><Input id="name" value={data.name} onChange={(e) => update("name", e.target.value)} required maxLength={100} /></div>
                  <div><Label htmlFor="phone">Teléfono *</Label><Input id="phone" type="tel" value={data.phone} onChange={(e) => update("phone", e.target.value)} required maxLength={20} /></div>
                  <div><Label htmlFor="email">Email *</Label><Input id="email" type="email" value={data.email} onChange={(e) => update("email", e.target.value)} required maxLength={120} /></div>
                  <div><Label htmlFor="province">Provincia</Label><Input id="province" value={data.province} onChange={(e) => update("province", e.target.value)} maxLength={50} /></div>
                </div>
                <div><Label htmlFor="message">Mensaje</Label><Textarea id="message" rows={4} value={data.message} onChange={(e) => update("message", e.target.value)} maxLength={1000} /></div>
                <div className="flex items-start gap-2">
                  <Checkbox id="privacy" checked={data.privacy} onCheckedChange={(v) => update("privacy", !!v)} />
                  <label htmlFor="privacy" className="text-sm text-muted-foreground leading-snug">
                    Acepto la <Link to="/politica-privacidad" className="text-primary underline">Política de Privacidad</Link> *
                  </label>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-between gap-3">
              <Button type="button" variant="outline" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1}>
                <ChevronLeft className="h-4 w-4 mr-1" /> Atrás
              </Button>
              {step < 3 ? (
                <Button type="button" onClick={() => setStep((s) => s + 1)} disabled={(step === 1 && !data.projectType) || (step === 2 && !data.service)} className="bg-primary hover:bg-primary/90">
                  Siguiente <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Button type="submit" className="bg-primary hover:bg-primary/90">Enviar Solicitud</Button>
              )}
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
}

/* ---------- CONTACT ---------- */
function Contact() {
  return (
    <section id="contacto" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Contacto</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-secondary">Ven a visitarnos</h2>
          <p className="mt-4 text-muted-foreground">Estamos en el corazón del Polígono Parsi, en Sevilla.</p>
        </div>

        <div className="mt-12 grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-5">
            <InfoBlock icon={MapPin} title="Dirección">
              Polígono Parsi, Calle Parsi 1, Nave 29<br />41016 Sevilla
            </InfoBlock>
            <InfoBlock icon={Phone} title="Teléfonos">
              <a href="tel:+34605900173" className="hover:text-primary block">605 900 173</a>
              <a href="tel:+34607200603" className="hover:text-primary block">607 200 603</a>
            </InfoBlock>
            <InfoBlock icon={Mail} title="Email">
              <EmailPicker email="instalaciones@worldelectric.es" className="hover:text-primary block break-all cursor-pointer text-left w-full" />
              <EmailPicker email="chariparra@worldelectric.es" className="hover:text-primary block break-all cursor-pointer text-left w-full mt-1" />
            </InfoBlock>
            <InfoBlock icon={Clock} title="Horario">
              Lunes a Jueves: 8:30 - 14:00 y 15:00 - 18:00<br />
              Viernes: 8:00 - 14:00
            </InfoBlock>
          </div>
          <div className="lg:col-span-3 rounded-xl overflow-hidden border border-border shadow-lg min-h-[420px]">
            <iframe
              title="Ubicación World Electric"
              src="https://www.google.com/maps?q=Pol%C3%ADgono+Parsi+Calle+Parsi+1+Nave+29+41016+Sevilla&output=embed"
              width="100%" height="100%" style={{ border: 0, minHeight: 420 }}
              loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoBlock({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 rounded-xl border border-border bg-card p-5">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h4 className="font-semibold text-secondary">{title}</h4>
        <div className="mt-1 text-sm text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}