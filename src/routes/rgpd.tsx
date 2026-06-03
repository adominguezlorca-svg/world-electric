import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/rgpd")({
  component: RGPD,
});

function RGPD() {
  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h1 className="text-3xl md:text-4xl font-bold text-secondary">RGPD — Protección de Datos</h1>
      <p className="text-muted-foreground mt-2">
        Información básica sobre el tratamiento de datos personales conforme al Reglamento (UE) 2016/679 (RGPD) y la LOPDGDD 3/2018.
      </p>

      <Sec title="Responsable del tratamiento">
        <p><strong>WORLD ELECTRIC 2012, SLU</strong></p>
        <p>Polígono Parsi, Calle Parsi 1, Nave 29 — 41016 Sevilla.</p>
        <p>Email: instalaciones@worldelectric.es</p>
      </Sec>

      <Sec title="Finalidad">
        <p>Gestionar las solicitudes de presupuesto, atender consultas, prestar los servicios contratados y mantener la relación comercial.</p>
      </Sec>

      <Sec title="Legitimación">
        <p>Consentimiento del interesado y, en su caso, ejecución de un contrato o cumplimiento de obligaciones legales.</p>
      </Sec>

      <Sec title="Conservación">
        <p>Los datos se conservarán mientras se mantenga la relación comercial y durante los plazos legalmente exigibles.</p>
      </Sec>

      <Sec title="Destinatarios">
        <p>No se cederán datos a terceros salvo obligación legal. No se realizan transferencias internacionales fuera del EEE.</p>
      </Sec>

      <Sec title="Derechos">
        <p>
          Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, portabilidad y limitación del tratamiento
          escribiendo a <a className="text-primary underline" href="mailto:instalaciones@worldelectric.es">instalaciones@worldelectric.es</a>,
          adjuntando copia de tu DNI. Tienes derecho a reclamar ante la Agencia Española de Protección de Datos (
          <a className="text-primary underline" href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>).
        </p>
      </Sec>

      <Sec title="Medidas de seguridad">
        <p>Aplicamos medidas técnicas y organizativas adecuadas para garantizar la confidencialidad, integridad y disponibilidad de los datos personales.</p>
      </Sec>
    </article>
  );
}

function Sec({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold text-secondary">{title}</h2>
      <div className="mt-3 text-muted-foreground text-[15px] leading-relaxed space-y-2">{children}</div>
    </section>
  );
}