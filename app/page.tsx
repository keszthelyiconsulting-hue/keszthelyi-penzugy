import Hero from "./components/Hero";
import SearchAndBanner from "./components/SearchAndBanner";
import CategoryCards from "./components/CategoryCards";
import FeaturedProperties from "./components/FeaturedProperties";
import OtthonStartBanner from "./components/OtthonStartBanner";
import PropertySearch from "./components/PropertySearch";
import CalculatorBanner from "./components/CalculatorBanner";
import PartnerBanner from "./components/PartnerBanner"

export default function Home() {
  return (
    <main className="bg-black">
      <Hero />

      <div className="mx-auto max-w-7xl px-8 mt-16">

        <div className="grid lg:grid-cols-3 gap-6 mb-8">

  <div className="lg:col-span-2">

    <div className="grid md:grid-cols-2 gap-6">
      <OtthonStartBanner />
      <PropertySearch />
    </div>

    <div className="mt-6">
      <CalculatorBanner />
    </div>

  </div>

  <PartnerBanner />

</div>

        

        <CategoryCards />

        <FeaturedProperties />

        <SearchAndBanner />

      </div>
    </main>
  );
}