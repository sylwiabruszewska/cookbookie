"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

import { Button } from "@/ui/components/button";
import clsx from "clsx";
import { useEffect, useState } from "react";

const SearchForm = ({ className }: { className?: string }) => {
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const router = useRouter();
  const { t } = useTranslation(["dashboard"]);

  useEffect(() => {
    const currentQuery = searchParams.get("query") || "";
    setQuery(currentQuery);
  }, [searchParams]);

  const handleSubmitOnSearchPage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSubmitOnDashboardPage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }

    router.replace(`/dashboard/search?${params.toString()}`);
  };

  const handleOnInputChange = (query: string) => {
    setQuery(query);
  };

  return (
    <form
      onSubmit={
        pathname === "/dashboard/search"
          ? handleSubmitOnSearchPage
          : handleSubmitOnDashboardPage
      }
      className={clsx("w-[300px] lg:w-[400px]", className)}
    >
      <div className="relative">
        <label htmlFor="search" className="sr-only">
          {t("search")}
        </label>
        <input
          type="text"
          id="search"
          placeholder={t("p_search")}
          className="w-full bg-[--gray-light] border border-[--gray] focus:outline-none focus:ring-2 focus:ring-[--gray-dark] focus:border-[--gray-dark] rounded-tl-[20px] rounded-bl-[40px] rounded-br-[20px] rounded-tr-[40px] h-10 p-6 lg:p-8 pr-24 dark:focus:ring-[--primary-color] dark:focus:border-[--primary-color] dark:bg-[--gray-dark]"
          onChange={(e) => {
            handleOnInputChange(e.target.value);
          }}
          value={query}
        />
        <Button
          type="submit"
          className="btn-dark absolute top-0 end-0 text-sm font-medium h-full rounded-r rounded-l-none focus:outline-none focus:ring-2 focus:ring-[--primary-color] rounded-tl-[20px] rounded-bl-[40px] rounded-br-[20px] rounded-tr-[40px] p-2 px-8 dark:bg-[--primary-color] dark:hover:text-[--gray-dark]"
          ariaLabel={t("search")}
        >
          <FontAwesomeIcon icon={faSearch} className="text-sm w-4 h-4" />
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;
