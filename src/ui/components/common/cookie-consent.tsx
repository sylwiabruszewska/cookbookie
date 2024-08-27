"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, useAnimation } from "framer-motion";

import { Button } from "@/ui/components/common/button";

export const ClientCookieConsent = () => {
  const { t } = useTranslation(["dashboard"]);
  const [consentGiven, setConsentGiven] = useState<boolean>(false);
  const controls = useAnimation();

  useEffect(() => {
    const cookieConsent = document.cookie.includes("cookieConsent=true");
    setConsentGiven(cookieConsent);

    if (!cookieConsent) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls]);

  const handleAccept = () => {
    setConsentGiven(true);

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);

    document.cookie = `cookieConsent=true; path=/; expires=${expirationDate.toUTCString()}`;
  };

  if (consentGiven) {
    return null;
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={controls}
        transition={{ duration: 0.5 }}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div className="flex text-white gap-6 p-4 bg-[--gray-dark]">
          <p>
            {t("cookies_text")}
            <Link
              className="text-[--primary-color] hover:underline cursor-pointer"
              href="/privacy-policy.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("privacy_policy")}
            </Link>
          </p>
          <Button onClick={handleAccept} className="btn-bordered px-6 w-48">
            {t("accept")}
          </Button>
        </div>
      </motion.div>

      {!consentGiven && <div className="fixed inset-0 z-40"></div>}
    </>
  );
};
