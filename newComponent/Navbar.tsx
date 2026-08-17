import Link from "next/link";
import Image from "next/image";
import { Constants } from "../constants";

export default function NavBar() {
  return (
    <nav className="px-4 md:px-12 lg:px-20 py-4 md:py-6 m-auto sticky top-0 bg-white z-50">
      <div className="flex items-center border border-la-gray px-4 md:px-6 py-3 md:py-4 rounded-full">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image src="/icons/b-logo.svg" alt="LA logo" width={29} height={30} />
            <span className="text-base md:text-[20px] font-medium">LA</span>
          </div>
        </Link>

        <div className="flex gap-3 md:gap-5 mx-auto font-semibold text-black text-sm md:text-base">
          <Link href="/">Home</Link>
          <a href={Constants.resumeLink} rel="noreferrer noopener" target="_blank">
            Resume
          </a>
          <Link href="/projects/about-me">About</Link>
          <a href="/">Works</a>
        </div>
      </div>
    </nav>
  );
}
