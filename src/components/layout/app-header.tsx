"use client";

import { useTransition } from "react";
import { logout } from "@/app/auth/actions";

export default function AppHeader() {
  const [isPending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      await logout();
    });
  }

  return (
    <header className="mb-6 border-b border-zinc-800 pb-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* BRAND */}

        <div>
          <p className="font-mono text-base font-semibold tracking-tight text-zinc-100">
            1KReps
          </p>

          <p className="mt-0.5 text-xs text-zinc-500 sm:text-sm">
            Every rep leads to mastery!
          </p>
        </div>

        {/* NAVIGATION */}

        <nav className="flex items-center">
          <div className="flex items-center rounded-md border border-zinc-800 bg-black p-1">
            <a
              href="/practice"
              className="rounded px-3 py-2 text-sm text-zinc-400 transition hover:bg-zinc-900 hover:text-zinc-100"
            >
              Practice
            </a>

            <a
              href="/progress"
              className="rounded px-3 py-2 text-sm text-zinc-400 transition hover:bg-zinc-900 hover:text-zinc-100"
            >
              Progress
            </a>

            <a
              href="/questions"
              className="rounded px-3 py-2 text-sm text-zinc-400 transition hover:bg-zinc-900 hover:text-zinc-100"
            >
              Questions
            </a>
          </div>

          <div className="ml-2 border-l border-zinc-800 pl-2">
            <button
              type="button"
              onClick={handleLogout}
              disabled={isPending}
              className="rounded px-3 py-2 text-sm text-zinc-500 transition hover:bg-zinc-900 hover:text-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? "..." : "Logout"}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
