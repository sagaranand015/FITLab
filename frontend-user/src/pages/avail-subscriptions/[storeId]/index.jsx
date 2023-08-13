// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import { useRouter } from 'next/router'

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

import GymSubscription from '../../../abis/GymSubscription.json';
import { useAuth } from 'src/configs/authProvider'
import { useEffect, useState } from 'react'
import { LoadingButton } from '@mui/lab'
import { styled } from '@mui/material/styles'
import { Button, CardActions, CardContent } from '@mui/material';
import { GYM_SUBSCRIPTION_CONTRACT, GetSubscriptionEndDate } from 'src/utils/utils'
import Web3 from 'web3'

const MembershipTypesJson = [
  {
    "storeId": 1,
    "memberships": [
      {
        "name": "1 Month Membership NFT",
        "validFor": "1 Month",
        "cost": 0.00001,
        "price": "0.0001 ETH",
        "description": "1 Month Access",
        "image": "/images/apple-touch-icon.png",
        "invalidAfter": 1690095132,
        "validForDays": 30
      },
      {
        "name": "6 Months Membership NFT",
        "validFor": "6 Months",
        "cost": 0.00003,
        "price": "0.0003 ETH",
        "description": "6 Months Access",
        "image": "/images/apple-touch-icon.png",
        "invalidAfter": 1703409965,
        "validForDays": 180
      },
      {
        "name": "1 Year Membership NFT",
        "validFor": "1 Year",
        "cost": 0.00005,
        "price": "0.0005 ETH",
        "description": "1 Year Access",
        "image": "/images/apple-touch-icon.png",
        "invalidAfter": 1719082288,
        "validForDays": 365
      },
      {
        "name": "Lifetime Membership NFT",
        "validFor": "lifetime",
        "cost": 0.0001,
        "price": "0.0001 ETH",
        "description": "Lifetime Access",
        "image": "/images/apple-touch-icon.png",
        "invalidAfter": 1924334765,
        "validForDays": 3650
      }
    ]
  },
  {
    "storeId": 2,
    "memberships": [
      {
        "name": "1 Month Membership NFT",
        "validFor": "1 Month",
        "cost": 0.00001,
        "price": "0.0001 ETH",
        "description": "1 Month Access",
        "image": "/images/apple-touch-icon.png",
        "invalidAfter": 1690095132,
        "validForDays": 30
      },
      {
        "name": "6 Months Membership NFT",
        "validFor": "6 Months",
        "cost": 0.00003,
        "price": "0.0003 ETH",
        "description": "6 Months Access",
        "image": "/images/apple-touch-icon.png",
        "invalidAfter": 1703409965,
        "validForDays": 180
      },
      {
        "name": "1 Year Membership NFT",
        "validFor": "1 Year",
        "cost": 0.00005,
        "price": "0.0005 ETH",
        "description": "1 Year Access",
        "image": "/images/apple-touch-icon.png",
        "invalidAfter": 1719082288,
        "validForDays": 365
      },
      {
        "name": "Lifetime Membership NFT",
        "validFor": "lifetime",
        "cost": 0.0001,
        "price": "0.0001 ETH",
        "description": "Lifetime Access",
        "image": "/images/apple-touch-icon.png",
        "invalidAfter": 1924334765,
        "validForDays": 3650
      }
    ]
  },
  {
    "storeId": 3,
    "memberships": [
      {
        "name": "1 Month Membership NFT",
        "validFor": "1 Month",
        "cost": 0.0001,
        "price": "0.0001 ETH",
        "description": "1 Month Access",
        "image": "/images/apple-touch-icon.png",
        "invalidAfter": 1690095132,
        "validForDays": 30
      },
      {
        "name": "6 Months Membership NFT",
        "validFor": "6 Months",
        "cost": 0.0003,
        "price": "0.0003 ETH",
        "description": "6 Months Access",
        "image": "/images/apple-touch-icon.png",
        "invalidAfter": 1703409965,
        "validForDays": 180
      },
      {
        "name": "1 Year Membership NFT",
        "validFor": "1 Year",
        "cost": 0.0005,
        "price": "0.0005 ETH",
        "description": "1 Year Access",
        "image": "/images/apple-touch-icon.png",
        "invalidAfter": 1719082288,
        "validForDays": 365
      },
      {
        "name": "Lifetime Membership NFT",
        "validFor": "lifetime",
        "cost": 0.001,
        "price": "0.0001 ETH",
        "description": "Lifetime Access",
        "image": "/images/apple-touch-icon.png",
        "invalidAfter": 1924334765,
        "validForDays": 3650
      }
    ]
  }
];

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
const MembershipTypes = () => {

  const router = useRouter();
  const storeId = router.query.storeId;

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

  const [membershipTypes, setMembershipTypes] = useState(null);
  const [stId, setStId] = useState(null);
  const [txInProgress, setTxInProgress] = useState(false);

  function GetAllMembershipTypes(sid) {
    for (var i = 0; i < MembershipTypesJson.length; i++) {
      if (sid == MembershipTypesJson[i].storeId) {
        setMembershipTypes(MembershipTypesJson[i].memberships)
      }
    }
  }

  async function PurchaseMembership(mbShip) {
    if (currentAccount && stId) {

      const membershipName = prompt("Please enter your Subscription NFT Username/Name");
      if (membershipName) {
        //  Create Web3 instance
        setTxInProgress(true);
        const web3 = new Web3(providerClient);
        const contract = new web3.eth.Contract(GymSubscription.abi, GYM_SUBSCRIPTION_CONTRACT)
        console.log("========= mlShip: ", mbShip);
        const subEndDate = GetSubscriptionEndDate(mbShip.validForDays)
        const subRes = await contract.methods.createSubscription(stId, membershipName, "ipfs://bafkreicbbj3cxhq75hwoh37livm7fdgh7z4hycbunsuqkjkkjwegon27y4", "ipfs://bafkreicbbj3cxhq75hwoh37livm7fdgh7z4hycbunsuqkjkkjwegon27y4", currentAccount, subEndDate).send({ from: currentAccount });
        console.log("========= response of purchase: ", subRes);
        alert("Transaction successful. Your subscription NFT should now be available on the explorer!");
        setTxInProgress(false);
      } else {
        console.log("User account or StoreId not set while purchase subscription!");
      }
    } else {
      console.log("No Membership name added. Please try again");
    }

  }

  useEffect(async () => {
    if (currentAccount && storeId) {
      console.log("current account on avail-subs page is: ", currentAccount)
      setAccountConnected(true)
      setStId(storeId)
      GetAllMembershipTypes(storeId);
    } else {
      setAccountConnected(false)
    }
  }, [currentAccount, txInProgress])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          Membership Types
        </Typography>
        <Typography variant='body2'>Choose the plan that suits for your needs the best. Choose from a range of options available from the platform and use your Aurora ETH to get your Membership Access as a Subscription NFT. </Typography>
      </Grid>
      {accountConnected && membershipTypes && membershipTypes.length > 0 ? (<>
        {membershipTypes.map(row => (
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
                    <Typography variant='h4' sx={{ marginBottom: 2 }}>
                      {row.name}
                    </Typography>
                    Description:
                    <Typography variant='h6' sx={{ marginBottom: 2 }}>
                      {row.description}
                    </Typography>
                    Price:
                    <Typography variant='h6' sx={{ marginBottom: 2 }}>
                      {row.price}
                    </Typography>
                  </CardContent>
                  <CardActions className='card-action-dense'>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      {txInProgress ? (
                        <>
                          <LoadingButton loading={true}>Transaction in progress, please wait for it to finish!</LoadingButton>
                        </>
                      ) : (
                        <><Button onClick={() => { PurchaseMembership(row) }}>
                          <CartPlus fontSize='small' sx={{ marginRight: 2 }} />
                          Purchase Membership
                        </Button></>
                      )}

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

export default MembershipTypes
