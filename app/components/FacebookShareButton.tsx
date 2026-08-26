"use client";

import { Share2 } from "lucide-react";

export default function FacebookShareButton() {
  function handleShare() {
    const url = encodeURIComponent(window.location.href);

    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      "_blank",
      "noopener,noreferrer,width=700,height=600"
    );
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label="Megosztás Facebookon"
      title="Megosztás Facebookon"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-amber-400/40 bg-black text-amber-200 shadow-xl transition hover:scale-105 hover:bg-amber-950"
    >
      <Share2 className="h-6 w-6" />
    </button>
  );
}