import Image from "next/image";
import ShimmerImage from "@/newComponent/ShimmerImage";

export default function AboutFaramove() {
  return (
    <section className="mt-12 space-y-8">
      <section className="flex flex-col justify-center mb-4 px-4 md:px-10 lg:px-20 space-y-8">
        <Title
          text="Faramove"
          subText=" Faramove aims to revolutionise the logistics and freight forwarding
          industry by addressing key challenges faced by businesses in
          transporting goods across states, countries, and international
          borders. Leveraging cutting-edge technology, this platform streamlines
          the entire process, ensuring swift and efficient transportation of
          goods. With seamless automation, users experience a user-friendly
          interface, simplifying the logistics experience"
        />

        <div className=" space-y-6">
          <div>
            <h3 className="text-lg font-bold">My Role</h3>
            <p className="text-lg">
              I was the lead designer for this project, I designed the Customer
              & Driver's app and also coordinated the design process from start
              to launch alongside the Project Manager, Developers and 4 other
              Designers.
            </p>
          </div>
          <div className="">
            <h3 className="text-lg font-bold">Team</h3>
            <p className="text-lg">
              Lateef Akinyemi (Me), Oluwatimilehin, Arafat, Moses, Tolani
              (Animator), Olawole (3D designer){" "}
            </p>
          </div>
          <section className="grid grid-cols-2 md:grid-cols-3 gap-6 gap-y-4 mt-6">
            {faraProduct.map((product) => (
              <article
                key={product.title}
                className="flex flex-col"
              >
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

      <div className="container">
        <ShimmerImage src="/images/faracomponent.png" alt="Faramove components" width={1920} height={1080} className="w-full h-auto" />
      </div>
      <div className="flex flex-col space-y-4 ">
        <div className="px-4 md:px-10 lg:px-20">
          <Title
            text="Brand Assets"
            subText="These are few brand asset i led the creative on and added my contributions to."
          />
        </div>
        <ShimmerImage src="/images/brandAssets.png" alt="Brand assets" width={1920} height={1080} className="container w-full h-auto" />
      </div>

      <section>
        <div className="mt-10 px-4 md:px-10 lg:px-20">
          <Title
            text="The Problem"
            subText="In today's global marketplace, the transportation of goods faces
            myriad challenges, including inefficiencies, delays, and financial
            constraints. Despite technological advancements, businesses struggle
            with navigating complex logistics systems and managing payments,
            resulting in frustration and underserved needs. Faramove aims to
            revolutionise this landscape by offering an innovative solution that
            streamlines transportation while addressing financial barriers.
            However, the lack of a seamless, integrated platform poses a
            significant challenge. There's a pressing need for a comprehensive
            solution that simplifies transportation and offers flexible
            financing options, empowering users to navigate the global supply
            chain with confidence. Faramove seeks to redefine logistics,
            providing a user-friendly experience that transcends traditional
            boundaries."
          />
        </div>
      </section>
      <section>
        <div className="px-4 md:px-10 lg:px-20 mt-10">
          <Title
            text="The Solution"
            subText="Our collaborative brainstorming sessions yielded a wealth of
            innovative solutions that directly addressed our users' challenges.
            This user-centred approach fostered deeper empathy for their needs,
            preferences, and frustrations. It also ensured our solutions aligned
            perfectly with our business objectives. Through an iterative design
            process, we refined our initial ideas, prioritising the most
            impactful strategies. Tight deadlines necessitated a focus on
            high-fidelity prototypes, allowing us to move swiftly from concept
            to testable solution."
          />
        </div>
      </section>
      <section>
        <div className="px-4 md:px-10 lg:px-20 mt-10">
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
        <div className="my-12">
          <ShimmerImage src="/images/farapersons.png" alt="User personas" width={1920} height={1080} className="container w-full h-auto" />
        </div>
      </section>
      <section>
        <div className="mt-10">
          <h3 className="text-3xl md:text-5xl font-bold mb-2 flex-1 text-center">
            Competitors - Comparing Existing Competitors
          </h3>
          <p className="px-4 md:px-10 lg:px-20 text-lg text-start">
            In collaboration with the Project Manager, competitive analysis of
            similar platforms was conducted. This research confirmed Faramove's
            strong potential to offer a unique value proposition in the market.
          </p>
        </div>
      </section>

      <div className="pt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 container">
          <ShimmerImage className="w-full h-[100px] md:h-[124px] object-contain" src="/images/gig.png" alt="Gig" width={282} height={124} />
          <ShimmerImage className="w-full h-[100px] md:h-[124px] object-contain" src="/images/flexport.png" alt="Flexport" width={282} height={124} />
          <ShimmerImage className="w-full h-[100px] md:h-[124px] object-contain" src="/images/gokada.png" alt="Gokada" width={282} height={124} />
          <ShimmerImage className="w-full h-[100px] md:h-[124px] object-contain" src="/images/speedaf.png" alt="Speedaf" width={282} height={124} />
        </div>
        <p className="text-center mt-6 italic text-[#625D6F]">
          Popular competitors
        </p>
      </div>
      <div className="container">
        <ShimmerImage src="/images/swotAnalysis.png" alt="SWOT analysis" width={1920} height={1080} className="w-full h-auto" />
      </div>
    </section>
  );
}

const faraProduct: Array<{
  title: string;
  icon?: string;
  text?: string;
  link?: string;
}> = [
  { title: "Timeline", icon: "", text: "May 2023 - Ongoing" },
  { title: "Website", icon: "link", text: "https://Faramove.com", link: "https://faramove.com" },
  { title: "Appstore", icon: "link", text: "IOS", link: "https://veedezpay.com" },
  { title: "Playstore", icon: "link", text: "Android", link: "https://apps.apple.com/ng/app/veedez/id1600437976" },
  { title: "Instagram", icon: "link", text: "https://www.instagram.com/faramovehq/", link: "https://apps.apple.com/ng/https://www.instagram.com/faramovehq" },
  { title: "Twitter(X)", icon: "link", text: "https://x.com/FaramoveHq", link: "https://x.com/FaramoveHq" },
];

const Title = ({ text, subText }: { text?: string; subText: string }) => {
  return (
    <div>
      <h1 className="text-[48px] title font-extrabold mb-3">{text}</h1>
      <p className="text-lg">{subText}</p>
    </div>
  );
};
