export default function OtthonStartPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-8 py-20">

        <p className="mb-4 text-sm tracking-[0.3em] text-[#C2A56A]">
          OTTHON START
        </p>

        <h1
          className="mb-8 text-5xl font-light"
          style={{
            fontFamily: "Georgia, serif",
          }}
        >
          Saját otthon kedvező feltételekkel
        </h1>

        <p className="mb-8 max-w-3xl text-xl text-zinc-300">
          Fiataloknak és első saját tulajdonú lakást vásárlóknak.
          Akár 3%-os kamatozású Otthon Start lehetőség.
        </p>

        <div className="rounded-3xl border border-amber-500/20 bg-zinc-950 p-10">
          Ide kerül majd az Otthon Start kalkulátor.
        </div>

      </div>
    </main>
  );
}