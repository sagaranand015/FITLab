// ** MUI Imports
import Grid from '@mui/material/Grid'

import GymStore from '../../abis/GymStore.json';

import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

import Twitter from 'mdi-material-ui/Twitter'
import CartPlus from 'mdi-material-ui/CartPlus'
import Facebook from 'mdi-material-ui/Facebook'
import Linkedin from 'mdi-material-ui/Linkedin'
import GooglePlus from 'mdi-material-ui/GooglePlus'
import ShareVariant from 'mdi-material-ui/ShareVariant'

// ** Demo Components Imports
import { useAuth } from 'src/configs/authProvider'
import { useEffect, useState } from 'react'
import { Alert, Button } from '@mui/material'
import Web3 from 'web3'
import HomePage from '../homepage';
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { GYM_STORE_CONTRACT, GetCidFromIpfsLink, GetIpfsFileUrl } from '../../utils/utils';
import { styled } from '@mui/material/styles'
import Link from 'next/link';
import { LoadingButton } from '@mui/lab';
import CreateGym from '../create-gym';
import HelpNotificationCard from 'src/views/cards/HelpNotificationCard';
import { Router } from 'mdi-material-ui';
import { useRouter } from 'next/router';

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

const MyGyms = () => {

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }
    const router = useRouter()

    const { providerClient, currentAccount, setCurrentAccount } = useAuth()
    const [accountConnected, setAccountConnected] = useState(false)
    const [myGyms, setMyGyms] = useState(null);
    const [gymsLoading, setGymsLoading] = useState(false)

    async function GetGyms() {
        if (currentAccount) {
            //  Create Web3 instance
            setGymsLoading(true);
            const web3 = new Web3(providerClient);
            console.log(" ========== web3Provider: ", web3);
            const contract = new web3.eth.Contract(GymStore.abi, GYM_STORE_CONTRACT)
            console.log(" ========== contract: ", contract);
            try {
                const gymRes = await contract.methods.getOwnerStore(currentAccount).call();
                setMyGyms({
                    storeId: gymRes[0],
                    name: gymRes[1].toString(),
                    image: GetIpfsFileUrl(GetCidFromIpfsLink(gymRes[2].toString())),
                    address: gymRes[3].toString(),
                    metadata: GetIpfsFileUrl(GetCidFromIpfsLink(gymRes[4].toString())),
                    owner: gymRes[5].toString(),
                    createdOn: gymRes[6],
                });
                setGymsLoading(false);
                console.log(" ========== contract response: ", myGyms, gymRes);
            } catch (err) {
                console.log("========== some error!", err);
                setGymsLoading(false);
                setMyGyms(null);
            }

        } else {
            console.log("User account not set!");
        }
    }

    useEffect(async () => {
        console.log("current account on my-gyms page is: ", currentAccount, accountConnected)
        if (currentAccount) {
            setAccountConnected(true)
            await GetGyms();
        } else {
            setAccountConnected(false)
        }
    }, [currentAccount, accountConnected])

    function GoToCreateGym() {
        router.push("/create-gym");
    }

    return (
        <div>
            {currentAccount ? (
                <div>
                    {myGyms != null ? (<><div>
                        <Typography variant='h5' sx={{ marginBottom: 2 }}>
                            My Gym
                        </Typography>
                        <Typography variant='subtitle' sx={{ marginBottom: 2 }}>
                            Please note that our free version allows only one Gym creation per account. To create another Gym, please use a new wallet address.
                        </Typography>
                        <Grid key="1" item xs={12} sm={6} md={6} lg={6} sx={{ pr: 2, pb: 2, mt: 5 }}>
                            <Card>
                                <Grid container spacing={6}>
                                    <StyledGrid item md={5} xs={12}>
                                        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <img width={350} height={200} alt='Apple iPhone 11 Pro' src={myGyms.image} />
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
                                                {myGyms.name}
                                            </Typography>
                                            <Typography variant='h5' sx={{ marginBottom: 2 }}>
                                                Address: {myGyms.address}
                                            </Typography>
                                        </CardContent>
                                        <CardActions className='card-action-dense'>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                                <Button>
                                                    <CartPlus fontSize='small' sx={{ marginRight: 2 }} />
                                                    <Link href={`/store-subscriptions/${myGyms.storeId}`}>See All Subscription NFTs</Link>
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
                    </div ></>) : (
                        <>
                            {gymsLoading ? (<> <LoadingButton loading={true}>Loading, Please wait...</LoadingButton></>) :
                                (
                                    <>
                                        <HelpNotificationCard heading='Create a new Health Club on the 3FIT Platform'
                                            content='Create a new Health Club to manage its memberships as subscription NFTs.'
                                            clickButtonText='Build your Health Club' clickButton={GoToCreateGym} />
                                    </>
                                )
                            }
                        </>
                    )}
                </div>
            ) :
                (
                    <div>
                        <h3>Please login using your Admin Wallet First!</h3>
                        <HomePage></HomePage>
                    </div>
                )
            }
        </div >
    )
}

export default MyGyms
