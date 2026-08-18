import { useState, useEffect, useCallback } from "react";
import { Constants } from "../constants";

function playKeyClick() {
  try {
    const ctx = new AudioContext();
    const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.045), ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.006));
    }
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const gain = ctx.createGain();
    gain.gain.value = 0.35;
    src.connect(gain);
    gain.connect(ctx.destination);
    src.start();
    setTimeout(() => ctx.close(), 500);
  } catch (_) {}
}

function useLagosTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: "Africa/Lagos",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

interface IntroScreenProps {
  onEnter: () => void;
}

export default function IntroScreen({ onEnter }: IntroScreenProps) {
  const [fading, setFading] = useState(false);
  const time = useLagosTime();

  const handleEnter = useCallback(() => {
    if (fading) return;
    playKeyClick();
    setFading(true);
    setTimeout(onEnter, 750);
  }, [fading, onEnter]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") handleEnter();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleEnter]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9998,
        background: "#ffffff",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.75s ease-in-out",
        pointerEvents: fading ? "none" : "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* ── Profile ── */}
      <div className="flex flex-col items-center gap-[6px] mt-[72px]">
        {/* Avatar */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            overflow: "hidden",
            border: "1px solid #f3f3f3",
            flexShrink: 0,
            position: "relative",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/intro-headshot.png"
            alt="Pixi"
            style={{
              position: "absolute",
              top: "-8.26%",
              left: 0,
              width: "99.91%",
              height: "144.52%",
              maxWidth: "none",
              objectFit: "cover",
            }}
          />
        </div>
        <p className="font-bold text-[#202123] text-[20px] text-center leading-[1.2]">Pixi</p>
        <p className="text-[#202123] text-[16px] text-center leading-[1.2]">
          Senior Product Designer / Design Engineer
        </p>
      </div>

      {/* ── CTA ── */}
      <p className="text-[#202123] text-[20px] text-center mt-[54px]">
        Please Click <strong>&ldquo;Enter&rdquo;</strong>
      </p>

      {/* ── Keyboard ── */}
      <div
        className="flex-1 flex items-center justify-center w-full px-4"
        style={{ maxHeight: 460, marginTop: 12 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/intro-keyboard.png"
          alt="Keyboard — press Enter to continue"
          onClick={handleEnter}
          style={{
            width: "100%",
            maxWidth: 852,
            height: "auto",
            cursor: "pointer",
            userSelect: "none",
          }}
        />
      </div>

      {/* ── Built by Me ── */}
      <p className="text-[#202123] text-[16px] text-center mt-2 mb-auto leading-[1.2]">
        Built by Me
      </p>

      {/* ── Footer ── */}
      <div
        className="w-full flex items-center justify-between px-16 pb-6 pt-4"
        style={{ fontSize: "15px", color: "#202123", letterSpacing: "-0.03em" }}
      >
        <span style={{ fontVariantNumeric: "tabular-nums" }}>
          Lagos, NG&nbsp;&nbsp;|&nbsp;&nbsp;{time}
        </span>
        <div className="flex gap-8">
          <a
            href="https://www.linkedin.com/in/abdullateef-akinyemi/"
            target="_blank"
            rel="noreferrer noopener"
            className="underline"
          >
            LinkedIn
          </a>
          <a
            href={Constants.resumeLink}
            target="_blank"
            rel="noreferrer noopener"
            className="underline"
          >
            CV
          </a>
        </div>
      </div>

      {/* ── Copyright ── */}
      <p className="text-[12px] text-[#202123] opacity-60 pb-3">©2026 Lateef Akinyemi</p>
    </div>
  );
}
