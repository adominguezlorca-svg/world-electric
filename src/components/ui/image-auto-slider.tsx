import electricaAsset from "@/assets/Instalacioneseluoctricas-4.png.asset.json";
import industrialAsset from "@/assets/Industrial_y_comercial-3.jpeg.asset.json";
import ledAsset from "@/assets/LED-3.jpeg.asset.json";
import incendiosAsset from "@/assets/Incendios-3.jpeg.asset.json";
import climaAsset from "@/assets/climatizaciuun-3.jpeg.asset.json";

const slides = [
  { url: "/instalaciones-electricas.png", title: "Instalaciones Eléctricas", desc: "Boletines oficiales y baja/media tensión" },
  { url: "/industrial-comercial.jpeg", title: "Industrial y Comercial", desc: "Naves industriales y centros comerciales" },
  { url: "/LED.jpeg", title: "Iluminación LED", desc: "Sistemas LED de alto rendimiento" },
  { url: "/incendios.jpeg", title: "Protección Contraincendios", desc: "Detección y extinción según normativa" },
  { url: "/climatizacion.jpeg", title: "Climatización", desc: "Aire acondicionado profesional" },
];

export const ImageAutoSlider = () => {
  const duplicated = [...slides, ...slides];
  return (
    <>
      <style>{`
        @keyframes services-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .services-infinite-scroll { animation: services-scroll 40s linear infinite; }
        .services-infinite-scroll:hover { animation-play-state: paused; }
        .services-scroll-mask {
          mask: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
          -webkit-mask: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
        }
      `}</style>
      <div className="services-scroll-mask overflow-hidden w-full">
        <div className="services-infinite-scroll flex gap-6 w-max">
          {duplicated.map((s, i) => (
            <div
              key={i}
              className="group relative h-[360px] w-[300px] sm:w-[340px] md:w-[380px] shrink-0 overflow-hidden rounded-2xl shadow-lg"
            >
              <img
                src={s.url}
                alt={s.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <h3 className="text-xl font-bold">{s.title}</h3>
                <p className="mt-1 text-sm text-white/80">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
