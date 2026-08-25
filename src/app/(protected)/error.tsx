"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ProtectedError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Protected page error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-zinc-100">
      <div className="w-full max-w-md">
        <div className="overflow-hidden rounded-lg border border-zinc-800 bg-black shadow-2xl">
          <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />

            <span className="ml-3 font-mono text-xs text-zinc-500">
              user@reps:~
            </span>
          </div>

          <div className="p-6 md:p-8">
            <p className="mb-2 font-mono text-sm text-red-400">1000 REPS</p>

            <h1 className="text-2xl font-semibold">Something went wrong</h1>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              We couldn&apos;t load this page. Try again, and if the problem
              continues, come back later.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => reset()}
                className="flex-1 rounded-md bg-zinc-100 px-4 py-3 text-sm font-medium text-zinc-950 transition hover:bg-white"
              >
                Try again
              </button>

              <Link
                href="/practice"
                className="flex-1 rounded-md border border-zinc-700 px-4 py-3 text-center text-sm font-medium text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
              >
                Back to practice
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
