-- ============================================================
-- 1000 Reps — Core Database Tables
-- Migration: 20260815_create_reps_core_tables.sql
-- ============================================================

-- ------------------------------------------------------------
-- Extensions
-- ------------------------------------------------------------

create extension if not exists "pgcrypto";


-- ============================================================
-- SUBJECTS
-- ============================================================

create table public.reps_subjects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  created_at timestamptz not null default now()
);


-- ============================================================
-- TOPICS
-- ============================================================

create table public.reps_topics (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null
    references public.reps_subjects(id)
    on delete cascade,
  name text not null,
  slug text not null,
  created_at timestamptz not null default now(),

  constraint reps_topics_subject_slug_unique
    unique (subject_id, slug)
);


create index reps_topics_subject_id_idx
  on public.reps_topics(subject_id);


-- ============================================================
-- QUESTIONS
-- ============================================================

create table public.reps_questions (
  id uuid primary key default gen_random_uuid(),

  subject_id uuid not null
    references public.reps_subjects(id)
    on delete cascade,

  topic_id uuid not null
    references public.reps_topics(id)
    on delete cascade,

  question_text text not null,

  expected_answer text not null,

  accepted_answers text[] not null default '{}',

  explanation text not null,

  difficulty text not null default 'beginner',

  available_modes text[] not null default array['recall'],

  case_sensitive boolean not null default true,

  source_type text not null default 'builtin',

  source_id uuid,

  is_active boolean not null default true,

  created_at timestamptz not null default now(),

  constraint reps_questions_difficulty_check
    check (difficulty in ('beginner', 'intermediate', 'advanced')),

  constraint reps_questions_source_type_check
    check (source_type in ('builtin', 'user', 'generated'))
);


create index reps_questions_subject_id_idx
  on public.reps_questions(subject_id);

create index reps_questions_topic_id_idx
  on public.reps_questions(topic_id);

create index reps_questions_active_idx
  on public.reps_questions(is_active);


-- ============================================================
-- PRACTICE ATTEMPTS
-- ============================================================

create table public.reps_attempts (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references public.profiles(id)
    on delete cascade,

  question_id uuid not null
    references public.reps_questions(id)
    on delete cascade,

  submitted_answer text not null,

  is_correct boolean not null,

  practice_mode text not null,

  created_at timestamptz not null default now(),

  constraint reps_attempts_practice_mode_check
    check (practice_mode in ('recall', 'multiple_choice'))
);


create index reps_attempts_user_id_idx
  on public.reps_attempts(user_id);

create index reps_attempts_question_id_idx
  on public.reps_attempts(question_id);

create index reps_attempts_user_question_idx
  on public.reps_attempts(user_id, question_id);

create index reps_attempts_created_at_idx
  on public.reps_attempts(created_at);


-- ============================================================
-- USER QUESTION PROGRESS
-- ============================================================

create table public.reps_user_progress (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references public.profiles(id)
    on delete cascade,

  question_id uuid not null
    references public.reps_questions(id)
    on delete cascade,

  total_attempts integer not null default 0,

  correct_attempts integer not null default 0,

  incorrect_attempts integer not null default 0,

  accuracy numeric(5,2) not null default 0,

  last_attempted_at timestamptz,

  last_correct_at timestamptz,

  current_streak integer not null default 0,

  successful_recalls integer not null default 0,

  mastery_level text not null default 'learning',

  created_at timestamptz not null default now(),

  updated_at timestamptz not null default now(),

  constraint reps_user_progress_unique
    unique (user_id, question_id),

  constraint reps_user_progress_mastery_check
    check (
      mastery_level in (
        'learning',
        'practicing',
        'strong',
        'mastered'
      )
    ),

  constraint reps_user_progress_accuracy_check
    check (accuracy >= 0 and accuracy <= 100),

  constraint reps_user_progress_attempts_check
    check (total_attempts >= 0),

  constraint reps_user_progress_correct_check
    check (correct_attempts >= 0),

  constraint reps_user_progress_incorrect_check
    check (incorrect_attempts >= 0),

  constraint reps_user_progress_streak_check
    check (current_streak >= 0),

  constraint reps_user_progress_successful_recalls_check
    check (successful_recalls >= 0)
);


create index reps_user_progress_user_id_idx
  on public.reps_user_progress(user_id);

create index reps_user_progress_question_id_idx
  on public.reps_user_progress(question_id);

create index reps_user_progress_mastery_idx
  on public.reps_user_progress(user_id, mastery_level);


-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.reps_subjects enable row level security;
alter table public.reps_topics enable row level security;
alter table public.reps_questions enable row level security;
alter table public.reps_attempts enable row level security;
alter table public.reps_user_progress enable row level security;


-- ============================================================
-- SUBJECT POLICIES
-- Built-in subject content is readable by authenticated users.
-- ============================================================

create policy "Authenticated users can view reps subjects"
  on public.reps_subjects
  for select
  to authenticated
  using (true);


-- ============================================================
-- TOPIC POLICIES
-- ============================================================

create policy "Authenticated users can view reps topics"
  on public.reps_topics
  for select
  to authenticated
  using (true);


-- ============================================================
-- QUESTION POLICIES
-- ============================================================

create policy "Authenticated users can view active reps questions"
  on public.reps_questions
  for select
  to authenticated
  using (is_active = true);


-- ============================================================
-- ATTEMPT POLICIES
-- Users can only access their own attempts.
-- ============================================================

create policy "Users can view their own reps attempts"
  on public.reps_attempts
  for select
  to authenticated
  using (auth.uid() = user_id);


create policy "Users can create their own reps attempts"
  on public.reps_attempts
  for insert
  to authenticated
  with check (auth.uid() = user_id);


-- ============================================================
-- USER PROGRESS POLICIES
-- Users can only access their own progress.
-- ============================================================

create policy "Users can view their own reps progress"
  on public.reps_user_progress
  for select
  to authenticated
  using (auth.uid() = user_id);


create policy "Users can create their own reps progress"
  on public.reps_user_progress
  for insert
  to authenticated
  with check (auth.uid() = user_id);


create policy "Users can update their own reps progress"
  on public.reps_user_progress
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);