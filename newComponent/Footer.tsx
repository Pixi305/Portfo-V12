import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatedText } from "./AnimatedText";
import { Constants } from "../constants";

export default function Footer() {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const scrollToTop = (): void => {
    const scrollTarget = document.querySelector("#__next > main");
    if (scrollTarget) {
      scrollTarget.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="py-[70px] bg-la-gray4">
      <section className="flex flex-col items-start md:items-center justify-center px-4 md:px-10 lg:px-32 text-left md:text-center">
        <h5 className="text-3xl md:text-4xl lg:text-5xl text-la-gray3 font-medium title mb-4 text-start">
          <AnimatedText stagger={0.025}>
            Want to reach out about a project, collaboration or just want to say a friendly hello?
          </AnimatedText>
        </h5>
        <div className="flex flex-col md:flex-row gap-2 md:gap-3 items-start md:items-center justify-center mt-10">
          <a
            href="mailto:akinyemilateefgbolahan@gmail.com"
            className="font-medium text-2xl md:text-4xl lg:text-[80px] title hover:underline"
            target="_blank"
            rel="noreferrer noopener"
          >
            <AnimatedText stagger={0.18}>Get in Touch</AnimatedText>
          </a>
        </div>
      </section>

      <div className="mt-10 md:mt-12 flex flex-1 justify-center">
        <Image
          src="/images/FooterLogo.png"
          alt="Footer Logo"
          width={2875}
          height={869}
          className="md:max-w-full lg:max-w-full w-full h-auto"
        />
      </div>

      <div className="flex flex-col md:flex-row w-full justify-between items-center mt-14 container px-4 md:px-10 lg:px-32 text-sm md:text-base lg:text-lg">
        <div className="flex gap-2 md:gap-3">
          <span>Lagos, NG</span> |<span>{currentTime}</span>
        </div>
        <div className="flex gap-4 md:gap-10 mt-4 md:mt-0">
          <a
            className="underline"
            href={Constants.linkedinLink}
            target="_blank"
            rel="noreferrer noopener"
          >
            LinkedIn
          </a>
          <a
            className="underline"
            href={Constants.resumeLink}
            target="_blank"
            rel="noreferrer noopener"
          >
            CV
          </a>
        </div>
        <button
          onClick={scrollToTop}
          className="mt-4 md:mt-0 cursor-pointer bg-transparent border-none text-left p-0"
        >
          Back to top☝🏾☝🏾☝🏾︎
        </button>
      </div>
    </footer>
  );
}
