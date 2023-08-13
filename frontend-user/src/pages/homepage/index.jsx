// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Demo Components Imports
import CardImgTop from 'src/views/cards/CardImgTop'
import { useAuth } from 'src/configs/authProvider'
import HelpNotificationCard from 'src/views/cards/HelpNotificationCard'
import CardImgTop2 from 'src/views/cards/CardImgTop2'
import CardImgTop3 from 'src/views/cards/CardImgTop3'
import { WindowOpen } from 'mdi-material-ui'
import { addressHasNFT } from 'src/utils/checkNFT'

const HomePage = () => {
  const { currentAccount, setCurrentAccount, disconnectAccount } = useAuth()

  function NavigateToLinkedIn() {
    window.open("https://www.linkedin.com/in/sagar-anand-33b37a89/", "_blank");
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant='h5'>Welcome to 3Fit</Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <HelpNotificationCard heading='Login to 3FIT Health Platform' content='Connect your wallet using WalletConnect to explore the Gyms and Health Clubs available on the 3FIT Health Platform. Use your Aurora ETH to buy and sell your Gym and Health Club Subscriptions using the blockchain based 3FIT Platform' clickButtonText='Connect Your Wallet' clickButton={setCurrentAccount} />
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
  )
}

export default HomePage;
