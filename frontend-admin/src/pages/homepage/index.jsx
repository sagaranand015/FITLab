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
        <HelpNotificationCard heading='Login to your Admin Console' content='Access and Manage your Gyms by connecting your wallet' clickButtonText='Connect Wallet' clickButton={setCurrentAccount} />
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

      {/* <Grid item xs={12} sm={6} md={4}>
        <CardUser />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardWithCollapse />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CardMobile />

      </Grid>
      <Grid item xs={12} sm={6}>
        <CardMobile />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardAppleWatch />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardInfluencer />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardVerticalRatings />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardSupport />
      </Grid>
      <Grid item xs={12} sx={{ pb: 4, pt: theme => `${theme.spacing(17.5)} !important` }}>
        <Typography variant='h5'>Navigation Cards</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <CardNavigation />
      </Grid>
      <Grid item xs={12} md={6}>
        <CardNavigationCenter />
      </Grid>
      <Grid item xs={12} sx={{ pb: 4, pt: theme => `${theme.spacing(17.5)} !important` }}>
        <Typography variant='h5'>Solid Cards</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardTwitter />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardFacebook />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardLinkedIn />
      </Grid> */}
    </Grid>
  )
}

export default HomePage;
