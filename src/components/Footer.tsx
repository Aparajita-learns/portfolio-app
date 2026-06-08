import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-(--color-dark) text-(--color-cream) py-8 mt-12">
      <div className="mx-auto max-w-4xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm opacity-80">© {new Date().getFullYear()} My Portfolio.</p>
        <div className="flex gap-4">
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-(--color-peach) transition"><Linkedin size={20} /></a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-(--color-peach) transition"><Github size={20} /></a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-(--color-peach) transition"><Mail size={20} /></a>
        </div>
      </div>
    </footer>
  );
}
