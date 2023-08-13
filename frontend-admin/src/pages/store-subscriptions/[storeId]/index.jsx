// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

// ** Demo Components Imports
import TableBasic from 'src/views/tables/TableBasic'
import TableDense from 'src/views/tables/TableDense'
import TableSpanning from 'src/views/tables/TableSpanning'
import TableCustomized from 'src/views/tables/TableCustomized'
import TableCollapsible from 'src/views/tables/TableCollapsible'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'
import { useRouter } from 'next/router'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

import GymSubscription from '../../../abis/GymSubscription.json';
import { GYM_SUBSCRIPTION_CONTRACT, GetDateInCurrentTimezone, isSubscriptionValid, shortenAddress } from 'src/utils/utils'
import { useAuth } from 'src/configs/authProvider'
import { useEffect, useState } from 'react'
import Web3 from 'web3'
import { LoadingButton } from '@mui/lab'

import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const createData = (name, calories, fat, carbs) => {
  return { name, calories, fat, carbs }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24),
  createData('Ice cream sandwich', 237, 9.0, 37),
  createData('Eclair', 262, 16.0, 24),
  createData('Cupcake', 305, 3.7, 67),
  createData('Gingerbread', 356, 16.0, 49)
]

const StoreSubscriptionsTable = () => {

  const router = useRouter();
  const storeId = router.query.storeId;

  const { providerClient, currentAccount, setCurrentAccount } = useAuth()
  const [accountConnected, setAccountConnected] = useState(false)

  const [storeSubs, setStoreSubs] = useState(null);
  const [stId, setStId] = useState(null);



  async function GetStoreSubscriptions(sid) {
    if (currentAccount) {
      //  Create Web3 instance
      const web3 = new Web3(providerClient);
      const contract = new web3.eth.Contract(GymSubscription.abi, GYM_SUBSCRIPTION_CONTRACT)
      const subRes = await contract.methods.GetSubscriptionData(sid).call();
      let subs = []
      for (const r in subRes) {
        subs.push({
          tokenId: subRes[r]['tokenId'],
          storeId: subRes[r]['storeId'],
          name: subRes[r]['memberName'].toString(),
          image: subRes[r]['image'].toString(),
          owner: subRes[r]['owner'],
          invalidAfter: parseInt(subRes[r]['invalidAfter'])
        })
      }
      setStoreSubs(subs);
      console.log(" ========== contract response in state var: ", storeSubs, subs);
    } else {
      console.log("User account not set!");
    }
  }

  useEffect(async () => {
    console.log("current account on my-gyms page is: ", currentAccount)
    if (currentAccount && storeId) {
      setStId(storeId);
      setAccountConnected(true)
      await GetStoreSubscriptions(storeId);
    } else {
      setAccountConnected(false)
    }
  }, [currentAccount])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          My Store Subscriptions
        </Typography>
        <Typography variant='body2'>View the list of all Subscriptions created till date for your store. If you have created a new subscription, please wait for the transaction to be mined before the subscription is visible below</Typography>
      </Grid>
      {storeSubs && storeSubs.length > 0 ? (<>
        <Grid item xs={12}>
          <Card>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>Subscription Name</TableCell>
                    <TableCell align='right'>Valid Till</TableCell>
                    <TableCell align='right'>Owner Address</TableCell>
                    <TableCell align='right'>In Force</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
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
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </>) : (<>
        <LoadingButton loading={true}>Loading, Please wait...</LoadingButton>
      </>)}

    </Grid>
  )
}

export default StoreSubscriptionsTable
