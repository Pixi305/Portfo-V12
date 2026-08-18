import React from "react";
import clsx from "clsx";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  showRadialGradient?: boolean;
}

export function AuroraBackground({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) {
  return (
    <div
      className={clsx(
        "relative flex flex-col h-screen items-center justify-center bg-white text-slate-950",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={clsx(
            "[--white-gradient:repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)]",
            "[--aurora:repeating-linear-gradient(100deg,#3b82f6_10%,#a5b4fc_15%,#93c5fd_20%,#ddd6fe_25%,#60a5fa_30%)]",
            "[background-image:var(--white-gradient),var(--aurora)]",
            "[background-size:300%,200%]",
            "[background-position:50%_50%,50%_50%]",
            "filter blur-[10px] invert",
            "after:content-[''] after:absolute after:inset-0",
            "after:[background-image:var(--white-gradient),var(--aurora)]",
            "after:[background-size:200%,100%]",
            "after:[background-attachment:fixed]",
            "after:mix-blend-difference",
            "pointer-events-none",
            "absolute -inset-[10px] opacity-50 will-change-transform",
            "animate-aurora",
            showRadialGradient &&
              "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]"
          )}
        />
      </div>
      {children}
    </div>
  );
}
