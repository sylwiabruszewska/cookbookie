"use client";

import { useEffect } from "react";

import { Button } from "@ui/components/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-[50vh] flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <Button className="mt-4 btn-green" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
