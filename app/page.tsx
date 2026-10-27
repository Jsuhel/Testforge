import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import LogoStrip from "@/components/LogoStrip";
import WorkflowShowcase from "@/components/WorkflowShowcase";
import Coverage from "@/components/Coverage";
import ProductSplit from "@/components/ProductSplit";
import Capabilities from "@/components/Capabilities";
import Developers from "@/components/Developers";
import Resources from "@/components/Resources";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

/**
 * Flow mirrors the LaunchDarkly homepage, with TestForge's story in every
 * slot: hero with glowing form → widget collage → QA lifecycle strip → the
 * six-stage workflow deck → coverage map with traceability → author/run
 * split → the wider workspace (data, load, regression, reports) →
 * developers → resources → FAQ → demo form → footer.
 */
export default function Home() {
  return (
    <>
      <a
        href="#how-it-works"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-pill focus:bg-carbon focus:px-5 focus:py-2.5 focus:text-white focus:shadow-[0_0_24px_rgba(64,91,255,0.4)]"
      >
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <LogoStrip />
        <WorkflowShowcase />
        <Coverage />
        <ProductSplit />
        <Capabilities />
        <Developers />
        <Resources />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
