pragma solidity ^0.6.0;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";

contract TestNFT is ERC721 {
    constructor (string memory _name, string memory _symbol) ERC721(_name, _symbol) public {
        _setBaseURI("https://mask-president-2020.s3.ap-east-1.amazonaws.com/");
        for (uint i = 0; i < 10; i++){
            _safeMint(msg.sender, i);
        }
    }
}
