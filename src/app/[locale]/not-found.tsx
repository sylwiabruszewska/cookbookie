import Image from "next/image";
import Link from "next/link";
import initTranslations from "@utils/i18n";

import { Button } from "@ui/components/button";
import HomepageLayout from "@ui/layouts/homepage";
import { getLocale } from "@lib/getLocal";

export default async function NotFound() {
  const locale = getLocale();
  const { t } = await initTranslations(locale, ["dashboard"]);

  return (
    <HomepageLayout>
      <div className="z-10 max-w-md w-[90vw] mx-auto p-6 bg-white rounded-lg shadow-md flex flex-col items-center">
        <Image
          src="/not-found.svg"
          alt="Not found"
          className="w-261 h-auto object-fit"
          width={261}
          height={170}
          priority
        />
        <h1 className="text-lg font-bold">{t("not_found_h")}</h1>
        <span>{t("not_found_t")}</span>
        <Link href="/" className="mt-4">
          <Button className="btn-green">{t("not_found_b")}</Button>
        </Link>
      </div>
    </HomepageLayout>
  );
}
