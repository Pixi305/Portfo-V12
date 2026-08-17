export default function ToolsSection() {
  return (
    <div className="bg-[#f8f8f8] rounded-[31px] overflow-hidden px-8 pt-10 pb-14">
      <h2 className="font-semibold text-[40px] tracking-[-2px] mb-10 text-black title">
        Tools
      </h2>
      <div className="flex flex-col gap-[43px]">
        <div className="flex gap-[38px] overflow-x-auto pb-1">
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
            style={{ position: "absolute", ...tool.imgStyle }}
          />
        </div>
      ) : (
        <>
          {/* bg — the colored rounded rect */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={tool.bg}
            alt=""
            aria-hidden
            style={{ position: "absolute", left: 13, top: 13, width: 54, height: 53 }}
          />
          {/* logo layers */}
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

/* ── Tool data ──────────────────────────────────────── */

const s = (left: number, top: number, size: number): React.CSSProperties => ({
  left,
  top,
  width: size,
  height: size,
});

const centered = (size: number): React.CSSProperties => ({
  left: (80 - size) / 2,
  top: (80 - size) / 2,
  width: size,
  height: size,
});

// Adobe composite icon helper
// bg is placed at left=13 top=13 w=54 h=53 within the 80×80 tile.
// Logo insets are % of that 54×53 bg area.
function adobeLayers(
  bgSrc: string,
  layers: { src: string; tInset: number; rInset: number; bInset: number; lInset: number }[]
): { bg: string; layers: { src: string; style: React.CSSProperties }[] } {
  const bgW = 54, bgH = 53, bgL = 13, bgT = 13;
  return {
    bg: bgSrc,
    layers: layers.map(({ src, tInset, rInset, bInset, lInset }) => {
      const left = bgL + bgW * (lInset / 100);
      const top = bgT + bgH * (tInset / 100);
      const width = bgW * (1 - lInset / 100 - rInset / 100);
      const height = bgH * (1 - tInset / 100 - bInset / 100);
      return { src, style: { left, top, width, height } };
    }),
  };
}

const row1: Tool[] = [
  // Figma
  {
    kind: "simple",
    src: "/icons/tools/figma.svg",
    alt: "Figma",
    imgStyle: { left: 23, top: 14, width: 34, height: 51 },
  },
  // Claude
  {
    kind: "simple",
    src: "/icons/tools/claude.png",
    alt: "Claude",
    imgStyle: centered(61),
  },
  // GitHub
  {
    kind: "simple",
    src: "/icons/tools/github.png",
    alt: "GitHub",
    imgStyle: centered(59),
  },
  // Linear
  {
    kind: "simple",
    src: "/icons/tools/linear.png",
    alt: "Linear",
    imgStyle: s(10, 11, 60),
  },
  // ChatGPT
  {
    kind: "simple",
    src: "/icons/tools/chatgpt.png",
    alt: "ChatGPT",
    imgStyle: s(13, 13, 55),
  },
  // Terminal / SSH
  {
    kind: "simple",
    src: "/icons/tools/terminal.png",
    alt: "Terminal",
    imgStyle: s(3, 3, 73),
  },
  // VS Code
  {
    kind: "simple",
    src: "/icons/tools/vscode.png",
    alt: "VS Code",
    imgStyle: s(12, 12, 56),
  },
  // Illustrator
  {
    kind: "composite",
    alt: "Illustrator",
    ...adobeLayers("/icons/tools/ai-bg.svg", [
      { src: "/icons/tools/ai-logo.svg", tInset: 22.18, rInset: 24, bInset: 29.32, lInset: 20.66 },
    ]),
  },
  // Photoshop
  {
    kind: "composite",
    alt: "Photoshop",
    ...adobeLayers("/icons/tools/ps-bg.svg", [
      { src: "/icons/tools/ps-logo.svg", tInset: 8.64, rInset: 9.67, bInset: 8.63, lInset: 9.68 },
      { src: "/icons/tools/ps-text.svg", tInset: 8.64 + 43.85 * 0.3329 / 53 * 100, rInset: 9.67 + 43.55 * 0.2691 / 54 * 100, bInset: 8.63 + 43.85 * 0.3406 / 53 * 100, lInset: 9.68 + 43.55 * 0.305 / 54 * 100 },
    ]),
  },
  // After Effects
  {
    kind: "composite",
    alt: "After Effects",
    ...adobeLayers("/icons/tools/ae-bg.svg", [
      { src: "/icons/tools/ae-logo.svg", tInset: 25.72, rInset: 14.25, bInset: 28.63, lInset: 12.37 },
    ]),
  },
  // Lightroom
  {
    kind: "composite",
    alt: "Lightroom",
    ...adobeLayers("/icons/tools/lr-bg.svg", [
      { src: "/icons/tools/lr-logo.svg", tInset: 25.64, rInset: 20.8, bInset: 29.3, lInset: 25.4 },
    ]),
  },
];

const row2: Tool[] = [
  // Notion
  {
    kind: "simple",
    src: "/icons/tools/notion.svg",
    alt: "Notion",
    imgStyle: s(13, 13, 55),
  },
  // LottieFiles
  {
    kind: "simple",
    src: "/icons/tools/lottie.svg",
    alt: "LottieFiles",
    imgStyle: s(13, 13, 54),
  },
  // ClickUp
  {
    kind: "simple",
    src: "/icons/tools/clickup.svg",
    alt: "ClickUp",
    imgStyle: s(13, 12, 55),
  },
  // Higgsfield — clipped overflow image inside a rounded container
  {
    kind: "clipped",
    src: "/icons/tools/higgsfield.png",
    alt: "Higgsfield",
    containerStyle: { left: 10.81, top: 8.76, width: 60.321, height: 62.487, borderRadius: 14 },
    imgStyle: { width: 86.44, height: 86.43, left: -13.57, top: -12.32 },
  },
  // GSAP — image clipped inside a white rounded inner box
  {
    kind: "clipped",
    src: "/icons/tools/gsap.png",
    alt: "GSAP",
    containerStyle: { left: 10.44, top: 10.44, width: 59.121, height: 59.121, borderRadius: 10.948, backgroundColor: "white" },
    imgStyle: { width: 132.314, height: 69.465, left: -34.16, top: -5.17 },
  },
];
