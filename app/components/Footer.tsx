export default function Footer() {
  return (
    <footer className="border-t border-amber-500/20 bg-black text-white">
      <div className="mx-auto max-w-7xl px-8 py-16">

        <div className="grid gap-12 md:grid-cols-3">

          <div>
            <h3 className="mb-4 text-2xl font-light">
              Keszthelyi Ingatlan
            </h3>

            <p className="text-zinc-400 leading-7">
              Megbízható ingatlanközvetítés országszerte,
              személyre szabott szolgáltatásokkal.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl">
              Menü
            </h3>

            <div className="space-y-3 text-zinc-400">
              <a href="/">Kezdőlap</a><br />
              <a href="/ingatlanok">Ingatlanok</a><br />
              <a href="/szolgaltatasok">Szolgáltatások</a><br />
              <a href="/rolunk">Rólunk</a><br />
              <a href="/kapcsolat">Kapcsolat</a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl">
              Kapcsolat
            </h3>

            <div className="space-y-3 text-zinc-400">
              <p>📞 +36 30 359 0002</p>
              <p>✉️ keszthelyiconsulting@gmail.com</p>
            </div>
          </div>

        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-zinc-500">

          © 2026 Keszthelyi Ingatlan

        </div>

      </div>
    </footer>
  );
}