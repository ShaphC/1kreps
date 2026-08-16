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

  const { data: question, error } = await supabase
    .from("reps_questions")
    .select(
      `
      id,
      question_text,
      expected_answer,
      accepted_answers,
      explanation,
      case_sensitive
    `,
    )
    .eq("is_active", true)
    .eq("source_type", "builtin")
    .limit(1)
    .single();

  if (error || !question) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <p>Unable to load a practice question.</p>
      </main>
    );
  }

  return <PracticeTerminal question={question} />;
}
