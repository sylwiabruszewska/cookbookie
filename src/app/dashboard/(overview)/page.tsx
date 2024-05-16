"use client";

import HeroSection from "@/ui/components/dashboard/hero";
import SearchForm from "@/ui/components/dashboard/search-form";
import CategoryCard from "@/ui/components/category-card";

export default function Page() {
  return (
    <>
      <HeroSection />
      <SearchForm />
      <ul className="list-none">
        <CategoryCard />
      </ul>
    </>
  );
}
