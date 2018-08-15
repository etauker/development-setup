/*
 * Run function of this script will be executed after the repository containing user configurations is cloned.
 */
var configImportStep = {};
configImportStep.run = function(oConfig) {

      // Import configuration
      // var sRepositoryName = helper.extractRepoName(oIntialConfig.configRepo);
      // if (fs.existsSync(sRepositoryName) || helper.cloneRepository(oIntialConfig.configRepo)) {
      //
      //     // Pull latest changes from configRepo/configBranch
      //     helper.changeDirectory(oIntialConfig.os, oIntialConfig.workspace, sRepositoryName)
      //     helper.executeCommand(`git checkout ${oIntialConfig.configBranch}`);
      //     helper.executeCommand(`git pull origin ${oIntialConfig.configBranch}`);
      // }
      // Export environment variables based on configuration file.
      // Create directories defined by the user in the configuration file.
      console.log("Config import step complete.");
}
module.exports = configImportStep;
