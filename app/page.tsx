import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import HowItWorks from "@/components/HowItWorks";
import ChatSpotlight from "@/components/ChatSpotlight";
import DataSpotlight from "@/components/DataSpotlight";
import Trust from "@/components/Trust";
import FailureSpotlight from "@/components/FailureSpotlight";
import Coverage from "@/components/Coverage";
import Audience from "@/components/Audience";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a
        href="#how-it-works"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <HowItWorks />
        <ChatSpotlight />
        <DataSpotlight />
        <Trust />
        <FailureSpotlight />
        <Coverage />
        <Audience />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
