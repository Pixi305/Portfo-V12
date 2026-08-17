import Image from "next/image";
import ToolsSection from "./ToolsSection";

const experiences = [
  { company: "QEDA", role: "Principal Tech & Operations Associate (Design Engineer)", start: "Oct 2024", end: "Present", contractType: "Full-time" },
  { company: "Faramove", role: "Product Lead, Design & Dev", start: "September 2024", end: "November 2025", contractType: "Full Time" },
  { company: "Alerzo", role: "Senior Product Designer", start: "May 2021", end: "Sept 2024", contractType: "Full-time" },
  { company: "Rendize", role: "Product Designer", start: "January 2020", end: "June 2021", contractType: "Full Time" },
];

export default function OtherFields() {
  return (
    <section className="space-y-12 mx-4 md:mx-12 lg:mx-20 pb-12">
      <div className="flex flex-col justify-center mt-10">
        <p className="text-sm font-medium text-center">Mentoring & Membership</p>
        <div className="flex gap-8 md:gap-16 justify-center mt-4">
          <Image src="/icons/adp.svg" alt="adp" width={137} height={37} />
          <Image src="/icons/foundation.svg" alt="foundation" width={132} height={43} />
        </div>
      </div>

      <div>
        <ToolsSection />
      </div>

      <section id="experience" className="mt-12 mb-20 px-[26px]">
        <h2 className="text-4xl md:text-[55px] font-semibold leading-tight md:leading-[56px] mb-12 md:mb-24 text-center">
          Experiences
        </h2>
        <div className="grid items-start grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
          {experiences.map((exp, i) => (
            <article key={exp.company + i} className="flex flex-col gap-1">
              <h4 className="text-2xl md:text-[28px] font-extrabold leading-tight">{exp.company}</h4>
              <p className="text-base md:text-lg font-semibold text-la-black2 leading-snug">{exp.role}</p>
              <p className="text-sm md:text-base font-medium text-la-gray2 mt-1">
                {exp.start} – {exp.end}
              </p>
              {exp.contractType && (
                <p className="text-sm md:text-base font-medium text-la-gray2">{exp.contractType}</p>
              )}
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
