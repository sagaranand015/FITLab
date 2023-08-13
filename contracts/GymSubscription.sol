// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./GymStore.sol";

contract GymSubscription is ERC721URIStorage {
    GymStore private _gymStore;
    uint256 serviceId = 1;

    struct storeSubscription {
        uint256 tokenId;
        uint256 storeId;
        string memberName;
        string image;
        string ipfsHash;
        address owner;
        uint256 createdAt; // timestamp
        uint256 invalidAfter; // timestamp after which service is invalid
    }

    storeSubscription[] subscriptions;

    constructor(address gymStoreContract) ERC721("GymSubscriptionNFT", "GSFT") {
        _gymStore = GymStore(gymStoreContract);
    }

    function createSubscription(
        uint256 storeId,
        string memory memberName,
        string memory image,
        string memory ipfsHash,
        address ownerAddress,
        uint256 invalidAfter
    ) public {
        if (ownerAddress == address(0)) {
            ownerAddress = msg.sender;
        }

        uint256 sid = serviceId;
        storeSubscription memory nextSub = storeSubscription(
            sid,
            storeId,
            memberName,
            image,
            ipfsHash,
            ownerAddress,
            block.timestamp,
            invalidAfter
        );

        // _transfer(msg.sender, _gymStore, tokenId);
        subscriptions.push(nextSub);
        _mint(msg.sender, serviceId);
        _setTokenURI(serviceId, ipfsHash);
        serviceId++;
    }

    function GetSubscriptionData(
        uint256 _storeId
    ) public view returns (storeSubscription[] memory) {
        uint256 k = 0;
        for (uint256 i = 0; i < subscriptions.length; i++) {
            if (subscriptions[i].storeId == _storeId) {
                k = k + 1;
            }
        }
        storeSubscription[] memory subs = new storeSubscription[](k);
        uint256 j = 0;
        for (uint256 i = 0; i < subscriptions.length; i++) {
            if (subscriptions[i].storeId == _storeId) {
                storeSubscription storage s = subscriptions[i];
                subs[j] = s;
                j = j + 1;
            }
        }
        return subs;
    }

    function GetUserSubscriptions(
        address userAddr
    ) public view returns (storeSubscription[] memory) {
        uint256 j = 0;
        for (uint256 i = 0; i < subscriptions.length; i++) {
            if (subscriptions[i].owner == userAddr) {
                j = j + 1;
            }
        }
        storeSubscription[] memory subs = new storeSubscription[](j);
        uint256 k = 0;
        for (uint256 i = 0; i < subscriptions.length; i++) {
            if (subscriptions[i].owner == userAddr) {
                storeSubscription storage s = subscriptions[i];
                subs[k] = s;
                k = k + 1;
            }
        }
        return subs;
    }

    function makePaymentToStore(uint256 val) public {
        address storeOwner = _gymStore.getStoreOwner(
            _gymStore.getStoreNumber()
        );
        // msg.sender.transfer(val);
        payable(storeOwner).transfer(val);
    }

    function hasStoreSubscription(address userAddr) public view returns (bool) {
        for (uint256 i = 0; i < subscriptions.length; i++) {
            if (subscriptions[i].owner == userAddr) {
                return true;
            }
        }
        return false;
    }

    function GetStoreIdForSubscription() public view returns (uint256) {
        return _gymStore.getStoreNumber();
    }

    function GetStoreAddressForSubscription(
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
        return _gymStore.getStore(_storeId);
    }

    function transferSubscription(
        uint256 sId,
        address transferAddr
    ) public returns (bool) {
        for (uint256 i = 0; i < serviceId; i++) {
            if (subscriptions[i].tokenId == sId) {
                // make the transfer now
                subscriptions[i].owner = transferAddr;
                return true;
            }
        }
        return false;
    }
}
