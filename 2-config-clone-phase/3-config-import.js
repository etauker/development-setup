/*
 * Run function of this script will be executed after the repository containing user configurations is cloned.
 */
let fs = require('fs');
let helper = require('../lib/helper.js');
var configImportStep = {};
configImportStep.run = function(oConfig) {
    console.log("==> Entering onfig import step...");

    // Import configuration
    var sRepositoryName = helper.extractRepoName(oConfig.configRepo);
    let sFilepath = oConfig.workspace + "/" + sRepositoryName + "/" + oConfig.configFile;
    let sFullConfig = fs.readFileSync(sFilepath, 'utf8');
    let oFullConfig = JSON.parse(sFullConfig);

    var oProfile = oFullConfig.profiles.filter(p => p.name === oConfig.options.profileName)[0];
    var aTools = oFullConfig.tools.filter(oToolConfig => {
        return oProfile.tools.filter(oTool => oTool === oToolConfig.name)[0];
    })

    profile.tools = aTools;
    oConfig.profile = profile;
    console.log(oConfig);
    return oConfig;

    // Export environment variables based on configuration file.
    // Create directories defined by the user in the configuration file.
    console.log("<== Config import step complete.");
}
module.exports = configImportStep;
