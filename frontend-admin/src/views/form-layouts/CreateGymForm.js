// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

import GymStore from '../../abis/GymStore.json';

// ** Icons Imports
import Phone from 'mdi-material-ui/Phone'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import { useAuth } from 'src/configs/authProvider'
import { useState } from 'react'
import Web3 from 'web3'
import { GYM_STORE_CONTRACT, GetCidFromIpfsLink, GetIpfsFileUrl } from '../../utils/utils';
import { LoadingButton } from '@mui/lab'

const CreateGymForm = () => {

  const { providerClient, currentAccount, setCurrentAccount } = useAuth()
  const [values, setValues] = useState({
    name: '',
    address: '',
    owner: currentAccount
  })
  const [isBuilding, setIsBuilding] = useState(false);

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  async function SubmitGymCreation() {
    if (currentAccount) {
      console.log("======== values are: ", values);
      setIsBuilding(true);
      const web3 = new Web3(providerClient);
      console.log(" ========== web3Provider: ", web3);
      const contract = new web3.eth.Contract(GymStore.abi, GYM_STORE_CONTRACT)
      console.log(" ========== contract: ", contract);
      try {
        const gymRes = await contract.methods.createStore(values.name,
          'ipfs://bafkreicbbj3cxhq75hwoh37livm7fdgh7z4hycbunsuqkjkkjwegon27y4',
          values.address,
          'ipfs://bafkreicbbj3cxhq75hwoh37livm7fdgh7z4hycbunsuqkjkkjwegon27y4').call();
        // setMyGyms({
        //   storeId: gymRes[0],
        //   name: gymRes[1].toString(),
        //   image: GetIpfsFileUrl(GetCidFromIpfsLink(gymRes[2].toString())),
        //   address: gymRes[3].toString(),
        //   metadata: GetIpfsFileUrl(GetCidFromIpfsLink(gymRes[4].toString())),
        //   owner: gymRes[5].toString(),
        //   createdOn: gymRes[6],
        // });
        // setGymsLoading(false);
        console.log(" ========== contract response: ", gymRes);
        setIsBuilding(false);
      } catch (err) {
        console.log("========== some error!", err);
        setGymsLoading(false);
        setMyGyms(null);
      }
    } else {
      alert("Please make sure wallet is connected first!");
    }
  }

  return (
    <Card>
      {/* <CardHeader title='Basic with Icons' titleTypographyProps={{ variant: 'h6' }} /> */}
      <CardContent>
        <form>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Club Name'
                placeholder='Zero Gravity Fitness Club'
                onChange={handleChange('name')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                label='Club Address'
                placeholder='Bangalore, India'
                onChange={handleChange('address')}
                sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <MessageOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Club Owner Wallet Address'
                placeholder='0x2344534...'
                value={currentAccount}
                onChange={handleChange('owner')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              {isBuilding ?
                (<>
                  <LoadingButton loading={true}>Building your Gym, Please wait...</LoadingButton>
                </>) :
                (<><Button type='button' variant='contained' size='large' onClick={SubmitGymCreation}>
                  Submit
                </Button></>)}

            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default CreateGymForm
