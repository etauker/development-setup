let fs = require('fs');
let exec = require('child_process').exec;
var helper = {};

helper.getArguments = function() {
    var aArgs = [];
    process.argv.forEach(function (val, index, array) {
        var iIndexOffset = "--".length;

        if (val.indexOf("WORKSPACE") !== -1) {
            var sKey = val.substr(iIndexOffset, val.indexOf("=")-iIndexOffset);
            var sValue = val.substr(val.indexOf("=")+1).replace(/_space_/g, " ");
            aArgs[sKey] = sValue;
        }
        else if (val.indexOf("=") !== -1) {
            var sKey = val.substr(iIndexOffset, val.indexOf("=")-iIndexOffset);
            var sValue = val.substr(val.indexOf("=")+1);
            try { aArgs[sKey] = JSON.parse(sValue); }
            catch (e) { aArgs[sKey] = sValue; }
        }
        else if (index === 0) {
            aArgs["COMMAND"] = val;
        }
        else if (index === 1) {
            aArgs["FILE"] = val;
        }
    });
    console.log("--------------------------------------------------");
    console.log("                   Arguments                      ");
    console.log("--------------------------------------------------");
    console.log("");
    Object.keys(aArgs).forEach(function(sKey) {
        var sValue = aArgs[sKey];
        console.log(sKey+": "+sValue);
    });
    console.log("");
    console.log("--------------------------------------------------");
    return aArgs;
};
helper.getConfiguration = function(sFilepath) {
    var sConfig = fs.readFileSync(sFilepath, 'utf8');
    console.log("--------------------------------------------------");
    console.log("                   Configuration                  ");
    console.log("--------------------------------------------------");
    console.log("");
    console.log(sConfig);
    console.log("");
    console.log("--------------------------------------------------");
    return JSON.parse(sConfig);
};
helper.cloneRepository = function(sUrl) {
    console.log("Current directory: "+process.cwd());
    console.log("Cloning repository: "+sUrl);
    return true;
};
helper.printEnvironment = function() {
    console.log("--------------------------------------------------");
    console.log("                   Environment                    ");
    console.log("--------------------------------------------------");
    console.log("");
    console.log(process.env);
    console.log("");
    console.log("--------------------------------------------------");
};

helper.changeDirectory = function(oPlatform, sDirectory, sSubDirectory) {
    var sDivider = "";
    if (oPlatform === "Windows") {
        sDivider = "\\\\";
    } else {
        sDivider = "/";
    }

    sSubDirectory = sDivider + sSubDirectory || "";
    try {
        process.chdir(sDirectory + sSubDirectory);
        console.log(`New directory: ${process.cwd()}`);
    } catch (err) {
        console.error(`changeDirectory error: ${err}`);
    }
};

helper.executeCommand = function(sCommand) {
    command = exec(sCommand, function(err, stdout, stderr) {
        if (err) {
            // should have err.code here?
        }

        if (stderr) {
            console.log("--------------------------------------------------");
            console.log("Error executing command: " + sCommand);
            console.log("--------------------------------------------------");
            console.log("stderr: " + stderr);
            console.log("--------------------------------------------------");
        }
        console.log("Command Output: ");
        console.log(stdout);
    });

    // command.on('exit', function (code) {
    //     console.log("exit code: " + code);
    // });
};

helper.extractRepoName = function(sRepoUrl) {
    if (!sRepoUrl) return "";
    var iIndexOfRepoName = sRepoUrl.lastIndexOf("/")+1;
    if (sRepoUrl.indexOf("git@github") != -1) {
        sRepoUrl = sRepoUrl.substring(0, sRepoUrl.length - ".git".length);
    }
    return sRepoUrl.substring(iIndexOfRepoName);
}

module.exports = helper;
