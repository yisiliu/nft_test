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

    it("Should transfer a newly minted token to account 1", async () => {
        const magic = await nft.mintStateToken.sendTransaction(accounts[1], 0);
        const _id = web3.utils.soliditySha3({t: 'uint8', v: 0}, {t: 'uint8', v: 8});
        const ownership = await nft.ownerOf(_id);
        assert.equal(ownership, accounts[1]);
    });

    it("Should return the limit for the state 0", async () => {
        const remaining = await nft.check_availability(0);
        assert.equal(remaining, 8);
    });

    it("Should reset the limit for the state 0", async () => {
        await nft.modify_limits.sendTransaction(0, 1);
        const remaining = await nft.check_availability(0);
        assert.equal(remaining, 9);
    });

    it("Should add account 1 as admin and increase the limit for the state 0", async () => {
        await nft.modify_admin.sendTransaction(accounts[1], true);
        await nft.modify_limits.sendTransaction(0, 1, {"from": accounts[1]});
        const remaining = await nft.check_availability(0);
        assert.equal(remaining, 10);
    });

});
