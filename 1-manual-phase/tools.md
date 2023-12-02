# Package managers
Homebrew (macos): `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

# CLI tools
xclip: 
- macos: `brew install xclip` (if needed, pbcopy / pbpaste come pre-installed)
- linux: `sudo apt-get install xclip` 

curl:
- linux: `sudo apt-get install curl`

git:
1. install
    - windows: https://git-scm.com/downloads
    - macos: comes installed with xcode
    - linux: `sudo apt-get install git`
2. [set up](./setup-github-tokens.md)

nvm: `XDG_CONFIG_HOME="$HOME/workspace" curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash`

oh-my-zsh: `sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"`