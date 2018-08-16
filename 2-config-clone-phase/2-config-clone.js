/*
 *
 */
module.exports.run = function(oInitialConfig) {
    console.log("==> Entering config clone step...");

    // Required modules
    let fs = require('fs');
    let helper = require('../lib/helper.js');

    /*
     *  Change into workspace directory
     *  Clone the repository if it doesn't already exist
     *  Checkout {configBranch}
     *  Pull from origin/{configBranch}
     */
    helper.changeDirectory(oInitialConfig.platform, oInitialConfig.workspace, "");
    var sRepositoryName = helper.extractRepoName(oInitialConfig.configRepo);
    if (fs.existsSync(sRepositoryName) || helper.cloneRepository(oInitialConfig.configRepo)) {
        helper.changeDirectory(oInitialConfig.platform, oInitialConfig.workspace, sRepositoryName)
        helper.executeCommand(`git checkout ${oInitialConfig.configBranch}`);
        helper.executeCommand(`git pull origin ${oInitialConfig.configBranch}`);
    }

    console.log("<== Config clone step complete.");
    console.log("");
};
