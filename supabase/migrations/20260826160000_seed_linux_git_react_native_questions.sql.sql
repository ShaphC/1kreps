insert into reps_questions (
  question_text,
  expected_answer,
  accepted_answers,
  explanation,
  case_sensitive,
  category,
  topic,
  is_active,
  source_type
)
values
-- =========================================================
-- LINUX — NAVIGATION
-- =========================================================

(
  'What command displays the current working directory?',
  'pwd',
  array['pwd'],
  'pwd prints the path of the directory you are currently in.',
  false,
  'Linux',
  'Navigation',
  true,
  'builtin'
),
(
  'What command changes the current directory?',
  'cd',
  array['cd'],
  'cd changes the shell''s current working directory.',
  false,
  'Linux',
  'Navigation',
  true,
  'builtin'
),
(
  'What command moves to the parent directory?',
  'cd ..',
  array['cd ..'],
  'The .. path refers to the parent directory.',
  false,
  'Linux',
  'Navigation',
  true,
  'builtin'
),
(
  'What command moves to your home directory?',
  'cd ~',
  array['cd ~', 'cd'],
  'The ~ symbol represents your home directory. Running cd without an argument also takes you home.',
  false,
  'Linux',
  'Navigation',
  true,
  'builtin'
),
(
  'What command changes to the root directory?',
  'cd /',
  array['cd /'],
  'The forward slash represents the root of the Linux filesystem.',
  false,
  'Linux',
  'Navigation',
  true,
  'builtin'
),

-- =========================================================
-- LINUX — FILES
-- =========================================================

(
  'What command lists files and directories in the current directory?',
  'ls',
  array['ls'],
  'ls lists the contents of the current directory.',
  false,
  'Linux',
  'Files',
  true,
  'builtin'
),
(
  'What command lists all files, including hidden files, in long format?',
  'ls -la',
  array['ls -la', 'ls -al'],
  'The -l option uses long format and -a includes hidden files.',
  false,
  'Linux',
  'Files',
  true,
  'builtin'
),
(
  'What command creates a new directory?',
  'mkdir directory',
  array['mkdir directory'],
  'mkdir creates a directory. Replace directory with the desired name.',
  false,
  'Linux',
  'Files',
  true,
  'builtin'
),
(
  'What command creates multiple directories at once?',
  'mkdir one two three',
  array['mkdir one two three'],
  'mkdir accepts multiple directory names in one command.',
  false,
  'Linux',
  'Files',
  true,
  'builtin'
),
(
  'What command creates an empty file?',
  'touch file',
  array['touch file'],
  'touch creates an empty file when the file does not already exist.',
  false,
  'Linux',
  'Files',
  true,
  'builtin'
),
(
  'What command creates multiple empty files at once?',
  'touch one two three',
  array['touch one two three'],
  'touch accepts multiple file names and creates each file if it does not already exist.',
  false,
  'Linux',
  'Files',
  true,
  'builtin'
),
(
  'What command copies a file?',
  'cp source destination',
  array['cp source destination'],
  'cp copies a file from the source path to the destination path.',
  false,
  'Linux',
  'Files',
  true,
  'builtin'
),
(
  'What command copies a directory and its contents recursively?',
  'cp -r source destination',
  array['cp -r source destination', 'cp -R source destination'],
  'The -r option copies directories recursively.',
  false,
  'Linux',
  'Files',
  true,
  'builtin'
),
(
  'What command moves or renames a file or directory?',
  'mv source destination',
  array['mv source destination'],
  'mv moves a file or directory. It can also rename one when the destination is in the same directory.',
  false,
  'Linux',
  'Files',
  true,
  'builtin'
),
(
  'What command removes a file?',
  'rm file',
  array['rm file'],
  'rm removes a file.',
  false,
  'Linux',
  'Files',
  true,
  'builtin'
),
(
  'What command removes a directory and its contents recursively?',
  'rm -r directory',
  array['rm -r directory', 'rm -R directory'],
  'The -r option recursively removes a directory and its contents.',
  false,
  'Linux',
  'Files',
  true,
  'builtin'
),

-- =========================================================
-- LINUX — PERMISSIONS
-- =========================================================

(
  'What command changes file permissions?',
  'chmod',
  array['chmod'],
  'chmod changes the permission bits of files and directories.',
  false,
  'Linux',
  'Permissions',
  true,
  'builtin'
),
(
  'What command changes the owner of a file or directory?',
  'chown',
  array['chown'],
  'chown changes the ownership of a file or directory.',
  false,
  'Linux',
  'Permissions',
  true,
  'builtin'
),
(
  'What command changes the group ownership of a file or directory?',
  'chgrp',
  array['chgrp'],
  'chgrp changes the group associated with a file or directory.',
  false,
  'Linux',
  'Permissions',
  true,
  'builtin'
),
(
  'What command displays file permissions and ownership?',
  'ls -l',
  array['ls -l'],
  'The long listing format displays permissions, ownership, size, and other file information.',
  false,
  'Linux',
  'Permissions',
  true,
  'builtin'
),
(
  'What does drwxr-xr-x indicate at the beginning of an ls -l listing?',
  'A directory with read, write, and execute permissions for the owner and read/execute permissions for group and others.',
  array['A directory with read, write, and execute permissions for the owner and read/execute permissions for group and others.'],
  'The first character d indicates a directory. The remaining permission groups apply to the owner, group, and others.',
  false,
  'Linux',
  'Permissions',
  true,
  'builtin'
),

-- =========================================================
-- LINUX — USERS
-- =========================================================

(
  'What command displays the current username?',
  'whoami',
  array['whoami'],
  'whoami prints the username of the current user.',
  false,
  'Linux',
  'Users',
  true,
  'builtin'
),
(
  'What command displays user and group identity information?',
  'id',
  array['id'],
  'id displays the current user ID, group ID, and group memberships.',
  false,
  'Linux',
  'Users',
  true,
  'builtin'
),
(
  'What command shows users currently logged into the system?',
  'who',
  array['who'],
  'who displays users currently logged into the system.',
  false,
  'Linux',
  'Users',
  true,
  'builtin'
),
(
  'What command displays information about users currently logged in?',
  'w',
  array['w'],
  'w shows logged-in users along with information such as their current activity and system load.',
  false,
  'Linux',
  'Users',
  true,
  'builtin'
),
(
  'What command displays the last logged-in users?',
  'last',
  array['last'],
  'last reads login history and displays previous user logins.',
  false,
  'Linux',
  'Users',
  true,
  'builtin'
),
(
  'What command creates a new user on Linux?',
  'sudo adduser username',
  array['sudo adduser username', 'sudo useradd username'],
  'adduser is a user-friendly command for creating users on many Debian-based systems. useradd is the lower-level alternative.',
  false,
  'Linux',
  'Users',
  true,
  'builtin'
),
(
  'What command changes a user''s password?',
  'sudo passwd username',
  array['sudo passwd username', 'passwd username'],
  'passwd changes the password for the specified user.',
  false,
  'Linux',
  'Users',
  true,
  'builtin'
),
(
  'What command logs a user out by terminating all of their sessions?',
  'sudo loginctl terminate-user username',
  array['sudo loginctl terminate-user username'],
  'loginctl terminate-user terminates all sessions belonging to the specified user.',
  false,
  'Linux',
  'Users',
  true,
  'builtin'
),
(
  'What command locks a Linux user account password?',
  'sudo passwd -l username',
  array['sudo passwd -l username'],
  'passwd -l locks the password of the specified account.',
  false,
  'Linux',
  'Users',
  true,
  'builtin'
),
(
  'What command unlocks a Linux user account password?',
  'sudo passwd -u username',
  array['sudo passwd -u username'],
  'passwd -u unlocks the password of the specified account.',
  false,
  'Linux',
  'Users',
  true,
  'builtin'
),
(
  'What command runs a command with another user''s privileges, commonly as root?',
  'sudo',
  array['sudo'],
  'sudo runs a command with the privileges granted to the invoking user.',
  false,
  'Linux',
  'Users',
  true,
  'builtin'
),

-- =========================================================
-- LINUX — PROCESSES
-- =========================================================

(
  'What command displays currently running processes?',
  'ps',
  array['ps'],
  'ps displays information about running processes.',
  false,
  'Linux',
  'Processes',
  true,
  'builtin'
),
(
  'What command provides a real-time view of running processes?',
  'top',
  array['top'],
  'top provides a continuously updating view of running processes and system resource usage.',
  false,
  'Linux',
  'Processes',
  true,
  'builtin'
),
(
  'What command displays processes in a detailed, interactive view?',
  'htop',
  array['htop'],
  'htop is an interactive process viewer with a more user-friendly interface than top.',
  false,
  'Linux',
  'Processes',
  true,
  'builtin'
),
(
  'What command displays the process ID of the current shell?',
  'echo $$',
  array['echo $$'],
  'The $$ shell variable contains the process ID of the current shell.',
  false,
  'Linux',
  'Processes',
  true,
  'builtin'
),
(
  'What command sends a signal to a process?',
  'kill PID',
  array['kill PID'],
  'kill sends a signal to the process identified by its PID.',
  false,
  'Linux',
  'Processes',
  true,
  'builtin'
),

-- =========================================================
-- LINUX — SSH
-- =========================================================

(
  'What file stores authorized SSH public keys for a user?',
  '~/.ssh/authorized_keys',
  array['~/.ssh/authorized_keys'],
  'The authorized_keys file contains public keys allowed to authenticate to the user account.',
  false,
  'Linux',
  'SSH',
  true,
  'builtin'
),
(
  'What command displays your SSH directory contents?',
  'ls -la ~/.ssh',
  array['ls -la ~/.ssh'],
  'This lists SSH configuration and key files, including hidden files.',
  false,
  'Linux',
  'SSH',
  true,
  'builtin'
),
(
  'What command displays the permissions of the SSH directory?',
  'sudo ls -la /home/admin/.ssh',
  array['sudo ls -la /home/admin/.ssh'],
  'ls -la displays the ownership and permissions of files and directories.',
  false,
  'Linux',
  'SSH',
  true,
  'builtin'
),
(
  'What command displays an Ed25519 public SSH key?',
  'cat ~/.ssh/id_ed25519.pub',
  array['cat ~/.ssh/id_ed25519.pub'],
  'The .pub file contains the public portion of an Ed25519 SSH key pair.',
  false,
  'Linux',
  'SSH',
  true,
  'builtin'
),
(
  'What command generates a new Ed25519 SSH key pair?',
  'ssh-keygen -t ed25519',
  array['ssh-keygen -t ed25519'],
  'ssh-keygen creates SSH key pairs. Ed25519 is a modern key type supported by OpenSSH.',
  false,
  'Linux',
  'SSH',
  true,
  'builtin'
),
(
  'What command connects to a remote server using SSH?',
  'ssh user@host',
  array['ssh user@host'],
  'ssh establishes a secure remote shell connection to the specified host.',
  false,
  'Linux',
  'SSH',
  true,
  'builtin'
),
(
  'What command copies your public SSH key to a remote server?',
  'ssh-copy-id user@host',
  array['ssh-copy-id user@host'],
  'ssh-copy-id installs your public key into the remote user''s authorized_keys file.',
  false,
  'Linux',
  'SSH',
  true,
  'builtin'
),
(
  'What command installs OpenSSH on Ubuntu or Debian?',
  'sudo apt install openssh-server',
  array['sudo apt install openssh-server'],
  'openssh-server provides the SSH server daemon on Debian-based systems.',
  false,
  'Linux',
  'SSH',
  true,
  'builtin'
),

-- =========================================================
-- GIT — RESET / UNDO
-- =========================================================

(
  'What command resets Git to the latest commit and removes all uncommitted tracked changes?',
  'git reset --hard HEAD',
  array['git reset --hard HEAD'],
  'This resets tracked files and the index to HEAD, discarding uncommitted tracked changes.',
  false,
  'Git',
  'Reset / Undo',
  true,
  'builtin'
),
(
  'What command removes untracked files and directories from a Git working tree?',
  'git clean -fd',
  array['git clean -fd'],
  'git clean removes untracked files. The -d option includes untracked directories and -f confirms the cleanup.',
  false,
  'Git',
  'Reset / Undo',
  true,
  'builtin'
),
(
  'What command resets the previous commit and discards the associated local changes?',
  'git reset --hard HEAD~1',
  array['git reset --hard HEAD~1'],
  'This moves HEAD back one commit and resets tracked files to that commit, discarding local changes.',
  false,
  'Git',
  'Reset / Undo',
  true,
  'builtin'
),
(
  'What command shows what Git clean would remove without actually removing anything?',
  'git clean -nd',
  array['git clean -nd'],
  'The -n option performs a dry run and -d includes untracked directories.',
  false,
  'Git',
  'Reset / Undo',
  true,
  'builtin'
),

-- =========================================================
-- GIT — COMMITS
-- =========================================================

(
  'What command changes the message of the most recent Git commit?',
  'git commit --amend -m "New message"',
  array['git commit --amend -m "New message"'],
  'git commit --amend replaces the most recent commit with an amended version.',
  false,
  'Git',
  'Commits',
  true,
  'builtin'
),
(
  'What command creates a Git commit with a message?',
  'git commit -m "message"',
  array['git commit -m "message"'],
  'The -m option provides the commit message directly from the command line.',
  false,
  'Git',
  'Commits',
  true,
  'builtin'
),
(
  'What command stages all modified and deleted tracked files?',
  'git add -u',
  array['git add -u'],
  'git add -u updates the index for modified and deleted tracked files.',
  false,
  'Git',
  'Commits',
  true,
  'builtin'
),
(
  'What command shows the current Git working tree status?',
  'git status',
  array['git status'],
  'git status shows staged, unstaged, and untracked changes.',
  false,
  'Git',
  'Commits',
  true,
  'builtin'
),

-- =========================================================
-- GIT — BRANCHES
-- =========================================================

(
  'What command creates a new Git branch and switches to it at the same time?',
  'git switch -c branch-name',
  array['git switch -c branch-name'],
  'The -c option creates a new branch and switches to it.',
  false,
  'Git',
  'Branches',
  true,
  'builtin'
),
(
  'What command switches to an existing Git branch?',
  'git switch branch-name',
  array['git switch branch-name'],
  'git switch changes the current branch.',
  false,
  'Git',
  'Branches',
  true,
  'builtin'
),
(
  'What command lists Git branches?',
  'git branch',
  array['git branch'],
  'git branch lists local branches.',
  false,
  'Git',
  'Branches',
  true,
  'builtin'
),

-- =========================================================
-- GIT — REMOTES
-- =========================================================

(
  'What command displays the configured Git remotes and their URLs?',
  'git remote -v',
  array['git remote -v'],
  'git remote -v displays the fetch and push URLs for configured remotes.',
  false,
  'Git',
  'Remotes',
  true,
  'builtin'
),
(
  'What command changes the URL of an existing Git remote?',
  'git remote set-url origin URL',
  array['git remote set-url origin URL'],
  'git remote set-url changes the URL associated with an existing remote.',
  false,
  'Git',
  'Remotes',
  true,
  'builtin'
),
(
  'What command adds a new Git remote?',
  'git remote add origin URL',
  array['git remote add origin URL'],
  'git remote add associates a remote name with a repository URL.',
  false,
  'Git',
  'Remotes',
  true,
  'builtin'
),
(
  'What command pushes a local branch to a remote and sets its upstream branch?',
  'git push -u origin branch-name',
  array['git push -u origin branch-name'],
  'The -u option sets the remote branch as the upstream for the local branch.',
  false,
  'Git',
  'Remotes',
  true,
  'builtin'
),

-- =========================================================
-- REACT NATIVE — ANDROID
-- =========================================================

(
  'What command runs a React Native Android app on a connected Android device?',
  'npx react-native run-android',
  array['npx react-native run-android'],
  'The React Native CLI builds and installs the Android application on an available emulator or connected device.',
  false,
  'React Native',
  'Android',
  true,
  'builtin'
),
(
  'What command builds a React Native Android release APK from the android directory?',
  './gradlew assembleRelease',
  array['./gradlew assembleRelease'],
  'Gradle builds the Android release variant using the assembleRelease task.',
  false,
  'React Native',
  'Android Builds',
  true,
  'builtin'
),
(
  'What command sequence rebuilds the Android project after making Android configuration changes?',
  'cd android && ./gradlew clean && cd .. && npx react-native run-android',
  array['cd android && ./gradlew clean && cd .. && npx react-native run-android'],
  'Cleaning the Gradle build and rebuilding helps ensure Android configuration changes are picked up.',
  false,
  'React Native',
  'Android Builds',
  true,
  'builtin'
),
(
  'What command cleans the Android Gradle build?',
  './gradlew clean',
  array['./gradlew clean'],
  'The clean task removes generated Gradle build output.',
  false,
  'React Native',
  'Android Builds',
  true,
  'builtin'
),
(
  'What command starts Metro with its cache reset?',
  'npx react-native start --reset-cache',
  array['npx react-native start --reset-cache'],
  'The --reset-cache option clears Metro''s cached data before starting the bundler.',
  false,
  'React Native',
  'Metro / Cache',
  true,
  'builtin'
),
(
  'What command creates an Android debug build and installs it on a connected device?',
  'npx react-native run-android',
  array['npx react-native run-android'],
  'The React Native CLI builds the Android debug app and installs it on an available device.',
  false,
  'React Native',
  'Android Builds',
  true,
  'builtin'
),

-- =========================================================
-- REACT NATIVE — DEVICE TROUBLESHOOTING
-- =========================================================

(
  'What command checks whether Android devices are detected by ADB?',
  'adb devices',
  array['adb devices'],
  'adb devices lists Android devices and emulators currently visible to ADB.',
  false,
  'React Native',
  'Android Devices',
  true,
  'builtin'
),
(
  'What command restarts the ADB server when an Android device is not detected?',
  'adb kill-server && adb start-server',
  array['adb kill-server && adb start-server'],
  'Restarting the ADB server can resolve device detection problems.',
  false,
  'React Native',
  'Android Devices',
  true,
  'builtin'
),
(
  'What ADB command forwards the Metro bundler port from an Android device to the development machine?',
  'adb reverse tcp:8081 tcp:8081',
  array['adb reverse tcp:8081 tcp:8081'],
  'ADB reverse allows a USB-connected Android device to access Metro running on port 8081 of the development machine.',
  false,
  'React Native',
  'Android Devices',
  true,
  'builtin'
),
(
  'What is a common first command to run when a React Native development app cannot load its JavaScript bundle?',
  'npx react-native start',
  array['npx react-native start'],
  'Starting Metro makes the JavaScript bundle available to a development React Native app.',
  false,
  'React Native',
  'Common Errors',
  true,
  'builtin'
),
(
  'What command can fix a React Native Android development device that cannot connect to Metro over USB?',
  'adb reverse tcp:8081 tcp:8081',
  array['adb reverse tcp:8081 tcp:8081'],
  'The command forwards the device''s port 8081 to the development machine''s Metro port.',
  false,
  'React Native',
  'Common Errors',
  true,
  'builtin'
),

-- =========================================================
-- REACT NATIVE — DEPENDENCIES
-- =========================================================

(
  'What command checks whether a specific npm dependency is installed?',
  'npm list package-name',
  array['npm list package-name', 'npm ls package-name'],
  'npm list displays installed packages and can be filtered to a specific dependency.',
  false,
  'React Native',
  'Dependencies',
  true,
  'builtin'
),
(
  'What command shows the top-level npm dependencies in a project?',
  'npm list --depth=0',
  array['npm list --depth=0', 'npm ls --depth=0'],
  'The depth option controls how deeply npm displays the dependency tree.',
  false,
  'React Native',
  'Dependencies',
  true,
  'builtin'
),

-- =========================================================
-- REACT NATIVE — NVM
-- =========================================================

(
  'What command checks whether NVM is installed and available?',
  'nvm --version',
  array['nvm --version', 'nvm -v'],
  'This prints the installed NVM version when the nvm command is available.',
  false,
  'React Native',
  'Node / NVM',
  true,
  'builtin'
),
(
  'What command lists the Node.js versions installed through NVM?',
  'nvm ls',
  array['nvm ls', 'nvm list'],
  'nvm ls lists Node.js versions managed by NVM.',
  false,
  'React Native',
  'Node / NVM',
  true,
  'builtin'
),
(
  'What command installs the latest LTS version of Node.js using NVM?',
  'nvm install --lts',
  array['nvm install --lts'],
  'NVM can install the current Node.js Long Term Support release with --lts.',
  false,
  'React Native',
  'Node / NVM',
  true,
  'builtin'
),
(
  'What command switches to a specific Node.js version using NVM?',
  'nvm use version',
  array['nvm use version'],
  'nvm use changes the active Node.js version in the current shell.',
  false,
  'React Native',
  'Node / NVM',
  true,
  'builtin'
),

-- =========================================================
-- VERCEL
-- =========================================================

(
  'What command installs the Vercel CLI globally with npm?',
  'npm i -g vercel',
  array['npm i -g vercel', 'npm install -g vercel'],
  'This installs the Vercel command-line interface globally.',
  false,
  'Cloud / Deployment',
  'Vercel',
  true,
  'builtin'
),
(
  'What command logs into Vercel from the terminal?',
  'vercel login',
  array['vercel login'],
  'vercel login authenticates the CLI with your Vercel account.',
  false,
  'Cloud / Deployment',
  'Vercel',
  true,
  'builtin'
),
(
  'What command deploys a project using the Vercel CLI?',
  'vercel',
  array['vercel'],
  'Running vercel from a project directory starts the Vercel deployment workflow.',
  false,
  'Cloud / Deployment',
  'Vercel',
  true,
  'builtin'
),
(
  'What command lists Vercel deployments?',
  'vercel ls',
  array['vercel ls'],
  'vercel ls lists deployments associated with the current Vercel project.',
  false,
  'Cloud / Deployment',
  'Vercel',
  true,
  'builtin'
),
(
  'What command lists Vercel domains or aliases?',
  'vercel alias ls',
  array['vercel alias ls'],
  'The alias command manages deployment aliases associated with Vercel projects.',
  false,
  'Cloud / Deployment',
  'Vercel',
  true,
  'builtin'
),

-- =========================================================
-- TAILSCALE
-- =========================================================

(
  'What command installs Tailscale using its installation script on Linux?',
  'curl -fsSL https://tailscale.com/install.sh | sh',
  array['curl -fsSL https://tailscale.com/install.sh | sh'],
  'The official installation script installs Tailscale on supported Linux systems.',
  false,
  'Cloud / Networking',
  'Tailscale',
  true,
  'builtin'
),
(
  'What command authenticates a Linux machine with Tailscale?',
  'sudo tailscale up',
  array['sudo tailscale up', 'tailscale up'],
  'tailscale up connects the machine to your tailnet and may open an authentication flow.',
  false,
  'Cloud / Networking',
  'Tailscale',
  true,
  'builtin'
),
(
  'What command displays the current Tailscale connection status?',
  'tailscale status',
  array['tailscale status'],
  'tailscale status displays information about peers and the current Tailscale connection.',
  false,
  'Cloud / Networking',
  'Tailscale',
  true,
  'builtin'
),

-- =========================================================
-- DOCKER
-- =========================================================

(
  'What command checks the installed Docker version?',
  'docker --version',
  array['docker --version', 'docker -v'],
  'This displays the installed Docker client version.',
  false,
  'Docker',
  'Basics',
  true,
  'builtin'
),
(
  'What command lists running Docker containers?',
  'docker ps',
  array['docker ps'],
  'docker ps lists currently running containers.',
  false,
  'Docker',
  'Containers',
  true,
  'builtin'
),
(
  'What command lists all Docker containers, including stopped containers?',
  'docker ps -a',
  array['docker ps -a'],
  'The -a option includes stopped containers.',
  false,
  'Docker',
  'Containers',
  true,
  'builtin'
),
(
  'What command starts a stopped Docker container?',
  'docker start container',
  array['docker start container'],
  'docker start starts an existing stopped container.',
  false,
  'Docker',
  'Containers',
  true,
  'builtin'
),
(
  'What command stops a running Docker container?',
  'docker stop container',
  array['docker stop container'],
  'docker stop sends a stop signal to the specified container.',
  false,
  'Docker',
  'Containers',
  true,
  'builtin'
),
(
  'What command displays Docker container logs?',
  'docker logs container',
  array['docker logs container'],
  'docker logs displays the output generated by a container.',
  false,
  'Docker',
  'Troubleshooting',
  true,
  'builtin'
),
(
  'What command builds a Docker image from a Dockerfile in the current directory?',
  'docker build -t image-name .',
  array['docker build -t image-name .'],
  'docker build creates an image from the Dockerfile and build context. The -t option assigns a name/tag.',
  false,
  'Docker',
  'Images',
  true,
  'builtin'
),

-- =========================================================
-- CLOUDFLARE
-- =========================================================

(
  'What command checks whether the Cloudflare CLI is installed?',
  'cloudflared --version',
  array['cloudflared --version'],
  'This displays the installed cloudflared version.',
  false,
  'Cloud / Networking',
  'Cloudflare',
  true,
  'builtin'
),
(
  'What command authenticates cloudflared with your Cloudflare account?',
  'cloudflared tunnel login',
  array['cloudflared tunnel login'],
  'This opens the Cloudflare authentication flow for creating and managing tunnels.',
  false,
  'Cloud / Networking',
  'Cloudflare',
  true,
  'builtin'
),
(
  'What command lists Cloudflare tunnels?',
  'cloudflared tunnel list',
  array['cloudflared tunnel list'],
  'This lists tunnels associated with the authenticated Cloudflare account.',
  false,
  'Cloud / Networking',
  'Cloudflare',
  true,
  'builtin'
),

-- =========================================================
-- GENERAL LINUX / ADMIN
-- =========================================================

(
  'What command displays the current system hostname?',
  'hostname',
  array['hostname'],
  'hostname displays the system''s configured hostname.',
  false,
  'Linux',
  'System Administration',
  true,
  'builtin'
),
(
  'What command displays disk usage for mounted filesystems in human-readable format?',
  'df -h',
  array['df -h'],
  'df reports filesystem disk space usage and -h makes the values easier to read.',
  false,
  'Linux',
  'System Administration',
  true,
  'builtin'
),
(
  'What command displays the size of a directory in human-readable format?',
  'du -sh directory',
  array['du -sh directory'],
  'du reports disk usage. -s gives a summary and -h uses human-readable units.',
  false,
  'Linux',
  'System Administration',
  true,
  'builtin'
),
(
  'What command searches for a file by name in a directory tree?',
  'find',
  array['find'],
  'find searches directory trees based on conditions such as name, type, size, or modification time.',
  false,
  'Linux',
  'Files',
  true,
  'builtin'
),
(
  'What command searches text inside files?',
  'grep',
  array['grep'],
  'grep searches input for lines matching a pattern.',
  false,
  'Linux',
  'Text / Search',
  true,
  'builtin'
),
(
  'What command displays the contents of a text file?',
  'cat',
  array['cat'],
  'cat writes the contents of a file to standard output.',
  false,
  'Linux',
  'Files',
  true,
  'builtin'
),
(
  'What command clears the terminal screen?',
  'clear',
  array['clear'],
  'clear clears the visible terminal screen.',
  false,
  'Linux',
  'Terminal',
  true,
  'builtin'
),
(
  'What command shows the current shell''s environment variables?',
  'env',
  array['env'],
  'env displays environment variables available to the current process.',
  false,
  'Linux',
  'Environment',
  true,
  'builtin'
),
(
  'What command prints the value of an environment variable?',
  'echo $VARIABLE',
  array['echo $VARIABLE'],
  'The shell expands $VARIABLE to the value of the environment variable.',
  false,
  'Linux',
  'Environment',
  true,
  'builtin'
);