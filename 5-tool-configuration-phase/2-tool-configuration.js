/*
 *
 */
module.exports.run = function(oConfig) {
    console.log("==> Entering tool configuration step.");

    // Required modules
    let fs = require('fs');
    let helper = require('../lib/helper.js');

    /*
     *  For each tool:
     *  Change into workspace directory
     *  Attempt to execute the "configure" command set in the the tool configuration
     *  If not "configure" command is set, attempt to import the "file" set in tool configuration
     *  If no "file" is set, use "start.js" as a default
     *  Call "configure" function of the imported file
     */
    oConfig.tools.forEach(oToolConfig => {
        helper.changeDirectory(oConfig.platform, oConfig.workspace, "");
        var sRepositoryName = helper.extractRepoName(oToolConfig.repository);
        if (oToolConfig.configure) {
            helper.executeCommand(oToolConfig.configure);
        }
        else {
            try {
                var sScriptFilename = oToolConfig.file ? oToolConfig.file : "start.js";
                let oToolScript = require(`${oConfig.workspace}/${sRepositoryName}/${sScriptFilename}`);
                oToolScript.configure(oConfig);
            } catch (error) {
                console.error(error);
            }
        }
    });

    console.log("<== Tool configuration step complete.");
    console.log("");
};
