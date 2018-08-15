/*
 * Run function of this script will be executed after the repository containing user configurations is cloned.
 */
var configImportStep = {};
configImportStep.run = function(oConfig) {
    console.log("==> Entering onfig import step...");
    // Import configuration
    // Export environment variables based on configuration file.
    // Create directories defined by the user in the configuration file.
    console.log("<== Config import step complete.");
}
module.exports = configImportStep;
