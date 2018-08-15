let fs = require('fs');
let preConfigCloneStep = require('./2-config-clone-phase/1-pre-config-clone.js');
let configCloneStep = require('./2-config-clone-phase/2-config-clone.js');
let configImportStep = require('./2-config-clone-phase/3-config-import.js');
let helper = require('./lib/helper.js');

// (function() {
//     var sFilepath = "./configuration.json";
//     var aArgs = helper.getArguments();
//     var oConfig = helper.getConfiguration(sFilepath);
//     var aProfiles = oConfig.profiles;
//     var oSelectedProfile = aProfiles.filter(profile => profile.name === aArgs["PROFILE"])[0];
//     var aTools = oConfig.tools.filter(tools => oSelectedProfile.tools.includes(tools.name));
//     var aSettings = oConfig.settings;
//
//     // Clone git repositories
//     aTools.forEach(function(oTool) {
//         var sNewDirectoryName = helper.extractRepoName(oTool.repository);
//
//         // Clone the repository if it doesn't already exist
//         if (fs.existsSync(sNewDirectoryName) || helper.cloneRepository(oTool.repository)) {
//             // TODO: Pull latest changes from oTool.branch or master
//             var sPlatform = oSelectedProfile.platform;
//             var sWorkspace = oSelectedProfile.workspace;
//             var sSettings = JSON.stringify(aSettings[oTool.name]).replace(/\"/g, "\\\"");
//             helper.changeDirectory(sPlatform, sWorkspace, sNewDirectoryName);
//             helper.executeCommand(oTool.command +
//                 " --SETTINGS=" + sSettings +
//                 " --WORKSPACE=" + sWorkspace.replace(/ /g, "_space_") +
//                 " --PLATFORM=" + sPlatform
//             );
//         }
//     });
// })();

(function() {
    let sInitialConfigurationPath = "./initial-configuration.json";
    let sConfig = fs.readFileSync(sInitialConfigurationPath, 'utf8');
    var oConfig = JSON.parse(sConfig);
    // process.argv.forEach(function (val, index, array) {
    //     console.log(index + ': ' + val);
    // });

    // Configuration clone phase
    oConfig = preConfigCloneStep.run(oConfig) || oConfig;
    oConfig = configCloneStep.run(oConfig) || oConfig;
    oConfig = configImportStep.run(oConfig) || oConfig;


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


})();
