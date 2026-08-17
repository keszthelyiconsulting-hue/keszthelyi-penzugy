"use client";

import { useEffect, useState } from "react";
import { supabase } from "../supabase";

type Partner = {
  id: number;
  name: string;
  description: string;
  icon: string;
  sort_order: number;
  is_active: boolean;
};

export default function PartnerBanner() {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    loadPartners();
  }, []);

  const loadPartners = async () => {
  const { data, error } = await supabase
    .from("partners")
    .select("*")
    

  console.log("PARTNERS DATA:", data);
  console.log("PARTNERS ERROR:", error);

  if (error) {
    console.error(error);
    return;
  }

  setPartners(data || []);
};

  return (
    <div
      className="
        h-full
        rounded-[32px]
        border
        border-amber-500/20
        bg-zinc-950
        p-8
      "
    >
      <p className="mb-6 text-sm tracking-[0.3em] text-[#C2A56A]">
        PARTNEREINK
      </p>

      <div className="space-y-6">
        {partners.map((partner) => (
          <div key={partner.id}>
            <h3 className="text-xl text-white">
              {partner.icon} {partner.name}
            </h3>

            <p className="text-zinc-400">
              {partner.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}