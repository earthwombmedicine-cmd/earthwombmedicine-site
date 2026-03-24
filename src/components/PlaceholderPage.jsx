export default function PlaceholderPage({ title }) {
  return (
    <div className="min-height-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl text-forest mb-6">{title}</h1>
      <p className="text-xl font-body max-w-2xl text-forest/70">
        This sacred space is currently being prepared. Check back soon for the full experience of Earth Womb Medicine.
      </p>
    </div>
  );
}
