export default function ProtectedLoading() {
  return (
    <main className="min-h-screen bg-zinc-950 p-4 text-zinc-100 md:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header skeleton */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="h-4 w-16 animate-pulse rounded bg-zinc-800" />

            <div className="mt-2 h-6 w-32 animate-pulse rounded bg-zinc-800" />
          </div>

          <div className="h-4 w-12 animate-pulse rounded bg-zinc-800" />
        </div>

        {/* Content skeleton */}
        <div className="overflow-hidden rounded-lg border border-zinc-800 bg-black shadow-2xl">
          <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-zinc-800" />
            <div className="h-3 w-3 rounded-full bg-zinc-800" />
            <div className="h-3 w-3 rounded-full bg-zinc-800" />

            <div className="ml-3 h-3 w-24 animate-pulse rounded bg-zinc-800" />
          </div>

          <div className="space-y-6 p-5 font-mono md:p-8">
            <div className="space-y-3">
              <div className="h-5 w-full animate-pulse rounded bg-zinc-900" />
              <div className="h-5 w-4/5 animate-pulse rounded bg-zinc-900" />
            </div>

            <div className="h-10 w-full animate-pulse rounded bg-zinc-900" />
          </div>
        </div>
      </div>
    </main>
  );
}
