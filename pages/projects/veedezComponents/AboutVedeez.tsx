import Image from "next/image";
import ShimmerImage from "@/newComponent/ShimmerImage";

export default function AboutVeedez() {
  return (
    <section className="mt-12 ">
      <section className="flex flex-col justify-center px-4 md:px-10 lg:px-20 mb-4 space-y-8 ">
        <Title
          text="Veedez"
          subText="Veedez is a complete business solution that helps manage inventory,
          sales, invoicing, and payments. It offers secure payment options,
          including card, online, and cardless withdrawals, and provides instant
          loans for MSMEs. VeedezPro allows real-time tracking, sales analytics,
          customer management, and payroll handling. Larger businesses can
          benefit from the Enterprise Plan with advanced features and
          customisation. Veedez is ideal for businesses of all sizes, from
          freelancers to retailers."
        />
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold">My role</h3>
            <p className="text-lg">
              I developed the design system for both the first and second
              versions of this project and played a key role in crafting the
              OAuth integration, bill payment flow, and money transfer
              processes. Additionally, I ensured seamless collaboration across
              the team and contributed to enhancing the scalability of the
              design system.
            </p>
          </div>
          <div className="">
            <h3 className="text-2xl font-bold">Team</h3>
            <p className="text-lg">
              Lateef Akinyemi (Me), Deborah, Ayodeji, Toluwalase
            </p>
          </div>
        </div>
        <section className="flex justify-between mt-6">
          {veedezProduct.map((product) => (
            <article key={product.title} className="">
              <h4 className="text-lg font-extrabold">{product.title}</h4>

              {product.icon ? (
                <div className="flex gap-2 items-center">
                  <Image
                    className="h-4 w-4"
                    src={`/icons/${product.icon}.svg`}
                    alt=""
                    width={16}
                    height={16}
                  />
                  <a
                    href={product.link}
                    className=" text-la-black2 underline cursor-pointer"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {product.text}
                  </a>
                </div>
              ) : (
                <a className=" text-la-black2">{product.text}</a>
              )}
            </article>
          ))}
        </section>
        <div className="pt-8">
          <Title
            text="Veedez (V1) Component"
            subText="In the early stages of this project, I introduced a glassmorphism
            icon set, which was later refined and applied throughout the
            application. I also selected a clean, sans-serif typeface to enhance
            visual communication on digital screens, ensuring the colors met
            accessibility standards."
          />
        </div>
      </section>
      <div className="pb-6 container">
        <ShimmerImage src="/images/veedezcomp.png" alt="Veedez components" width={1920} height={1080} className="w-full h-auto" />
      </div>
      <section>
        <div className="px-4 md:px-10 lg:px-20 mt-10 mb-8">
          <Title
            text="Research & Insight"
            subText="We conducted user interviews to validate our problem-solving idea.
          The goal of design research is to shape the design process
            from the end user's perspective. While I, as an average Nigerian,
            can empathize with the problem, it's essential that design decisions
            reflect the user's view.We started by asking, 'Who will be using our product?' and 'Who is our target audience?'
             Research in Nigeria shows that the
          largest group of internet users falls between the ages of 18-60,
            covering Gen Z, Millennials, and Gen X. This group includes
           students, workers, and some retirees, with the majority of
            users fitting within this age range.
          Our focus will be on micro-business owners and older users,
            as they are most likely to be our primary target audience.
          Meet Rhoda, Mama Femi, and Mr. Frances..."
          />
        </div>
      </section>
      <div className="container">
        <ShimmerImage src="/images/pain-point.png" alt="Pain points" width={1920} height={1080} className="w-full h-auto" />
      </div>
    </section>
  );
}

const veedezProduct: Array<{
  title: string;
  icon?: string;
  text: string;
  link?: string;
}> = [
  {
    title: "Timeline",
    icon: "",
    text: "Aug 2023 - Ongoing",
  },
  {
    title: "Visit Project (V1 Formerly Alerzopay)",
    icon: "link",
    text: "https://veedezpay.com",
    link: "https://veedezpay.com",
  },
  {
    title: "Visit Project (V2 - Veedez Pro)",
    icon: "link",
    text: "https://veedez.com",
    link: "https://veedezpay.com",
  },
  {
    title: "Appstore",
    icon: "link",
    text: "IOS",
    link: "https://apps.apple.com/ng/app/veedez/id1600437976",
  },
];

const Title = ({ text, subText }: { text?: string; subText: string }) => {
  return (
    <div>
      <h1 className="text-[48px] title font-extrabold mb-3">{text}</h1>
      <p className="text-lg">{subText}</p>
    </div>
  );
};
