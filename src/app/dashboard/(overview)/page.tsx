import HeroSection from "@/ui/components/dashboard/hero";
import CategoryCard from "@/ui/components/category-card";

export default async function Page() {
  return (
    <>
      <HeroSection />
      <ul className="list-none">
        <CategoryCard />
      </ul>
    </>
  );
}
