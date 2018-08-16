/*
 *
 */
module.exports.run = function(oConfig) {
    console.log("==> Entering tool backup step...");

    // Required modules
    let fs = require('fs');
    let helper = require('../lib/helper.js');

    /*
     *  For each tool:
     *  Change into workspace directory
     *  Attempt to execute the "backup" command set in the the tool backup
     *  If not "backup" command is set, attempt to import the "file" set in tool backup
     *  If no "file" is set, use "start.js" as a default
     *  Call "backup" function of the imported file
     */
    oConfig.tools.forEach(oToolConfig => {
        helper.changeDirectory(oConfig.platform, oConfig.workspace, "");
        var sRepositoryName = helper.extractRepoName(oToolConfig.repository);
        if (oToolConfig.backup) {
            helper.executeCommand(oToolConfig.backup);
        }
        else {
            try {
                var sScriptFilename = oToolConfig.file ? oToolConfig.file : "start.js";
                let oToolScript = require(`${oConfig.workspace}/${sRepositoryName}/${sScriptFilename}`);
                oToolScript.backup(oConfig);
            } catch (error) {
                console.error(error);
            }
        }
    });

    console.log("<== Tool backup step complete.");
    console.log("");
};
