export default function ToolsSection() {
  return (
    <div className="bg-[#f8f8f8] rounded-[31px] overflow-hidden px-[26px] pt-10 pb-14">
      <h2 className="font-semibold text-[40px] tracking-[-2px] mb-[30px] text-black title">
        Tools
      </h2>

      {/* Mobile: 4-column grid — all icons, tiles fill their cell */}
      <div className="grid grid-cols-4 gap-3 lg:hidden">
        {[...row1, ...row2].map((tool, i) => (
          <MobileTile key={i} tool={tool} />
        ))}
      </div>

      {/* Desktop: 2 fixed-size flex rows */}
      <div className="hidden lg:flex flex-col gap-[43px]">
        <div className="flex gap-[38px]">
          {row1.map((tool, i) => (
            <ToolTile key={i} {...tool} />
          ))}
        </div>
        <div className="flex gap-[38px]">
          {row2.map((tool, i) => (
            <ToolTile key={i} {...tool} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Tile types ─────────────────────────────────────── */

type SimpleIcon = {
  kind: "simple";
  src: string;
  alt: string;
  imgStyle: React.CSSProperties;
};

type CompositeIcon = {
  kind: "composite";
  alt: string;
  bg: string;
  layers: { src: string; style: React.CSSProperties }[];
};

type ClippedIcon = {
  kind: "clipped";
  src: string;
  alt: string;
  containerStyle: React.CSSProperties;
  imgStyle: React.CSSProperties;
};

type Tool = SimpleIcon | CompositeIcon | ClippedIcon;

function TileInner({ tool }: { tool: Tool }) {
  if (tool.kind === "simple") return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={tool.src} alt={tool.alt} style={{ position: "absolute", ...tool.imgStyle }} />
  );
  if (tool.kind === "clipped") return (
    <div style={{ position: "absolute", overflow: "hidden", ...tool.containerStyle }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={tool.src} alt={tool.alt} style={{ position: "absolute", maxWidth: "none", ...tool.imgStyle }} />
    </div>
  );
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={tool.bg} alt="" aria-hidden style={{ position: "absolute", left: 13, top: 13, width: 54, height: 53 }} />
      {tool.layers.map((layer, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={i} src={layer.src} alt={i === 0 ? tool.alt : ""} aria-hidden={i > 0} style={{ position: "absolute", ...layer.style }} />
      ))}
    </>
  );
}

// Mobile tile: fills grid cell (aspect-square), inner images designed for 80px are slightly clipped
function MobileTile({ tool }: { tool: Tool }) {
  return (
    <div className="relative aspect-square bg-[#ededed] rounded-[16px] overflow-hidden">
      <TileInner tool={tool} />
    </div>
  );
}

function ToolTile(tool: Tool) {
  return (
    <div className="relative shrink-0 w-[80px] h-[80px] bg-[#ededed] rounded-[20px] overflow-hidden">
      {tool.kind === "simple" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={tool.src}
          alt={tool.alt}
          style={{ position: "absolute", ...tool.imgStyle }}
        />
      ) : tool.kind === "clipped" ? (
        <div style={{ position: "absolute", overflow: "hidden", ...tool.containerStyle }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={tool.src}
            alt={tool.alt}
            style={{ position: "absolute", maxWidth: "none", ...tool.imgStyle }}
          />
        </div>
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={tool.bg}
            alt=""
            aria-hidden
            style={{ position: "absolute", left: 13, top: 13, width: 54, height: 53 }}
          />
          {tool.layers.map((layer, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={layer.src}
              alt={i === 0 ? tool.alt : ""}
              aria-hidden={i > 0}
              style={{ position: "absolute", ...layer.style }}
            />
          ))}
        </>
      )}
    </div>
  );
}

/* ── Helpers ────────────────────────────────────────── */

const s = (left: number, top: number, size: number): React.CSSProperties => ({
  left, top, width: size, height: size,
});

const centered = (size: number): React.CSSProperties => ({
  left: (80 - size) / 2,
  top: (80 - size) / 2,
  width: size,
  height: size,
});

// Adobe composite: bg rect at left=13 top=13 w=54 h=53; logo insets are % of that area
function adobeLayers(
  bgSrc: string,
  layers: { src: string; tInset: number; rInset: number; bInset: number; lInset: number }[]
): { bg: string; layers: { src: string; style: React.CSSProperties }[] } {
  const bgW = 54, bgH = 53, bgL = 13, bgT = 13;
  return {
    bg: bgSrc,
    layers: layers.map(({ src, tInset, rInset, bInset, lInset }) => ({
      src,
      style: {
        left: bgL + bgW * (lInset / 100),
        top: bgT + bgH * (tInset / 100),
        width: bgW * (1 - lInset / 100 - rInset / 100),
        height: bgH * (1 - tInset / 100 - bInset / 100),
      },
    })),
  };
}

/* ── Tool data ──────────────────────────────────────── */

const row1: Tool[] = [
  // Figma
  { kind: "simple", src: "/icons/tools/figma.svg", alt: "Figma", imgStyle: { left: 23, top: 14, width: 34, height: 51 } },
  // Claude
  { kind: "simple", src: "/icons/tools/claude.png", alt: "Claude", imgStyle: centered(60.711) },
  // GitHub
  { kind: "simple", src: "/icons/tools/github.png", alt: "GitHub", imgStyle: centered(59.146) },
  // Cursor
  { kind: "simple", src: "/icons/tools/cursor.png", alt: "Cursor", imgStyle: s(9.75, 11.14, 60.504) },
  // ChatGPT
  { kind: "simple", src: "/icons/tools/chatgpt.png", alt: "ChatGPT", imgStyle: s(12.75, 12.75, 54.5) },
  // Codex
  { kind: "simple", src: "/icons/tools/codex.png", alt: "Codex", imgStyle: s(3.43, 3.43, 73.148) },
  // VS Code
  { kind: "simple", src: "/icons/tools/vscode.png", alt: "VS Code", imgStyle: s(12.02, 12.02, 55.967) },
  // Adobe Illustrator
  {
    kind: "composite",
    alt: "Illustrator",
    ...adobeLayers("/icons/tools/ai-bg.svg", [
      { src: "/icons/tools/ai-logo.svg", tInset: 22.18, rInset: 24, bInset: 29.32, lInset: 20.66 },
    ]),
  },
  // Adobe Photoshop
  {
    kind: "composite",
    alt: "Photoshop",
    ...adobeLayers("/icons/tools/ps-bg.svg", [
      { src: "/icons/tools/ps-logo.svg", tInset: 8.64, rInset: 9.67, bInset: 8.63, lInset: 9.68 },
      { src: "/icons/tools/ps-text.svg", tInset: 8.64 + 43.85 * 0.3329 / 53 * 100, rInset: 9.67 + 43.55 * 0.2691 / 54 * 100, bInset: 8.63 + 43.85 * 0.3406 / 53 * 100, lInset: 9.68 + 43.55 * 0.305 / 54 * 100 },
    ]),
  },
  // Adobe After Effects
  {
    kind: "composite",
    alt: "After Effects",
    ...adobeLayers("/icons/tools/ae-bg.svg", [
      { src: "/icons/tools/ae-logo.svg", tInset: 25.72, rInset: 14.25, bInset: 28.63, lInset: 12.37 },
    ]),
  },
];

const row2: Tool[] = [
  // Adobe Lightroom
  {
    kind: "composite",
    alt: "Lightroom",
    ...adobeLayers("/icons/tools/lr-bg.svg", [
      { src: "/icons/tools/lr-logo.svg", tInset: 25.64, rInset: 20.8, bInset: 29.3, lInset: 25.4 },
    ]),
  },
  // LottieFiles
  { kind: "simple", src: "/icons/tools/lottie.svg", alt: "LottieFiles", imgStyle: s(13, 13, 54) },
  // ClickUp
  { kind: "simple", src: "/icons/tools/clickup.svg", alt: "ClickUp", imgStyle: { left: 13, top: 12, width: 54.73, height: 56.209 } },
  // Higgsfield
  {
    kind: "clipped",
    src: "/icons/tools/higgsfield.png",
    alt: "Higgsfield",
    containerStyle: { left: 9.38, top: 9.38, width: 61.236, height: 61.236, borderRadius: 10.206, backgroundColor: "white" },
    imgStyle: { width: 98.01, height: 98.01, left: -18.96, top: -16.15 },
  },
  // GSAP
  {
    kind: "clipped",
    src: "/icons/tools/gsap.png",
    alt: "GSAP",
    containerStyle: { left: 10.44, top: 10.44, width: 59.121, height: 59.121, borderRadius: 10 },
    imgStyle: { width: 132.28, height: 69.47, left: -34.17, top: -5.17 },
  },
];
