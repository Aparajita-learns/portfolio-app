import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProjectsGallery from "@/components/ProjectsGallery";

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-20 pb-12">
      {/* Hero Section */}
      <section className="mb-24">
        <div className="inline-flex items-center gap-2 rounded-full bg-(--color-cream-dark) px-4 py-2 mb-8 border border-(--color-ink)/10">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-(--color-success) opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-(--color-success)"></span>
          </span>
          <span className="text-xs font-medium tracking-wide">Available for new opportunities</span>
        </div>
        
        <h1 className="font-serif text-5xl md:text-7xl leading-tight tracking-tight mb-6">
          Crafting <span className="italic text-(--color-accent)">elegant</span> solutions to complex problems.
        </h1>
        <p className="text-lg opacity-80 max-w-2xl mb-10 leading-relaxed">
          A product manager who thrives at the intersection of user empathy, intuitive experiences, AI, and execution—using data to uncover user pain points, validating opportunities with evidence, and building products that feel effortless while delivering meaningful impact.
        </p>
        
        <div className="flex gap-4">
          <Link href="/work" className="inline-flex items-center gap-2 rounded-full bg-(--color-dark) text-(--color-cream) px-6 py-3 font-medium hover:bg-(--color-ink) transition-all hover:-translate-y-1 hover:shadow-lg">
            See my work <ArrowRight size={18} />
          </Link>
          <Link href="/about" className="inline-flex items-center gap-2 rounded-full border border-(--color-ink)/20 px-6 py-3 font-medium hover:bg-(--color-cream-dark) transition-all">
            More about me
          </Link>
        </div>
      </section>

      {/* What I Do Section */}
      <section className="mb-24">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-(--color-ink)/10"></div>
          <span className="text-sm font-bold tracking-widest uppercase opacity-50">What I Do</span>
          <div className="h-px flex-1 bg-(--color-ink)/10"></div>
        </div>
        
        <div className="flex overflow-x-auto gap-6 pb-6 custom-scrollbar scroll-smooth snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0">
          <div className="snap-start w-[280px] md:w-[320px] flex-shrink-0 bg-(--color-cream-dark) p-8 rounded-2xl border border-(--color-ink)/5 hover:-translate-y-2 transition-transform duration-300">
            <h3 className="font-serif text-2xl mb-3">Product Strategy</h3>
            <p className="opacity-75 text-sm leading-relaxed">Aligning market opportunities with business capabilities to define winning roadmaps.</p>
          </div>
          <div className="snap-start w-[280px] md:w-[320px] flex-shrink-0 bg-(--color-dark) text-(--color-cream) p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300">
            <h3 className="font-serif text-2xl mb-3">User Research</h3>
            <p className="opacity-80 text-sm leading-relaxed">Uncovering the signal in the noise through deep empathy and quantitative analysis.</p>
          </div>
          <div className="snap-start w-[280px] md:w-[320px] flex-shrink-0 bg-(--color-peach) p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300">
            <h3 className="font-serif text-2xl mb-3 text-(--color-dark)">Execution</h3>
            <p className="text-(--color-dark)/80 text-sm leading-relaxed">Shipping high-quality features quickly, tracking metrics, and iterating to success.</p>
          </div>
          <div className="snap-start w-[280px] md:w-[320px] flex-shrink-0 bg-(--color-cream-dark) p-8 rounded-2xl border border-(--color-ink)/5 hover:-translate-y-2 transition-transform duration-300">
            <h3 className="font-serif text-2xl mb-3">AI Prototyping</h3>
            <p className="opacity-75 text-sm leading-relaxed">Rapidly building and validating MVPs with AI-powered tools and workflows.</p>
          </div>
          <div className="snap-start w-[280px] md:w-[320px] flex-shrink-0 bg-(--color-dark) text-(--color-cream) p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300">
            <h3 className="font-serif text-2xl mb-3">AI-Augmented Product Work</h3>
            <p className="opacity-80 text-sm leading-relaxed">Leveraging AI to accelerate research, documentation, prioritization, and stakeholder communication.</p>
          </div>
        </div>
      </section>
      
      {/* All Projects */}
      <section>
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-(--color-ink)/10"></div>
          <span className="text-sm font-bold tracking-widest uppercase opacity-50">My Projects</span>
          <div className="h-px flex-1 bg-(--color-ink)/10"></div>
        </div>
        
        <ProjectsGallery />
      </section>
    </div>
  );
}
