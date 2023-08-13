// ** MUI Imports
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

const CardImgTop = () => {
  return (
    <Card>
      <CardMedia sx={{ height: '10.5625rem' }} image='/images/cards/glass-house.png' />
      <CardContent>
        <Typography variant='h6' sx={{ marginBottom: 2 }}>
          Blockchain based Algorithm
        </Typography>
        <Typography variant='body2'>
          3FIT is entired blockchain based and is compatible with any EVM-compatible wallet and chain. 3FIT is fliexible enpough to be deployed multiple EVM-compatible blockchains
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CardImgTop
