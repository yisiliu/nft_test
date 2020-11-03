pragma solidity ^0.6.0;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";

contract TestNFT is ERC721 {

    uint8[] private state_limits = [9,3,11,6,55,9,7,3,3,29,16,4,4,20,11,6,6,8,8,4,10,11,16,10,6,10,3,5,6,4,14,5,29,15,3,18,7,7,20,4,9,3,11,38,6,3,13,12,5,10,3];
    address private creator;
    mapping (address => bool) admin;
    mapping (bytes32 => bool) claimed;

    constructor (string memory _name, string memory _symbol) ERC721(_name, _symbol) public {
        _setBaseURI("https://mask-president-2020.s3.ap-east-1.amazonaws.com/");
        creator = msg.sender;
        admin[creator] = true;
    }

    function mintStateToken(address claimer, uint8 state) public returns (uint256) {
        require(admin[msg.sender], "Not authorized.");
        require(!claimed[keccak256(abi.encodePacked(claimer, state))], "Already Claimed.");
        require(state_limits[state] > 0, "Out of stock.");
        uint256 _id = uint256(keccak256(abi.encodePacked(state, state_limits[state] - 1)));
        _safeMint(claimer, _id);
        state_limits[state] -= 1;
        claimed[keccak256(abi.encodePacked(claimer, state))] = true;
        return _id;
    }

    function check_availability(uint8 state) public view returns (uint8) {
        return state_limits[state];
    }

    function modify_limits(uint8 state, int8 delta) public {
        require(admin[msg.sender], "Not authorized.");
        require(int8(state_limits[state]) + delta > 0);        
        state_limits[state] = uint8(int8(state_limits[state]) + delta);
    }

    function modify_admin(address target, bool ifadmin) public {
        require(msg.sender == creator, "Not the contract creator");
        admin[target] = ifadmin;
    }
}
