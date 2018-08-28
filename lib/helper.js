let fs = require('fs');
const os = require('os');
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
helper.loadFile = function(sFilepath, bDebug) {
    let sContent = "";
    sFilepath = sFilepath.replace("~", os.homedir());
    console.log(`Loading ${sFilepath}.`);

    // Check if the file exists
    if (!fs.existsSync(sFilepath)) {
        console.warn(`Cannot read ${sFilepath}: File does not exist.`);
        return;
    }

    // Try to read the content
    try { sContent = fs.readFileSync(sFilepath, 'utf8'); }
    catch (oError) {
        console.warn(`[error] Error occured while reading ${sFilepath}.`);
        console.warn("[error] " + oError);
    }

    // Return the content
    console.log(`Successfully loaded ${sFilepath}.`);
    return sContent;
};
helper.saveFile = function(sContent, sFilepath, bDebug) {

    // Loop through and create new directories as needed
    console.log(`Saving to ${sFilepath}.`);
    var aDirectories = sFilepath.split("/");
    aDirectories.forEach((sDir, iIndex) => {
        if (iIndex === aDirectories.length-1) return;   // The last part of the path will be a file, not a directory.
        if (!fs.existsSync(sDir)) {
            if (bDebug) console.warn(`[debug] Creating directory ${sDir}.`);
            fs.mkdirSync(sDir);
        }
        aDirectories[iIndex+1] = sDir + "/" + aDirectories[iIndex+1];
    });

    // If the file exists, delete it first
    if (fs.existsSync(aDirectories[aDirectories.length-1])){
        if (bDebug) console.warn(`[debug] File ${sFilepath} already exists. Deleting.`);
        fs.unlinkSync(aDirectories[aDirectories.length-1]);
    }

    fs.writeFileSync(sFilepath, sContent);
    console.log(`Successfully saved to ${sFilepath}.`);
};
helper.cloneRepository = function(sUrl, bDebug) {
    bDebug = bDebug || false;
    if (bDebug) console.log(`[debug] Current directory: ${process.cwd()}`);
    console.log(`Cloning repository: ${sUrl}`);
    this.executeCommand(`git clone ${sUrl}`, bDebug);
    return true;
};
helper.checkoutBranch = function(sBranchName, bDebug) {
    bDebug = bDebug || false;
    console.log(`Checking out branch: ${sBranchName}`);
    this.executeCommand(`git checkout ${sBranchName}`, bDebug);
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
helper.getDisplayDate = function() {
    var oDate = new Date();
    var oTimeOptions = { hour: 'numeric', minute: 'numeric' };
    var sDay = oDate.getDate().toString();
    sDay = sDay.length === 1 ? "0"+sDay : sDay;
    var sMonth = (oDate.getMonth()+1).toString();
    sMonth = sMonth.length === 1 ? "0"+sMonth : sMonth;
    var sYear = oDate.getFullYear().toString();
    var sHours = oDate.getHours().toString();
    sHours = sHours.length === 1 ? "0"+sHours : sHours;
    var sMinutes = oDate.getMinutes().toString();
    sMinutes = sMinutes.length === 1 ? "0"+sMinutes : sMinutes;
    var sDate = `${sDay}-${sMonth}-${sYear} ${sHours}:${sMinutes}`;
    return sDate;
}

module.exports = helper;
