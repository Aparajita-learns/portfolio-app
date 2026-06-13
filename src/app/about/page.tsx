export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-20 pb-12">
      <h1 className="font-serif text-5xl mb-12">About Me</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-12 items-start">
        {/* Text Section */}
        <div className="space-y-6" style={{ fontFamily: '"Segoe UI", system-ui, sans-serif' }}>
          <p className="opacity-90 leading-relaxed text-lg italic">
            I am a product management professional with a strong foundation in engineering, customer problem-solving, and cross-functional collaboration. Over 9+ years, I have worked closely with enterprise customers, support organizations, and engineering teams to uncover pain points, influence product improvements, and deliver measurable outcomes.
          </p>
          <p className="opacity-90 leading-relaxed text-lg italic">
            Combining deep technical expertise with structured PM training through the NextLeap Product Management Fellowship, I am passionate about building intuitive, AI-powered products that solve real user problems and create lasting business value.
          </p>
        </div>
        
        {/* Photo Section */}
        <div className="w-full max-w-[280px] mx-auto md:max-w-none">
          <div className="relative overflow-hidden rounded-2xl border border-(--color-ink)/10 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <img 
              src="/profile.jpg" 
              alt="Aparajita Gupta" 
              className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

