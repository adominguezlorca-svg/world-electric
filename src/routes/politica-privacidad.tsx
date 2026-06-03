import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/politica-privacidad")({
  component: Privacy,
});

const sections = [
  {
    q: "Responsable del tratamiento",
    a: (
      <>
        <p><strong>WORLD ELECTRIC 2012, SLU</strong></p>
        <p>CIF: <span className="inline-block rounded bg-accent/30 px-2 py-0.5 font-mono text-sm">[PENDIENTE DE INTRODUCIR POR EL CLIENTE]</span></p>
        <p>Dirección: Polígono Parsi, Calle Parsi 1, Nave 29, 41016 Sevilla</p>
        <p>Email: instalaciones@worldelectric.es</p>
      </>
    ),
  },
  { q: "Finalidad del tratamiento", a: <p>Tratamos los datos personales facilitados por los Usuarios con la finalidad de gestionar las solicitudes de presupuesto, atender consultas y mantener la relación comercial.</p> },
  { q: "Legitimación", a: <p>La base legal para el tratamiento de los datos es el consentimiento del interesado, otorgado al cumplimentar el formulario y aceptar la presente Política de Privacidad.</p> },
  { q: "Destinatarios", a: <p>No se cederán datos a terceros salvo obligación legal. Los datos no se transferirán fuera del Espacio Económico Europeo.</p> },
  { q: "Conservación de los datos", a: <p>Los datos personales se conservarán durante el tiempo necesario para cumplir con la finalidad para la que fueron recabados y, en su caso, durante los plazos legales aplicables.</p> },
  { q: "Derechos del usuario", a: <p>Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, portabilidad y limitación del tratamiento escribiendo a <a href="mailto:instalaciones@worldelectric.es" className="text-primary underline">instalaciones@worldelectric.es</a>, adjuntando copia de tu DNI. Tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).</p> },
  { q: "Seguridad de los datos", a: <p>Aplicamos las medidas técnicas y organizativas adecuadas para garantizar la seguridad de los datos personales y evitar su alteración, pérdida, tratamiento o acceso no autorizado.</p> },
];

function Privacy() {
  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h1 className="text-3xl md:text-4xl font-bold text-secondary">Política de Privacidad</h1>
      <p className="text-muted-foreground mt-2">Conforme al Reglamento (UE) 2016/679 (RGPD) y la LOPDGDD 3/2018.</p>

      <Accordion type="single" collapsible className="mt-8">
        {sections.map((s, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left text-secondary font-semibold">{s.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground space-y-2 text-[15px] leading-relaxed">{s.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </article>
  );
}