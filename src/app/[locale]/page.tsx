import Link from "next/link";
import Image from "next/image";

import initTranslations from "@utils/i18n";

import { poppins } from "@/ui/fonts";
import { Button } from "@ui/components/common/button";
import { HomepageLayout } from "@/ui/layouts/homepage";

interface HomeProps {
  params: {
    locale: string;
  };
}

const i18nNamespaces = ["home"];

export default async function Home({ params: { locale } }: HomeProps) {
  const { t } = await initTranslations(locale, ["home"]);

  return (
    <HomepageLayout>
      <div className="z-10 text-white flex flex-col items-center gap-4">
        <Image
          src="/logo.svg"
          alt="CookBookie Logo"
          className="lg:mb-10"
          width={68}
          height={68}
          priority
        />
        <h1 className="text-2xl font-semibold text-center tracking-wide">
          {t("header")}
        </h1>
        <p
          className={`text-center text-base mb-10 w-3/4 lg:w-1/2 ${poppins.className}`}
        >
          {t("description")}
        </p>
        <div className="flex flex-col gap-4 lg:flex-row items-center justify-center">
          <Link href="/register">
            <Button className="group btn-bordered px-5">
              {t("register")}
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                &gt;
              </span>
            </Button>
          </Link>
          <Link href="/login">
            <Button className="group btn-bordered px-5">
              {t("login")}
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                &gt;
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </HomepageLayout>
  );
}
