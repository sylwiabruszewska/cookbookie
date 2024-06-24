import React from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

import { roboto } from "@/ui/fonts";

interface GoogleButtonProps {
  onClick: () => void;
}

export const GoogleButton: React.FC<GoogleButtonProps> = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={onClick}
      className="rounded-[4px] bg-[#F2F2F2] hover:bg-[#dfe1e3] dark:bg-[#131314] hover:dark:bg-[#1a1a1c] dark:text-[#E3E3E3] flex justify-center items-center transition-colors duration-300"
    >
      <Image src="/google.svg" alt="Google Logo" width={40} height={40} />

      <span className={`pr-3 ${roboto.className}`}>
        {t("continue_with_google")}
      </span>
    </button>
  );
};
