import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PracticeTerminal from "@/components/practice/practice-terminal";

export default async function PracticePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: questions, error } = await supabase
    .from("reps_questions")
    .select(
      `
      id,
      question_text,
      expected_answer,
      accepted_answers,
      explanation,
      case_sensitive,
      category,
      topic
    `,
    )
    .eq("is_active", true)
    .eq("source_type", "builtin");

  if (error) {
    console.error("Failed to load practice questions:", error);
    throw new Error("Unable to load practice questions.");
  }

  if (!questions || questions.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-zinc-100">
        <div className="w-full max-w-md rounded-lg border border-zinc-800 bg-black p-6 text-center">
          <p className="font-mono text-sm text-zinc-500">1000 REPS</p>

          <h1 className="mt-2 text-xl font-semibold">No practice questions</h1>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            There aren&apos;t any active practice questions available right now.
            Check back later.
          </p>
        </div>
      </main>
    );
  }

  const randomIndex = Math.floor(Math.random() * questions.length);
  const question = questions[randomIndex];

  return <PracticeTerminal question={question} />;
}
