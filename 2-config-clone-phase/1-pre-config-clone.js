/*
 * Run function of this script will be executed before the repository containing user configurations is cloned.
 */
module.exports.run = function(oInitialConfig) {
    console.log("==> Entering pre config clone step...");

    console.log("<== Pre config clone step complete.");
    console.log("");
}
