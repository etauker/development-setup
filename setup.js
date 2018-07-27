let fs = require('fs');
let helper = require('./lib/helper.js');

(function() {
    var sFilepath = "./configuration.json";
    var aArgs = helper.getArguments();
    var oConfig = helper.getConfiguration(sFilepath);
    var aProfiles = oConfig.profiles;
    var oSelectedProfile = aProfiles.filter(profile => profile.name === aArgs["PROFILE"])[0];
    var aTools = oConfig.tools.filter(tools => oSelectedProfile.tools.includes(tools.name));
    var aSettings = oConfig.settings;

    // Clone git repositories
    aTools.forEach(function(oTool) {
        var sNewDirectoryName = helper.extractRepoName(oTool.repository);

        // Clone the repository if it doesn't already exist
        if (fs.existsSync(sNewDirectoryName) || helper.cloneRepository(oTool.repository)) {
            // TODO: Pull latest changes from oTool.branch or master
            var sPlatform = oSelectedProfile.platform;
            var sWorkspace = oSelectedProfile.workspace;
            var sSettings = JSON.stringify(aSettings[oTool.name]).replace(/\"/g, "\\\"");
            helper.changeDirectory(sPlatform, sWorkspace, sNewDirectoryName);
            helper.executeCommand(oTool.command +
                " --SETTINGS=" + sSettings +
                " --WORKSPACE=" + sWorkspace.replace(/ /g, "_space_") +
                " --PLATFORM=" + sPlatform
            );
        }
    });
})();
