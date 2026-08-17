import Link from "next/link";
import Image from "next/image";
import ShimmerImage from "@/newComponent/ShimmerImage";

export default function FaramoveProcess() {
  return (
    <section className="mt-10 space-y-8">
      <div className="flex flex-col justify-center px-4 md:px-10 lg:px-20">
        <Title
          text="The Process"
          subText="We were supposed to adopt Agile design framework,
            also known as Agile UX or Lean UX,
            which integrates design principles into Agile software development
            methodologies. This framework emphasises iterative development, collaboration between cross-functional teams, and
            continuous improvement based on user feedback. We were supposed to adopt Agile design framework, also known as
            Agile UX or Lean UX, which integrates design principles into Agile
            software development methodologies. This framework emphasises
            iterative development, collaboration between cross-functional teams
            , and continuous improvement based on user feedback.
            While we adapted the design thinking framework to fit our project
            timeline and resource constraints, prioritising user research
            remained paramount. This ensured we addressed the core needs of our
            users even if the process wasn't strictly linear, smart right? I
            know!
               We utilised Jira , a popular Agile tool, to manage our sprints, track user stories,
            and maintain project transparency."
        />
      </div>
      <div className="container">
        <ShimmerImage src="/images/our-process.png" alt="Our process" width={1920} height={1080} className="w-full h-auto" />
      </div>
      <div className="container">
        <ShimmerImage src="/images/information.png" alt="Information architecture" width={1920} height={1080} className="w-full h-auto" />
      </div>
      <div className="bg-[#FAFAFA] rounded-3xl container">
        <ShimmerImage src="/images/wireframesketch.png" alt="Wireframe sketches" width={1920} height={1080} className="w-full h-auto" />
      </div>

      <div className="flex flex-col justify-center px-4 md:px-10 lg:px-20">
        <Title
          text="Final Design"
          subText="Leveraging the research, insights, and initial sketches, we
          transitioned to the visual design phase. With a user-centric approach,
          we employed cutting-edge design concepts to create an interface that
          prioritises usability. Following an iterative design process, we
          finalised the design in stages, incorporating user feedback at each
          step. This ensured a gradual and critical refinement, ultimately
          delivering a visually appealing and user-friendly solution."
        />
      </div>
      <div className="container">
        <ShimmerImage src="/images/iteration.png" alt="Design iteration" width={1920} height={1080} className="w-full h-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10 container">
        {designSteps.map((step, index) => (
          <div key={index}>
            <ShimmerImage
              src={`/images/${step.image}.png`}
              alt={step.image}
              width={960}
              height={720}
              className="w-full h-auto"
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 space-y-8 container">
        {appDetails.map((app, index) => (
          <div key={index} className="flex flex-col space-y-4">
            <h3 className="text-3xl text-[#16063E] font-bold text-center mb-4">
              {app.title}
            </h3>
            <ShimmerImage src={app.image} alt={app.alt} width={1920} height={1080} className="w-full h-auto" />
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center px-4 md:px-10 lg:px-20 pt-10">
        <Title
          text="Result"
          subText="One month post-launch, we're seeing positive results! The product team
          is collaborating closely with marketing to develop targeted campaigns
          that leverage data insights and raise brand awareness. This may
          include initiatives like billboard advertising."
        />
      </div>
      <div className="container">
        <ShimmerImage src="/images/farapersona.png" alt="User persona" width={1920} height={1080} className="w-full h-auto" />
      </div>
      <Link href={"/projects/jeetar"} className="cursor-pointer">
        <div className="px-4 py-16 relative">
          <h1 className="text-[48px] font-medium">Next Project</h1>
          <div className="relative">
            <ShimmerImage src="/images/jeet.png" alt="Jeetar project" width={1920} height={400} className="w-full h-auto" />
            <div className="absolute top-1/2 left-0 w-full h-[26px] bg-la-blue/90 scale-x-0 group-hover:scale-x-100 transform transition-transform duration-300 ease-in-out origin-left -translate-y-1/2"></div>
          </div>
        </div>
      </Link>
    </section>
  );
}

const designSteps: { image: string }[] = [
  { image: "authentication" },
  { image: "homepage-app" },
  { image: "bookings" },
  { image: "financeapp" },
  { image: "billing-app" },
  { image: "brokerage" },
];

const appDetails = [
  { title: "Website", image: "/images/website.png", alt: "Web Image" },
  { title: "User Mobile App", image: "/images/userMobileApp.png", alt: "User Mobile App Image" },
  { title: "User Web App", image: "/images/userWebApp.png", alt: "User Web App Image" },
  { title: "Rider Mobile App", image: "/images/riderApp.png", alt: "Rider Mobile App Image" },
];

const Title = ({ text, subText }: { text?: string; subText: string }) => {
  return (
    <div>
      <h1 className="text-[48px] title font-extrabold mb-3">{text}</h1>
      <p className="text-lg">{subText}</p>
    </div>
  );
};
