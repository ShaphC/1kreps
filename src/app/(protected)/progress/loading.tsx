export default function ProgressLoading() {
  return (
    <main className="min-h-screen bg-zinc-950 p-4 text-zinc-100 md:p-8">
      <div className="mx-auto max-w-5xl">
        {/* Page header */}
        <div className="mb-8">
          <div className="h-4 w-20 animate-pulse rounded bg-zinc-800" />

          <div className="mt-2 h-7 w-28 animate-pulse rounded bg-zinc-800" />

          <div className="mt-2 h-4 w-64 animate-pulse rounded bg-zinc-900" />
        </div>

        {/* Summary cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-md border border-zinc-800 bg-black p-4"
            >
              <div className="h-4 w-20 animate-pulse rounded bg-zinc-800" />

              <div className="mt-3 h-8 w-16 animate-pulse rounded bg-zinc-900" />
            </div>
          ))}
        </div>

        {/* Question progress */}
        <div className="mt-8 overflow-hidden rounded-lg border border-zinc-800 bg-black">
          <div className="border-b border-zinc-800 px-5 py-4">
            <div className="h-5 w-40 animate-pulse rounded bg-zinc-800" />
          </div>

          <div className="divide-y divide-zinc-800">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="p-5">
                <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-900" />

                <div className="mt-3 h-3 w-1/2 animate-pulse rounded bg-zinc-900" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
