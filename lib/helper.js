let fs = require('fs');
const { execSync } = require('child_process');
var helper = {};

helper.getConfiguration = function(sFilepath, bDebug) {
    let sConfig = fs.readFileSync(sFilepath, 'utf8');
    let oConfig = JSON.parse(sConfig);
    if (bDebug) {
        console.log("[debug] ----- Initial Configuration: -----");
        console.log(oConfig);
        console.log("[debug] ----------------------------------");
        console.log("");
    }
    return oConfig;
};
helper.cloneRepository = function(sUrl, bDebug) {
    bDebug = bDebug || false;
    if (bDebug) console.log(`[debug] Current directory: ${process.cwd()}`);
    console.log(`Cloning repository: ${sUrl}`);
    this.executeCommand(`git clone ${sUrl}`, bDebug);
    return true;
};
helper.changeDirectory = function(oPlatform, sDirectory, sSubDirectory, bDebug) {
    bDebug = bDebug || false;
    var sDivider = "";
    if (oPlatform === "Windows") {
        sDivider = "\\\\";
    } else {
        sDivider = "/";
    }

    sSubDirectory = sDivider + sSubDirectory || "";
    try {
        console.log(`Changing directory to ${sDirectory + sSubDirectory}`);
        process.chdir(sDirectory + sSubDirectory);
        if (bDebug) console.log(`[debug] New directory: ${process.cwd()}`);
    } catch (err) {
        console.error(`changeDirectory error: ${err}`);
    }
};
helper.executeCommand = function(sCommand, bDebug) {
    bDebug = bDebug || false;
    var bSuccess = true;
    if (bDebug) console.log(`[debug] Executing command: ${sCommand}`);
    execSync(sCommand, function(err, stdout, stderr) {

        if (stderr) {
            console.log("--------------------------------------------------");
            console.log("Error executing command: " + sCommand);
            console.log("--------------------------------------------------");
            console.log("stderr: " + stderr);
            console.log("--------------------------------------------------");
        }

        if (err) {
            console.log(err);
            bSuccess = false;
        }

        console.log("Command Output: ");
        console.log(stdout);
    });
    return bSuccess;
};
helper.extractRepoName = function(sRepoUrl) {
    if (!sRepoUrl) return "";
    var iIndexOfRepoName = sRepoUrl.lastIndexOf("/")+1;
    if (sRepoUrl.indexOf("git@github") != -1) {
        sRepoUrl = sRepoUrl.substring(0, sRepoUrl.length - ".git".length);
    }
    else if (sRepoUrl.indexOf("https://github") != -1) {
        sRepoUrl = sRepoUrl.substring(iIndexOfRepoName);
    }
    return sRepoUrl.substring(iIndexOfRepoName);
};

module.exports = helper;
