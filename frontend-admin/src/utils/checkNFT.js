import fetch from "node-fetch";
import { ALCHEMY_API_KEY, ALCHEMY_BASE_URL, COVALENT_BASE_URL } from "./constants";
import { COVALENT_API_KEY } from "./constants";
import { CHAIN_ID } from "./constants";
import { NFT_CONTRACT_ADDRESS } from "./constants"
import { NFT_CONTRACT_ADDRESS_TEST } from "./constants"

// Covalent api not returning nft data on polygon mumbai
// async function fetchAllTokensForAnAddress(address) {
//     // https://api.covalenthq.com/v1/:chain_id/address/:address/balances_v2/?&key=
//     const url = COVALENT_BASE_URL + CHAIN_ID + "/address/" + address + "/balances_v2/?nft=true&key=" + COVALENT_API_KEY
//     console.log("Getting all Token blanaces of " + address);
//     let response = await fetch(url);
//     console.log(response)
//     if (!response.ok) {
//         console.log("HTTP-Error while getting Tokens data: ", response.status);
//     }
//     let j = await response.json();
//     return j.data.items;
// }

async function fetchAllTokensForAnAddress(address) {
    // https://polygon-mumbai.g.alchemy.com/nft/v2/{api_key}/getNFTs/?owner={address}
    const url = ALCHEMY_BASE_URL + ALCHEMY_API_KEY + "/getNFTs/?owner="+address
    console.log("Getting all Token blanaces of " + address);
    let response = await fetch(url);
    console.log(response)
    if (!response.ok) {
        console.log("HTTP-Error while getting Tokens data: ", response.status);
    }
    let j = await response.json();
    return j.ownedNfts;
}

export async function addressHasNFT(address) {
    let hasNFT = false;
    const allTokens = await fetchAllTokensForAnAddress(address)

    for (let i = 0; i < allTokens.length; i++) {
        // if (allTokens[i].contract_address === NFT_CONTRACT_ADDRESS_TEST) {
            if (allTokens[i].contract.address === NFT_CONTRACT_ADDRESS) {
            hasNFT = true
            break
        }
    }

    return hasNFT;
}