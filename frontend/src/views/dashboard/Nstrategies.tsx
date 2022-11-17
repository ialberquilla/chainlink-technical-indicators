// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import { Web3Context } from 'src/@core/context/web3Context'
import { useContext, useEffect, useState } from 'react'

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

const Nstrategies = () => {
  // ** Hook
  const theme = useTheme()
  const web3 = useContext(Web3Context)

  const [nOfStrats, setNofStrats] = useState<number>()

  useEffect(async () => {
    const strats = await web3.getStrategies()
  setNofStrats(strats.length)
   
  }, [])



  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'
  // TODO get number from strategymanager
  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h6'>Strategies</Typography>
        <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
          Number of Strategies Deployed
        </Typography>
        <Typography variant='h5' sx={{ my: 4, color: 'primary.main' }}>
          {nOfStrats}
        </Typography>
        <Button size='small' variant='contained' disabled>
          View Details
        </Button>
        <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
      </CardContent>
    </Card>
  )
}

export default Nstrategies
