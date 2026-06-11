import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-(--color-dark) text-(--color-cream) py-8 mt-12">
      <div className="mx-auto max-w-4xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm opacity-80">© {new Date().getFullYear()} My Portfolio.</p>
        <div className="flex items-center gap-6 text-sm font-medium">
          <a href="https://www.linkedin.com/in/aparajita-gupta-1a35031a9/" target="_blank" rel="noopener noreferrer" className="hover:text-(--color-peach) transition">LinkedIn</a>
          <a href="https://github.com/Aparajita-learns" target="_blank" rel="noopener noreferrer" className="hover:text-(--color-peach) transition">GitHub</a>
          <a href="mailto:aparajita2407@gmail.com" className="hover:text-(--color-peach) transition flex items-center gap-1"><Mail size={16} /> Email</a>
        </div>
      </div>
    </footer>
  );
}
