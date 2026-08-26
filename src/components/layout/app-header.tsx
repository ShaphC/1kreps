"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { logout } from "@/app/auth/actions";

export default function AppHeader() {
  const [isPending, startTransition] = useTransition();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  function handleLogout() {
    startTransition(async () => {
      await logout();
    });
  }

  function closeDrawer() {
    setIsDrawerOpen(false);
  }

  // Prevent the page from scrolling while the drawer is open.
  useEffect(() => {
    if (!isDrawerOpen) {
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  // Allow Escape to close the drawer.
  useEffect(() => {
    if (!isDrawerOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeDrawer();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDrawerOpen]);

  return (
    <>
      <header className="mb-6 border-b border-zinc-800 pb-4">
        <div className="flex items-center justify-between">
          {/* BRAND */}

          <div>
            <p className="font-mono text-base font-semibold tracking-tight text-zinc-100">
              1KReps
            </p>

            <p className="mt-0.5 text-xs text-zinc-500 sm:text-sm">
              Every rep leads to mastery!
            </p>
          </div>

          {/* DESKTOP NAV */}

          <nav className="hidden items-center gap-5 sm:flex">
            <Link
              href="/practice"
              className="text-sm text-zinc-400 transition hover:text-zinc-100"
            >
              Practice
            </Link>

            <Link
              href="/progress"
              className="text-sm text-zinc-400 transition hover:text-zinc-100"
            >
              Progress
            </Link>

            <Link
              href="/questions"
              className="text-sm text-zinc-400 transition hover:text-zinc-100"
            >
              Questions
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              disabled={isPending}
              className="text-sm text-zinc-500 transition hover:text-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? "Logging out..." : "Logout"}
            </button>
          </nav>

          {/* MOBILE MENU BUTTON */}

          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isDrawerOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-800 bg-black text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-900 hover:text-white sm:hidden"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* MOBILE DRAWER */}

      <div
        className={`fixed inset-0 z-50 transition-opacity duration-500 sm:hidden ${
          isDrawerOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        {/* BACKDROP */}

        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeDrawer}
          className="absolute inset-0 h-full w-full bg-black/70 backdrop-blur-sm"
        />

        {/* DRAWER */}

        <aside
          className={`absolute left-0 top-0 flex h-full w-[min(85vw,320px)] flex-col border-r border-zinc-800 bg-zinc-950 shadow-2xl transition-transform duration-500 ease-out ${
            isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          aria-label="Mobile navigation"
        >
          {/* DRAWER HEADER */}

          <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
            <div>
              <p className="font-mono text-sm font-semibold text-zinc-100">
                1KReps
              </p>

              <p className="mt-0.5 text-xs text-zinc-600">Navigation</p>
            </div>

            <button
              type="button"
              onClick={closeDrawer}
              aria-label="Close navigation menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-800 bg-black text-zinc-400 transition hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </svg>
            </button>
          </div>

          {/* NAVIGATION LINKS */}

          <nav className="flex flex-col p-3">
            <Link
              href="/practice"
              onClick={closeDrawer}
              className="rounded-md px-4 py-3 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
            >
              Practice
            </Link>

            <Link
              href="/progress"
              onClick={closeDrawer}
              className="rounded-md px-4 py-3 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
            >
              Progress
            </Link>

            <Link
              href="/questions"
              onClick={closeDrawer}
              className="rounded-md px-4 py-3 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
            >
              Questions
            </Link>
          </nav>

          {/* LOGOUT */}

          <div className="mt-auto border-t border-zinc-800 p-3">
            <button
              type="button"
              onClick={handleLogout}
              disabled={isPending}
              className="w-full rounded-md px-4 py-3 text-left text-sm text-zinc-500 transition hover:bg-zinc-900 hover:text-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? "Logging out..." : "Logout"}
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}
