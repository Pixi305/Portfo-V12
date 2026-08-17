import Link from "next/link";
import Image from "next/image";
import ShimmerImage from "@/newComponent/ShimmerImage";

export default function JeetarProcess() {
  return (
    <section className="mt-10 space-y-8">
      <div className="flex flex-col justify-center px-4 md:px-10 lg:px-20">
        <Title
          text="The process"
          subText="This project followed an agile design and software development
            process, where we applied the two-pizza rule by keeping the team
            small to enable faster progress. The approach emphasized iterative
            development, cross-functional collaboration, and continuous
            improvement. Given the tight 3-month launch timeline, we focused on
            what was achievable, using rapid user feedback to prioritize the
            most critical needs at each phase of development."
        />
      </div>
      <div className="container">
        <ShimmerImage src="/images/our-process.png" alt="Our process" width={1920} height={1080} className="w-full h-auto" />
      </div>
      <div className="container">
        <ShimmerImage src="/images/jeetar-wireframe.png" alt="Wireframes" width={1920} height={1080} className="w-full h-auto" />
      </div>
      <div className="bg-[#FAFAFA] rounded-3xl container">
        <ShimmerImage src="/images/jeetar-fidelity.png" alt="High fidelity" width={1920} height={1080} className="w-full h-auto" />
      </div>

      <div className="flex flex-col justify-center px-4 md:px-10 lg:px-20">
        <Title
          text="Final Design"
          subText=" Leveraging the research, insights, and initial sketches, we
          transitioned to the visual design phase. With a user-centric approach,
          we employed cutting-edge design concepts to create an interface that
          prioritises usability. Following an iterative design process, we
          finalised the design in stages, incorporating user feedback at each
          step. This ensured a gradual and critical refinement, ultimately
          delivering a visually appealing and user-friendly solution."
        />
      </div>
      <div className="grid grid-cols-1 space-y-12 container">
        {appDetails.map((app, index) => (
          <div key={index} className="flex flex-col space-y-8">
            <h3 className="text-3xl text-[#16063E] font-bold text-center mb-4">
              {app.title}
            </h3>
            <ShimmerImage src={app.image} alt={app.alt} width={1920} height={1080} className="w-full h-auto" />
          </div>
        ))}
      </div>
      <div className="mt-10 px-4 md:px-10 lg:px-20">
        <Title
          text="Result"
          subText="Check out this awesome feedback from one of our satisfied customers on
          Twitter. They love how our app has made their life easier and more
          convenient."
        />
      </div>
      <div className="m-0 p-0">
        <ShimmerImage src="/images/jeetar-feedback.png" alt="Customer feedback" width={1920} height={1080} className="w-full h-auto" />
      </div>

      <section className="mt-10">
        <div className="mt-10 px-4 md:px-10 lg:px-20">
          <Title
            text="Delivery Photos"
            subText="These are shots from different customers , how we were able to
            deliver what we promise in minutes."
          />
        </div>
        <ShimmerImage
          src="/images/jeetar-images.png"
          alt="Delivery photos"
          width={1920}
          height={1080}
          className="block w-full mt-8 container h-auto"
        />
      </section>
      <Link href={"/projects/veedez"} className="cursor-pointer">
        <div className="px-4 py-12 relative">
          <h1 className="text-[48px] font-medium">Next Project</h1>
          <div className="relative">
            <ShimmerImage src="/images/veed.png" alt="Veedez project" width={1920} height={400} className="w-full h-auto" />
            <div className="absolute top-1/2 left-0 w-full h-[26px] bg-la-blue/90 scale-x-0 group-hover:scale-x-100 transform transition-transform duration-300 ease-in-out origin-left -translate-y-1/2"></div>
          </div>
        </div>
      </Link>
    </section>
  );
}

const appDetails = [
  { title: "Onboarding", image: "/images/jeetar-onboarding.png", alt: "Onboarding" },
  { title: "Checkout Process", image: "/images/jeetar-checkout.png", alt: "Checkout Process" },
  { title: "Wallet & Rewards", image: "/images/jeetar-wallet.png", alt: "Wallet & Rewards" },
  { title: "Website", image: "/images/jeetar-webapp.png", alt: "Website" },
];

const Title = ({ text, subText }: { text?: string; subText?: string }) => {
  return (
    <div>
      <h1 className="text-[48px] title font-extrabold mb-3">{text}</h1>
      <p className="text-lg">{subText}</p>
    </div>
  );
};
