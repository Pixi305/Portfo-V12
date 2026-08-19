import { useState, useEffect, useRef, useCallback, createContext, useContext, type ReactNode } from "react";
import { Constants } from "../constants";
import { AuroraBackground } from "./AuroraBackground";
import { cn } from "../lib/utils";
import {
  IconBrightnessDown, IconBrightnessUp, IconCaretRightFilled, IconCaretUpFilled,
  IconChevronUp, IconMicrophone, IconMoon, IconPlayerSkipForward,
  IconPlayerTrackNext, IconPlayerTrackPrev, IconTable, IconVolume,
  IconVolume2, IconVolume3, IconSearch, IconWorld, IconCommand,
  IconCaretLeftFilled, IconCaretDownFilled,
} from "@tabler/icons-react";

// ─── Aceternity sound sprite ──────────────────────────────────────────────────

const SOUND_DOWN: Record<string, [number, number]> = {
  Escape:[2894,113],F1:[3610,98],F2:[4210,90],F3:[4758,90],F4:[5250,100],
  F5:[5831,105],F6:[6396,105],F7:[6900,105],F8:[7443,111],F9:[7955,91],
  F10:[8504,105],F11:[9046,94],F12:[9582,96],
  Backquote:[12476,100],Digit1:[12946,96],Digit2:[13470,95],Digit3:[13963,100],
  Digit4:[14481,102],Digit5:[14994,94],Digit6:[15505,109],Digit7:[15990,97],
  Digit8:[16529,92],Digit9:[17012,103],Digit0:[17550,87],Minus:[18052,93],
  Equal:[18553,89],Backspace:[19065,110],Tab:[21734,119],
  KeyQ:[22245,95],KeyW:[22790,89],KeyE:[23317,83],KeyR:[23817,92],KeyT:[24297,92],
  KeyY:[24811,93],KeyU:[25313,95],KeyI:[25795,91],KeyO:[26309,84],KeyP:[26804,83],
  BracketLeft:[27330,85],BracketRight:[27883,99],Backslash:[28393,100],
  CapsLock:[31011,126],KeyA:[31542,85],KeyS:[32031,88],KeyD:[32492,85],KeyF:[32973,87],
  KeyG:[33453,94],KeyH:[33986,93],KeyJ:[34425,88],KeyK:[34932,90],KeyL:[35410,95],
  Semicolon:[35914,95],Quote:[36428,87],Enter:[36902,117],
  ShiftLeft:[38136,133],KeyZ:[38694,80],KeyX:[39148,76],KeyC:[39632,95],KeyV:[40136,94],
  KeyB:[40621,107],KeyN:[41103,90],KeyM:[41610,93],Comma:[42110,92],Period:[42594,90],
  Slash:[43105,95],ShiftRight:[43565,137],Fn:[44251,110],ControlLeft:[45327,83],
  AltLeft:[45750,82],MetaLeft:[46199,100],Space:[51541,144],MetaRight:[47929,75],
  AltRight:[49329,82],ArrowUp:[44251,110],ArrowLeft:[49837,88],ArrowDown:[50333,90],ArrowRight:[50783,111],
};

const SOUND_UP: Record<string, [number, number]> = {
  Escape:[3014,100],F1:[3710,90],F2:[4305,80],F3:[4853,80],F4:[5355,90],
  F5:[5941,95],F6:[6506,95],F7:[7010,95],F8:[7558,100],F9:[8050,80],
  F10:[8614,95],F11:[9146,85],F12:[9682,85],
  Backquote:[12581,90],Digit1:[13046,85],Digit2:[13570,85],Digit3:[14068,90],
  Digit4:[14591,90],Digit5:[15094,85],Digit6:[15620,100],Digit7:[16090,90],
  Digit8:[16624,85],Digit9:[17122,90],Digit0:[17640,80],Minus:[18152,85],
  Equal:[18643,85],Backspace:[19180,100],Tab:[21859,110],
  KeyQ:[22345,85],KeyW:[22880,85],KeyE:[23402,80],KeyR:[23912,85],KeyT:[24392,85],
  KeyY:[24911,85],KeyU:[25413,85],KeyI:[25890,85],KeyO:[26394,80],KeyP:[26889,80],
  BracketLeft:[27415,80],BracketRight:[27988,90],Backslash:[28498,90],
  CapsLock:[31146,110],KeyA:[31632,80],KeyS:[32121,80],KeyD:[32577,80],KeyF:[33063,80],
  KeyG:[33553,85],KeyH:[34081,85],KeyJ:[34515,85],KeyK:[35027,85],KeyL:[35510,85],
  Semicolon:[36014,85],Quote:[36518,80],Enter:[37027,105],
  ShiftLeft:[38276,120],KeyZ:[38779,75],KeyX:[39228,70],KeyC:[39732,85],KeyV:[40236,85],
  KeyB:[40736,95],KeyN:[41198,85],KeyM:[41710,85],Comma:[42205,85],Period:[42689,85],
  Slash:[43205,85],ShiftRight:[43710,125],Fn:[44366,100],ControlLeft:[45412,80],
  AltLeft:[45835,80],MetaLeft:[46304,90],Space:[51691,130],MetaRight:[48004,70],
  AltRight:[49414,80],ArrowUp:[44366,100],ArrowLeft:[49927,85],ArrowDown:[50428,80],ArrowRight:[50898,100],
};

// ─── Responsive keyboard zoom ─────────────────────────────────────────────────


// ─── Lagos time ───────────────────────────────────────────────────────────────

function useLagosTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: "Africa/Lagos", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

// ─── Keyboard context ─────────────────────────────────────────────────────────

interface KbCtx {
  playSoundDown: (code: string) => void;
  playSoundUp: (code: string) => void;
  pressedKeys: Set<string>;
  setPressed: (code: string) => void;
  setReleased: (code: string) => void;
}
const KbContext = createContext<KbCtx | null>(null);
const useKb = () => useContext(KbContext)!;

function KbProvider({ children, onEnter }: { children: React.ReactNode; onEnter: () => void }) {
  const audioCtx = useRef<AudioContext | null>(null);
  const audioBuf = useRef<AudioBuffer | null>(null);
  const soundReady = useRef(false);
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    (async () => {
      try {
        audioCtx.current = new AudioContext();
        const res = await fetch("/sounds/sound.ogg");
        if (!res.ok) return;
        audioBuf.current = await audioCtx.current.decodeAudioData(await res.arrayBuffer());
        soundReady.current = true;
      } catch { /* silent */ }
    })();
    return () => { audioCtx.current?.close(); };
  }, []);

  const play = useCallback((def: [number, number] | undefined) => {
    if (!soundReady.current || !audioCtx.current || !audioBuf.current || !def) return;
    const ctx = audioCtx.current;
    const buf = audioBuf.current;
    const start = () => {
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.connect(ctx.destination);
      src.start(0, def[0] / 1000, def[1] / 1000);
    };
    if (ctx.state === "suspended") {
      ctx.resume().then(start);
    } else {
      start();
    }
  }, []);

  const playSoundDown = useCallback((code: string) => play(SOUND_DOWN[code]), [play]);
  const playSoundUp   = useCallback((code: string) => play(SOUND_UP[code]),   [play]);
  const setPressed    = useCallback((code: string) => setPressedKeys(p => new Set(p).add(code)), []);
  const setReleased   = useCallback((code: string) => setPressedKeys(p => { const n = new Set(p); n.delete(code); return n; }), []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.repeat) return;
      playSoundDown(e.code);
      setPressed(e.code);
      if (e.code === "Enter") onEnter();
    };
    const up = (e: KeyboardEvent) => {
      playSoundUp(e.code);
      setReleased(e.code);
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, [playSoundDown, playSoundUp, setPressed, setReleased, onEnter]);

  return (
    <KbContext.Provider value={{ playSoundDown, playSoundUp, pressedKeys, setPressed, setReleased }}>
      {children}
    </KbContext.Provider>
  );
}

// ─── Key components ───────────────────────────────────────────────────────────

function Key({
  keyCode, className, childrenClassName, containerClassName, children, onClickOverride,
}: {
  keyCode?: string; className?: string; childrenClassName?: string;
  containerClassName?: string; children?: React.ReactNode; onClickOverride?: () => void;
}) {
  const { playSoundDown, playSoundUp, pressedKeys, setPressed, setReleased } = useKb();
  const isPressed = keyCode ? pressedKeys.has(keyCode) : false;
  const mouseDownRef = useRef(false);

  return (
    <div className={cn("rounded-[4px] p-[0.5px]", containerClassName)}>
      <button
        type="button"
        style={{ cursor: "pointer" }}
        onMouseDown={() => {
          if (keyCode) {
            mouseDownRef.current = true;
            playSoundDown(keyCode);
            setPressed(keyCode);
          }
        }}
        onMouseUp={() => {
          if (keyCode && mouseDownRef.current) {
            mouseDownRef.current = false;
            playSoundUp(keyCode);
            setReleased(keyCode);
          }
          onClickOverride?.();
        }}
        onMouseLeave={() => {
          if (keyCode && mouseDownRef.current) {
            mouseDownRef.current = false;
            playSoundUp(keyCode);
            setReleased(keyCode);
          }
        }}
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-[3.5px] bg-neutral-100",
          "shadow-[0px_0px_1px_0px_rgba(0,0,0,0.5),0px_1px_1px_0px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(255,255,255,1)_inset]",
          "transition-all duration-75 select-none",
          isPressed && "scale-[0.96] translate-y-[1px] bg-neutral-200/80 shadow-[0px_0px_1px_0px_rgba(0,0,0,0.4),0px_0px_1px_0px_rgba(0,0,0,0.05),0px_0px_0px_0px_rgba(255,255,255,0.3)_inset]",
          className,
        )}
      >
        <div className={cn("flex h-full w-full flex-col items-center justify-center text-[5px] text-neutral-700 select-none", childrenClassName)}>
          {children}
        </div>
      </button>
    </div>
  );
}

function ModKey({
  keyCode, className, containerClassName, children, onClickOverride,
}: {
  keyCode?: string; className?: string; containerClassName?: string;
  children?: React.ReactNode; onClickOverride?: () => void;
}) {
  const { playSoundDown, playSoundUp, pressedKeys, setPressed, setReleased } = useKb();
  const isPressed = keyCode ? pressedKeys.has(keyCode) : false;
  const mouseDownRef = useRef(false);

  return (
    <div className={cn("rounded-[4px] p-[0.5px]", containerClassName)}>
      <button
        type="button"
        style={{ cursor: "pointer" }}
        onMouseDown={() => {
          if (keyCode) {
            mouseDownRef.current = true;
            playSoundDown(keyCode);
            setPressed(keyCode);
          }
        }}
        onMouseUp={() => {
          if (keyCode && mouseDownRef.current) {
            mouseDownRef.current = false;
            playSoundUp(keyCode);
            setReleased(keyCode);
          }
          onClickOverride?.();
        }}
        onMouseLeave={() => {
          if (keyCode && mouseDownRef.current) {
            mouseDownRef.current = false;
            playSoundUp(keyCode);
            setReleased(keyCode);
          }
        }}
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-[3.5px] bg-neutral-100",
          "shadow-[0px_0px_1px_0px_rgba(0,0,0,0.5),0px_1px_1px_0px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(255,255,255,1)_inset]",
          "transition-all duration-75 select-none",
          isPressed && "scale-[0.96] translate-y-[1px] bg-neutral-200/80 shadow-[0px_0px_1px_0px_rgba(0,0,0,0.4),0px_0px_1px_0px_rgba(0,0,0,0.05),0px_0px_0px_0px_rgba(255,255,255,0.3)_inset]",
          className,
        )}
      >
        <div className="flex h-full w-full flex-col items-start justify-between p-1 text-[5px] text-neutral-700 select-none">
          {children}
        </div>
      </button>
    </div>
  );
}

function OptionIcon({ className }: { className?: string }) {
  return (
    <svg fill="none" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={className}>
      <rect stroke="currentColor" strokeWidth={2} x="18" y="5" width="10" height="2" />
      <polygon stroke="currentColor" strokeWidth={2} points="10.6,5 4,5 4,7 9.4,7 18.4,27 28,27 28,25 19.6,25" />
    </svg>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">{children}</div>;
}

function Keypad({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="h-full w-fit rounded-xl bg-neutral-200 p-1 shadow-sm ring-1 shadow-black/5 ring-black/5">
      <Row>
        <Key keyCode="Escape" containerClassName="rounded-tl-xl" className="w-10 rounded-tl-lg" childrenClassName="items-start justify-end pb-[2px] pl-[4px]"><span>esc</span></Key>
        <Key keyCode="F1"><IconBrightnessDown className="h-[6px] w-[6px]" /><span className="mt-1">F1</span></Key>
        <Key keyCode="F2"><IconBrightnessUp className="h-[6px] w-[6px]" /><span className="mt-1">F2</span></Key>
        <Key keyCode="F3"><IconTable className="h-[6px] w-[6px]" /><span className="mt-1">F3</span></Key>
        <Key keyCode="F4"><IconSearch className="h-[6px] w-[6px]" /><span className="mt-1">F4</span></Key>
        <Key keyCode="F5"><IconMicrophone className="h-[6px] w-[6px]" /><span className="mt-1">F5</span></Key>
        <Key keyCode="F6"><IconMoon className="h-[6px] w-[6px]" /><span className="mt-1">F6</span></Key>
        <Key keyCode="F7"><IconPlayerTrackPrev className="h-[6px] w-[6px]" /><span className="mt-1">F7</span></Key>
        <Key keyCode="F8"><IconPlayerSkipForward className="h-[6px] w-[6px]" /><span className="mt-1">F8</span></Key>
        <Key keyCode="F9"><IconPlayerTrackNext className="h-[6px] w-[6px]" /><span className="mt-1">F9</span></Key>
        <Key keyCode="F10"><IconVolume3 className="h-[6px] w-[6px]" /><span className="mt-1">F10</span></Key>
        <Key keyCode="F11"><IconVolume2 className="h-[6px] w-[6px]" /><span className="mt-1">F11</span></Key>
        <Key keyCode="F12"><IconVolume className="h-[6px] w-[6px]" /><span className="mt-1">F12</span></Key>
        <Key containerClassName="rounded-tr-xl" className="rounded-tr-lg">
          <div className="h-4 w-4 rounded-full bg-gradient-to-b from-neutral-300 via-neutral-200 to-neutral-300 p-px">
            <div className="h-full w-full rounded-full bg-neutral-100" />
          </div>
        </Key>
      </Row>

      <Row>
        <Key keyCode="Backquote"><span>~</span><span>`</span></Key>
        <Key keyCode="Digit1"><span>!</span><span>1</span></Key>
        <Key keyCode="Digit2"><span>@</span><span>2</span></Key>
        <Key keyCode="Digit3"><span>#</span><span>3</span></Key>
        <Key keyCode="Digit4"><span>$</span><span>4</span></Key>
        <Key keyCode="Digit5"><span>%</span><span>5</span></Key>
        <Key keyCode="Digit6"><span>^</span><span>6</span></Key>
        <Key keyCode="Digit7"><span>&amp;</span><span>7</span></Key>
        <Key keyCode="Digit8"><span>*</span><span>8</span></Key>
        <Key keyCode="Digit9"><span>(</span><span>9</span></Key>
        <Key keyCode="Digit0"><span>)</span><span>0</span></Key>
        <Key keyCode="Minus"><span>—</span><span>_</span></Key>
        <Key keyCode="Equal"><span>+</span><span>=</span></Key>
        <Key keyCode="Backspace" className="w-10" childrenClassName="items-end justify-end pr-[4px] pb-[2px]"><span>delete</span></Key>
      </Row>

      <Row>
        <Key keyCode="Tab" className="w-10" childrenClassName="items-start justify-end pb-[2px] pl-[4px]"><span>tab</span></Key>
        {["Q","W","E","R","T","Y","U","I","O","P"].map(l => <Key key={l} keyCode={`Key${l}`}>{l}</Key>)}
        <Key keyCode="BracketLeft"><span>{"{"}</span><span>{"["}</span></Key>
        <Key keyCode="BracketRight"><span>{"}"}</span><span>{"]"}</span></Key>
        <Key keyCode="Backslash"><span>{"|"}</span><span>{"\\"}</span></Key>
      </Row>

      <Row>
        <Key keyCode="CapsLock" className="w-[2.8rem]" childrenClassName="items-start justify-end pb-[2px] pl-[4px]"><span>caps lock</span></Key>
        {["A","S","D","F","G","H","J","K","L"].map(l => <Key key={l} keyCode={`Key${l}`}>{l}</Key>)}
        <Key keyCode="Semicolon"><span>:</span><span>;</span></Key>
        <Key keyCode="Quote"><span>{`"`}</span><span>{`'`}</span></Key>
        <Key
          keyCode="Enter"
          className="w-[2.85rem] !bg-neutral-800 text-white shadow-[0px_0px_1px_0px_rgba(0,0,0,0.8),0px_1px_1px_0px_rgba(0,0,0,0.3),0px_1px_0px_0px_rgba(255,255,255,0.15)_inset]"
          childrenClassName="items-end justify-end pr-[4px] pb-[2px]"
          onClickOverride={onEnter}
        >
          <span className="text-white">return</span>
        </Key>
      </Row>

      <Row>
        <Key keyCode="ShiftLeft" className="w-[3.65rem]" childrenClassName="items-start justify-end pb-[2px] pl-[4px]"><span>shift</span></Key>
        {["Z","X","C","V","B","N","M"].map(l => <Key key={l} keyCode={`Key${l}`}>{l}</Key>)}
        <Key keyCode="Comma"><span>{"<"}</span><span>,</span></Key>
        <Key keyCode="Period"><span>{">"}</span><span>.</span></Key>
        <Key keyCode="Slash"><span>?</span><span>/</span></Key>
        <Key keyCode="ShiftRight" className="w-[3.65rem]" childrenClassName="items-end justify-end pr-[4px] pb-[2px]"><span>shift</span></Key>
      </Row>

      <Row>
        <ModKey keyCode="Fn" containerClassName="rounded-bl-xl" className="rounded-bl-lg">
          <span>fn</span><IconWorld className="h-[6px] w-[6px]" />
        </ModKey>
        <ModKey keyCode="ControlLeft"><IconChevronUp className="h-[6px] w-[6px]" /><span>control</span></ModKey>
        <ModKey keyCode="AltLeft"><OptionIcon className="h-[6px] w-[6px]" /><span>option</span></ModKey>
        <ModKey keyCode="MetaLeft" className="w-8"><IconCommand className="h-[6px] w-[6px]" /><span>command</span></ModKey>
        <Key keyCode="Space" className="w-[8.2rem]" />
        <ModKey keyCode="MetaRight" className="w-8"><IconCommand className="h-[6px] w-[6px]" /><span>command</span></ModKey>
        <ModKey keyCode="AltRight"><OptionIcon className="h-[6px] w-[6px]" /><span>option</span></ModKey>
        <div className="flex h-6 w-[4.9rem] items-center justify-end rounded-[4px] p-[0.5px]">
          <Key keyCode="ArrowLeft" className="h-6 w-6"><IconCaretLeftFilled className="h-[6px] w-[6px]" /></Key>
          <div className="flex flex-col">
            <Key keyCode="ArrowUp" className="h-3 w-6"><IconCaretUpFilled className="h-[6px] w-[6px]" /></Key>
            <Key keyCode="ArrowDown" className="h-3 w-6"><IconCaretDownFilled className="h-[6px] w-[6px]" /></Key>
          </div>
          <Key keyCode="ArrowRight" containerClassName="rounded-br-xl" className="h-6 w-6 rounded-br-lg">
            <IconCaretRightFilled className="h-[6px] w-[6px]" />
          </Key>
        </div>
      </Row>
    </div>
  );
}

// ─── Intro screen ─────────────────────────────────────────────────────────────

export default function IntroScreen({ onEnter }: { onEnter: () => void }) {
  const [fading, setFading] = useState(false);
  const time = useLagosTime();

  const handleEnter = useCallback(() => {
    if (fading) return;
    setFading(true);
    setTimeout(onEnter, 750);
  }, [fading, onEnter]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9998,
      opacity: fading ? 0 : 1,
      transition: "opacity 0.75s ease-in-out",
      pointerEvents: fading ? "none" : "auto",
    }}>
      <AuroraBackground className="flex flex-col items-center h-full overflow-auto">
        <KbProvider onEnter={handleEnter}>
          <div className="flex flex-col items-center w-full h-full">

            {/* Profile + Keyboard + CTA — centred as one unit */}
            <div className="flex-1 flex flex-col items-center justify-center w-full gap-6 md:gap-8 px-2 py-8">

              {/* Profile */}
              <div className="flex flex-col items-center gap-[6px]">
                <div style={{ width: 100, height: 100, borderRadius: "50%", overflow: "hidden", border: "1px solid #f3f3f3", flexShrink: 0, position: "relative" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/intro-headshot.png" alt="Pixi"
                    style={{ position: "absolute", top: "-8.26%", left: 0, width: "99.91%", height: "144.52%", maxWidth: "none", objectFit: "cover" }} />
                </div>
                <p className="font-bold text-[#202123] text-[20px] text-center leading-[1.2]">Pixi</p>
                <p className="text-[#202123] text-[16px] text-center leading-[1.2]">Senior Product Designer / Design Engineer</p>
              </div>

              {/* Keyboard */}
              <div className="flex items-center justify-center w-full overflow-hidden">
                <div className="[zoom:0.52] sm:[zoom:0.72] md:[zoom:1.0] lg:[zoom:1.3] xl:[zoom:1.6]">
                  <Keypad onEnter={handleEnter} />
                </div>
              </div>

              {/* CTA — below keyboard per Figma */}
              <p className="text-[#202123] text-[16px] md:text-[20px] text-center">
                Please Click <strong>&ldquo;Enter&rdquo;</strong>
              </p>

            </div>

            {/* Footer — matches homepage footer layout */}
            <div className="w-full flex flex-col md:flex-row items-center justify-between px-4 md:px-10 lg:px-32 pb-6 pt-4 gap-2 md:gap-0"
              style={{ color: "#202123", letterSpacing: "-0.03em" }}>
              <span className="text-sm md:text-base lg:text-lg" style={{ fontVariantNumeric: "tabular-nums" }}>
                Lagos, NG&nbsp;&nbsp;|&nbsp;&nbsp;{time}
              </span>
              <div className="flex gap-4 md:gap-10">
                <a href="https://www.linkedin.com/in/abdullateef-akinyemi/" target="_blank" rel="noreferrer noopener"
                  className="underline text-sm md:text-base lg:text-lg">LinkedIn</a>
                <a href={Constants.resumeLink} target="_blank" rel="noreferrer noopener"
                  className="underline text-sm md:text-base lg:text-lg">CV</a>
              </div>
            </div>

          </div>
        </KbProvider>
      </AuroraBackground>
    </div>
  );
}
