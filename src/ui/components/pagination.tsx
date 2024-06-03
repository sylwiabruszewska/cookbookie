"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

import { generatePagination } from "@utils/generatePagination";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const allPages = generatePagination(currentPage, totalPages);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="inline-flex gap-4">
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />

      <div className="flex">
        {allPages.map((page, index) => {
          let position: "first" | "last" | "single" | "middle" | undefined;

          if (index === 0) position = "first";
          if (index === allPages.length - 1) position = "last";
          if (allPages.length === 1) position = "single";
          if (page === "...") position = "middle";

          return (
            <PaginationNumber
              key={page}
              href={createPageURL(page)}
              page={page}
              position={position}
              isActive={currentPage === page}
            />
          );
        })}
      </div>

      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </div>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}) {
  const className = clsx("flex h-10 w-10 items-center justify-center text-sm", {
    "bg-[--gray-dark] rounded-lg text-white": isActive,
    "text-gray-300": position === "middle",
    "hover:underline hover:underline-offset-2":
      !isActive && position !== "middle",
  });

  return isActive || position === "middle" ? (
    <button className={className}>{page}</button>
  ) : (
    <Link href={href}>
      <button className={className}>{page}</button>
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  const className = clsx(
    "flex h-10 w-10 items-center justify-center rounded-md",
    {
      "pointer-events-none text-gray-300": isDisabled,
    }
  );

  const icon =
    direction === "left" ? (
      <FontAwesomeIcon icon={faAngleLeft} className="w-5 h-5" />
    ) : (
      <FontAwesomeIcon icon={faAngleRight} className="w-5 h-5" />
    );

  return isDisabled ? (
    <button className={className}>{icon}</button>
  ) : (
    <Link href={href} className="flex items-center justify-center">
      <button className={className}>{icon}</button>
    </Link>
  );
}
