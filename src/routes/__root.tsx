import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Zap, Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmailPicker } from "@/components/email-picker";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página no encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          La página que buscas no existe o ha sido movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Esta página no ha cargado
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Algo ha salido mal. Puedes intentar recargar o volver al inicio.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Intentar de nuevo
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <WhatsAppButton />
      <CookieBanner />
    </QueryClientProvider>
  );
}

function ScrollToTop() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  const scrollTo = (id: string) => {
    setOpen(false);
    if (!isHome) {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground shadow-sm group-hover:scale-105 transition-transform">
            <Zap className="h-5 w-5" fill="currentColor" />
          </span>
          <span className="text-lg font-bold tracking-tight text-secondary">
            World <span className="text-primary">Electric</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <button onClick={() => scrollTo("servicios")} className="text-foreground/80 hover:text-primary transition-colors">Servicios</button>
          <button onClick={() => scrollTo("por-que-elegirnos")} className="text-foreground/80 hover:text-primary transition-colors">Por qué elegirnos</button>
          <button onClick={() => scrollTo("opiniones")} className="text-foreground/80 hover:text-primary transition-colors">Opiniones</button>
          <button onClick={() => scrollTo("contacto")} className="text-foreground/80 hover:text-primary transition-colors">Contacto</button>
        </nav>

        <div className="hidden md:block">
          <Button onClick={() => scrollTo("presupuesto")} className="bg-primary hover:bg-primary/90">
            Solicitar Presupuesto
          </Button>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menú">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="flex flex-col p-4 gap-3">
            <button onClick={() => scrollTo("servicios")} className="text-left py-2">Servicios</button>
            <button onClick={() => scrollTo("por-que-elegirnos")} className="text-left py-2">Por qué elegirnos</button>
            <button onClick={() => scrollTo("opiniones")} className="text-left py-2">Opiniones</button>
            <button onClick={() => scrollTo("contacto")} className="text-left py-2">Contacto</button>
            <Button onClick={() => scrollTo("presupuesto")} className="w-full">Solicitar Presupuesto</Button>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="anthracite mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
                <Zap className="h-5 w-5" fill="currentColor" />
              </span>
              <span className="text-lg font-bold">World Electric</span>
            </div>
            <p className="mt-4 text-sm text-white/70 max-w-xs">
              Instaladora autorizada por la Junta de Andalucía. Más de 20 años al servicio de proyectos eléctricos y de seguridad.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/90">Contacto</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>Polígono Parsi, Calle Parsi 1, Nave 29</li>
              <li>41016 Sevilla</li>
              <li><a href="tel:+34605900173" className="hover:text-accent">605 900 173</a> / <a href="tel:+34607200603" className="hover:text-accent">607 200 603</a></li>
              <li>
                <EmailPicker
                  email="instalaciones@worldelectric.es"
                  className="hover:text-accent cursor-pointer text-left"
                />
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/90">Legal</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/aviso-legal" className="text-white/70 hover:text-accent">Aviso Legal</Link></li>
              <li><Link to="/politica-privacidad" className="text-white/70 hover:text-accent">Política de Privacidad</Link></li>
              <li><Link to="/politica-cookies" className="text-white/70 hover:text-accent">Política de Cookies</Link></li>
              <li><Link to="/rgpd" className="text-white/70 hover:text-accent">RGPD</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/60">© 2026 WORLD ELECTRIC 2012, SLU. Todos los derechos reservados.</p>
          <nav className="flex gap-6 text-xs">
            <Link to="/aviso-legal" className="text-white/70 hover:text-accent">Aviso Legal</Link>
            <Link to="/politica-privacidad" className="text-white/70 hover:text-accent">Política de Privacidad</Link>
            <Link to="/politica-cookies" className="text-white/70 hover:text-accent">Política de Cookies</Link>
            <Link to="/rgpd" className="text-white/70 hover:text-accent">RGPD</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppButton() {
  const message = encodeURIComponent("Hola World Electric, estoy interesado en solicitar un presupuesto para un proyecto eléctrico.");
  return (
    <a
      href={`https://wa.me/34605900173?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full text-white shadow-lg wa-pulse hover:scale-110 transition-transform"
      style={{ backgroundColor: "#25D366" }}
    >
      <MessageCircle className="h-7 w-7" fill="white" stroke="#25D366" />
    </a>
  );
}

function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem("we-cookies")) setShow(true);
  }, []);
  const decide = (v: "all" | "rejected") => {
    localStorage.setItem("we-cookies", v);
    setShow(false);
  };
  if (!show) return null;
  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-50 rounded-xl border border-border bg-card shadow-2xl p-5 animate-in slide-in-from-bottom-4">
      <p className="text-sm text-foreground">
        Usamos cookies técnicas y analíticas para mejorar tu experiencia. Consulta nuestra{" "}
        <Link to="/politica-cookies" className="text-primary underline font-medium">Política de Cookies</Link>.
      </p>
      <div className="mt-4 flex gap-2 justify-end">
        <Button variant="outline" size="sm" onClick={() => decide("rejected")}>Rechazar</Button>
        <Button size="sm" onClick={() => decide("all")} className="bg-primary hover:bg-primary/90">Aceptar todas</Button>
      </div>
    </div>
  );
}
