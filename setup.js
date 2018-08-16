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

(function() {
    let sInitialConfigurationPath = "./initial-configuration.json";
    let sConfig = fs.readFileSync(sInitialConfigurationPath, 'utf8');
    var oConfig = JSON.parse(sConfig);
    oConfig = _parseArguments(oConfig);

    // Configuration clone phase
    oConfig = preConfigCloneStep.run(oConfig) || oConfig;
    oConfig = configCloneStep.run(oConfig) || oConfig;
    oConfig = configImportStep.run(oConfig) || oConfig;

    // Tool clone phase
    oConfig = preToolCloneStep.run(oConfig) || oConfig;
    oConfig = toolCloneStep.run(oConfig) || oConfig;
    oConfig = postToolCloneStep.run(oConfig) || oConfig;

    // Tool installation phase
    if (oConfig.options.install) {
        oConfig = preToolInstallationStep.run(oConfig) || oConfig;
        oConfig = toolInstallationStep.run(oConfig) || oConfig;
        oConfig = postToolInstallationStep.run(oConfig) || oConfig;
    } else {
        console.log("Install options (--install, -i) not set, skipping tool installation phase");
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
            help: config.help || false,
            profile: config.profile || oConfig.profile || "default"
        };

        // Parse command line options
        process.argv.forEach(function (sArg, iIndex, aArray) {
            if (sArg === "--install" || sArg === "-i") { options.install = true; }
            else if (sArg === "--configure" || sArg === "-c") { options.configure = true; }
            else if (sArg === "--backup" || sArg === "-b") { options.backup = true; }
            else if (sArg === "--debug" || sArg === "-d") { options.debug = true; }
            else if (sArg === "--help" || sArg === "-h") { options.help = true; }
            else if (sArg.indexOf("--profile=") != -1) { options.profile = sArg.match(/--profile=(.*)/)[1]; }
        });

        oConfig.options = options;
        if (!options.install && !options.configure && !options.backup) {
            console.warn("Install (--install, -i), configurare (--configuare, -c) and backup (--backup, -b) options not set." );
            console.warn("The script will only download configuration repository changes." );
        }
        if (options.debug) {
            console.log(oConfig);
        }
        return oConfig;
    }

})();
