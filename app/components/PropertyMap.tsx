"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Props = {
  latitude: number | null;
  longitude: number | null;
};

export default function PropertyMap({
  latitude,
  longitude,
}: Props) {

  if (!latitude || !longitude) {
    return (
      <div className="flex h-[450px] items-center justify-center rounded-3xl bg-zinc-900 text-zinc-400">
        Nincs megadva térképes elhelyezkedés
      </div>
    );
  }

  return (
    <div className="h-[450px] overflow-hidden rounded-3xl">
      <MapContainer
        center={[latitude, longitude]}
        zoom={15}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[latitude, longitude]} />
      </MapContainer>
    </div>
  );
}