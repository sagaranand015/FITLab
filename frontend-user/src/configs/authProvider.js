// import { EthereumProvider } from "@walletconnect/ethereum-provider";
import React from 'react'
import { useContext } from 'react';
import { useState, useEffect } from 'react';
// import { wcProvider } from "./walletConnectProvider";
import { EthereumProvider } from '@walletconnect/ethereum-provider';

const AuthContext = React.createContext();

function AuthProvider(props) {

    const [providerClient, setProviderClient] = useState(null);
    const [currentAccount, setCurrentAccount] = useState(null);

    // /**
    //  * WalletConnect v1 Integration
    //  */
    // function onInitializeProviderClient() {
    //     setProviderClient(wcProvider);
    // }
    // // 3. Enable / connect with provider, will open web3modal
    // const connectWalletHandler = async () => {
    //     if (providerClient) {
    //         var res = await providerClient.enable()
    //         if (res) {
    //             setCurrentAccount(res[0])
    //         }
    //     } else {
    //         alert("Could not initialize WalletConnect properly, please refresh the page!");
    //     }
    // }

    // const disconnectWalletHandler = async () => {
    //     if (providerClient) {
    //         // await providerClient.disconnect();
    //         if (providerClient.connected) {
    //             console.log("======= isConnected?")
    //             // await providerClient.connector.killSession();
    //             await providerClient.disconnect();
    //         }
    //         setCurrentAccount(null);
    //     } else {
    //         alert("Could not initialize WalletConnect properly, please refresh the page!");
    //     }
    // }

    // const checkWalletIsConnected = () => {
    //     return currentAccount == null
    // }

    // useEffect(() => {
    //     onInitializeProviderClient();
    //     checkWalletIsConnected();
    // }, [])

    const disconnectWalletHandler = async () => {
        if (providerClient) {
            // await providerClient.disconnect();
            if (providerClient.connected) {
                await providerClient.disconnect()
            }
            setCurrentAccount(null);
        } else {
            alert("Could not initialize WalletConnect properly, please refresh the page!");
        }
    }

    const checkWalletIsConnected = () => {
        return currentAccount == null
    }

    // useEffect(() => {
    //     onInitializeProviderClient();
    //     checkWalletIsConnected();
    // }, [])

    // 2. Initialize sign client
    async function onInitializeProviderClient() {
        if (providerClient == null) {
            const client = await EthereumProvider.init({
                projectId: "ba066cfb9464b10a36557a817a3b9f1d",
                showQrModal: true,
                // qrModalOptions: {
                //     themeMode: "dark", desktopWallets: ["metamask"]
                // },
                chains: [1313161555],
                version: 2,
                methods: ["eth_sendTransaction", "personal_sign"],
                events: ["chainChanged", "accountsChanged"],
            })
            console.log("======= client ok??????????????", client);
            setProviderClient(client);
            return client;
        }
        return providerClient;
    }

    // 3. Enable / connect with provider, will open web3modal
    const connectWalletHandler = async () => {
        const p = await onInitializeProviderClient();
        if (p) {
            await p.connect();
            const result = await p.request({ method: 'eth_requestAccounts' })
            if (result) {
                setCurrentAccount(result[0])
            }
        } else {
            alert("Could not initialize WalletConnect properly, please refresh the page!");
        }
    }

    useEffect(async () => {
        await onInitializeProviderClient();
        // await onConnect();
    }, [])

    return (
        <AuthContext.Provider value={{
            providerClient, currentAccount, setCurrentAccount: connectWalletHandler, disconnectAccount: disconnectWalletHandler
        }}>
            {props.children}
        </AuthContext.Provider >
    );
}

function useAuth() {
    const authContext = useContext(AuthContext);
    return { ...authContext };
}

export { AuthProvider, useAuth };