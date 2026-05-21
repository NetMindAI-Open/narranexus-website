# NarraNexus — Local install (from source)
# Renders: public/videos/install-local.{gif,webm,mp4}
#
# Re-record:
#   vhs tapes/install-local.tape
#
# Prereqs on the recording machine: git, uv, node, tmux, vhs.
# Network access required (clones from github.com).

Output public/videos/install-local.gif
Output public/videos/install-local.mp4
Output public/videos/install-local.webm

Set Theme "TokyoNight"
Set FontSize 16
Set Width 1200
Set Height 720
Set TypingSpeed 70ms
Set PlaybackSpeed 1.0
Set Padding 24

# --- Setup: clean scratch dir, no output recorded ---
Hide
Type "rm -rf /tmp/vhs-nn-rec && mkdir -p /tmp/vhs-nn-rec && cd /tmp/vhs-nn-rec && clear"
Enter
Sleep 500ms
Show

# --- Step 1: clone ---
Type "git clone https://github.com/NetMindAI-Open/NarraNexus.git"
Sleep 400ms
Enter
Sleep 7s

# --- Step 2: cd ---
Type "cd NarraNexus"
Sleep 300ms
Enter
Sleep 500ms

# --- Step 3: run ---
Type "bash run.sh"
Sleep 400ms
Enter

# Capture the early output: dep checks + banner.
# Long installs (npm ci, uv sync) and the control panel come later;
# they belong in a separate, longer tape.
Sleep 8s
