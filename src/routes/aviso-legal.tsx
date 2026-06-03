import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/aviso-legal")({
  component: AvisoLegal,
});

function AvisoLegal() {
  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 prose prose-slate">
      <h1 className="text-3xl md:text-4xl font-bold text-secondary">Aviso Legal</h1>
      <p className="text-muted-foreground mt-2">Última actualización: 2026</p>

      <Section title="1. Datos del titular">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Razón social:</strong> WORLD ELECTRIC 2012, SLU</li>
          <li>
            <strong>CIF:</strong>{" "}
            <span className="inline-block rounded bg-accent/30 px-2 py-0.5 font-mono text-sm text-secondary">
              [PENDIENTE DE INTRODUCIR POR EL CLIENTE]
            </span>
          </li>
          <li><strong>Domicilio social:</strong> Polígono Parsi, Calle Parsi 1, Nave 29, 41016 Sevilla</li>
          <li><strong>Email de contacto:</strong> instalaciones@worldelectric.es</li>
        </ul>
      </Section>

      <Section title="2. Objeto y condiciones de uso">
        <p>El presente Aviso Legal regula el uso del sitio web titularidad de WORLD ELECTRIC 2012, SLU (en adelante, "el Titular"). El acceso al sitio atribuye la condición de Usuario e implica la aceptación plena de las presentes condiciones.</p>
        <p>El Usuario se compromete a hacer un uso adecuado de los contenidos y servicios y a no emplearlos para incurrir en actividades ilícitas o contrarias a la buena fe, ni que lesionen los derechos del Titular o de terceros.</p>
      </Section>

      <Section title="3. Propiedad intelectual e industrial">
        <p>Todos los contenidos del sitio web (textos, fotografías, gráficos, imágenes, iconos, tecnología, software, así como su diseño gráfico y códigos fuente) son propiedad intelectual del Titular o de terceros, sin que puedan entenderse cedidos al Usuario ninguno de los derechos de explotación reconocidos por la normativa vigente.</p>
      </Section>

      <Section title="4. Exclusión de responsabilidad">
        <p>El Titular no se responsabiliza de los daños y perjuicios que pudiera ocasionar la utilización indebida del sitio web ni de los contenidos e informaciones accesibles desde el mismo, así como de la información de terceros enlazada a través del sitio.</p>
      </Section>

      <Section title="5. Modificaciones">
        <p>El Titular se reserva el derecho de efectuar sin previo aviso las modificaciones que considere oportunas en su sitio web, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios como la forma en la que éstos aparezcan presentados.</p>
      </Section>

      <Section title="6. Legislación aplicable">
        <p>Las presentes condiciones se rigen por la legislación española. Para la resolución de cualquier controversia, las partes se someten a los Juzgados y Tribunales de Sevilla.</p>
      </Section>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold text-secondary">{title}</h2>
      <div className="mt-3 text-muted-foreground space-y-3 text-[15px] leading-relaxed">{children}</div>
    </section>
  );
}