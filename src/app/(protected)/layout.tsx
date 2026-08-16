import AppHeader from "@/components/layout/app-header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-4xl p-4 md:p-8">
        <AppHeader />

        {children}
      </div>
    </div>
  );
}
