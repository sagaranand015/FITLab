// ** MUI Imports
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

const CardImgTop3 = () => {
  return (
    <Card>
      <CardMedia sx={{ height: '10.5625rem' }} image='/images/cards/watch-on-hand.jpg' />
      <CardContent>
        <Typography variant='h6' sx={{ marginBottom: 2 }}>
          Purely Open Source
        </Typography>
        <Typography variant='body2'>
          We believe in sharing and caring. All of the 3FIT has been open sourced under the MIT license. Connect with our Development team to know more about the 3FIT Roadmap
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CardImgTop3;
