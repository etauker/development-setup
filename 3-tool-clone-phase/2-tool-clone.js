/*
 *
 */
let fs = require('fs');
let helper = require('../lib/helper.js');
var toolCloneStep = {};
toolCloneStep.run = function(oConfig) {
    console.log("==> Entering tool clone step...");
    let sWorkspace = oConfig.workspace;

    oConfig.tools.forEach(oToolConfig => {
        // Clone the repository if it doesn't already exist

        console.log(sWorkspace);
        // helper.executeCommand(`cd ${sWorkspace}`);
        helper.changeDirectory(oConfig.platform, sWorkspace, "");
        var sRepositoryName = helper.extractRepoName(oToolConfig.repository);
        if (fs.existsSync(sRepositoryName) || helper.cloneRepository(oToolConfig.repository)) {
            // Pull latest changes from repository/branch
            helper.changeDirectory(oConfig.platform, oConfig.workspace, sRepositoryName)
            helper.executeCommand(`git checkout ${oToolConfig.branch}`);
            helper.executeCommand(`git pull origin ${oToolConfig.branch}`);
        }
    });

    console.log("<== Tool clone step complete.");
}
module.exports = toolCloneStep;
