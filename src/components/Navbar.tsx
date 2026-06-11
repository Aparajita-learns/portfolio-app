import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-(--color-cream)/90 backdrop-blur-md pt-4 pb-2 border-b border-(--color-ink)/10">
      <div className="mx-auto max-w-4xl px-6 flex items-center justify-between">
        <Link href="/" className="font-serif text-base sm:text-lg font-bold tracking-tight leading-snug max-w-[min(100%,14rem)] sm:max-w-none">
          Aparajita Gupta, Product Enthusiast and Builder
        </Link>
        <div className="flex gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-(--color-accent) transition">Home</Link>
          <Link href="/work" className="hover:text-(--color-accent) transition">Work</Link>
          <Link href="/about" className="hover:text-(--color-accent) transition">About</Link>
        </div>
      </div>
    </nav>
  );
}
