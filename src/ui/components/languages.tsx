"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { i18nConfig } from "@config/i18n.config";
import WorldFlag from "react-world-flags";

const Languages: React.FC = () => {
  const { t } = useTranslation(["dashboard"]);
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    let newPath = "";

    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.defaultLocale
    ) {
      newPath = "/" + newLocale + currentPathname;
    } else {
      newPath = currentPathname.replace(`/${currentLocale}`, `/${newLocale}`);
    }

    router.push(newPath);
    router.refresh();
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={() => handleLanguageChange("pl")}
        className="w-6 h-6 rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
        aria-label={t("switch_to_pl")}
      >
        <WorldFlag
          code="PL"
          className="object-cover"
          style={{ width: "100%", height: "100%" }}
          alt="Polish flag"
        />
      </button>

      <button
        onClick={() => handleLanguageChange("en")}
        className="w-6 h-6 rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
        aria-label={t("switch_to_en")}
      >
        <WorldFlag
          code="GB"
          className="object-cover"
          style={{ width: "100%", height: "100%" }}
          alt="British flag"
        />
      </button>

      <button
        onClick={() => handleLanguageChange("es")}
        className="w-6 h-6 rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
        aria-label={t("switch_to_es")}
      >
        <WorldFlag
          code="ES"
          className="object-cover"
          style={{ width: "100%", height: "100%" }}
          alt="Spanish flag"
        />
      </button>
    </div>
  );
};

export default Languages;
