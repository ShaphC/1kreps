-- =========================================================
-- 1000 REPS
-- Question ownership + RLS for beta
-- =========================================================

ALTER TABLE public.reps_questions ENABLE ROW LEVEL SECURITY;

-- Remove the old SELECT policy.
DROP POLICY IF EXISTS "Authenticated users can view active reps questions"
ON public.reps_questions;

-- =========================================================
-- SELECT
-- =========================================================
--
-- Users can see:
--   1. Active built-in questions
--   2. Their own questions
--
-- =========================================================

CREATE POLICY "Authenticated users can view active reps questions"
ON public.reps_questions
FOR SELECT
TO authenticated
USING (
  is_active = true
  OR (
    source_type = 'user'
    AND source_id = auth.uid()
  )
);

-- =========================================================
-- INSERT
-- =========================================================
--
-- Users can only create questions that belong to themselves.
--
-- =========================================================

CREATE POLICY "Users can create their own questions"
ON public.reps_questions
FOR INSERT
TO authenticated
WITH CHECK (
  source_type = 'user'
  AND source_id = auth.uid()
);

-- =========================================================
-- UPDATE
-- =========================================================

CREATE POLICY "Users can update their own questions"
ON public.reps_questions
FOR UPDATE
TO authenticated
USING (
  source_type = 'user'
  AND source_id = auth.uid()
)
WITH CHECK (
  source_type = 'user'
  AND source_id = auth.uid()
);

-- =========================================================
-- DELETE
-- =========================================================

CREATE POLICY "Users can delete their own questions"
ON public.reps_questions
FOR DELETE
TO authenticated
USING (
  source_type = 'user'
  AND source_id = auth.uid()
);