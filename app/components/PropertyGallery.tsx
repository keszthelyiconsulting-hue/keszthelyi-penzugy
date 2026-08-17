"use client";

import { useState } from "react";

interface Props {
  images: string[];
  mainImage?: string;
}

export default function PropertyGallery({
  images,
  mainImage,
}: Props) {
  const [selectedImage, setSelectedImage] =
    useState<string | null>(null);

  const galleryImages = [
    ...(mainImage ? [mainImage] : []),
    ...(images || []).filter(
      (img) => img !== mainImage
    ),
  ];

  return (
    <>
      <div className="mb-10">

        {mainImage && (
          <img
            src={mainImage}
            alt=""
            className="mb-6 h-[420px] w-full rounded-3xl object-cover"
          />
        )}

        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">

          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative cursor-pointer"
              onClick={() =>
                setSelectedImage(image)
              }
            >
              <img
                src={image}
                alt=""
                className="h-28 w-full rounded-2xl border border-zinc-800 object-cover"
              />

              <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/50 opacity-0 transition group-hover:opacity-100">
                🔍
              </div>
            </div>
          ))}

        </div>

      </div>

      {selectedImage && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-8"
          onClick={() =>
            setSelectedImage(null)
          }
        >

          <button
            className="absolute right-6 top-6 text-5xl text-white"
          >
            ×
          </button>

          <img
            src={selectedImage}
            alt=""
            className="max-h-[90vh] max-w-[90vw] rounded-3xl"
          />

        </div>

      )}
    </>
  );
}