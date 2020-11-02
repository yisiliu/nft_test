const TestNFT = artifacts.require("TestNFT");

contract("TestNFT", accounts => {
    beforeEach(async () =>{
        console.log("Before ALL\n");
        nft = await TestNFT.deployed();
    });

    it("Should return the correct base uri", async () => {
        const _baseURI = await nft.baseURI.call();
        assert.equal(_baseURI, "https://mask.io/presidential_election/");
    });

    it("Should transfer token id 0 to account 1", async () => {
        const magic = await nft.safeTransferFrom.sendTransaction(accounts[0], accounts[1], 0);
        const ownership = await nft.ownerOf(0);
        assert.equal(ownership, accounts[1]);
    });
});
