import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee";
import { Star } from "lucide-react";

const testimonials = [
  { name: "María González", username: "@mariag", body: "Instalaron toda la electricidad de mi vivienda en tiempo récord. Acabado impecable.", img: "https://randomuser.me/api/portraits/women/32.jpg", role: "Cliente residencial · Sevilla" },
  { name: "Carlos Jiménez", username: "@cjimenez", body: "Profesionales de primer nivel. Llevan el mantenimiento de nuestra nave desde hace 5 años.", img: "https://randomuser.me/api/portraits/men/45.jpg", role: "Director industrial · Dos Hermanas" },
  { name: "Laura Pérez", username: "@laurap", body: "El sistema de alarma y cámaras funciona de maravilla. Atención cercana y soporte 24/7.", img: "https://randomuser.me/api/portraits/women/68.jpg", role: "Comercio local · Mairena" },
  { name: "Javier Romero", username: "@jromero", body: "La domótica del salón es espectacular. Todo controlado desde el móvil.", img: "https://randomuser.me/api/portraits/men/51.jpg", role: "Vivienda inteligente · Tomares" },
  { name: "Ana Torres", username: "@anat", body: "Cumplieron los plazos al milímetro. Boletín entregado sin un solo problema.", img: "https://randomuser.me/api/portraits/women/53.jpg", role: "Promotora · Sevilla Este" },
  { name: "David Ruiz", username: "@druiz", body: "Iluminación LED de nuestra nave: ahorro brutal en la factura desde el primer mes.", img: "https://randomuser.me/api/portraits/men/33.jpg", role: "Logística · Polígono Parsi" },
  { name: "Sofía Navarro", username: "@sofin", body: "Trato directo con el equipo técnico, sin intermediarios. Una pasada.", img: "https://randomuser.me/api/portraits/women/45.jpg", role: "Reforma integral · Triana" },
  { name: "Miguel Ángel", username: "@miguel", body: "Climatización industrial y PCI en una sola intervención. Diez de diez.", img: "https://randomuser.me/api/portraits/men/61.jpg", role: "Centro comercial · Sevilla" },
  { name: "Elena Vargas", username: "@elenav", body: "Resolvieron una avería urgente un domingo por la noche. Profesionalidad enorme.", img: "https://randomuser.me/api/portraits/women/22.jpg", role: "Hostelería · Casco antiguo" },
];

function TestimonialCard({ img, name, username, body, role }: (typeof testimonials)[number]) {
  return (
    <Card className="w-[320px] shrink-0 mx-3 border border-border/60 bg-card shadow-sm hover:shadow-lg hover:border-primary/40 transition-all">
      <CardContent className="p-5">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={img} alt={name} loading="lazy" />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-secondary truncate">{name}</p>
            <p className="text-xs text-muted-foreground truncate">{role}</p>
          </div>
        </div>
        <div className="mt-3 flex gap-0.5 text-accent">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5" fill="currentColor" />
          ))}
        </div>
        <p className="mt-2 text-sm text-foreground/80 leading-relaxed">"{body}"</p>
      </CardContent>
    </Card>
  );
}

export function TestimonialsSection() {
  const firstRow = testimonials.slice(0, Math.ceil(testimonials.length / 2));
  const secondRow = testimonials.slice(Math.ceil(testimonials.length / 2));
  return (
    <section id="opiniones" className="relative py-24 bg-muted/30 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Opiniones</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-secondary">
            Lo que dicen nuestros clientes
          </h2>
          <p className="mt-4 text-muted-foreground">
            Cientos de proyectos respaldados por la confianza de particulares, comercios e industrias.
          </p>
        </div>
      </div>

      <div className="relative mt-14">
        <Marquee pauseOnHover className="[--duration:50s]">
          {firstRow.map((r) => <TestimonialCard key={`a-${r.username}`} {...r} />)}
        </Marquee>
        <Marquee pauseOnHover reverse className="mt-2 [--duration:60s]">
          {secondRow.map((r) => <TestimonialCard key={`b-${r.username}`} {...r} />)}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-muted/40 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-muted/40 to-transparent" />
      </div>
    </section>
  );
}