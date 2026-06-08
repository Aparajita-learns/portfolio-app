export default function Admin() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-20 pb-12">
      <h1 className="font-serif text-4xl mb-8">Admin Dashboard</h1>
      <div className="bg-(--color-cream-dark) p-8 rounded-2xl border border-(--color-ink)/10">
        <p className="opacity-80 mb-6">This area will be protected by Firebase Authentication. Only you will be able to log in and manage projects.</p>
        <button className="bg-(--color-dark) text-(--color-cream) px-6 py-3 rounded-md font-medium hover:bg-(--color-ink) transition">
          Login with Email
        </button>
      </div>
    </div>
  );
}
