let fs = require('fs');
const { execSync } = require('child_process');
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
    this.executeCommand(`git clone ${sUrl}`);
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
        sDivider = "\\";
    } else {
        sDivider = "/";
    }

    sSubDirectory = sDivider + sSubDirectory || "";
    try {
        console.log(`Changing directory to: ${sDirectory + sSubDirectory}`);
        process.chdir(sDirectory + sSubDirectory);
        console.log(`New directory: ${process.cwd()}`);
    } catch (err) {
        console.error(`changeDirectory error: ${err}`);
    }
};

helper.executeCommand = function(sCommand) {
    // TODO: Execute in bash
    command = execSync(sCommand, function(err, stdout, stderr) {
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
