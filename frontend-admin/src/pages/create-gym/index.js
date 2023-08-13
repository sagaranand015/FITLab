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
import FormLayoutsIcons from 'src/views/form-layouts/FormLayoutsIcons';
import CreateGymForm from 'src/views/form-layouts/CreateGymForm';

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

const CreateGym = () => {

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

    return (
        <div>
            {currentAccount ? (
                <div>
                    <Typography variant='h5' sx={{ marginBottom: 2 }}>
                        Build your Health Club
                    </Typography>
                    <Typography variant='subtitle' sx={{ marginBottom: 5 }}>
                        Use the 3FIT platform to build your Health Club on blockchain and use NFTs to manage customer memberships and subscriptions.
                    </Typography>
                    <Grid item xs={12} md={12}>
                        <CreateGymForm />
                    </Grid>
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

export default CreateGym
