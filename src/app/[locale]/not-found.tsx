import Link from "next/link";
import Image from "next/image";

import getLocale from "@utils/getLocale";
import initTranslations from "@utils/i18n";

import { Button } from "@ui/components/common/button";

export default async function NotFound() {
  const locale = getLocale();
  const { t } = await initTranslations(locale, ["dashboard"]);

  return (
    <div className="bg-white dark:bg-[--gray-medium] flex flex-col items-center justify-center h-screen">
      <Image
        src="/not-found.svg"
        alt="Not found"
        className="w-261 h-auto object-fit"
        width={261}
        height={170}
        priority
      />

      <h1 className="text-[50px]">404</h1>
      <h2 className="text-lg font-bold">{t("not_found_h")}</h2>
      <span>{t("not_found_t")}</span>

      <Link href="/" className="mt-4">
        <Button className="btn-green">{t("not_found_b")}</Button>
      </Link>
    </div>
  );
}
