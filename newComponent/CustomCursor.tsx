import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    const move = (e: MouseEvent) => {
      el.style.left = `${e.clientX - 125}px`;
      el.style.top = `${e.clientY - 125}px`;
      el.style.opacity = "1";
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        zIndex: 99999,
        width: 250,
        height: 250,
        left: 0,
        top: 0,
        pointerEvents: "none",
        transition: "opacity 1s ease-in-out",
        opacity: 0,
        filter: "blur(30px) opacity(30%)",
      }}
    >
      <div
        style={{
          borderRadius: "100%",
          background: "radial-gradient(circle, #f582ae, #8bd3dd)",
          width: "100%",
          height: "100%",
          animation: "cursorBlob 20s linear infinite alternate",
        }}
      />
    </div>
  );
}
