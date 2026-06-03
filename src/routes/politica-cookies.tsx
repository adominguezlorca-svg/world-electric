import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/politica-cookies")({
  component: Cookies,
});

function Cookies() {
  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h1 className="text-3xl md:text-4xl font-bold text-secondary">Política de Cookies</h1>
      <p className="text-muted-foreground mt-2">WORLD ELECTRIC 2012, SLU — Polígono Parsi, Calle Parsi 1, Nave 29, 41016 Sevilla.</p>

      <Sec title="¿Qué son las cookies?">
        Las cookies son pequeños archivos de texto que se descargan en tu dispositivo al acceder a determinadas páginas web. Permiten al sitio recordar información sobre tu visita, como tu idioma preferido y otras opciones, con el fin de facilitar la próxima visita y hacer que el sitio resulte más útil.
      </Sec>

      <Sec title="Tipos de cookies que utilizamos">
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Cookies técnicas:</strong> necesarias para el correcto funcionamiento del sitio web. No requieren consentimiento.</li>
          <li><strong>Cookies analíticas:</strong> permiten analizar el comportamiento del usuario de forma agregada para mejorar la experiencia de navegación.</li>
        </ul>
      </Sec>

      <Sec title="Cómo desactivar las cookies">
        Puedes permitir, bloquear o eliminar las cookies instaladas en tu equipo mediante la configuración de las opciones del navegador. A continuación encontrarás enlaces a las instrucciones de los principales navegadores:
        <ul className="list-disc pl-5 mt-3 space-y-1">
          <li><a className="text-primary underline" href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
          <li><a className="text-primary underline" href="https://support.mozilla.org/es/kb/Borrar%20cookies" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
          <li><a className="text-primary underline" href="https://support.apple.com/es-es/HT201265" target="_blank" rel="noopener noreferrer">Safari</a></li>
          <li><a className="text-primary underline" href="https://support.microsoft.com/es-es/microsoft-edge" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
        </ul>
      </Sec>

      <Sec title="Cambios en la política de cookies">
        WORLD ELECTRIC 2012, SLU podrá modificar esta política en función de exigencias legislativas, reglamentarias, o con la finalidad de adaptarla a las instrucciones dictadas por la Agencia Española de Protección de Datos.
      </Sec>
    </article>
  );
}

function Sec({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold text-secondary">{title}</h2>
      <div className="mt-3 text-muted-foreground text-[15px] leading-relaxed">{children}</div>
    </section>
  );
}