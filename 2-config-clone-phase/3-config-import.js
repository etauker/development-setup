/*
 *
 */
module.exports.run = function(oConfig) {
    console.log("==> Entering config import step...");

    // Required modules
    let fs = require('fs');
    let helper = require('../lib/helper.js');

    // Import tool configuration
    var sRepositoryName = helper.extractRepoName(oConfig.configRepo);
    let sFilepath = oConfig.workspace + "/" + sRepositoryName + "/" + oConfig.configFile;
    let sFullConfig = fs.readFileSync(sFilepath, 'utf8');
    let oFullConfig = JSON.parse(sFullConfig);
    let oProfile = oFullConfig.profiles.filter(p => p.name === oConfig.options.profile)[0];

    var aTools = oFullConfig.tools
    .filter(oTool => {
        return oProfile.tools.includes(oTool.name);
    })
    .map(oTool => {
        oTool.settings = oFullConfig.settings[oTool.name];
        oTool.settings = oTool.settings.filter(oSetting => oProfile.settings.includes(oSetting.name));
        return oTool;
    })

    oConfig.workspace = oProfile.workspace;
    oConfig.platform = oProfile.platform;
    oConfig.profile = oProfile.name;
    oConfig.tools = aTools;

    // Export environment variables based on configuration file.
    // TODO

    // Create directories defined by the user in the configuration file.
    // TODO

    // Move repository from ~/temp to $workspace.
    // TODO

    console.log("<== Config import step complete.");
    console.log("");
    return oConfig;
};
