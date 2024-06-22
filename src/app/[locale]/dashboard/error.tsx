"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@ui/components/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useTranslation(["dashboard"]);

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-[50vh] flex-col items-center justify-center">
      <h2 className="text-center">{t("sth_went_wrong")}</h2>
      <Button className="mt-4 btn-green" onClick={() => reset()}>
        {t("try_again")}
      </Button>
    </div>
  );
}
