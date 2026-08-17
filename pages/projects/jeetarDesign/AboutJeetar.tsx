import Image from "next/image";
import ShimmerImage from "@/newComponent/ShimmerImage";

export default function AboutJeetar() {
  return (
    <section className="mt-12 space-y-8">
      <section className="flex flex-col justify-center px-4 md:px-10 lg:px-20 mb-4">
        <Title
          text="Jeetar"
          subText=" A super app that provides on-demand delivery services for groceries,
          with very fast delivery timeframes between 20 minutes or less. When
          you need groceries or snacks, Jeetar makes it simple and convenient to
          obtain what you need, when you need it. Jeetar's user-friendly design
          and streamlined ordering process make it simple to explore a large
          range of products, place your orders, and monitor your delivery in
          real-time."
        />
        <div className=" space-y-6">
          <div className="mt-4">
            <h3 className="text-lg font-bold">My Role</h3>
            <p className="text-lg">
              This was a project under Alerzo which is mainly to target D2C
              customer of the business to understand them better. I was the Head
              of product for this project while i lead 4 designers and managed 7
              engineers to deliver this product
            </p>
          </div>
          <div className="">
            <h3 className="text-lg font-bold">Team</h3>
            <p className="text-lg">
              Lateef Akinyemi (Me), Oluwatimilehin, Tolani (Animator), Olawole
              (3D artist), Iyanuoluwa (Creative Designer)
            </p>
          </div>
          <section className="grid grid-cols-2 gap-6 gap-y-4 mt-6">
            {jeetarProduct.map((product) => (
              <article key={product.title}>
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
                  <a className="text-la-black2">{product.text}</a>
                )}
              </article>
            ))}
          </section>
        </div>
      </section>

      <div className="flex flex-col space-y-4">
        <div className="px-4 md:px-10 lg:px-20">
          <Title
            text="Brand Assets"
            subText=" In the early stage of this project i introduced a glassmorphism icon
            set which was later enhanced across the application, i also
            introduced the typeface picking a very straight sans serif typeface
            to help communicate well visually on digital screens, also the
            colors met accessibility standards."
          />
        </div>
        <ShimmerImage
          src="/images/jeetar-brand-identity.png"
          alt="Jeetar brand identity"
          width={1920}
          height={1080}
          className="container w-full h-auto"
        />
      </div>

      <section className="">
        <div className="px-4 md:px-10 lg:px-20">
          <Title
            text="The Problem"
            subText="Homes, colleges, and similar settings often face the constant
            challenge of needing something but lacking the means to obtain it,
            whether due to limited access, late hours, or sheer convenience;
            Jeetar solves this by delivering whatever you need in 20 minutes or
            less. The problem arises from the difficulty of shopping in areas
            plagued by traffic, insecurity, and counterfeit products, leaving
            users frustrated with delivery delays, high prices, and unreliable
            products. Given the large B2C e-commerce market, there's a
            significant opportunity to address these pain points."
          />
        </div>
      </section>
      <section>
        <div className="px-4 md:px-10 lg:px-20">
          <Title
            text="The Solution"
            subText=" 20-minute delivery grocery app should prioritize a user-friendly
            interface for seamless navigation, provide efficient delivery to
            save users the time and effort of physical shopping, and offer a
            wide range of fresh products, addressing common challenges like
            complicated apps, time-consuming trips, and concerns about product
            availability and freshness."
          />
        </div>
      </section>
      <section>
        <div className="px-4 md:px-10 lg:px-20">
          <Title
            text="Research & Insight"
            subText=" Efficient logistics, freight forwarding, supply chain financing, and
            customs brokerage are crucial for moving goods across borders, yet
            they face significant challenges due to historical, economic,
            technological, and geopolitical factors. Before embarking on this
            project, I recognized the importance of establishing a solid
            foundation in logistics, so I conducted thorough research into the
            courier service market, focusing on understanding user perspectives
            and the industry's current issues. This groundwork helped me uncover
            the key dynamics contributing to these logistics and freight
            problems."
          />
        </div>
      </section>
      <section>
        <div className="mt-10">
          <h3 className="text-3xl md:text-5xl font-bold mb-2 text-center">
            Competitors - Comparing Existing Competitors
          </h3>
          <p className="text-lg px-4 md:px-10 lg:px-20 ">
            In collaboration with the Project Manager, competitive analysis of
            similar platforms was conducted. This research confirmed Jeetar's
            strong potential to offer a unique value proposition in the market.
          </p>
        </div>
        <div className="mt-8 container">
          <ShimmerImage src="/images/competitor.png" alt="Competitor analysis" width={1920} height={1080} className="w-full h-auto" />
        </div>
      </section>

      <div className="container">
        <ShimmerImage src="/images/swot-analysis.png" alt="SWOT analysis" width={1920} height={1080} className="w-full h-auto" />
      </div>
    </section>
  );
}

const jeetarProduct: Array<{
  title: string;
  icon?: string;
  text?: string;
  link?: string;
}> = [
  { title: "Timeline", icon: "", text: "Aug 2021 - Discounted" },
  { title: "Website", icon: "link", text: "https://Jeetar.com", link: "https://jeetar-ea.vercel.app/" },
  { title: "Twitter(X)", icon: "link", text: "https://x.com/jeetarapp", link: "https://x.com/jeetarapp" },
];

const Title = ({ text, subText }: { text?: string; subText?: string }) => {
  return (
    <div>
      <h1 className="text-[48px] title font-extrabold">{text}</h1>
      <p className="text-lg">{subText}</p>
    </div>
  );
};
