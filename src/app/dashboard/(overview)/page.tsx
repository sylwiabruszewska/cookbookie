"use client";

import HeroSection from "@/app/ui/components/dashboard/hero";
import SearchForm from "@/app/ui/components/dashboard/search-form";
import CategoryCard from "@/app/ui/components/category-card";

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
