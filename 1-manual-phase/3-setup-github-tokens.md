### All platforms (using bash shell)
Run: `ssh-keygen -t rsa -b 4096 -C "etauker@gmail.com"`  
Run: `eval $(ssh-agent -s)`  
Run: `ssh-add ~/.ssh/id_rsa`  

### Windows
Run: `clip < ~/.ssh/id_rsa.pub`

### Debian / Ubuntu 
Run: `xclip -sel clip < ~/.ssh/id_rsa.pub`

### All platforms
Go to `https://github.com/settings/ssh/new`, log in, and paste the new key, adding a descriptive title to identify the device.
