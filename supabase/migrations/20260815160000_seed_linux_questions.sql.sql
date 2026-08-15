-- ============================================================
-- 1000 Reps — Linux MVP Seed Data
-- Migration: 20260815_seed_linux_questions.sql
-- ============================================================


-- ============================================================
-- SUBJECT
-- ============================================================

insert into public.reps_subjects (
  name,
  slug,
  description
)
values (
  'Linux',
  'linux',
  'Essential Linux commands for building automatic command recall.'
)
on conflict (slug) do nothing;


-- ============================================================
-- TOPICS
-- ============================================================

insert into public.reps_topics (
  subject_id,
  name,
  slug
)
select
  s.id,
  topic.name,
  topic.slug
from public.reps_subjects s
cross join (
  values
    ('Navigation', 'navigation'),
    ('Users', 'users'),
    ('Files', 'files'),
    ('Permissions', 'permissions'),
    ('Processes', 'processes')
) as topic(name, slug)
where s.slug = 'linux'
on conflict (subject_id, slug) do nothing;


-- ============================================================
-- QUESTIONS
-- ============================================================

insert into public.reps_questions (
  subject_id,
  topic_id,
  question_text,
  expected_answer,
  accepted_answers,
  explanation,
  difficulty,
  available_modes,
  case_sensitive,
  source_type,
  is_active
)

-- ------------------------------------------------------------
-- Navigation
-- ------------------------------------------------------------

select
  s.id,
  t.id,
  q.question_text,
  q.expected_answer,
  q.accepted_answers,
  q.explanation,
  q.difficulty,
  q.available_modes,
  q.case_sensitive,
  'builtin',
  true
from public.reps_subjects s
join public.reps_topics t
  on t.subject_id = s.id
cross join (
  values

    (
      'What command displays the current working directory?',
      'pwd',
      array['pwd']::text[],
      'pwd prints the path of the current working directory.',
      'beginner',
      array['recall', 'multiple_choice']::text[],
      true
    ),

    (
      'What command lists files and directories in the current directory?',
      'ls',
      array['ls']::text[],
      'ls lists the contents of a directory.',
      'beginner',
      array['recall', 'multiple_choice']::text[],
      true
    ),

    (
      'What command changes the current directory?',
      'cd',
      array['cd']::text[],
      'cd changes the current working directory.',
      'beginner',
      array['recall', 'multiple_choice']::text[],
      true
    ),

    (
      'What command lists all files, including hidden files, in long format?',
      'ls -la',
      array['ls -la', 'ls -al']::text[],
      'ls -la lists directory contents in long format and includes hidden files.',
      'beginner',
      array['recall', 'multiple_choice']::text[],
      true
    ),

    (
      'What command moves to the parent directory?',
      'cd ..',
      array['cd ..']::text[],
      'cd .. moves one directory level up to the parent directory.',
      'beginner',
      array['recall', 'multiple_choice']::text[],
      true
    )

) as q(
  question_text,
  expected_answer,
  accepted_answers,
  explanation,
  difficulty,
  available_modes,
  case_sensitive
)
where s.slug = 'linux'
  and t.slug = 'navigation';


-- ------------------------------------------------------------
-- Users
-- ------------------------------------------------------------

insert into public.reps_questions (
  subject_id,
  topic_id,
  question_text,
  expected_answer,
  accepted_answers,
  explanation,
  difficulty,
  available_modes,
  case_sensitive,
  source_type,
  is_active
)

select
  s.id,
  t.id,
  q.question_text,
  q.expected_answer,
  q.accepted_answers,
  q.explanation,
  q.difficulty,
  q.available_modes,
  q.case_sensitive,
  'builtin',
  true
from public.reps_subjects s
join public.reps_topics t
  on t.subject_id = s.id
cross join (
  values

    (
      'What command displays the current username?',
      'whoami',
      array['whoami']::text[],
      'whoami prints the username of the current user.',
      'beginner',
      array['recall', 'multiple_choice']::text[],
      true
    ),

    (
      'What command shows users currently logged into the system?',
      'users',
      array['users']::text[],
      'users displays the usernames of users currently logged in.',
      'beginner',
      array['recall', 'multiple_choice']::text[],
      true
    ),

    (
      'What command displays user and group identity information?',
      'id',
      array['id']::text[],
      'id displays the current user ID, group ID, and supplementary groups.',
      'beginner',
      array['recall', 'multiple_choice']::text[],
      true
    ),

    (
      'What command displays information about users currently logged in?',
      'who',
      array['who']::text[],
      'who displays information about users currently logged into the system.',
      'beginner',
      array['recall', 'multiple_choice']::text[],
      true
    ),

    (
      'What command displays the last logged-in users?',
      'last',
      array['last']::text[],
      'last displays information about previous login sessions.',
      'beginner',
      array['recall', 'multiple_choice']::text[],
      true
    )

) as q(
  question_text,
  expected_answer,
  accepted_answers,
  explanation,
  difficulty,
  available_modes,
  case_sensitive
)
where s.slug = 'linux'
  and t.slug = 'users';


-- ------------------------------------------------------------
-- Files
-- ------------------------------------------------------------

insert into public.reps_questions (
  subject_id,
  topic_id,
  question_text,
  expected_answer,
  accepted_answers,
  explanation,
  difficulty,
  available_modes,
  case_sensitive,
  source_type,
  is_active
)

select
  s.id,
  t.id,
  q.question_text,
  q.expected_answer,
  q.accepted_answers,
  q.explanation,
  q.difficulty,
  q.available_modes,
  q.case_sensitive,
  'builtin',
  true
from public.reps_subjects s
join public.reps_topics t
  on t.subject_id = s.id
cross join (
  values

    (
      'What command creates an empty file?',
      'touch',
      array['touch']::text[],
      'touch creates a new empty file if it does not already exist.',
      'beginner',
      array['recall', 'multiple_choice']::text[],
      true
    ),

    (
      'What command creates a new directory?',
      'mkdir',
      array['mkdir']::text[],
      'mkdir creates a new directory.',
      'beginner',
      array['recall', 'multiple_choice']::text[],
      true
    ),

    (
      'What command copies a file or directory?',
      'cp',
      array['cp']::text[],
      'cp copies files or directories from one location to another.',
      'beginner',
      array['recall', 'multiple_choice']::text[],
      true
    ),

    (
      'What command moves or renames a file or directory?',
      'mv',
      array['mv']::text[],
      'mv moves files or directories and can also be used to rename them.',
      'beginner',
      array['recall', 'multiple_choice']::text[],
      true
    ),

    (
      'What command removes a file?',
      'rm',
      array['rm']::text[],
      'rm removes files from the filesystem.',
      'beginner',
      array['recall', 'multiple_choice']::text[],
      true
    )

) as q(
  question_text,
  expected_answer,
  accepted_answers,
  explanation,
  difficulty,
  available_modes,
  case_sensitive
)
where s.slug = 'linux'
  and t.slug = 'files';


-- ------------------------------------------------------------
-- Permissions
-- ------------------------------------------------------------

insert into public.reps_questions (
  subject_id,
  topic_id,
  question_text,
  expected_answer,
  accepted_answers,
  explanation,
  difficulty,
  available_modes,
  case_sensitive,
  source_type,
  is_active
)

select
  s.id,
  t.id,
  q.question_text,
  q.expected_answer,
  q.accepted_answers,
  q.explanation,
  q.difficulty,
  q.available_modes,
  q.case_sensitive,
  'builtin',
  true
from public.reps_subjects s
join public.reps_topics t
  on t.subject_id = s.id
cross join (
  values

    (
      'What command changes file permissions?',
      'chmod',
      array['chmod']::text[],
      'chmod changes the permission mode of a file or directory.',
      'beginner',
      array['recall', 'multiple_choice']::text[],
      true
    ),

    (
      'What command changes the owner of a file or directory?',
      'chown',
      array['chown']::text[],
      'chown changes the owner and optionally the group of a file or directory.',
      'beginner',
      array['recall', 'multiple_choice']::text[],
      true
    ),

    (
      'What command changes the group ownership of a file or directory?',
      'chgrp',
      array['chgrp']::text[],
      'chgrp changes the group ownership of a file or directory.',
      'beginner',
      array['recall', 'multiple_choice']::text[],
      true
    ),

    (
      'What command displays file permissions and ownership?',
      'ls -l',
      array['ls -l']::text[],
      'ls -l displays files using a long listing format that includes permissions and ownership.',
      'beginner',
      array['recall', 'multiple_choice']::text[],
      true
    ),

    (
      'What command runs a command with another user’s privileges, commonly as root?',
      'sudo',
      array['sudo']::text[],
      'sudo runs a command with the privileges of another user, typically the superuser.',
      'beginner',
      array['recall', 'multiple_choice']::text[],
      true
    )

) as q(
  question_text,
  expected_answer,
  accepted_answers,
  explanation,
  difficulty,
  available_modes,
  case_sensitive
)
where s.slug = 'linux'
  and t.slug = 'permissions';


-- ------------------------------------------------------------
-- Processes
-- ------------------------------------------------------------

insert into public.reps_questions (
  subject_id,
  topic_id,
  question_text,
  expected_answer,
  accepted_answers,
  explanation,
  difficulty,
  available_modes,
  case_sensitive,
  source_type,
  is_active
)

select
  s.id,
  t.id,
  q.question_text,
  q.expected_answer,
  q.accepted_answers,
  q.explanation,
  q.difficulty,
  q.available_modes,
  q.case_sensitive,
  'builtin',
  true
from public.reps_subjects s
join public.reps_topics t
  on t.subject_id = s.id
cross join (
  values

    (
      'What command displays currently running processes?',
      'ps',
      array['ps']::text[],
      'ps displays information about currently running processes.',
      'beginner',
      array['recall', 'multiple_choice']::text[],
      true
    ),

    (
      'What command provides a real-time view of running processes?',
      'top',
      array['top']::text[],
      'top provides a continuously updating view of system processes and resource usage.',
      'beginner',
      array['recall', 'multiple_choice']::text[],
      true
    ),

    (
      'What command sends a signal to a process?',
      'kill',
      array['kill']::text[],
      'kill sends a signal to a process identified by its process ID.',
      'beginner',
      array['recall', 'multiple_choice']::text[],
      true
    ),

    (
      'What command displays processes in a detailed, interactive view?',
      'htop',
      array['htop']::text[],
      'htop provides an interactive, more user-friendly process viewer. It may need to be installed separately.',
      'beginner',
      array['recall', 'multiple_choice']::text[],
      true
    ),

    (
      'What command displays the process ID of the current shell?',
      'echo $$',
      array['echo $$']::text[],
      'In a shell, $$ expands to the process ID of the current shell.',
      'beginner',
      array['recall', 'multiple_choice']::text[],
      true
    )

) as q(
  question_text,
  expected_answer,
  accepted_answers,
  explanation,
  difficulty,
  available_modes,
  case_sensitive
)
where s.slug = 'linux'
  and t.slug = 'processes';