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

    var aTools = oFullConfig.tools.filter(oTool => {
        return oProfile.tools.includes(oTool.name);
    });

    aTools = aTools.map(oTool => {
        // Get all settings for the tool
        oTool.settings = oFullConfig.settings[oTool.name];
        // Filter using settings defined in the profile
        oTool.settings = oTool.settings.filter(oSetting => oProfile.settings.includes(oSetting.name));
        // Map the tools
        return oTool;
    })

    oConfig.workspace = oProfile.workspace;
    oConfig.platform = oProfile.platform;
    oConfig.profile = oProfile.name;
    oConfig.tools = aTools;
    console.log(oConfig);

    // TODO: Export environment variables based on configuration file.
    // TODO: Create directories defined by the user in the configuration file.
    console.log("<== Config import step complete.");
    return oConfig;
}
module.exports = configImportStep;
