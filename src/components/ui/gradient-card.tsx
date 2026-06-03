import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { ArrowRight, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const cardVariants = cva(
  "relative flex flex-col justify-between h-full w-full overflow-hidden rounded-2xl p-8 shadow-sm transition-shadow duration-300 hover:shadow-xl",
  {
    variants: {
      gradient: {
        blue: "bg-gradient-to-br from-blue-50 to-sky-200/60",
        gold: "bg-gradient-to-br from-amber-50 to-yellow-200/60",
        slate: "bg-gradient-to-br from-slate-100 to-slate-300/60",
        emerald: "bg-gradient-to-br from-emerald-50 to-teal-200/60",
      },
    },
    defaultVariants: { gradient: "blue" },
  }
);

export interface GradientCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  badgeText: string;
  badgeColor: string;
  title: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
  icon: LucideIcon;
}

const GradientCard = React.forwardRef<HTMLDivElement, GradientCardProps>(
  ({ className, gradient, badgeText, badgeColor, title, description, ctaText, ctaHref, icon: Icon, ...props }, ref) => {
    const cardAnimation = { rest: { scale: 1, y: 0 }, hover: { scale: 1.02, y: -6 } };
    const iconAnimation = { rest: { scale: 1, rotate: 0 }, hover: { scale: 1.1, rotate: 6 } };

    return (
      <motion.div
        ref={ref}
        className={cn(cardVariants({ gradient }), className)}
        variants={cardAnimation}
        initial="rest"
        whileHover="hover"
        animate="rest"
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        {...(props as React.ComponentProps<typeof motion.div>)}
      >
        {/* Decorative icon */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 -bottom-6 text-secondary/10"
          variants={iconAnimation}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
        >
          <Icon className="h-40 w-40" strokeWidth={1.2} />
        </motion.div>

        <div className="relative z-10 flex flex-col h-full">
          <span
            className="inline-flex w-fit items-center gap-2 rounded-full bg-white/70 backdrop-blur px-3 py-1 text-xs font-semibold text-secondary shadow-sm"
          >
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: badgeColor }} />
            {badgeText}
          </span>

          <div className="mt-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 backdrop-blur shadow-sm text-secondary">
            <Icon className="h-6 w-6" />
          </div>

          <div className="mt-5 flex-1">
            <h3 className="text-xl font-bold text-secondary leading-tight">{title}</h3>
            <p className="mt-2 text-sm text-secondary/70 leading-relaxed">{description}</p>
          </div>

          {ctaText && (
            <a
              href={ctaHref ?? "#"}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:gap-2.5 transition-all"
            >
              {ctaText}
              <ArrowRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </motion.div>
    );
  }
);
GradientCard.displayName = "GradientCard";

export { GradientCard, cardVariants };