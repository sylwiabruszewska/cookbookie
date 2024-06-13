import { Suspense } from "react";

import HeroSection from "@/ui/components/dashboard/hero";
import { DashboardContent } from "@ui/components/dashboard/dashboard-content";
import { Loader } from "@ui/components/loader";

export default async function Page() {
  return (
    <>
      <HeroSection />

      <Suspense fallback={<Loader />}>
        <DashboardContent />
      </Suspense>
    </>
  );
}
