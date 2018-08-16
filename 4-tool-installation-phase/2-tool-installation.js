/*
 *
 */
module.exports.run = function(oConfig) {
    console.log("==> Entering tool installation step...");

    // Required modules
    let fs = require('fs');
    let helper = require('../lib/helper.js');

    /*
     *  For each tool:
     *  Change into workspace directory
     *  Attempt to execute the "install" command set in the the tool configuration
     *  If not "install" command is set, attempt to import the "file" set in tool configuration
     *  If no "file" is set, use "start.js" as a default
     *  Call "install" function of the imported file
     */
    oConfig.tools.forEach(oToolConfig => {
        helper.changeDirectory(oConfig.platform, oConfig.workspace, "");
        var sRepositoryName = helper.extractRepoName(oToolConfig.repository);
        if (oToolConfig.install) {
            helper.executeCommand(oToolConfig.install);
        }
        else {
            try {
                var sScriptFilename = oToolConfig.file ? oToolConfig.file : "start.js";
                let oToolScript = require(`${oConfig.workspace}/${sRepositoryName}/${sScriptFilename}`);
                oToolScript.install(oConfig);
            } catch (error) {
                console.error(error);
            }
        }
    });

    console.log("<== Tool installation step complete.");
    console.log("");
};
