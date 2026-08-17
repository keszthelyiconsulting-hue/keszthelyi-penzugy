"use client";

import { useState } from "react";

export default function CalculatorBanner() {
  const [activeTab, setActiveTab] = useState("otthonstart");

  const [propertyPrice, setPropertyPrice] = useState("");
  const [ownFunds, setOwnFunds] = useState("");
  const [income, setIncome] = useState("");
  const [years, setYears] = useState("25");

  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalRepayment, setTotalRepayment] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);
  const [equityPercent, setEquityPercent] = useState(0);
  const [eligible, setEligible] = useState(false);

  const calculateOtthonStart = () => {
    const price = Number(propertyPrice);
    const equity = Number(ownFunds);
    const netIncome = Number(income);
    const termYears = Number(years);

    if (!price || !equity || !netIncome || !termYears) {
      alert("Kérlek tölts ki minden mezőt!");
      return;
    }

    const calculatedLoan = price - equity;
    const equityRate = (equity / price) * 100;

    const monthlyRate = 0.03 / 12;
    const months = termYears * 12;

    const payment =
      (calculatedLoan * monthlyRate) /
      (1 - Math.pow(1 + monthlyRate, -months));

    const total = payment * months;

    const maxRatio = netIncome < 600000 ? 0.5 : 0.6;
    const maxAllowed = netIncome * maxRatio;

    const isEligible =
      equityRate >= 10 && payment <= maxAllowed;

    setLoanAmount(calculatedLoan);
    setEquityPercent(equityRate);
    setMonthlyPayment(payment);
    setTotalRepayment(total);
    setEligible(isEligible);
  };

  return (
    <div
      className="
        overflow-hidden
        rounded-[32px]
        border
        border-amber-500/20
        bg-gradient-to-r
        from-zinc-900
        to-zinc-950
        p-8
      "
    >
      <div className="mb-6 text-sm uppercase tracking-[0.4em] text-[#C2A56A]">
        Kalkulátor
      </div>

      <div className="mb-8 flex gap-3">
        <button
          onClick={() => setActiveTab("otthonstart")}
          className={`rounded-full px-5 py-2 transition ${
            activeTab === "otthonstart"
              ? "bg-amber-500 text-black"
              : "border border-amber-500 text-[#C2A56A]"
          }`}
        >
          Otthon Start
        </button>

        <button
          onClick={() => setActiveTab("lakashitel")}
          className={`rounded-full px-5 py-2 transition ${
            activeTab === "lakashitel"
              ? "bg-amber-500 text-black"
              : "border border-amber-500 text-[#C2A56A]"
          }`}
        >
          Lakáshitel
        </button>
      </div>

      {activeTab === "otthonstart" && (
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <input
              type="number"
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(e.target.value)}
              placeholder="Ingatlan vételára (Ft)"
              className="w-full rounded-2xl bg-black/30 p-4 text-white"
            />

            <input
              type="number"
              value={ownFunds}
              onChange={(e) => setOwnFunds(e.target.value)}
              placeholder="Saját erő (Ft)"
              className="w-full rounded-2xl bg-black/30 p-4 text-white"
            />

            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="Nettó jövedelem (Ft)"
              className="w-full rounded-2xl bg-black/30 p-4 text-white"
            />

            <select
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="w-full rounded-2xl bg-black/30 p-4 text-white"
            >
              <option value="5">5 év</option>
              <option value="10">10 év</option>
              <option value="15">15 év</option>
              <option value="20">20 év</option>
              <option value="25">25 év</option>
            </select>

            <button
              onClick={calculateOtthonStart}
              className="
                w-full
                rounded-2xl
                border
                border-[#C2A56A]
                px-8
                py-4
                text-[#C2A56A]
                transition
                hover:bg-[#C2A56A]
                hover:text-black
              "
            >
              Kalkulálok
            </button>
          </div>

          <div
  className="
    rounded-3xl
    border
    border-amber-500/20
    bg-black/20
    p-6
    h-fit
    lg:-mt-20
  "
>
            <h3 className="mb-6 text-xl text-white">
              Eredmények
            </h3>

            <div className="space-y-4 text-zinc-300">
              <div>
                <div className="text-sm text-zinc-500">
                  Szükséges hitelösszeg
                </div>

                <div className="text-xl text-white">
                  {loanAmount.toLocaleString()} Ft
                </div>
              </div>

              <div>
                <div className="text-sm text-zinc-500">
                  Havi törlesztő
                </div>

                <div className="text-xl text-white">
                  {Math.round(monthlyPayment).toLocaleString()} Ft
                </div>
              </div>

              <div>
                <div className="text-sm text-zinc-500">
                  Teljes visszafizetés
                </div>

                <div className="text-xl text-white">
                  {Math.round(totalRepayment).toLocaleString()} Ft
                </div>
              </div>

              <div>
                <div className="text-sm text-zinc-500">
                  Kamat
                </div>

                <div className="text-xl text-white">
                  3.00%
                </div>
              </div>

              <div>
                <div className="text-sm text-zinc-500">
                  Önerő aránya
                </div>

                <div className="text-xl text-white">
                  {equityPercent.toFixed(1)}%
                </div>
              </div>

              <div>
                <div className="text-sm text-zinc-500">
                  Jogosultság
                </div>

                <div
                  className={`text-xl font-semibold ${
                    eligible
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {eligible
                    ? "Megfelel"
                    : "Nem felel meg"}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "lakashitel" && (
        <div>
          <h2 className="mb-6 text-3xl text-white">
            Lakáshitel Kalkulátor
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="number"
              placeholder="Hitelösszeg (Ft)"
              className="rounded-2xl bg-black/30 p-4 text-white"
            />

            <input
              type="number"
              placeholder="Kamat (%)"
              className="rounded-2xl bg-black/30 p-4 text-white"
            />

            <input
              type="number"
              placeholder="Nettó jövedelem (Ft)"
              className="rounded-2xl bg-black/30 p-4 text-white"
            />

            <select
              className="rounded-2xl bg-black/30 p-4 text-white"
            >
              <option>5 év</option>
              <option>10 év</option>
              <option>15 év</option>
              <option>20 év</option>
              <option>25 év</option>
            </select>
          </div>

          <button
            className="
              mt-6
              rounded-2xl
              border
              border-[#C2A56A]
              px-8
              py-3
              text-[#C2A56A]
              transition
              hover:bg-[#C2A56A]
              hover:text-black
            "
          >
            Kalkulálok
          </button>
        </div>
      )}
    </div>
  );
}