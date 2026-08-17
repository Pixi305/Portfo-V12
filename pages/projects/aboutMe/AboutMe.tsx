import React from "react";
import Image from "next/image";
import { AnimatedText } from "../../../newComponent/AnimatedText";

export default function AboutMe() {
  return (
    <section className="relative mx-4 md:mx-10 lg:mx-14 rounded-[32px] overflow-hidden border border-la-gray4 bg-la-gray4">
      <div className="flex flex-col lg:flex-row min-h-[490px]">
        {/* Left content */}
        <div className="flex flex-col text-black py-8 md:py-10 px-5 md:px-10 flex-1">
          <h1 className="text-3xl md:text-[40px] font-semibold title max-w-full lg:max-w-[446px] mb-4">
            <AnimatedText withScrollTrigger={false} stagger={0.06}>
              Lateef Akinyemi, Senior Product Designer & Design Engineer
            </AnimatedText>
          </h1>
          <div className="flex flex-wrap gap-2 items-start mb-8">
            {skillSet.map((skill) => (
              <p
                key={skill.text}
                className="text-black px-4 py-2 text-xs rounded-full border border-la-bdgray bg-la-bdgray"
              >
                {skill.text}
              </p>
            ))}
          </div>
          <p className="text-sm md:text-base max-w-full lg:max-w-[630px] text-[#595959] mb-8">
            Senior Design Engineer and Product Designer with 6+ years building digital products across edtech, fintech, logistics, and ecommerce. I take products from concept to launch, leading UX research, product design, and front end implementation using Figma, Claude Code, Cursor, Supabase, Sanity, and Netlify. Proven track record of scaling products beyond $1M in monthly transactions, enabling 50K+ monthly orders, and creating design systems that drive growth, usability, and business outcomes.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-auto">
            <a
              href="mailto:akinyemilateefgbolahan@gmail.com"
              rel="noreferrer noopener"
              target="_blank"
              className="text-white px-4 py-2 rounded-full border border-black bg-black font-medium text-sm md:text-base"
            >
              Contact me
            </a>
            <div className="flex items-center gap-4">
              {SocialLinks.map((link) => (
                <a key={link.alt} href={link.link} rel="noopener noreferrer" target="_blank">
                  <Image quality={75} height={24} width={24} src={link.img} alt={link.alt} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right image panel — fills card height on desktop */}
        <div className="relative w-full h-72 lg:h-auto lg:w-[443px] lg:flex-shrink-0">
          <Image
            src="/images/profile.png"
            alt="Lateef Akinyemi"
            fill
            priority
            className="object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
}

const skillSet = [
  { text: "PRODUCT DESIGN" },
  { text: "CREATIVE" },
  { text: "MOTION" },
  { text: "DEV" },
  { text: "DESIGN ENGINEER" },
];

const SocialLinks = [
  { img: "/icons/dribble.svg", alt: "dribble", link: "https://dribbble.com/pixifinger" },
  { img: "/icons/github.svg", alt: "github", link: "https://github.com/Pixi305" },
  { img: "/images/linkedin.svg", alt: "linkedin", link: "https://www.linkedin.com/in/abdullateef-akinyemi/" },
  {
    img: "/icons/adplist.svg",
    alt: "adplist",
    link: "https://adplist.org/mentors/lateef-akinyemi?impact_swag=https://hcti.io/v1/image/abebeda1-d76b-40ce-9013-8b43b3d12f9d",
  },
];
