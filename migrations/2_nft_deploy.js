const TestNFT = artifacts.require("TestNFT");

module.exports = function (deployer) {
  deployer.deploy(TestNFT, "President2020", "PSDT");
};
