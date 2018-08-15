/*
 * Run function of this script will be executed to clone the repository containing user configurations.
 */
let fs = require('fs');
let exec = require('child_process').exec;
let helper = require('../lib/helper.js');
var configCloneStep = {};

configCloneStep.run = function(oIntialConfig) {
    console.log("==> Entering config clone step...");

    // Clone the repository if it doesn't already exist
    var sRepositoryName = helper.extractRepoName(oIntialConfig.configRepo);

    if (fs.existsSync(sRepositoryName) || helper.cloneRepository(oIntialConfig.configRepo)) {
        // Pull latest changes from configRepo/configBranch
        helper.changeDirectory(oIntialConfig.os, oIntialConfig.workspace, sRepositoryName)
        helper.executeCommand(`git checkout ${oIntialConfig.configBranch}`);
        helper.executeCommand(`git pull origin ${oIntialConfig.configBranch}`);
    }
    console.log("<== Config clone step complete.");
}
module.exports = configCloneStep;
