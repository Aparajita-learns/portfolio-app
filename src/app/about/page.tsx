export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-20 pb-12">
      <h1 className="font-serif text-5xl mb-12">About Me</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-12 items-start">
        {/* Text Section */}
        <div className="space-y-6" style={{ fontFamily: '"Segoe UI", system-ui, sans-serif' }}>
          <p className="opacity-90 leading-relaxed text-lg italic">
            Shaped by hands-on experience working on Azure App Service at Microsoft, I’ve spent my time close to real customer problems—collaborating with enterprise users, support teams, and engineers to uncover pain points, influence product improvements, and drive meaningful outcomes.
          </p>
          <p className="opacity-90 leading-relaxed text-lg italic">
            With a strong engineering foundation and structured product thinking from the NextLeap Product Management Fellowship, I enjoy building intuitive, AI-powered experiences that solve real problems and create lasting value—often experimenting with ideas through small AI prototypes and hands-on builds.
          </p>
          <p className="opacity-90 leading-relaxed text-lg italic">
            Outside of that, I enjoy spending time caring for animals—something that keeps me grounded and constantly reminds me to approach problems with empathy.
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

