### Step 1: All platforms (using bash shell)
Run: `ssh-keygen -t rsa -b 4096 -C "etauker@gmail.com"`  
Run: `eval $(ssh-agent -s)`  
Run: `ssh-add ~/.ssh/id_rsa`  

### Step 2: Windows
Run: `clip < ~/.ssh/id_rsa.pub`

### Step 2: Debian / Ubuntu 
Run: `xclip -sel clip < ~/.ssh/id_rsa.pub`

### Step 2: MacOS
Run: `cat ~/.ssh/id_rsa.pub | pbcopy`

### Step 3: All platforms
Go to `https://github.com/settings/ssh/new`, log in, and paste the new key, adding a descriptive title to identify the device.
