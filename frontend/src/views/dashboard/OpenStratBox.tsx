// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import { useContext, useEffect } from 'react'
import { Web3Context } from 'src/@core/context/web3Context'

// Styled component for the triangle shaped background image
const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
})

// Styled component for the trophy image
const TrophyImg = styled('img')({
  right: 36,
  bottom: 20,
  height: 98,
  position: 'absolute'
})

const OpenStratBox = () => {
  // ** Hook
  const theme = useTheme()
  const web3 = useContext(Web3Context)
  // console.log(web3)
  // useEffect(() => { web3.connectAccount() },[])

  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h6'>Open a New Strategy</Typography>
        <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
          Open a new Strategy
        </Typography>
        <Typography variant='subtitle1' sx={{ my: 4, color: 'primary.main' }}>
          Select the parameters and open a new rebalancing position
        </Typography>
        <Button size='small' variant='contained' onClick={web3.connectAccount} >
          Open Strategy
        </Button>
        <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
        {/* <TrophyImg alt='trophy' src='/images/misc/trophy.png' /> */}
      </CardContent>
    </Card>
  )
}

export default OpenStratBox
