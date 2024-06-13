import Image from "next/image";
import Link from "next/link";
import initTranslations from "@utils/i18n";

import { Button } from "@ui/components/button";
import { getLocale } from "@lib/getLocal";

export default async function NotFound() {
  const locale = getLocale();
  const { t } = await initTranslations(locale, ["dashboard"]);

  return (
    <div className="flex flex-col justify-center items-center text-center">
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
      <Link href="/dashboard" className="mt-4">
        <Button className="btn-green">{t("not_found_b")}</Button>
      </Link>
    </div>
  );
}
