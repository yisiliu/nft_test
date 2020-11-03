const TestNFT = artifacts.require("TestNFT");
const web3 = require('Web3');

contract("TestNFT", accounts => {
    beforeEach(async () =>{
        console.log("Before ALL\n");
        nft = await TestNFT.deployed();
    });

    it("Should return the correct base uri", async () => {
        const _baseURI = await nft.baseURI.call();
        assert.equal(_baseURI, "https://mask-president-2020.s3.ap-east-1.amazonaws.com/");
    });

    it("Should transfer token id 0 to account 1", async () => {
        const magic = await nft.mintStateToken.sendTransaction(accounts[1], 0);
        const _id = web3.utils.soliditySha3(0, 8);
        const ownership = await nft.ownerOf(_id);
        assert.equal(ownership, accounts[1]);
    });
});
