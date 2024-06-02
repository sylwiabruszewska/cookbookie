"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { Button } from "@/ui/components/button";
import clsx from "clsx";
import { useEffect, useState } from "react";

const SearchForm = ({ className }: { className?: string }) => {
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const currentQuery = searchParams.get("query") || "";
    setQuery(currentQuery);
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);

    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const handleOnInputChange = (query: string) => {
    setQuery(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx("w-[300px] lg:w-[400px]", className)}
    >
      <div className="relative">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          type="text"
          id="search"
          placeholder="Search recipes"
          className="w-full border border-[--gray] focus:outline-none focus:ring-2 focus:ring-[--gray-dark] focus:border-[--gray-dark] rounded-tl-[20px] rounded-bl-[40px] rounded-br-[20px] rounded-tr-[40px] h-10 p-6 lg:p-8 pr-24"
          onChange={(e) => {
            handleOnInputChange(e.target.value);
          }}
          value={query}
        />
        <Button
          variant="dark"
          type="submit"
          className="absolute top-0 end-0 text-sm font-medium h-full rounded-r rounded-l-none focus:outline-none focus:ring-2 focus:ring-[--primary-color] rounded-tl-[20px] rounded-bl-[40px] rounded-br-[20px] rounded-tr-[40px] p-2 px-8"
        >
          <FontAwesomeIcon icon={faSearch} className="text-sm w-4 h-4" />
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;
