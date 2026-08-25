export default function Footer() {
  const banks = [
    {
      name: "K&H Bank",
      logo: "/images/banks/kh.png",
    },
    {
      name: "UniCredit Bank",
      logo: "/images/banks/unicredit.png",
    },
    {
      name: "Fundamenta",
      logo: "/images/banks/fundamenta.png",
    },
    {
      name: "Raiffeisen Bank",
      logo: "/images/banks/raiffeisen.png",
    },
    {
      name: "Cofidis",
      logo: "/images/banks/cofidis.png",
    },
    {
      name: "CIB Bank",
      logo: "/images/banks/cib.png",
    },
    {
      name: "OTP Bank",
      logo: "/images/banks/otp.png",
    },
    {
      name: "MBH Bank",
      logo: "/images/banks/mbh.png",
    },
    {
      name: "Erste Bank",
      logo: "/images/banks/erste.png",
    },
    {
      name: "MagNet Bank",
      logo: "/images/banks/magnet.png",
    },
  ];

  const services = [
    "Jelzáloghitel",
    "Lakossági számla",
    "Személyi kölcsön",
    "Babaváró",
    "CSOK",
    "CSOK Plusz",
    "Hitelkártya",
    "KKV finanszírozás",
    "Munkáshitel",
    "Biztosítás",
    "Társasházi finanszírozás",
    "Lakástakarék",
    "Lízing",
    "KKV betét",
  ];

  return (
    <footer className="border-t border-amber-500/20 bg-black text-white">
      <div className="mx-auto max-w-7xl px-8 py-14">

        <div className="grid gap-12 md:grid-cols-3">

          <div>
            <h3 className="mb-4 text-2xl font-light text-amber-100">
              Keszthelyi Consulting
            </h3>

            <p className="max-w-sm leading-7 text-zinc-400">
              Független pénzügyi megoldások
              magánszemélyeknek és vállalkozásoknak.
              Hitelek, biztosítások, megtakarítások és
              vállalati pénzügyek egy helyen.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl">
              Menü
            </h3>

            <div className="space-y-3 text-zinc-400">
              <a
                href="/"
                className="block transition hover:text-amber-200"
              >
                Kezdőlap
              </a>

              <a
                href="/penzugy/hitelek"
                className="block transition hover:text-amber-200"
              >
                Hitelek
              </a>

              <a
                href="/penzugy/biztositasok"
                className="block transition hover:text-amber-200"
              >
                Biztosítások
              </a>

              <a
                href="/penzugy/megtakaritasok"
                className="block transition hover:text-amber-200"
              >
                Megtakarítások
              </a>

              <a
                href="/penzugy/vallalkozasok"
                className="block transition hover:text-amber-200"
              >
                Vállalkozások
              </a>

              <a
                href="/penzugy/kalkulatorok"
                className="block transition hover:text-amber-200"
              >
                Kalkulátorok
              </a>

              <a
                href="/penzugy/kapcsolat"
                className="block transition hover:text-amber-200"
              >
                Kapcsolat
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl">
              Kapcsolat
            </h3>

            <div className="space-y-3 text-zinc-400">
              <p>
                📞 +36 30 359 0002
              </p>

              <p>
                ✉️ info@keszthelyiconsulting.com
              </p>
            </div>
          </div>

        </div>

        {/* AMIVEL FOGLALKOZOM */}

        <div className="mt-12 border-t border-white/10 pt-10">

          <p className="mb-7 text-center text-sm uppercase tracking-[0.25em] text-amber-200">
            Amivel foglalkozom
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3">
            {services.map((service) => (
              <span
                key={service}
                className="rounded-full border border-amber-500/20 bg-white/5 px-4 py-2 text-sm text-zinc-300"
              >
                {service}
              </span>
            ))}
          </div>

        </div>

        {/* BIZTOSÍTÁSI PARTNER */}

<div className="mt-12 border-t border-white/10 pt-10">
  <p className="mb-7 text-center text-sm uppercase tracking-[0.25em] text-amber-200">
    Biztosítási partnerünk
  </p>

  <div className="flex justify-center">
    <div className="flex h-16 w-32 items-center justify-center overflow-hidden rounded-xl bg-white">
      <img
        src="/images/banks/metlife.png"
        alt="MetLife"
        className="h-28 w-56 max-w-none object-contain"
      />
    </div>
  </div>
</div>
        {/* PARTNEREK */}

        <div className="mt-12 border-t border-white/10 pt-10">

          <p className="mb-7 text-center text-sm uppercase tracking-[0.25em] text-amber-200">
            Banki partnereink
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-7">

            {banks.map((bank) => (
              <div
                key={bank.name}
                className="flex h-16 w-32 items-center justify-center rounded-xl bg-white px-4 py-3"
              >
                <img
                  src={bank.logo}
                  alt={bank.name}
                  className="max-h-10 max-w-full object-contain"
                />
              </div>
            ))}

          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">

          <div className="flex flex-col items-center justify-between gap-4 text-sm text-zinc-500 md:flex-row">

            <p>
              © 2026 Keszthelyi Consulting
            </p>

            <div className="flex flex-wrap justify-center gap-5">

              <a
                href="/penzugy/adatkezeles"
                className="transition hover:text-zinc-300"
              >
                Adatkezelés
              </a>

              <a
                href="/penzugy/kapcsolat"
                className="transition hover:text-zinc-300"
              >
                Kapcsolat
              </a>

            </div>

          </div>

        </div>

      </div>
    </footer>
  );
}