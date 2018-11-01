/*
 *
 */
module.exports.run = function(oConfig) {
    console.log("==> Entering tool clone step.");

    // Required modules
    let fs = require('fs');
    let helper = require('../lib/helper.js');

    /*
     *  For each tool:
     *  Change into workspace directory
     *  Clone the repository if it doesn't already exist
     *  Checkout {configBranch}
     *  Pull from origin/{configBranch}
     */
    oConfig.tools.forEach(oToolConfig => {
        helper.changeDirectory(oConfig.platform, oConfig.workspace, "");
        var sRepositoryName = helper.extractRepoName(oToolConfig.repository);
        if (fs.existsSync(sRepositoryName) || helper.cloneRepository(oToolConfig.repository, oConfig.options.debug)) {
            helper.changeDirectory(oConfig.platform, oConfig.workspace, sRepositoryName);
            helper.executeCommand(`git fetch origin`);
            helper.executeCommand(`git checkout ${oToolConfig.branch}`);
            helper.executeCommand(`git pull origin ${oToolConfig.branch}`);
        }
    });

    console.log("<== Tool clone step complete.");
    console.log("");
};
