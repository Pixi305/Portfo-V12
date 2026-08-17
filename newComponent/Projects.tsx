import Link from "next/link";
import Image from "next/image";
import { AnimatedText } from "./AnimatedText";

export default function Projects() {
  return (
    <section className="mt-12">
      <h1 className="font-semibold text-4xl md:text-[55px] my-6 text-center px-4 md:px-12 lg:px-20">
        <AnimatedText stagger={0.1}>Selected Projects</AnimatedText>
      </h1>

      {/*
        CSS sticky stacking: each card pins at top: 0 as you scroll.
        The next card (higher z-index) slides up and overlays the pinned one —
        the same visual as the GSAP pinning demo, without any JS or custom
        scroller complexity. After the last card, scroll continues normally.
      */}
      <div>
        {projectImages.map((image, i) => {
          const card = (
            <Image
              src={`/images/${image.img}`}
              alt={image.title ?? image.img}
              width={2650}
              height={1252}
              className="w-full h-auto block"
              priority={i === 0}
            />
          );

          const style: React.CSSProperties = {
            position: "sticky",
            top: 0,
            zIndex: i + 1,
          };

          return image.link ? (
            <Link
              href={image.link}
              key={image.img}
              className="block w-full"
              style={style}
            >
              {card}
            </Link>
          ) : (
            <div key={image.img} className="w-full" style={style}>
              {card}
            </div>
          );
        })}
      </div>
    </section>
  );
}

const projectImages = [
  { img: "Veedez.png", link: "/projects/veedez", title: "Veedez Pay" },
  { img: "Fara.png", link: "/projects/faramove", title: "Faramove" },
  { img: "Jeeatar.png", link: "/projects/jeetar", title: "Jeetar" },
  { img: "Alerzoshop.png", link: "", title: "Alerzoshop — Coming Soon" },
];
