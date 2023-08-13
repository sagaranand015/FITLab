// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'

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

import GymStore from '../../abis/GymStore.json';
import { GYM_STORE_CONTRACT, GetCidFromIpfsLink, GetIpfsFileUrl } from 'src/utils/utils'
import { useAuth } from 'src/configs/authProvider'
import { useEffect, useState } from 'react'
import Web3 from 'web3'
import { LoadingButton } from '@mui/lab'
import { styled } from '@mui/material/styles'
import { Button, CardActions, CardContent } from '@mui/material'
import Link from 'next/link';

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

  const [nearbyGyms, setNearbyGyms] = useState(null);

  async function GetAllGyms() {
    if (currentAccount) {
      //  Create Web3 instance
      const web3 = new Web3(providerClient);
      const contract = new web3.eth.Contract(GymStore.abi, GYM_STORE_CONTRACT)
      const subRes = await contract.methods.getAllStores().call();
      let subs = []
      for (const r in subRes) {
        console.log("======= response is: ", subRes[r])
        subs.push({
          storeId: subRes[r]['tokenId'],
          name: subRes[r]['name'].toString(),
          image: GetIpfsFileUrl(GetCidFromIpfsLink(subRes[r]['image'].toString())),
          address: subRes[r]['storeAddr'].toString(),
          owner: subRes[r]['owner'],
        })
      }
      setNearbyGyms(subs);
      console.log(" ========== contract response in state var: ", nearbyGyms, subs);
    } else {
      console.log("User account not set!");
    }
  }

  useEffect(async () => {
    console.log("current account on nearby-gyms page is: ", currentAccount)
    if (currentAccount) {
      setAccountConnected(true)
      await GetAllGyms();
    } else {
      setAccountConnected(false)
    }
  }, [currentAccount])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          Gyms Near me
        </Typography>
        <Typography variant='body2'>Use the following list to explore Gyms and Health Clubs near you. Buy their subscription NFTs and sign up for their membership using the Aurora Blockchain</Typography>
      </Grid>
      {nearbyGyms && nearbyGyms.length > 0 ? (<>
        {nearbyGyms.map(row => (
          <Grid key={row.name} item xs={12} sm={6} md={6} lg={12} sx={{ pr: 2, pb: 2, mt: 5 }}>
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
                    <Typography variant='h3' sx={{ marginBottom: 2 }}>
                      {row.name}
                    </Typography>
                    <Typography variant='h5' sx={{ marginBottom: 2 }}>
                      Address: {row.address}
                    </Typography>
                  </CardContent>
                  <CardActions className='card-action-dense'>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <Button>
                        <CartPlus fontSize='small' sx={{ marginRight: 2 }} />
                        <Link href={`/avail-subscriptions/${row.storeId}`}>See Available Subscription NFTs</Link>
                      </Button>
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
        ))}
      </>) : (<>
        <LoadingButton loading={true}>Loading, Please wait...</LoadingButton>
      </>)}

    </Grid>
  )
}

export default NearByGyms
