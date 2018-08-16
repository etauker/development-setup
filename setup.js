let fs = require('fs');
let helper = require('./lib/helper.js');

let preConfigCloneStep = require('./2-config-clone-phase/1-pre-config-clone.js');
let configCloneStep = require('./2-config-clone-phase/2-config-clone.js');
let configImportStep = require('./2-config-clone-phase/3-config-import.js');

let preToolCloneStep = require('./3-tool-clone-phase/1-pre-tool-clone.js');
let toolCloneStep = require('./3-tool-clone-phase/2-tool-clone.js');
// let configImportStep = require('./3-tool-clone-phase/3-config-import.js');

(function() {
    let sInitialConfigurationPath = "./initial-configuration.json";
    let sConfig = fs.readFileSync(sInitialConfigurationPath, 'utf8');
    var oConfig = JSON.parse(sConfig);
    oConfig = _parseArguments(oConfig);

    // Configuration clone phase
    oConfig = preConfigCloneStep.run(oConfig) || oConfig;
    oConfig = configCloneStep.run(oConfig) || oConfig;
    oConfig = configImportStep.run(oConfig) || oConfig;

    // Configuration clone phase
    oConfig = preToolCloneStep.run(oConfig) || oConfig;
    oConfig = toolCloneStep.run(oConfig) || oConfig;


    // var aArgs = helper.getArguments();
    // var oConfig = helper.getConfiguration(sFilepath);
    // var aProfiles = oConfig.profiles;
    // var oSelectedProfile = aProfiles.filter(profile => profile.name === aArgs["PROFILE"])[0];
    // var aTools = oConfig.tools.filter(tools => oSelectedProfile.tools.includes(tools.name));
    // var aSettings = oConfig.settings;
    //
    // // Clone git repositories
    // aTools.forEach(function(oTool) {
    //     var sNewDirectoryName = helper.extractRepoName(oTool.repository);
    //
    //     // Clone the repository if it doesn't already exist
    //     if (fs.existsSync(sNewDirectoryName) || helper.cloneRepository(oTool.repository)) {
    //         // TODO: Pull latest changes from oTool.branch or master
    //         var sPlatform = oSelectedProfile.platform;
    //         var sWorkspace = oSelectedProfile.workspace;
    //         var sSettings = JSON.stringify(aSettings[oTool.name]).replace(/\"/g, "\\\"");
    //         helper.changeDirectory(sPlatform, sWorkspace, sNewDirectoryName);
    //         helper.executeCommand(oTool.command +
    //             " --SETTINGS=" + sSettings +
    //             " --WORKSPACE=" + sWorkspace.replace(/ /g, "_space_") +
    //             " --PLATFORM=" + sPlatform
    //         );
    //     }
    // });
    function _parseArguments(oConfig) {

        // Set defaults
        var config = oConfig.options || {};
        var options = {
            install: config.install || false,
            profile: config.profile || oConfig.profile || "default"
        };

        // Parse command line options
        process.argv.forEach(function (sArg, iIndex, aArray) {
          if (sArg === "--install" || sArg === "-i") { options.install = true; }
          else if (sArg.indexOf("--profile=") != -1) { options.profile = sArg.match(/--profile=(.*)/)[1]; }
        });

        oConfig.options = options;
        console.log(oConfig);
        return oConfig;
    }

})();
