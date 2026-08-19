"use client";

import { useState } from "react";
import { supabase } from "../supabase";
import AdminSidebar from "../components/layout/AdminSidebar";

export default function AdminPage() {
const [images, setImages] = useState<File[]>([]);
const [mainImageIndex, setMainImageIndex] = useState(0);
const [, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [urgent, setUrgent] = useState(false);
  const [aiHighlight, setAiHighlight] = useState(false);
  const [isNew, setIsNew] = useState(false);
 
  const [formData, setFormData] = useState({
    
    listing_type: "sale",
    property_type: "Ház",

    title: "",
    description: "",

    city: "",
    district: "",
    zipcode: "",

    price: "",
    price_per_sqm: "",
    common_cost: "",
    overhead_cost: "",

    area_size: "",
    land_size: "",

    room_count: "",
    bathroom_count: "",

    floor: "",
heating: "",
condition: "",

view_type: "",
staircase_type: "",
year_built: "",

energy_rating: "",

    parking: false,
garage: false,
balcony: false,
garden: false,
elevator: false,
panorama: false,
furnished: false,
   
    pet_friendly: false,

    agent_name: "",
    agent_phone: "",
    agent_email: "",

});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {

    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };
const addWatermark = async (
  file: File
): Promise<File> => {

  return new Promise((resolve) => {

    const image = new Image();
    image.src = URL.createObjectURL(file);

    image.onload = () => {

      const canvas =
        document.createElement("canvas");

      canvas.width = image.width;
      canvas.height = image.height;

      const ctx = canvas.getContext("2d");

      if (!ctx) {
        resolve(file);
        return;
      }

      ctx.drawImage(image, 0, 0);

      const logo = new Image();
      logo.src = "/vizjel.png";

      logo.onload = () => {
         alert("VÍZJEL FUT");

  
        const logoWidth =
          image.width * 0.35;

        const logoHeight =
          (logo.height / logo.width) *
          logoWidth;

        ctx.globalAlpha = 1;

        ctx.drawImage(
  logo,
  image.width / 2 - logoWidth / 2,
  image.height / 2 - logoHeight / 2,
  logoWidth,
  logoHeight
);

        canvas.toBlob((blob) => {

          if (!blob) {
            resolve(file);
            return;
          }

          resolve(
            new File(
              [blob],
              file.name,
              { type: "image/jpeg" }
            )
          );

        }, "image/jpeg");
      };
    };
  });
};
  const handleImageUpload = async () => {

  if (images.length === 0) return [];

  setUploading(true);

  try {

    const uploadedUrls = await Promise.all(

      images.map(async (image) => {

        const cleanFileName =
  image.name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9.-]/g, "");

const fileName =
  `${Date.now()}-${cleanFileName}`;

        const watermarkedImage =
  await addWatermark(image);

const { error } = await supabase.storage
  .from("property-images")
  .upload(
    fileName,
    watermarkedImage
  );

        if (error) {
  console.error("UPLOAD HIBA:", error);
  alert(JSON.stringify(error));
  return null;
}

        const { data } = supabase.storage
          .from("property-images")
          .getPublicUrl(fileName);

        return data.publicUrl;

      })

    );

    return uploadedUrls.filter(Boolean);

  } catch (err) {

    console.error(err);

    return [];

  } finally {

    setUploading(false);

  }
};
  const handleSubmit = async (
  e: React.FormEvent
) => {

  e.preventDefault();

  console.log("FORMDATA:", formData);

  try {

      setLoading(true);
const uploadedImages = await handleImageUpload();
console.log("UPLOADED:", uploadedImages);
const generatedSlug =
  formData.title
    .toLowerCase()
    .replaceAll(" ", "-") +
  "-" +
  Date.now();

console.log("Generated slug:", generatedSlug);

      const { error } = await supabase.from("properties").insert([
  {
    title: formData.title,

    slug: generatedSlug,

    listing_type: formData.listing_type,
    property_type: formData.property_type,

    description: formData.description,

    city: formData.city,
    district: formData.district,
    zipcode: formData.zipcode,

    price: formData.price,
    price_per_sqm: formData.price_per_sqm,

    common_cost: Number(formData.common_cost) || 0,
    overhead_cost: Number(formData.overhead_cost) || 0,

    area_size: Number(formData.area_size) || 0,
    land_size: Number(formData.land_size) || 0,

    room_count: Number(formData.room_count) || 0,
    bathroom_count:
      Number(formData.bathroom_count) || 0,

    floor: formData.floor,
heating: formData.heating,
condition: formData.condition,

view_type: formData.view_type,
staircase_type: formData.staircase_type,
year_built:
  Number(formData.year_built) || null,

energy_rating: formData.energy_rating,
    parking: formData.parking,
    garage: formData.garage,
    balcony: formData.balcony,
    garden: formData.garden,
    elevator: formData.elevator,
    panorama: formData.panorama,
    furnished: formData.furnished,

    images: uploadedImages,
main_image:
  uploadedImages[mainImageIndex] ||
  uploadedImages[0] ||
  "",

    featured: featured,
    urgent: urgent,
    ai_highlight: aiHighlight,
    is_new: isNew,
    agent_name: formData.agent_name,
agent_phone: formData.agent_phone,
agent_email: formData.agent_email,
  },
]);

      if (error) {
        console.error(error);
        alert(JSON.stringify(error));
        alert("Mentési hiba");
        return;
      }

      alert("Ingatlan sikeresen mentve");

setFormData({
  listing_type: "sale",
  property_type: "Ház",

  title: "",
  description: "",

  city: "",
  district: "",
  zipcode: "",

  price: "",
  price_per_sqm: "",
  common_cost: "",
  overhead_cost: "",

  area_size: "",
  land_size: "",

  room_count: "",
  bathroom_count: "",

  floor: "",
heating: "",
condition: "",

view_type: "",
staircase_type: "",
year_built: "",

energy_rating: "",

  parking: false,
  garage: false,
  balcony: false,
  garden: false,
  elevator: false,
  panorama: false,
  furnished: false,

  
  pet_friendly: false,
  agent_name: "",
agent_phone: "",
agent_email: "",
});


setFeatured(false);
setUrgent(false);
setAiHighlight(false);
setIsNew(false);


setImages([]);

const input = document.getElementById(
  "image-upload"
) as HTMLInputElement;

if (input) {
  input.value = "";
}

    } catch (err) {

      console.error(err);

      alert("Váratlan hiba");

    } finally {

      setLoading(false);

    }
  };

  return (
    <main className="flex min-h-screen bg-[#050505] text-white">

      <AdminSidebar />

      <section className="flex-1 p-10">

        <div className="mb-12">

          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#C2A56A]
font-semibold px-4 py-2">
            Admin rendszer
          </p>

          <h1 className="text-6xl font-light">
            Új ingatlan
          </h1>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-10"
        >

          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8">

            <h2 className="mb-8 text-3xl">
              Alapadatok
            </h2>

            <div className="grid gap-6 md:grid-cols-2">

              <select
                name="listing_type"
                value={formData.listing_type}
                onChange={handleChange}
                className="rounded-2xl bg-zinc-900 p-4"
              >
                <option value="sale">
                  Eladó
                </option>

                <option value="rent">
                  Kiadó
                </option>
              </select>

              <select
                name="property_type"
                value={formData.property_type}
                onChange={handleChange}
                className="rounded-2xl bg-zinc-900 p-4"
              >
                <option>Ház</option>
                <option>Lakás</option>
                <option>Telek</option>
                <option>Nyaraló</option>
                <option>Szántó</option>
                <option>Halastó</option>
                <option>Garázs</option>
                <option>Iroda</option>
                <option>Üzlethelyiség</option>
              </select>

              

              

              
              
              <input
                type="text"
                name="price"
                placeholder="Ár"
                value={formData.price}
                onChange={handleChange}
                className="rounded-2xl bg-zinc-900 p-4"
              />

              <input
                type="text"
                placeholder="Négyzetméter ár"
                value={formData.price_per_sqm}
                onChange={(e) =>
                setFormData({
                ...formData,
      price_per_sqm: e.target.value,
    })
  }
  className="w-full rounded-2xl bg-zinc-900 p-4"
/>
            </div>

          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8">

            <h2 className="mb-8 text-3xl">
              Lokáció
            </h2>

            <div className="grid gap-6 md:grid-cols-3">

              <input
                type="text"
                name="city"
                placeholder="Város"
                value={formData.city}
                onChange={handleChange}
                className="rounded-2xl bg-zinc-900 p-4"
              />

              <input
                type="text"
                name="district"
                placeholder="Kerület"
                value={formData.district}
                onChange={handleChange}
                className="rounded-2xl bg-zinc-900 p-4"
              />

              <input
                type="text"
                name="zipcode"
                placeholder="Irányítószám"
                value={formData.zipcode}
                onChange={handleChange}
                className="rounded-2xl bg-zinc-900 p-4"
              />
     

<input
  type="number"
  name="year_built"
  placeholder="Építés éve"
  value={formData.year_built}
  onChange={handleChange}
  className="rounded-2xl bg-zinc-900 p-4"
/>
            </div>

          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8">

            <h2 className="mb-8 text-3xl">
              Méretek és helyiségek
            </h2>

            <div className="grid gap-6 md:grid-cols-2">

              <input
                type="number"
                name="area_size"
                placeholder="Alapterület (nm)"
                value={formData.area_size}
                onChange={handleChange}
                className="rounded-2xl bg-zinc-900 p-4"
              />

              <input
                type="number"
                name="land_size"
                placeholder="Telek méret (nm)"
                value={formData.land_size}
                onChange={handleChange}
                className="rounded-2xl bg-zinc-900 p-4"
              />

              <input
                type="number"
                name="room_count"
                placeholder="Szobák száma"
                value={formData.room_count}
                onChange={handleChange}
                className="rounded-2xl bg-zinc-900 p-4"
              />

              <input
                type="number"
                name="bathroom_count"
                placeholder="Fürdőszobák száma"
                value={formData.bathroom_count}
                onChange={handleChange}
                className="rounded-2xl bg-zinc-900 p-4"
              />

            </div>

          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8">

  <h2 className="mb-8 text-3xl">
    Műszaki adatok
  </h2>

  <div className="grid gap-6 md:grid-cols-2">

    <select
      name="heating"
      value={formData.heating}
      onChange={handleChange}
      className="rounded-2xl bg-zinc-900 p-4"
    >
      <option value="">Fűtés típusa</option>
      <option value="nincs">Nincs</option>
      <option value="gaz_cirko">Gáz cirkó</option>
      <option value="gazkonvektor">Gázkonvektor</option>
      <option value="gaz">Gáz</option>
      <option value="vegyes_cirko">Vegyes cirkó</option>
      <option value="vegyestuzelesu_kazan">Vegyestüzelésű kazán</option>
      <option value="elektromos_cirko">Elektromos cirkó</option>
      <option value="elektromos_kalyha">Elektromos kályha</option>
      <option value="infra">Elektromos, infra</option>
      <option value="tavfutes">Távfűtés</option>
      <option value="egyedi_tavfutes">Egyedi távfűtés</option>
      <option value="kozponti">Központi fűtés</option>
      <option value="gaz_kazan">Gáz kazán</option>
      <option value="hoszivattyu">Hőszivattyú</option>
      <option value="hoszivattyu_levego_levego">
        Hőszivattyú (levegő-levegő)
      </option>
      <option value="hoszivattyu_levego_viz">
        Hőszivattyú (levegő-víz)
      </option>
      <option value="hoszivattyu_padlofutes">
        Hőszivattyús padlófűtés
      </option>
      <option value="cserpkalyha_gaz">
  Cserépkályha (gáz)
</option>

<option value="cserpkalyha_vegyes">
  Cserépkályha (vegyes)
</option>

<option value="vegyes_fancoil">
  Vegyes fan-coil
</option>

<option value="elektromos_fancoil">
  Elektromos fan-coil
</option>

<option value="faszen_cirko">
  Faszén cirkó
</option>

<option value="cserpkalyha_faszen">
  Cserépkályha (faszén)
</option>

<option value="faszen_fancoil">
  Faszén fan-coil
</option>

<option value="kalyha_faszen">
  Kályha (faszén)
</option>

<option value="meres_nelkuli_kozponti">
  Mérés nélküli központi fűtés
</option>

<option value="megujulo">
  Megújuló
</option>

<option value="hoszivattyus_fancoil">
  Hőszivattyús fan-coil
</option>
      <option value="egyeb">Egyéb</option>
    </select>

          <select
  name="energy_rating"
  value={formData.energy_rating}
  onChange={handleChange}
  className="rounded-2xl bg-zinc-900 p-4"
>
  <option value="">Energetikai besorolás</option>

  <option value="AA++">AA++</option>
  <option value="AA+">AA+</option>
  <option value="AA">AA</option>

  <option value="BB">BB</option>

  <option value="CC">CC</option>

  <option value="DD">DD</option>

  <option value="EE">EE</option>

  <option value="FF">FF</option>

  <option value="GG">GG</option>

  <option value="HH">HH</option>

  <option value="II">II</option>

  <option value="JJ">JJ</option>
</select>

    <select
      name="view_type"
      value={formData.view_type}
      onChange={handleChange}
      className="rounded-2xl bg-zinc-900 p-4"
    >
      <option value="">Kilátás</option>
      <option value="utcai">Utcai</option>
      <option value="udvari">Udvari</option>
      <option value="kertre_nezo">Kertre néző</option>
      <option value="parkra_nezo">Parkra néző</option>
      <option value="panoramas">Panorámás</option>
      <option value="vegyes">Vegyes</option>
    </select>

    <select
      name="staircase_type"
      value={formData.staircase_type}
      onChange={handleChange}
      className="rounded-2xl bg-zinc-900 p-4"
    >
      <option value="">Lépcsőház típusa</option>
      <option value="zart">Zárt</option>
      <option value="korfolyosos">Körfolyosós</option>
      <option value="fuggofolyosos">Függőfolyosós</option>
      <option value="nincs">Nincs</option>
    </select>

    <input
      type="number"
      name="year_built"
      placeholder="Építés éve"
      value={formData.year_built}
      onChange={handleChange}
      className="rounded-2xl bg-zinc-900 p-4"
    />

    <select
      name="condition"
      value={formData.condition}
      onChange={handleChange}
      className="rounded-2xl bg-zinc-900 p-4"
    >
      <option value="">Állapot</option>
      <option value="uj_epitesu">Új építésű</option>
      <option value="ujszeru">Újszerű</option>
      <option value="kivalo">Kiváló</option>
      <option value="jo">Jó</option>
      <option value="atlagos">Átlagos</option>
      <option value="felujitando">Felújítandó</option>
      <option value="bontando">Bontandó</option>
    </select>

    
      <select
  name="floor"
  value={formData.floor}
  onChange={handleChange}
  className="rounded-2xl bg-zinc-900 p-4"
>
  <option value="">Emelet</option>
  <option value="foldszint">Földszint</option>
  <option value="1">1.</option>
  <option value="2">2.</option>
  <option value="3">3.</option>
  <option value="4">4.</option>
  <option value="5">5.</option>
  <option value="6">6.</option>
  <option value="7">7.</option>
  <option value="8">8.</option>
  <option value="9">9.</option>
  <option value="10+">10+</option>
</select>

  </div>
       

            </div>

          
  
  

  <h2 className="mb-8 text-3xl">
    Extrák
  </h2>

  <div className="grid gap-4 md:grid-cols-3"></div>        

<div className="grid gap-4 md:grid-cols-3">

  <label className="flex items-center gap-3 rounded-2xl bg-zinc-900 p-4">
    <input
      type="checkbox"
      checked={formData.parking}
      onChange={(e) =>
        setFormData({
          ...formData,
          parking: e.target.checked,
        })
      }
    />
    Parkoló
  </label>

  <label className="flex items-center gap-3 rounded-2xl bg-zinc-900 p-4">
    <input
      type="checkbox"
      checked={formData.garage}
      onChange={(e) =>
        setFormData({
          ...formData,
          garage: e.target.checked,
        })
      }
    />
    Garázs
  </label>

  <label className="flex items-center gap-3 rounded-2xl bg-zinc-900 p-4">
    <input
      type="checkbox"
      checked={formData.balcony}
      onChange={(e) =>
        setFormData({
          ...formData,
          balcony: e.target.checked,
        })
      }
    />
    Erkély
  </label>

  <label className="flex items-center gap-3 rounded-2xl bg-zinc-900 p-4">
    <input
      type="checkbox"
      checked={formData.garden}
      onChange={(e) =>
        setFormData({
          ...formData,
          garden: e.target.checked,
        })
      }
    />
    Kert
  </label>

  <label className="flex items-center gap-3 rounded-2xl bg-zinc-900 p-4">
    <input
      type="checkbox"
      checked={formData.elevator}
      onChange={(e) =>
        setFormData({
          ...formData,
          elevator: e.target.checked,
        })
      }
    />
    Lift
  </label>

  <label className="flex items-center gap-3 rounded-2xl bg-zinc-900 p-4">
    <input
      type="checkbox"
      checked={formData.panorama}
      onChange={(e) =>
        setFormData({
          ...formData,
          panorama: e.target.checked,
        })
      }
    />
    Panoráma
  </label>

  <label className="flex items-center gap-3 rounded-2xl bg-zinc-900 p-4">
    <input
      type="checkbox"
      checked={formData.furnished}
      onChange={(e) =>
        setFormData({
          ...formData,
          furnished: e.target.checked,
        })
      }
    />
    Bútorozott
  </label>

</div>


          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8">

            <h2 className="mb-8 text-3xl">
              Leírás
            </h2>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="h-64 w-full rounded-2xl bg-zinc-900 p-6"
            />
<div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-950 p-8">

  <h2 className="mb-6 text-2xl font-semibold">
    Kapcsolattartó
  </h2>

  <div className="grid gap-4 md:grid-cols-3">

    <input
      type="text"
      name="agent_name"
      placeholder="Értékesítő neve"
      value={formData.agent_name}
      onChange={handleChange}
      className="rounded-2xl bg-zinc-900 p-4"
    />

    <input
      type="text"
      name="agent_phone"
      placeholder="Telefonszám"
      value={formData.agent_phone}
      onChange={handleChange}
      className="rounded-2xl bg-zinc-900 p-4"
    />

    <input
      type="email"
      name="agent_email"
      placeholder="Email cím"
      value={formData.agent_email}
      onChange={handleChange}
      className="rounded-2xl bg-zinc-900 p-4"
    />

  </div>

</div>
          </div>
<div className="grid grid-cols-2 gap-4">

  <label className="flex items-center gap-3 rounded-xl bg-zinc-900 p-4">
    <input
      type="checkbox"
      checked={featured}
      onChange={(e) => setFeatured(e.target.checked)}
    />
    <span>Kiemelt ingatlan</span>
  </label>

  <label className="flex items-center gap-3 rounded-xl bg-zinc-900 p-4">
    <input
      type="checkbox"
      checked={urgent}
      onChange={(e) => setUrgent(e.target.checked)}
    />
    <span>Sürgős</span>
  </label>

  <label className="flex items-center gap-3 rounded-xl bg-zinc-900 p-4">
    <input
      type="checkbox"
      checked={aiHighlight}
      onChange={(e) => setAiHighlight(e.target.checked)}
    />
    <span>AI ajánlott</span>
  </label>

  <label className="flex items-center gap-3 rounded-xl bg-zinc-900 p-4">
    <input
      type="checkbox"
      checked={isNew}
      onChange={(e) => setIsNew(e.target.checked)}
    />
    <span>Új hirdetés</span>
  </label>

  

</div>
<div className="space-y-4">
  <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
    Képek feltöltése
  </p>

  <input
  id="image-upload"
  type="file"
  multiple
  onChange={(e) => {
  const files = e.target.files;

  if (!files) return;

  setImages((prev) => [
    ...prev,
    ...Array.from(files),
  ]);
}}
/>

  <div className="grid grid-cols-3 gap-4">
    {images.map((image, index) => (
      <div
  key={index}
  className={`relative rounded-2xl border p-2 ${
    mainImageIndex === index
      ? "border-amber-500"
      : "border-zinc-800"
  } bg-zinc-900`}
>
       <button
  type="button"
  onClick={() => setMainImageIndex(index)}
  className={`absolute right-2 top-2 rounded-full px-2 py-1 text-xs font-bold ${
    mainImageIndex === index
      ? "bg-amber-500 text-black"
      : "bg-zinc-700 text-white"
  }`}
>
  {mainImageIndex === index
    ? "FŐKÉP"
    : "Főkép"}
</button>
        <button
  type="button"
  onClick={() => {
    setImages((prev) =>
      prev.filter((_, i) => i !== index)
    );

    if (mainImageIndex >= index) {
      setMainImageIndex(0);
    }
  }}
  className="absolute left-2 top-2 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white"
>
  ✕
</button>
        <img
          src={URL.createObjectURL(image)}
          alt=""
          className="h-32 w-full rounded-xl object-cover"
        />
      </div>
    ))}
  </div>
</div>
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-amber-500 px-10 py-5 text-xl font-semibold text-black transition hover:scale-105 disabled:opacity-50"
          >
            {loading
              ? "Mentés..."
              : "Ingatlan mentése"}
          </button>

        </form>

      </section>

    </main>
  );
}