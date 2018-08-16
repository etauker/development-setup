# Development Setup
A platform for automating development environment setup.  
This repository is a starting point for executing automated installation, configuration or backup of development environment tools.  
Along with this repository, a configuration repository and additional script repositories are needed.

## Prerequisites
Prerequisites can be found in the "1-manual-phase" folder along with instruction of how to set them up.  
Ensure configuration repository/branch/file are set up. Here's [my configuration file](https://github.com/etauker/configurations/blob/development-setup/configuration.json) [WIP] as an example.

## Instructions
From the root directory of this project, run `node setup.js`, passing optional parameters:
- (--debug, -d):       shows additional execution information
- (--install, -i):     install tools based on configuration file
- (--configure, -c):   configure tools based on configuration file
- (--backup, -b):      backup tool configurations to repository/branch specified in configuration file
- (--help, -h):        [TODO] print this list and additional information
