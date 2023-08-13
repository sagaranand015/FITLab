// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import { useRouter } from 'next/router'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

import Twitter from 'mdi-material-ui/Twitter'
import CartPlus from 'mdi-material-ui/CartPlus'
import Facebook from 'mdi-material-ui/Facebook'
import Linkedin from 'mdi-material-ui/Linkedin'
import GooglePlus from 'mdi-material-ui/GooglePlus'
import ShareVariant from 'mdi-material-ui/ShareVariant'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import GymSubscription from '../../abis/GymSubscription.json';
import { GYM_STORE_CONTRACT, GYM_SUBSCRIPTION_CONTRACT, GetCidFromIpfsLink, GetDateInCurrentTimezone, GetIpfsFileUrl } from 'src/utils/utils'
import { useAuth } from 'src/configs/authProvider'
import { useEffect, useState } from 'react'
import Web3 from 'web3'
import { LoadingButton } from '@mui/lab'
import { styled } from '@mui/material/styles'
import { Button, CardActions, CardContent } from '@mui/material'
import Link from 'next/link';
import HelpNotificationCard from 'src/views/cards/HelpNotificationCard'

const StyledGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  [theme.breakpoints.up('md')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}));
const NearByGyms = () => {

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const { providerClient, currentAccount, setCurrentAccount } = useAuth()
  const [accountConnected, setAccountConnected] = useState(false)

  const [userSubs, setUserSubs] = useState(null);

  async function GetAllUserSubscriptions(userAddr) {
    if (currentAccount) {
      //  Create Web3 instance
      const web3 = new Web3(providerClient);
      const contract = new web3.eth.Contract(GymSubscription.abi, GYM_SUBSCRIPTION_CONTRACT)
      const subRes = await contract.methods.GetUserSubscriptions(userAddr).call();
      let subs = []
      if (subRes.length == 0) {
        setUserSubs([]);
      }
      for (const r in subRes) {
        console.log("======= response is: ", subRes[r])
        subs.push({
          tokenId: subRes[r]['tokenId'],
          storeId: subRes[r]['storeId'],
          name: subRes[r]['memberName'].toString(),
          image: GetIpfsFileUrl(GetCidFromIpfsLink(subRes[r]['image'].toString())),
          owner: subRes[r]['owner'].toString(),
          invalidAfter: parseInt(subRes[r]['invalidAfter']) / 1000,
        })
      }
      setUserSubs(subs);
      console.log(" ========== contract response in state var: ", userSubs, subs);
    } else {
      console.log("User account not set!");
    }
  }

  useEffect(async () => {
    console.log("current account on user-subscriptions page is: ", currentAccount)
    if (currentAccount) {
      setAccountConnected(true)
      await GetAllUserSubscriptions(currentAccount);
    } else {
      setAccountConnected(false)
    }
  }, [currentAccount])

  function navigateToNearbyStores() {
    window.open("/nearby-gyms");
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          My Gym Subscriptions
        </Typography>
        <Typography variant='body2'>Here is the list of your health subscriptions from various stores. Use these subscription NFTs to gain access to any of the 3FIT Health Clubs.</Typography>
      </Grid>
      {userSubs ? (<>
        {userSubs.length > 0 ? (<>{userSubs.map(row => (
          <Grid key={`${row.storeId}/${row.tokenId}`} item xs={12} sm={6} md={6} lg={12} sx={{ pr: 2, pb: 2, mt: 5 }}>
            <Card>
              <Grid container spacing={6}>
                <StyledGrid item md={5} xs={12}>
                  <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img width={350} height={200} alt='Apple iPhone 11 Pro' src={row.image} />
                  </CardContent>
                </StyledGrid>
                <Grid
                  item
                  xs={12}
                  md={7}
                  sx={{
                    display: 'flex', flexDirection: 'column', justifyContent: 'center',
                    paddingTop: ['0 !important', '0 !important', '1.5rem !important'],
                    paddingLeft: ['1.5rem !important', '1.5rem !important', '0 !important']
                  }}
                >
                  <CardContent>
                    <Typography variant='h4' sx={{ marginBottom: 2 }}>
                      {row.name}
                    </Typography>
                    Valid Till:
                    <Typography variant='h5' sx={{ marginBottom: 2 }}>
                      {GetDateInCurrentTimezone(row.invalidAfter)}
                    </Typography>
                  </CardContent>
                  <CardActions className='card-action-dense'>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      {/* <Button>
                        <CartPlus fontSize='small' sx={{ marginRight: 2 }} />
                        <Link href={`/ avail - subscriptions / ${row.storeId}`}>See Available Subscription NFTs</Link>
                      </Button> */}
                      <IconButton
                        id='long-button'
                        aria-label='share'
                        aria-haspopup='true'
                        onClick={handleClick}
                        aria-controls='long-menu'
                        aria-expanded={open ? 'true' : undefined}
                      >
                        <ShareVariant fontSize='small' />
                      </IconButton>
                      <Menu
                        open={open}
                        id='long-menu'
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        MenuListProps={{
                          'aria-labelledby': 'long-button'
                        }}
                      >
                        <MenuItem onClick={handleClose}>
                          <Facebook />
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          <Twitter />
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          <Linkedin />
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          <GooglePlus />
                        </MenuItem>
                      </Menu>
                    </Box>
                  </CardActions>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}</>) : (<>
          <Grid item xs={12} sm={12} md={12}>
            <HelpNotificationCard heading='No subscriptions available for your account' content='You do not have any subscriptions yet. Please navigate to one of the available health clubs and purchase a subscription to get access to loads of Health benefits!' clickButtonText='Go to Nearby Health Clubs' clickButton={navigateToNearbyStores} />
          </Grid>
        </>)}

        {/* <TableBody>
          {storeSubs.map(row => (
            <TableRow
              key={row.name}
              sx={{
                '&:last-of-type td, &:last-of-type th': {
                  border: 0
                }
              }}
            >
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell align='right'>{GetDateInCurrentTimezone(row.invalidAfter)}</TableCell>
              <TableCell align='right'>{shortenAddress(row.owner)}</TableCell>
              {isSubscriptionValid(row.invalidAfter)
                ? (<TableCell align='right'>
                  <CheckCircleOutlineOutlinedIcon></CheckCircleOutlineOutlinedIcon>
                </TableCell>)
                : (<TableCell align='right'>
                  <CancelOutlinedIcon></CancelOutlinedIcon>
                </TableCell>)}
            </TableRow>
          ))}
        </TableBody> */}
      </>) : (<>
        <LoadingButton loading={true}>Loading, Please wait...</LoadingButton>
      </>)}

    </Grid>
  )
}

export default NearByGyms
