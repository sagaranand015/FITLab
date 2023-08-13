// ** MUI Imports
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

const CardImgTop2 = () => {
  return (
    <Card>
      <CardMedia sx={{ height: '10.5625rem' }} image='/images/cards/paper-boat.png' />
      <CardContent>
        <Typography variant='h6' sx={{ marginBottom: 2 }}>
          Multiple Subscription Modes
        </Typography>
        <Typography variant='body2'>
          We plan to create a smart and open subscription engine for managing various configurations of your subscriptions, all based on Web3 and EVM compatible blockchains
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CardImgTop2;
