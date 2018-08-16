let fs = require('fs');
let helper = require('./lib/helper.js');

let preConfigCloneStep = require('./2-config-clone-phase/1-pre-config-clone.js');
let configCloneStep = require('./2-config-clone-phase/2-config-clone.js');
let configImportStep = require('./2-config-clone-phase/3-config-import.js');

let preToolCloneStep = require('./3-tool-clone-phase/1-pre-tool-clone.js');
let toolCloneStep = require('./3-tool-clone-phase/2-tool-clone.js');
let postToolCloneStep = require('./3-tool-clone-phase/3-post-tool-clone.js');

let preToolInstallationStep = require('./4-tool-installation-phase/1-pre-tool-installation.js');
let toolInstallationStep = require('./4-tool-installation-phase/2-tool-installation.js');
let postToolInstallationStep = require('./4-tool-installation-phase/3-post-tool-installation.js');

let preToolConfigurationStep = require('./5-tool-configuration-phase/1-pre-tool-configuration.js');
let toolConfigurationStep = require('./5-tool-configuration-phase/2-tool-configuration.js');
let postToolConfigurationStep = require('./5-tool-configuration-phase/3-post-tool-configuration.js');

let preToolBackupStep = require('./6-tool-backup-phase/1-pre-tool-backup.js');
let toolBackupStep = require('./6-tool-backup-phase/2-tool-backup.js');
let postToolBackupStep = require('./6-tool-backup-phase/3-post-tool-backup.js');

(function() {
    let sInitialConfigurationPath = "./initial-configuration.json";
    let sConfig = fs.readFileSync(sInitialConfigurationPath, 'utf8');
    var oConfig = JSON.parse(sConfig);
    oConfig = _parseArguments(oConfig);

    // Configuration clone phase
    console.log("----- CONFIGURATION CLONE PHASE -----");
    oConfig = preConfigCloneStep.run(oConfig) || oConfig;
    oConfig = configCloneStep.run(oConfig) || oConfig;
    oConfig = configImportStep.run(oConfig) || oConfig;

    // Tool clone phase
    console.log("----- TOOL CLONE PHASE -----");
    oConfig = preToolCloneStep.run(oConfig) || oConfig;
    oConfig = toolCloneStep.run(oConfig) || oConfig;
    oConfig = postToolCloneStep.run(oConfig) || oConfig;

    // Tool installation phase
    if (oConfig.options.install) {
        console.log("----- TOOL INSTALLATION PHASE -----");
        oConfig = preToolInstallationStep.run(oConfig) || oConfig;
        oConfig = toolInstallationStep.run(oConfig) || oConfig;
        oConfig = postToolInstallationStep.run(oConfig) || oConfig;
    } else if (options.debug) {
        console.log("[debug] Install option (--install, -i) not set, skipping tool installation phase");
        console.log("");
    }

    // Tool configuration phase
    if (oConfig.options.configure) {
        console.log("----- TOOL CONFIGURATION PHASE -----");
        oConfig = preToolConfigurationStep.run(oConfig) || oConfig;
        oConfig = toolConfigurationStep.run(oConfig) || oConfig;
        oConfig = postToolConfigurationStep.run(oConfig) || oConfig;
    } else if (options.debug) {
        console.log("[debug] Configure option (--configure, -c) not set, skipping tool configuration phase");
        console.log("");
    }

    // Tool backup phase
    if (oConfig.options.backup) {
        console.log("----- TOOL BACKUP PHASE -----");
        oConfig = preToolBackupStep.run(oConfig) || oConfig;
        oConfig = toolBackupStep.run(oConfig) || oConfig;
        oConfig = postToolBackupStep.run(oConfig) || oConfig;
    } else if (options.debug) {
        console.log("[debug] Backup option (--backup, -b) not set, skipping tool backup phase");
        console.log("");
    }

    function _parseArguments(oConfig) {

        // Set defaults
        var config = oConfig.options || {};
        var options = {
            install: config.install || false,
            configure: config.configure || false,
            backup: config.backup || false,
            debug: config.debug || false,
            help: config.help || false
        };

        // Parse command line options
        process.argv.forEach(function (sArg, iIndex, aArray) {
            if (sArg === "--install" || sArg === "-i") { options.install = true; }
            else if (sArg === "--configure" || sArg === "-c") { options.configure = true; }
            else if (sArg === "--backup" || sArg === "-b") { options.backup = true; }
            else if (sArg === "--debug" || sArg === "-d") { options.debug = true; }
            else if (sArg === "--help" || sArg === "-h") { options.help = true; }
            else if (sArg.indexOf("--profile=") != -1) { oConfig.profile = sArg.match(/--profile=(.*)/)[1] || oConfig.profile || "default"; }
        });

        if (!options.install && !options.configure && !options.backup) {
            console.warn("[warn] Install (-i), configurare (-c) and backup (-b) options not set." );
            console.warn("[warn] The script will download changes but not execute them." );
        }
        if (options.debug) {
            console.log("[debug] ----- Initial Configuration: -----");
            console.log(oConfig);
            console.log("[debug] ----------------------------------");
            console.log("");
            console.log("[debug] ----- Options: -----");
            console.log(options);
            console.log("[debug] --------------------");
            console.log("");
        }
        oConfig.options = options;
        return oConfig;
    }

})();
