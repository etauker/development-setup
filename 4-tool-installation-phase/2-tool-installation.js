/*
 *
 */
let fs = require('fs');
let helper = require('../lib/helper.js');
var toolInstallationStep = {};
toolInstallationStep.run = function(oConfig) {
    console.log("==> Entering tool installation step...");
    let sWorkspace = oConfig.workspace;

    oConfig.tools.forEach(oToolConfig => {
        var sRepositoryName = helper.extractRepoName(oToolConfig.repository);
        helper.changeDirectory(oConfig.platform, sWorkspace, "");
        if (oToolConfig.install) {
            helper.executeCommand(oToolConfig.install);
        }
        else {
            try {
                let oToolScript = require(`${oConfig.workspace}/${sRepositoryName}/${oToolConfig.file}`);
                oToolScript.install(oConfig);
            } catch (error) {
                console.error(error);
            }
        }
    });

    console.log("<== Tool installation step complete.");
    console.log("");
}
module.exports = toolInstallationStep;
