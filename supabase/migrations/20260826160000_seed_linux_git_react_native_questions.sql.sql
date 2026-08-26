-- ============================================================
-- 1000 Reps — Expanded Question Seed Data
-- Migration: keep your existing filename if desired.
--
-- This migration follows the same schema/pattern as the original
-- working Linux migration. It adds the expanded question set and
-- safely skips questions that already exist.
-- ============================================================

-- ============================================================
-- SUBJECTS
-- ============================================================

insert into public.reps_subjects (name, slug, description)
values
  ('Linux', 'linux', 'Essential Linux commands for building automatic command recall.'),
  ('Git', 'git', 'Essential Git commands for building automatic version-control recall.'),
  ('React Native', 'react-native', 'Practical React Native, Android, Metro, Node, and device commands.'),
  ('Cloud / Deployment', 'cloud-deployment', 'Practical cloud deployment and CLI commands.'),
  ('Cloud / Networking', 'cloud-networking', 'Practical networking, tunneling, and connectivity commands.'),
  ('Docker', 'docker', 'Essential Docker commands for container and image management.')
on conflict (slug) do nothing;

-- ============================================================
-- TOPICS
-- ============================================================

insert into public.reps_topics (subject_id, name, slug)
select s.id, x.topic_name, x.topic_slug
from public.reps_subjects s
join (
  values
    ('linux', 'SSH', 'ssh'),
    ('linux', 'System Administration', 'system-administration'),
    ('linux', 'Text / Search', 'text-search'),
    ('linux', 'Terminal', 'terminal'),
    ('linux', 'Environment', 'environment'),
    ('git', 'Reset / Undo', 'reset-undo'),
    ('git', 'Commits', 'commits'),
    ('git', 'Branches', 'branches'),
    ('git', 'Remotes', 'remotes'),
    ('react-native', 'Android', 'android'),
    ('react-native', 'Android Builds', 'android-builds'),
    ('react-native', 'Metro / Cache', 'metro-cache'),
    ('react-native', 'Android Devices', 'android-devices'),
    ('react-native', 'Common Errors', 'common-errors'),
    ('react-native', 'Dependencies', 'dependencies'),
    ('react-native', 'Node / NVM', 'node-nvm'),
    ('cloud-deployment', 'Vercel', 'vercel'),
    ('cloud-networking', 'Tailscale', 'tailscale'),
    ('cloud-networking', 'Cloudflare', 'cloudflare'),
    ('docker', 'Basics', 'basics'),
    ('docker', 'Containers', 'containers'),
    ('docker', 'Troubleshooting', 'troubleshooting'),
    ('docker', 'Images', 'images')
) as x(subject_slug, topic_name, topic_slug)
  on s.slug = x.subject_slug
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
join (
  values

  -- =========================================================
  -- LINUX — SSH
  -- =========================================================

  ('linux', 'ssh',
   'What file stores authorized SSH public keys for a user?',
   '~/.ssh/authorized_keys',
   array['~/.ssh/authorized_keys']::text[],
   'The authorized_keys file contains public keys allowed to authenticate to the user account.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('linux', 'ssh',
   'What command displays your SSH directory contents?',
   'ls -la ~/.ssh',
   array['ls -la ~/.ssh']::text[],
   'This lists SSH configuration and key files, including hidden files.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('linux', 'ssh',
   'What command displays the permissions of your SSH directory?',
   'ls -ld ~/.ssh',
   array['ls -ld ~/.ssh']::text[],
   'ls -ld displays the directory entry itself along with its ownership and permissions.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('linux', 'ssh',
   'What command displays an Ed25519 public SSH key?',
   'cat ~/.ssh/id_ed25519.pub',
   array['cat ~/.ssh/id_ed25519.pub']::text[],
   'The .pub file contains the public portion of an Ed25519 SSH key pair.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('linux', 'ssh',
   'What command generates a new Ed25519 SSH key pair?',
   'ssh-keygen -t ed25519',
   array['ssh-keygen -t ed25519']::text[],
   'ssh-keygen creates SSH key pairs. Ed25519 is a modern key type supported by OpenSSH.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('linux', 'ssh',
   'What command connects to a remote server using SSH?',
   'ssh user@host',
   array['ssh user@host']::text[],
   'ssh establishes a secure remote shell connection to the specified host.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('linux', 'ssh',
   'What command copies your public SSH key to a remote server?',
   'ssh-copy-id user@host',
   array['ssh-copy-id user@host']::text[],
   'ssh-copy-id installs your public key into the remote user''s authorized_keys file.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('linux', 'ssh',
   'What command installs OpenSSH on Ubuntu or Debian?',
   'sudo apt install openssh-server',
   array['sudo apt install openssh-server']::text[],
   'openssh-server provides the SSH server daemon on Debian-based systems.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  -- =========================================================
  -- GIT — RESET / UNDO
  -- =========================================================

  ('git', 'reset-undo',
   'What command resets Git to the latest commit and removes all uncommitted tracked changes?',
   'git reset --hard HEAD',
   array['git reset --hard HEAD']::text[],
   'This resets tracked files and the index to HEAD, discarding uncommitted tracked changes.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('git', 'reset-undo',
   'What command removes untracked files and directories from a Git working tree?',
   'git clean -fd',
   array['git clean -fd']::text[],
   'git clean removes untracked files. The -d option includes untracked directories and -f confirms the cleanup.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('git', 'reset-undo',
   'What command resets the previous commit and discards the associated local changes?',
   'git reset --hard HEAD~1',
   array['git reset --hard HEAD~1']::text[],
   'This moves HEAD back one commit and resets tracked files to that commit, discarding local changes.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('git', 'reset-undo',
   'What command shows what Git clean would remove without actually removing anything?',
   'git clean -nd',
   array['git clean -nd']::text[],
   'The -n option performs a dry run and -d includes untracked directories.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  -- =========================================================
  -- GIT — COMMITS
  -- =========================================================

  ('git', 'commits',
   'What command changes the message of the most recent Git commit?',
   'git commit --amend -m "New message"',
   array['git commit --amend -m "New message"']::text[],
   'git commit --amend replaces the most recent commit with an amended version.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('git', 'commits',
   'What command creates a Git commit with a message?',
   'git commit -m "message"',
   array['git commit -m "message"']::text[],
   'The -m option provides the commit message directly from the command line.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('git', 'commits',
   'What command stages all modified and deleted tracked files?',
   'git add -u',
   array['git add -u']::text[],
   'git add -u updates the index for modified and deleted tracked files.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('git', 'commits',
   'What command shows the current Git working tree status?',
   'git status',
   array['git status']::text[],
   'git status shows staged, unstaged, and untracked changes.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  -- =========================================================
  -- GIT — BRANCHES
  -- =========================================================

  ('git', 'branches',
   'What command creates a new Git branch and switches to it at the same time?',
   'git switch -c branch-name',
   array['git switch -c branch-name']::text[],
   'The -c option creates a new branch and switches to it.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('git', 'branches',
   'What command switches to an existing Git branch?',
   'git switch branch-name',
   array['git switch branch-name']::text[],
   'git switch changes the current branch.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('git', 'branches',
   'What command lists Git branches?',
   'git branch',
   array['git branch']::text[],
   'git branch lists local branches.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  -- =========================================================
  -- GIT — REMOTES
  -- =========================================================

  ('git', 'remotes',
   'What command displays the configured Git remotes and their URLs?',
   'git remote -v',
   array['git remote -v']::text[],
   'git remote -v displays the fetch and push URLs for configured remotes.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('git', 'remotes',
   'What command changes the URL of an existing Git remote?',
   'git remote set-url origin URL',
   array['git remote set-url origin URL']::text[],
   'git remote set-url changes the URL associated with an existing remote.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('git', 'remotes',
   'What command adds a new Git remote?',
   'git remote add origin URL',
   array['git remote add origin URL']::text[],
   'git remote add associates a remote name with a repository URL.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('git', 'remotes',
   'What command pushes a local branch to a remote and sets its upstream branch?',
   'git push -u origin branch-name',
   array['git push -u origin branch-name']::text[],
   'The -u option sets the remote branch as the upstream for the local branch.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  -- =========================================================
  -- REACT NATIVE — ANDROID
  -- =========================================================

  ('react-native', 'android',
   'What command runs a React Native Android app on a connected Android device?',
   'npx react-native run-android',
   array['npx react-native run-android']::text[],
   'The React Native CLI builds and installs the Android application on an available emulator or connected device.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('react-native', 'android-builds',
   'What command builds a React Native Android release APK from the android directory?',
   './gradlew assembleRelease',
   array['./gradlew assembleRelease']::text[],
   'Gradle builds the Android release variant using the assembleRelease task.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('react-native', 'android-builds',
   'What command sequence rebuilds the Android project after making Android configuration changes?',
   'cd android && ./gradlew clean && cd .. && npx react-native run-android',
   array['cd android && ./gradlew clean && cd .. && npx react-native run-android']::text[],
   'Cleaning the Gradle build and rebuilding helps ensure Android configuration changes are picked up.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('react-native', 'android-builds',
   'What command cleans the Android Gradle build?',
   './gradlew clean',
   array['./gradlew clean']::text[],
   'The clean task removes generated Gradle build output.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('react-native', 'metro-cache',
   'What command starts Metro with its cache reset?',
   'npx react-native start --reset-cache',
   array['npx react-native start --reset-cache']::text[],
   'The --reset-cache option clears Metro''s cached data before starting the bundler.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  -- =========================================================
  -- REACT NATIVE — DEVICE TROUBLESHOOTING
  -- =========================================================

  ('react-native', 'android-devices',
   'What command checks whether Android devices are detected by ADB?',
   'adb devices',
   array['adb devices']::text[],
   'adb devices lists Android devices and emulators currently visible to ADB.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('react-native', 'android-devices',
   'What command restarts the ADB server when an Android device is not detected?',
   'adb kill-server && adb start-server',
   array['adb kill-server && adb start-server']::text[],
   'Restarting the ADB server can resolve device detection problems.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('react-native', 'android-devices',
   'What ADB command forwards the Metro bundler port from an Android device to the development machine?',
   'adb reverse tcp:8081 tcp:8081',
   array['adb reverse tcp:8081 tcp:8081']::text[],
   'ADB reverse allows a USB-connected Android device to access Metro running on port 8081 of the development machine.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('react-native', 'common-errors',
   'What is a common first command to run when a React Native development app cannot load its JavaScript bundle?',
   'npx react-native start',
   array['npx react-native start']::text[],
   'Starting Metro makes the JavaScript bundle available to a development React Native app.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('react-native', 'common-errors',
   'What command can fix a React Native Android development device that cannot connect to Metro over USB?',
   'adb reverse tcp:8081 tcp:8081',
   array['adb reverse tcp:8081 tcp:8081']::text[],
   'The command forwards the device''s port 8081 to the development machine''s Metro port.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  -- =========================================================
  -- REACT NATIVE — DEPENDENCIES
  -- =========================================================

  ('react-native', 'dependencies',
   'What command checks whether a specific npm dependency is installed?',
   'npm list package-name',
   array['npm list package-name', 'npm ls package-name']::text[],
   'npm list displays installed packages and can be filtered to a specific dependency.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('react-native', 'dependencies',
   'What command shows the top-level npm dependencies in a project?',
   'npm list --depth=0',
   array['npm list --depth=0', 'npm ls --depth=0']::text[],
   'The depth option controls how deeply npm displays the dependency tree.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  -- =========================================================
  -- REACT NATIVE — NVM
  -- =========================================================

  ('react-native', 'node-nvm',
   'What command checks whether NVM is installed and available?',
   'nvm --version',
   array['nvm --version', 'nvm -v']::text[],
   'This prints the installed NVM version when the nvm command is available.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('react-native', 'node-nvm',
   'What command lists the Node.js versions installed through NVM?',
   'nvm ls',
   array['nvm ls', 'nvm list']::text[],
   'nvm ls lists Node.js versions managed by NVM.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('react-native', 'node-nvm',
   'What command installs the latest LTS version of Node.js using NVM?',
   'nvm install --lts',
   array['nvm install --lts']::text[],
   'NVM can install the current Node.js Long Term Support release with --lts.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('react-native', 'node-nvm',
   'What command switches to a specific Node.js version using NVM?',
   'nvm use version',
   array['nvm use version']::text[],
   'nvm use changes the active Node.js version in the current shell.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  -- =========================================================
  -- VERCEL
  -- =========================================================

  ('cloud-deployment', 'vercel',
   'What command installs the Vercel CLI globally with npm?',
   'npm i -g vercel',
   array['npm i -g vercel', 'npm install -g vercel']::text[],
   'This installs the Vercel command-line interface globally.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('cloud-deployment', 'vercel',
   'What command logs into Vercel from the terminal?',
   'vercel login',
   array['vercel login']::text[],
   'vercel login authenticates the CLI with your Vercel account.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('cloud-deployment', 'vercel',
   'What command deploys a project using the Vercel CLI?',
   'vercel',
   array['vercel']::text[],
   'Running vercel from a project directory starts the Vercel deployment workflow.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('cloud-deployment', 'vercel',
   'What command lists Vercel deployments?',
   'vercel ls',
   array['vercel ls']::text[],
   'vercel ls lists deployments associated with the current Vercel project.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('cloud-deployment', 'vercel',
   'What command lists Vercel domains or aliases?',
   'vercel alias ls',
   array['vercel alias ls']::text[],
   'The alias command manages deployment aliases associated with Vercel projects.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  -- =========================================================
  -- TAILSCALE
  -- =========================================================

  ('cloud-networking', 'tailscale',
   'What command installs Tailscale using its installation script on Linux?',
   'curl -fsSL https://tailscale.com/install.sh | sh',
   array['curl -fsSL https://tailscale.com/install.sh | sh']::text[],
   'The official installation script installs Tailscale on supported Linux systems.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('cloud-networking', 'tailscale',
   'What command authenticates a Linux machine with Tailscale?',
   'sudo tailscale up',
   array['sudo tailscale up', 'tailscale up']::text[],
   'tailscale up connects the machine to your tailnet and may open an authentication flow.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('cloud-networking', 'tailscale',
   'What command displays the current Tailscale connection status?',
   'tailscale status',
   array['tailscale status']::text[],
   'tailscale status displays information about peers and the current Tailscale connection.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  -- =========================================================
  -- DOCKER
  -- =========================================================

  ('docker', 'basics',
   'What command checks the installed Docker version?',
   'docker --version',
   array['docker --version', 'docker -v']::text[],
   'This displays the installed Docker client version.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('docker', 'containers',
   'What command lists running Docker containers?',
   'docker ps',
   array['docker ps']::text[],
   'docker ps lists currently running containers.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('docker', 'containers',
   'What command lists all Docker containers, including stopped containers?',
   'docker ps -a',
   array['docker ps -a']::text[],
   'The -a option includes stopped containers.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('docker', 'containers',
   'What command starts a stopped Docker container?',
   'docker start container',
   array['docker start container']::text[],
   'docker start starts an existing stopped container.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('docker', 'containers',
   'What command stops a running Docker container?',
   'docker stop container',
   array['docker stop container']::text[],
   'docker stop sends a stop signal to the specified container.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('docker', 'troubleshooting',
   'What command displays Docker container logs?',
   'docker logs container',
   array['docker logs container']::text[],
   'docker logs displays the output generated by a container.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('docker', 'images',
   'What command builds a Docker image from a Dockerfile in the current directory?',
   'docker build -t image-name .',
   array['docker build -t image-name .']::text[],
   'docker build creates an image from the Dockerfile and build context. The -t option assigns a name/tag.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  -- =========================================================
  -- CLOUDFLARE
  -- =========================================================

  ('cloud-networking', 'cloudflare',
   'What command checks whether the Cloudflare CLI is installed?',
   'cloudflared --version',
   array['cloudflared --version']::text[],
   'This displays the installed cloudflared version.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('cloud-networking', 'cloudflare',
   'What command authenticates cloudflared with your Cloudflare account?',
   'cloudflared tunnel login',
   array['cloudflared tunnel login']::text[],
   'This opens the Cloudflare authentication flow for creating and managing tunnels.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('cloud-networking', 'cloudflare',
   'What command lists Cloudflare tunnels?',
   'cloudflared tunnel list',
   array['cloudflared tunnel list']::text[],
   'This lists tunnels associated with the authenticated Cloudflare account.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  -- =========================================================
  -- GENERAL LINUX / ADMIN
  -- =========================================================

  ('linux', 'system-administration',
   'What command displays the current system hostname?',
   'hostname',
   array['hostname']::text[],
   'hostname displays the system''s configured hostname.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('linux', 'system-administration',
   'What command displays disk usage for mounted filesystems in human-readable format?',
   'df -h',
   array['df -h']::text[],
   'df reports filesystem disk space usage and -h makes the values easier to read.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('linux', 'system-administration',
   'What command displays the size of a directory in human-readable format?',
   'du -sh directory',
   array['du -sh directory']::text[],
   'du reports disk usage. -s gives a summary and -h uses human-readable units.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('linux', 'files',
   'What command searches for a file by name in a directory tree?',
   'find',
   array['find']::text[],
   'find searches directory trees based on conditions such as name, type, size, or modification time.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('linux', 'text-search',
   'What command searches text inside files?',
   'grep',
   array['grep']::text[],
   'grep searches input for lines matching a pattern.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('linux', 'files',
   'What command displays the contents of a text file?',
   'cat',
   array['cat']::text[],
   'cat writes the contents of a file to standard output.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('linux', 'terminal',
   'What command clears the terminal screen?',
   'clear',
   array['clear']::text[],
   'clear clears the visible terminal screen.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('linux', 'environment',
   'What command shows the current shell''s environment variables?',
   'env',
   array['env']::text[],
   'env displays environment variables available to the current process.',
   'beginner', array['recall', 'multiple_choice']::text[], false),

  ('linux', 'environment',
   'What command prints the value of an environment variable?',
   'echo $VARIABLE',
   array['echo $VARIABLE']::text[],
   'The shell expands $VARIABLE to the value of the environment variable.',
   'beginner', array['recall', 'multiple_choice']::text[], false)

) as q(
  subject_slug,
  topic_slug,
  question_text,
  expected_answer,
  accepted_answers,
  explanation,
  difficulty,
  available_modes,
  case_sensitive
)
  on t.slug = q.topic_slug
 and s.slug = q.subject_slug
where not exists (
  select 1
  from public.reps_questions existing
  where existing.subject_id = s.id
    and existing.topic_id = t.id
    and existing.question_text = q.question_text
);
