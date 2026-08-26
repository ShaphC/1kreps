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
    <header className="mb-6 flex items-center justify-between border-b border-zinc-800 pb-4">
      <div>
        <p className="font-mono text-sm text-zinc-500">1KReps</p>

        <p className="text-sm text-zinc-300">Every rep leads to mastery!</p>
      </div>

      <nav className="flex items-center gap-4">
        <a
          href="/practice"
          className="text-sm text-zinc-400 transition hover:text-zinc-100"
        >
          Practice
        </a>

        <a
          href="/progress"
          className="text-sm text-zinc-400 transition hover:text-zinc-100"
        >
          Progress
        </a>

        <a
          href="/questions"
          className="text-sm text-zinc-400 transition hover:text-zinc-100"
        >
          Questions
        </a>

        <button
          type="button"
          onClick={handleLogout}
          disabled={isPending}
          className="text-sm text-zinc-500 transition hover:text-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Logging out..." : "Logout"}
        </button>
      </nav>
    </header>
  );
}
