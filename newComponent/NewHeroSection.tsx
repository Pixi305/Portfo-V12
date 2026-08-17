import Image from "next/image";
import { AnimatedText } from "./AnimatedText";

export default function NewHeroSection() {
  return (
    <section className="mx-4 md:mx-12 lg:mx-20">
      <section className="flex flex-col lg:flex-row justify-between gap-6">
        <div className="flex flex-col text-black p-5 md:p-6 border border-la-gray4 bg-la-gray4 flex-1 rounded-2xl">
          <div className="space-y-4 md:space-y-6">
            <h1 className="text-3xl md:text-[40px] font-semibold title max-w-full lg:max-w-[446px]">
              <AnimatedText withScrollTrigger={false} stagger={0.06}>
                {"Lateef Akinyemi, Senior Product Designer & Design Engineer"}
              </AnimatedText>
            </h1>
            <p className="text-sm md:text-base max-w-full lg:max-w-[702px] text-[#595959]">
              Senior Design Engineer and Product Designer with 6+ years building digital products across edtech, fintech, logistics, and ecommerce. I take products from concept to launch, leading UX research, product design, and front end implementation using Figma, Claude Code, Cursor, Supabase, Sanity, and Netlify. Proven track record of scaling products beyond $1M in monthly transactions, enabling 50K+ monthly orders, and creating design systems that drive growth, usability, and business outcomes.
            </p>
            <div className="flex flex-wrap gap-2 items-start">
              {skillSet.map((skill) => (
                <p
                  key={skill.text}
                  className="text-black px-3 py-2 text-xs rounded-full border border-la-bdgray bg-la-bdgray"
                >
                  {skill.text}
                </p>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-8 lg:mt-auto">
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

        <div className="w-full lg:max-w-[513px] lg:flex-shrink-0">
          <Image
            src="/images/profile.jpg"
            alt="Lateef"
            width={1026}
            height={986}
            priority
            className="w-full h-auto rounded-2xl object-cover"
          />
        </div>
      </section>

      <div className="flex flex-col justify-center mt-10">
        <p className="text-sm font-medium text-center">Mentoring & Membership</p>
        <div className="flex gap-8 md:gap-16 justify-center mt-4">
          <Image src="/icons/adp.svg" alt="adp" width={137} height={37} />
          <Image src="/icons/foundation.svg" alt="foundation" width={132} height={43} />
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
