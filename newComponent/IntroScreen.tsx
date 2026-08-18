import { useState, useEffect } from "react";
import { AuroraBackground } from "./AuroraBackground";

interface IntroScreenProps {
  onEnter: () => void;
}

export default function IntroScreen({ onEnter }: IntroScreenProps) {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  const handleEnter = () => {
    setFading(true);
    setTimeout(onEnter, 700);
  };

  useEffect(() => {
    const timeout = setTimeout(handleEnter, 3500);
    return () => clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9998,
        opacity: fading ? 0 : 1,
        transition: "opacity 0.7s ease-in-out",
        pointerEvents: fading ? "none" : "auto",
      }}
    >
      <AuroraBackground>
        <div className="flex flex-col items-center gap-6 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-slate-900 title">
            Abdul Lateef
          </h1>
          <p className="text-slate-500 text-base md:text-lg font-medium max-w-sm">
            Technical & Product Designer
          </p>
          <button
            onClick={handleEnter}
            className="mt-4 px-6 py-2.5 rounded-full bg-black text-white text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            Enter
          </button>
        </div>
      </AuroraBackground>
    </div>
  );
}
