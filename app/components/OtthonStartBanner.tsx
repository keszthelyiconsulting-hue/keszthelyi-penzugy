"use client";

import Link from "next/link";

export default function OtthonStartBanner() {
  return (
   <Link
  href="/otthonstart"
  className="
    relative
    block
    h-[425px]
    overflow-hidden
    rounded-[32px]
    border
    border-amber-500/20
    group
  "
>
 <img
  src="/otthonstart.jpg"
  alt="Otthon Start"
   className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-300"
/>
  <div className="absolute bottom-6 right-6">
  <div
    className="
      rounded-full
      border
      border-white/30
      bg-black/60
      px-6
      py-3
      text-white
      backdrop-blur-sm
      transition
      hover:border-[#C2A56A]
      hover:text-[#C2A56A]
    "
  >
    Részletek →
  </div>
</div>
</Link>
    
  );
}