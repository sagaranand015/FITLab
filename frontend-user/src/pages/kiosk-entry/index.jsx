// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// import GymStore from '../../abis/GymStore.json';
// import GymSubscription from '../../abis/GymSubscription.json';

// ** Demo Components Imports
import CardImgTop from 'src/views/cards/CardImgTop'
import { useAuth } from 'src/configs/authProvider'
import HelpNotificationCard from 'src/views/cards/HelpNotificationCard'
import CardImgTop2 from 'src/views/cards/CardImgTop2'
import CardImgTop3 from 'src/views/cards/CardImgTop3'
import { WindowOpen } from 'mdi-material-ui'
import { addressHasNFT } from 'src/utils/checkNFT'
import { useEffect, useState } from 'react'
import { wcProvider } from 'src/configs/walletConnectProvider'

import Web3 from "web3";
import { GYM_STORE_CONTRACT } from '../../utils/utils';

const KioskEntry = () => {
  const { currentAccount, setCurrentAccount, disconnectAccount, adminMode } = useAuth()
  const [isUser, setIsUser] = useState(false);
  const [userAccount, setUserAccount] = useState(null);

  function NavigateToLinkedIn() {
    window.open("https://www.linkedin.com/in/sagar-anand-33b37a89/", "_blank");
  }

  const [providerClient, setProviderClient] = useState(null);

  /**
   * WalletConnect v1 Integration
   */
  function onInitializeProviderClient() {
    setProviderClient(wcProvider);
  }

  useEffect(() => {
    onInitializeProviderClient();
  }, [userAccount])

  const connectUserWalletHandler = async () => {
    if (providerClient) {
      if (providerClient.connected) {
        console.log("======== wallet connected... need to kill first");
        await providerClient.connector.killSession();
      }
      console.log("======== starting?")
      var res = await providerClient.enable()
      console.log("======== now?", res)
      if (res) {
        setUserAccount(res[0])
      }
      return res[0];
    } else {
      alert("Could not initialize WalletConnect properly, please refresh the page!");
    }
    return null;
  }

  const disconnectUserWalletHandler = async () => {
    if (providerClient) {
      await providerClient.disconnect();
      setUserAccount(null);
    } else {
      alert("Could not initialize WalletConnect properly, please refresh the page!");
    }
  }

  async function CheckUserSubscription(userAddr) {
    // if (userAddr) {
    //   //  Create Web3 instance
    //   const web3 = new Web3(providerClient);
    //   console.log(" ========== web3Provider: ", web3);
    //   const contract = new web3.eth.Contract(GymStore.abi, GYM_STORE_CONTRACT)
    //   console.log(" ========== contract: ", contract);


    // } else {
    //   console.log("User account not set!");
    // }
  }

  async function checkNFT() {
    // await disconnectAccount();
    console.log("admin user account is: ", currentAccount);
    const userAccRes = await connectUserWalletHandler();
    console.log("connected user is: ", userAccRes, userAccount);
    // await setUserAccount();
    if (userAccRes) {
      setIsUser(true);
      console.log("===== Starting NFT check: ", userAccRes);
      // const hasNftRes = await addressHasNFT(userAccRes);
      await CheckUserSubscription(userAccRes);
    } else {
      console.log("======== disconnected!");
    }

  }

  async function exitAccessGranted() {
    await disconnectUserWalletHandler();
    setIsUser(false);
  }

  return (

    <div>
      {userAccount ? (
        <div>
          {setIsUser ? (
            <div>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={12} md={12}>
                  <HelpNotificationCard heading='Access Granted or not!' content='Access has been granted or not' clickButtonText='EXIT' clickButton={exitAccessGranted} />
                </Grid>
              </Grid>
            </div>
          ) :
            (
              <div><Grid container spacing={6}>
                <Grid item xs={12} sx={{ paddingBottom: 4 }}>
                  <Typography variant='h5'>Welcome to 3Fit</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <HelpNotificationCard heading='Start your Gym Entry Kiosk' content='Allow Customers to enter your gym using their pre-issued NFTs. Just let them scan the OR code to authorize their access.' clickButtonText='START ENTRY KIOSK' clickButton={checkNFT} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <CardImgTop />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <CardImgTop2 />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <CardImgTop3 />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <HelpNotificationCard heading='Contact Us' content='Connect with our Development Team to know more about the Web3 enabled Subscription Engine and the roadmap for next set of features' clickButtonText='Connect on LinkedIn' clickButton={NavigateToLinkedIn} />
                </Grid>
              </Grid></div>
            )
          }
        </div>
      ) :
        (
          <div>
            <Grid container spacing={6}>
              <Grid item xs={12} sx={{ paddingBottom: 4 }}>
                <Typography variant='h5'>Welcome to 3Fit</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <HelpNotificationCard heading='Start your Gym Entry Kiosk' content='Allow Customers to enter your gym using their pre-issued NFTs. Just let them scan the OR code to authorize their access.' clickButtonText='START ENTRY KIOSK' clickButton={checkNFT} />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CardImgTop />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CardImgTop2 />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CardImgTop3 />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <HelpNotificationCard heading='Contact Us' content='Connect with our Development Team to know more about the Web3 enabled Subscription Engine and the roadmap for next set of features' clickButtonText='Connect on LinkedIn' clickButton={NavigateToLinkedIn} />
              </Grid>
            </Grid>
          </div>
        )
      }
    </div >
  )
}

export default KioskEntry;