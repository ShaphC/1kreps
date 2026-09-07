"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const STRIPE_PRO_MONTHLY_URL = "YOUR_STRIPE_PRO_MONTHLY_URL";
const STRIPE_PRO_ANNUAL_URL = "YOUR_STRIPE_PRO_ANNUAL_URL";

function IconTerminal() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="m7 9 3 3-3 3" />
      <path d="M13 15h4" />
    </svg>
  );
}

function IconTarget() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 2.5 2.5L16 9" />
    </svg>
  );
}

function IconRepeat() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M17 2l4 4-4 4" />
      <path d="M3 11V9a3 3 0 0 1 3-3h15" />
      <path d="M7 22l-4-4 4-4" />
      <path d="M21 13v2a3 3 0 0 1-3 3H3" />
    </svg>
  );
}

function IconArrowUp() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );
}

function IconMenu() {
  return (
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
  );
}

function IconClose() {
  return (
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
      <path d="M18 6 6 18" />
    </svg>
  );
}

function AnimatedCounter({
  target,
  suffix = "",
  duration = 1800,
  start,
}: {
  target: number;
  suffix?: string;
  duration?: number;
  start: boolean;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) {
      setValue(0);
      return;
    }

    let startTime: number | null = null;
    let frameId: number;

    const animate = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);

      const eased = 1 - Math.pow(1 - progress, 3);

      setValue(Math.round(target * eased));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [target, duration, start]);

  return (
    <>
      {value.toLocaleString()}
      {suffix}
    </>
  );
}

function ProgressStats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <div className="rounded-xl border border-zinc-800 bg-black p-5 transition hover:border-emerald-900">
        <p className="font-mono text-3xl font-black text-white">
          <AnimatedCounter target={247} start={hasStarted} />
        </p>

        <p className="mt-2 text-xs font-bold tracking-wide text-zinc-500">
          REPS
        </p>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-black p-5 transition hover:border-emerald-900">
        <p className="font-mono text-3xl font-black text-white">
          <AnimatedCounter target={91} suffix="%" start={hasStarted} />
        </p>

        <p className="mt-2 text-xs font-bold tracking-wide text-zinc-500">
          ACCURACY
        </p>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-black p-5 transition hover:border-emerald-900">
        <p className="font-mono text-3xl font-black text-white">
          <AnimatedCounter target={12} start={hasStarted} />
        </p>

        <p className="mt-2 text-xs font-bold tracking-wide text-zinc-500">
          DAY STREAK
        </p>
      </div>

      <div className="rounded-xl border border-emerald-900/70 bg-emerald-950/20 p-5 transition hover:border-emerald-700">
        <p className="font-mono text-3xl font-black text-emerald-400">
          <AnimatedCounter target={68} suffix="%" start={hasStarted} />
        </p>

        <p className="mt-2 text-xs font-bold tracking-wide text-emerald-600">
          MASTERY
        </p>
      </div>
    </div>
  );
}

function PracticeAnimation() {
  const answer = "pwd";

  const [phase, setPhase] = useState<"typing" | "checking" | "done">("typing");

  const [typedAnswer, setTypedAnswer] = useState("");

  useEffect(() => {
    let cancelled = false;
    let timeout: ReturnType<typeof setTimeout>;

    const typeAnswer = async () => {
      setPhase("typing");
      setTypedAnswer("");

      for (let i = 0; i < answer.length; i++) {
        if (cancelled) {
          return;
        }

        await new Promise((resolve) => {
          timeout = setTimeout(resolve, 500);
        });

        if (cancelled) {
          return;
        }

        setTypedAnswer(answer.slice(0, i + 1));
      }

      if (cancelled) {
        return;
      }

      timeout = setTimeout(() => {
        if (!cancelled) {
          setPhase("checking");
        }
      }, 700);

      timeout = setTimeout(() => {
        if (!cancelled) {
          setPhase("done");
        }
      }, 1500);

      timeout = setTimeout(() => {
        if (!cancelled) {
          typeAnswer();
        }
      }, 4500);
    };

    typeAnswer();

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-700 bg-black shadow-2xl shadow-black/50">
      <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-950 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />

        <span className="ml-3 font-mono text-xs font-bold text-zinc-500">
          1KReps / practice
        </span>
      </div>

      <div className="min-h-[340px] p-5 font-mono text-sm sm:p-8">
        <div className="text-zinc-500">
          ~/1KReps <span className="font-bold text-emerald-400">$</span> rep
          start
        </div>

        <div className="mt-8">
          <p className="font-bold leading-6 text-white">
            What command shows the current working directory?
          </p>

          <div className="mt-6 flex min-h-[50px] items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950 px-4 py-3">
            <span className="font-bold text-emerald-400">&gt;</span>

            <span className="font-bold text-white">{typedAnswer}</span>

            {phase === "typing" && (
              <span className="animate-pulse text-emerald-400">▌</span>
            )}
          </div>
        </div>

        {phase === "checking" && (
          <div className="mt-7 flex items-center gap-2 text-xs font-bold text-zinc-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Checking answer...
          </div>
        )}

        <div
          className={`mt-7 overflow-hidden transition-all duration-700 ${
            phase === "done"
              ? "max-h-40 translate-y-0 opacity-100"
              : "max-h-0 translate-y-3 opacity-0"
          }`}
        >
          <div className="rounded-md border border-emerald-800 bg-emerald-950/30 p-4">
            <div className="flex items-center gap-2 font-bold text-emerald-400">
              <IconCheck />
              Correct
            </div>

            <p className="mt-2 text-xs font-semibold leading-5 text-zinc-300">
              pwd prints the path of your current working directory.
            </p>

            <div className="mt-4 font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-500">
              +1 REP
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const steps = [
  {
    number: "01",
    title: "Recall",
    description: "Get a focused question and retrieve the answer from memory.",
    icon: <IconTarget />,
  },
  {
    number: "02",
    title: "Answer",
    description: "Type the command or concept you believe is correct.",
    icon: <IconTerminal />,
  },
  {
    number: "03",
    title: "Get feedback",
    description: "Immediately see whether you got it right and understand why.",
    icon: <IconCheck />,
  },
  {
    number: "04",
    title: "Repeat",
    description: "Keep doing reps until the knowledge becomes automatic.",
    icon: <IconRepeat />,
  },
];

const testimonials = [
  {
    quote:
      "I stopped just reading commands and started actually remembering them.",
    name: "Beta User",
    role: "Software Developer",
  },
  {
    quote:
      "The repetition makes a huge difference. Commands I used to look up are starting to become automatic.",
    name: "Beta User",
    role: "Engineer",
  },
  {
    quote:
      "It feels less like studying and more like training. I can jump in, do a few reps, and move on.",
    name: "Beta User",
    role: "Developer",
  },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "",
    description: "Everything you need to start building the habit.",
    features: [
      "Core practice questions",
      "Progress tracking",
      "Accuracy tracking",
      "Streak tracking",
      "Personal question bank",
    ],
    href: "/signup",
    cta: "Start for free",
    featured: false,
  },
  {
    name: "Pro Monthly",
    price: "$9",
    period: "/month",
    description: "More practice power for serious builders.",
    features: [
      "Everything in Free",
      "Unlimited custom questions",
      "Advanced practice modes",
      "Smarter review",
      "Detailed progress insights",
      "Expanded skill categories",
    ],
    href: STRIPE_PRO_MONTHLY_URL,
    cta: "Get Pro",
    featured: true,
  },
  {
    name: "Pro Annual",
    price: "$79",
    period: "/year",
    description: "The best value for long-term mastery.",
    features: [
      "Everything in Pro Monthly",
      "2 months free",
      "Unlimited custom questions",
      "Advanced practice modes",
      "Detailed progress insights",
      "All future Pro features",
    ],
    href: STRIPE_PRO_ANNUAL_URL,
    cta: "Get Pro Annual",
    featured: false,
  },
];

export default function HomePage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isDrawerOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  useEffect(() => {
    if (!isDrawerOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDrawerOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDrawerOpen]);

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* NAVIGATION */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="shrink-0">
            <p className="font-mono text-lg font-black tracking-tight text-white">
              1KReps
            </p>

            <p className="mt-0.5 text-[11px] font-semibold text-zinc-400">
              Every rep leads to mastery!
            </p>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-7 md:flex">
            <a
              href="#how-it-works"
              className="text-sm font-bold text-zinc-300 transition hover:text-emerald-400"
            >
              How it works
            </a>

            <a
              href="#progress"
              className="text-sm font-bold text-zinc-300 transition hover:text-emerald-400"
            >
              Progress
            </a>

            <a
              href="#testimonials"
              className="text-sm font-bold text-zinc-300 transition hover:text-emerald-400"
            >
              Testimonials
            </a>

            <a
              href="#pricing"
              className="text-sm font-bold text-zinc-300 transition hover:text-emerald-400"
            >
              Pricing
            </a>

            <Link
              href="/login"
              className="text-sm font-bold text-zinc-300 transition hover:text-white"
            >
              Log in
            </Link>

            <Link
              href="/signup"
              className="rounded-md bg-emerald-400 px-4 py-2 text-sm font-black text-black transition hover:bg-emerald-300"
            >
              Start practicing
            </Link>
          </nav>

          {/* MOBILE ACTIONS */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="/signup"
              className="rounded-md bg-emerald-400 px-3 py-2 text-xs font-black text-black transition hover:bg-emerald-300"
            >
              Start
            </Link>

            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isDrawerOpen}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-700 bg-black text-zinc-200 transition hover:border-emerald-700 hover:text-emerald-400"
            >
              <IconMenu />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-500 md:hidden ${
          isDrawerOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        {/* BACKDROP */}
        <button
          type="button"
          onClick={closeDrawer}
          aria-label="Close navigation menu"
          className="absolute inset-0 h-full w-full bg-black/75 backdrop-blur-sm"
        />

        {/* DRAWER */}
        <aside
          aria-label="Mobile navigation"
          className={`absolute left-0 top-0 flex h-full w-[min(85vw,320px)] flex-col border-r border-zinc-800 bg-zinc-950 shadow-2xl transition-transform duration-500 ease-out ${
            isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* DRAWER HEADER */}
          <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
            <div>
              <p className="font-mono text-sm font-black text-white">1KReps</p>

              <p className="mt-0.5 text-xs font-semibold text-zinc-500">
                Navigation
              </p>
            </div>

            <button
              type="button"
              onClick={closeDrawer}
              aria-label="Close navigation menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-700 bg-black text-zinc-300 transition hover:border-emerald-700 hover:text-emerald-400"
            >
              <IconClose />
            </button>
          </div>

          {/* DRAWER LINKS */}
          <nav className="flex flex-col p-3">
            <a
              href="#how-it-works"
              onClick={closeDrawer}
              className="rounded-md px-4 py-4 text-sm font-bold text-zinc-200 transition hover:bg-zinc-900 hover:text-emerald-400"
            >
              How it works
            </a>

            <a
              href="#progress"
              onClick={closeDrawer}
              className="rounded-md px-4 py-4 text-sm font-bold text-zinc-200 transition hover:bg-zinc-900 hover:text-emerald-400"
            >
              Progress
            </a>

            <a
              href="#testimonials"
              onClick={closeDrawer}
              className="rounded-md px-4 py-4 text-sm font-bold text-zinc-200 transition hover:bg-zinc-900 hover:text-emerald-400"
            >
              Testimonials
            </a>

            <a
              href="#pricing"
              onClick={closeDrawer}
              className="rounded-md px-4 py-4 text-sm font-bold text-zinc-200 transition hover:bg-zinc-900 hover:text-emerald-400"
            >
              Pricing
            </a>

            <Link
              href="/login"
              onClick={closeDrawer}
              className="rounded-md px-4 py-4 text-sm font-bold text-zinc-200 transition hover:bg-zinc-900 hover:text-emerald-400"
            >
              Log in
            </Link>
          </nav>

          {/* DRAWER CTA */}
          <div className="mt-auto border-t border-zinc-800 p-4">
            <Link
              href="/signup"
              onClick={closeDrawer}
              className="block rounded-md bg-emerald-400 px-5 py-3.5 text-center text-sm font-black text-black transition hover:bg-emerald-300"
            >
              Start practicing free
            </Link>
          </div>
        </aside>
      </div>

      {/* HERO */}
      <section className="border-b border-zinc-800 pt-20">
        <div className="mx-auto max-w-6xl px-6 pb-24 pt-20 sm:pb-32 sm:pt-28">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.95fr]">
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-900 bg-emerald-950/30 px-3.5 py-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.7)]" />

                <span className="font-mono text-xs font-black tracking-wide text-emerald-300">
                  BUILD TECHNICAL MUSCLE MEMORY
                </span>
              </div>

              <h1 className="text-5xl font-black tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl lg:leading-[1.02]">
                Master the commands
                <br />
                you actually need.
              </h1>

              <p className="mt-7 max-w-xl text-base font-semibold leading-7 text-zinc-300 sm:text-lg">
                1KReps turns technical knowledge into muscle memory through
                deliberate repetition. Practice, recall, get feedback, and
                repeat until it sticks.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/signup"
                  className="rounded-md bg-emerald-400 px-7 py-3.5 text-center text-sm font-black text-black transition hover:bg-emerald-300"
                >
                  Start practicing free
                </Link>

                <a
                  href="#how-it-works"
                  className="rounded-md border border-zinc-700 bg-zinc-900 px-7 py-3.5 text-center text-sm font-bold text-zinc-200 transition hover:border-emerald-800 hover:bg-zinc-800 hover:text-emerald-300"
                >
                  See how it works
                </a>
              </div>

              <p className="mt-5 text-xs font-bold text-zinc-500">
                No credit card required.
              </p>
            </div>

            <PracticeAnimation />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="scroll-mt-24 border-b border-zinc-800"
      >
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-emerald-500">
              How it works
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Knowledge becomes skill through reps.
            </h2>

            <p className="mt-5 text-base font-semibold leading-7 text-zinc-400">
              Instead of endlessly consuming tutorials, train yourself to recall
              the things you actually need to know.
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="group rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-800 hover:bg-zinc-900"
              >
                {/* NUMBER LEFT / ICON RIGHT */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black text-emerald-600">
                    {step.number}
                  </span>

                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-emerald-900 bg-emerald-950/30 text-emerald-400 transition group-hover:border-emerald-700 group-hover:bg-emerald-950/50 group-hover:text-emerald-300">
                    {step.icon}
                  </div>
                </div>

                <h3 className="mt-7 text-lg font-black text-white">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm font-semibold leading-6 text-zinc-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="border-b border-zinc-800">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-emerald-500">
                The 1KReps philosophy
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
                You don't need more information.
                <br />
                You need more reps.
              </h2>

              <p className="mt-6 max-w-lg text-base font-semibold leading-7 text-zinc-400">
                Most technical learning is optimized around consuming
                information. 1KReps is designed around retrieving it.
              </p>

              <p className="mt-4 max-w-lg text-base font-semibold leading-7 text-zinc-400">
                The goal isn't to make you feel productive. It's to make the
                right command come to mind when you actually need it.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-black p-7">
              {[
                ["01", "Recall", "Retrieve it from memory"],
                ["02", "Feedback", "Find out if you're right"],
                ["03", "Repeat", "Strengthen the connection"],
                ["04", "Master", "Make it automatic"],
              ].map(([number, title, description]) => (
                <div
                  key={number}
                  className="flex gap-5 border-b border-zinc-800 py-6 first:pt-0 last:border-0 last:pb-0"
                >
                  <span className="font-mono text-xs font-black text-emerald-600">
                    {number}
                  </span>

                  <div>
                    <p className="font-black text-white">{title}</p>

                    <p className="mt-1 text-sm font-semibold text-zinc-400">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROGRESS */}
      <section id="progress" className="scroll-mt-24 border-b border-zinc-800">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-emerald-500">
                Your progress
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Every rep gets you closer.
              </h2>

              <p className="mt-5 text-base font-semibold leading-7 text-zinc-400">
                Track your reps, accuracy, streaks, and mastery as your
                technical knowledge compounds.
              </p>

              <Link
                href="/signup"
                className="mt-8 inline-flex rounded-md bg-emerald-400 px-6 py-3 text-sm font-black text-black transition hover:bg-emerald-300"
              >
                Start tracking progress
              </Link>
            </div>

            <ProgressStats />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section
        id="testimonials"
        className="scroll-mt-24 border-b border-zinc-800"
      >
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
          <div className="text-center">
            <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-emerald-500">
              Testimonials
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Built for people who want to actually remember.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-base font-semibold leading-7 text-zinc-400">
              Real practice beats passive consumption.
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <article
                key={index}
                className="rounded-xl border border-zinc-800 bg-black p-7 transition duration-300 hover:border-emerald-800"
              >
                <div className="font-serif text-4xl font-black leading-none text-emerald-900">
                  "
                </div>

                <blockquote className="mt-4 text-sm font-bold leading-7 text-zinc-300">
                  {testimonial.quote}
                </blockquote>

                <div className="mt-8 border-t border-zinc-800 pt-5">
                  <p className="text-sm font-black text-white">
                    {testimonial.name}
                  </p>

                  <p className="mt-1 text-xs font-bold text-zinc-500">
                    {testimonial.role}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="scroll-mt-24 border-b border-zinc-800">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
          <div className="text-center">
            <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-emerald-500">
              Pricing
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Start free. Upgrade when you're ready.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-base font-semibold leading-7 text-zinc-400">
              Build the habit first. Pay when you want more ways to practice.
            </p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-xl border p-7 ${
                  plan.featured
                    ? "border-emerald-700 bg-emerald-950/20 shadow-[0_0_40px_rgba(16,185,129,0.06)]"
                    : "border-zinc-800 bg-black"
                }`}
              >
                {plan.featured && (
                  <div className="absolute right-5 top-5 rounded-full border border-emerald-800 bg-emerald-950 px-3 py-1 font-mono text-[10px] font-black uppercase tracking-wider text-emerald-300">
                    Most popular
                  </div>
                )}

                <p className="font-mono text-sm font-black text-zinc-300">
                  {plan.name}
                </p>

                <div className="mt-5 flex items-end gap-2">
                  <span className="text-5xl font-black tracking-tight text-white">
                    {plan.price}
                  </span>

                  {plan.period && (
                    <span className="pb-1.5 text-sm font-bold text-zinc-500">
                      {plan.period}
                    </span>
                  )}
                </div>

                <p className="mt-4 min-h-12 text-sm font-semibold leading-6 text-zinc-400">
                  {plan.description}
                </p>

                <a
                  href={plan.href}
                  className={`mt-7 block rounded-md px-5 py-3.5 text-center text-sm font-black transition ${
                    plan.featured
                      ? "bg-emerald-400 text-black hover:bg-emerald-300"
                      : "border border-zinc-700 bg-zinc-900 text-white hover:border-emerald-800 hover:bg-zinc-800 hover:text-emerald-300"
                  }`}
                >
                  {plan.cta}
                </a>

                <div className="my-7 border-t border-zinc-800" />

                <p className="font-mono text-[10px] font-black uppercase tracking-widest text-zinc-600">
                  What's included
                </p>

                <ul className="mt-5 space-y-4">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-sm font-semibold text-zinc-300"
                    >
                      <span className="text-emerald-400">
                        <IconCheck />
                      </span>

                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section>
        <div className="mx-auto max-w-4xl px-6 py-28 text-center sm:py-36">
          <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-emerald-500">
            Ready?
          </p>

          <h2 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-6xl">
            Your next rep is waiting.
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base font-semibold leading-7 text-zinc-400">
            You don't need another tutorial. You need to practice what you
            already know you need.
          </p>

          <Link
            href="/signup"
            className="mt-9 inline-flex rounded-md bg-emerald-400 px-8 py-4 text-sm font-black text-black transition hover:bg-emerald-300"
          >
            Start your first rep
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-9 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-sm font-black text-white">1KReps</p>

            <p className="mt-1 text-xs font-semibold text-zinc-500">
              Every rep leads to mastery!
            </p>
          </div>

          <div className="flex flex-wrap gap-5 text-xs font-bold text-zinc-500">
            <a
              href="#how-it-works"
              className="transition hover:text-emerald-400"
            >
              How it works
            </a>

            <a href="#progress" className="transition hover:text-emerald-400">
              Progress
            </a>

            <a
              href="#testimonials"
              className="transition hover:text-emerald-400"
            >
              Testimonials
            </a>

            <a href="#pricing" className="transition hover:text-emerald-400">
              Pricing
            </a>

            <Link href="/login" className="transition hover:text-emerald-400">
              Log in
            </Link>
          </div>
        </div>
      </footer>

      {/* BACK TO TOP */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-emerald-800 bg-emerald-950/90 text-emerald-400 shadow-lg shadow-black/40 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500 hover:bg-emerald-900 hover:text-emerald-300 ${
          showBackToTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <IconArrowUp />
      </button>
    </main>
  );
}
