import React, { useState } from "react";

import Navbar from "../newComponent/Navbar";
import NewHeroSection from "../newComponent/NewHeroSection";
import Projects from "../newComponent/Projects";
import Footer from "../newComponent/Footer";
import { Experience } from "../components/Experience";
import IntroScreen from "../newComponent/IntroScreen";

export default function index() {
  const [intro, setIntro] = useState(true);

  return (
    <>
      {intro && <IntroScreen onEnter={() => setIntro(false)} />}
      <section>
        <Navbar />
        <NewHeroSection />
        <Projects />
        <Experience />
        <Footer />
      </section>
    </>
  );
}
