import { Suspense } from "react";

import { Loader } from "@/ui/components/common/loader";
import { HeroSection } from "@/ui/components/dashboard/hero";
import { DashboardContent } from "@/ui/components/pages/dashboard";

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
