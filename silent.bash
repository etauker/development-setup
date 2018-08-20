#!/bin/#!/usr/bin/env bash

##
# A wrapper to enable fully non-interactive (silent) mode.
# Takes the password and passes it to node command.
##

# Remove previously entered given permissions
sudo --reset-timestamp

# Get and test user password
read -s -p "Password for $(whoami): " password
$(echo ${password} | sudo -S echo 'success' &>./priviledged)
echo ""

if [[ $(cat ./priviledged) = *"success"* ]]; then
    # If the password is correct, remove temp file and run node command
    echo "Password correct: Launching non-interactive (silent) setup."
    echo ""
    sudo rm ./priviledged &>/dev/null
    node setup.js $@ --password=${password}
else
    # If the password is incorrect, attempt to remove temp file
    echo "Password incorrect: Elevated priviledges required for setup."
    rm ./priviledged &>/dev/null
fi
