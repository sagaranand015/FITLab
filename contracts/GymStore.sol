// SPDX-License-Identifier: MIT
// pragma solidity >=0.4.22 <0.9.0;
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract GymStore is ERC721URIStorage {
    uint256 storeNumber = 1;

    struct storeDetails {
        uint256 tokenId;
        string name;
        string image;
        string storeAddr;
        string ipfsHash;
        address ownerAddress;
        uint256 createdAt; // timestamp
    }

    storeDetails[] stores;

    mapping(uint256 => storeDetails) storeMappings;
    mapping(uint256 => address) storeOwner;
    mapping(address => uint256) storeNumberMapping;
    mapping(address => bool) registeredAStore;

    constructor() ERC721("GymStoreNFT", "GST") {
        // create the token here. Nothing to do for now, might add something later
    }

    function createStore(
        string memory name,
        string memory image,
        string memory storeAddr,
        string memory ipfsHash
    ) public {
        // Does one member can have only one business, or can have more?
        // Going with only 1 store per account for now
        require(
            registeredAStore[msg.sender] == false,
            "You already have a store in place"
        );
        uint256 sid = storeNumber;
        storeDetails memory nextStore = storeDetails(
            sid,
            name,
            image,
            storeAddr,
            ipfsHash,
            msg.sender,
            block.timestamp
        );
        stores.push(nextStore);
        _mint(msg.sender, storeNumber);

        registeredAStore[msg.sender] = true;
        storeNumberMapping[msg.sender] = storeNumber;
        storeOwner[sid] = msg.sender;

        storeNumber++;
    }

    function getStore(
        uint256 _storeId
    )
        public
        view
        returns (
            uint256,
            string memory,
            string memory,
            string memory,
            string memory,
            address,
            uint256
        )
    {
        uint256 _storeIndex = _storeId - 1;
        return (
            stores[_storeIndex].tokenId,
            stores[_storeIndex].name,
            stores[_storeIndex].image,
            stores[_storeIndex].storeAddr,
            stores[_storeIndex].ipfsHash,
            stores[_storeIndex].ownerAddress,
            stores[_storeIndex].createdAt
        );
    }

    function getAllStores() public view returns (storeDetails[] memory) {
        storeDetails[] memory strs = new storeDetails[](stores.length);
        for (uint256 i = 0; i < stores.length; i++) {
            storeDetails storage s = stores[i];
            strs[i] = s;
        }
        return strs;
    }

    function getOwnerStore(
        address ownerAddress
    )
        public
        view
        returns (
            uint256,
            string memory,
            string memory,
            string memory,
            string memory,
            address,
            uint256
        )
    {
        uint256 storeNum = storeNumberMapping[ownerAddress];
        uint256 _storeIndex = storeNum - 1;
        return (
            stores[_storeIndex].tokenId,
            stores[_storeIndex].name,
            stores[_storeIndex].image,
            stores[_storeIndex].storeAddr,
            stores[_storeIndex].ipfsHash,
            stores[_storeIndex].ownerAddress,
            stores[_storeIndex].createdAt
        );
    }

    function deleteStore(uint256 _storeId) public {
        require(storeOwner[_storeId] == msg.sender);
        delete storeOwner[_storeId];
    }

    function getStoreOwner(uint256 storeId) public view returns (address) {
        return (storeOwner[storeId]);
    }

    function getStoreNumber() public view returns (uint256) {
        return storeNumber;
    }

    function getStoreId(address _address) public view returns (uint256) {
        return storeNumberMapping[_address];
    }

    function ownsAStore(address _storeOWner) public view returns (bool) {
        return registeredAStore[_storeOWner];
    }
}
