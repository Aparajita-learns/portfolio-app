export default function Work() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-20 pb-12">
      <h1 className="font-serif text-5xl mb-8">Selected Work</h1>
      <p className="opacity-80 mb-12 max-w-2xl">A collection of products I've built, problems I've solved, and user experiences I've crafted.</p>
      
      <div className="p-12 text-center bg-(--color-cream-dark) rounded-2xl border border-(--color-ink)/10 border-dashed">
        <p className="opacity-60">Projects will be loaded from Firebase dynamically.</p>
      </div>
    </div>
  );
}
