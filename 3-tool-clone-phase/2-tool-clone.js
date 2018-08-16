/*
 *
 */
var toolCloneStep = {};
toolCloneStep.run = function(oConfig) {
    console.log("==> Entering tool clone step...");

    console.log(oConfig.tools);

    // // Clone the repository if it doesn't already exist
    // var sRepositoryName = helper.extractRepoName(oConfig.configRepo);
    // if (fs.existsSync(sRepositoryName) || helper.cloneRepository(oConfig.configRepo)) {
    //     // Pull latest changes from configRepo/configBranch
    //     helper.changeDirectory(oConfig.os, oConfig.workspace, sRepositoryName)
    //     helper.executeCommand(`git checkout ${oConfig.configBranch}`);
    //     helper.executeCommand(`git pull origin ${oConfig.configBranch}`);
    // }

    console.log("<== Tool clone step complete.");
}
module.exports = toolCloneStep;
