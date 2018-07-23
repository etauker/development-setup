#!/bin/bash
# echo ""
# echo "Setup script..."
# echo "Try using jq for parsing json"
# echo ""
# echo "-------------------------------"
# echo ""





#
# # Script variables
# profiles=$(cat ./configuration.json | jq '.profiles[] | .name' | sed "s/\n/, /g"| sed "s/\"//g")
# echo $profiles
# read -p "Which profile to set up? ($profiles): " profile
# platform=$(cat ./configuration.json | jq '.profiles[] | select (.name=="work-laptop") | .platform ' | sed s/\"//g)
# echo $platform
# platform=$(cat ./configuration.json | jq '.profiles[] | select (.name=="work-laptop") | .platform ' | sed s/\"//g)
# echo $platform
#



# Script variables
profiles=$(cat ./configuration.json | jq '.profiles[] | .name' | sed "s/\"//g")

# echo ""
# echo "Which profile would you like to set up: "
# echo "("$profiles")" | sed 's/\s/, /g'
# read -p "-> " profile
# echo ""
profile="work-laptop" # for testing convenience

# Determine the platform and set related variables
platform="`cat ./configuration.json | jq ".profiles[] | select (.name==\\"$profile\\") | .platform" | sed s/\\\"//g`"
if [[ $platform = "Windows" ]]; then
    manager="Cholatey (choco)"
fi
if [[ $platform = "MacOS" ]]; then
    manager="Homebrew (brew)"
fi
echo "Profile platform:" $platform
echo "Platform Package Manager:" $manager


# Set up symlinks
directory="`cat ./configuration.json | jq ".profiles[] | select (.name==\\"$profile\\") | .symlinks[0] | .directory"`"
link="`cat ./configuration.json | jq ".profiles[] | select (.name==\\"$profile\\") | .symlinks[0] | .link" | sed s/\\\"//g`"

echo "ln -s $directory $link"
eval "ln -s $directory $link"

# Clone repositories
repo="`cat ./configuration.json | jq '.tools[] | select (.name=="atom") | .repository ' | sed s/\\\"//g`"
eval "cd $link"
pwd
echo $repo
git clone $repo

# Run setup script
