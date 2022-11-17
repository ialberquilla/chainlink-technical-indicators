// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'
import { useContext, useEffect, useState } from 'react'
import { Web3Context } from 'src/@core/context/web3Context'

interface RowType {
  address: string
  status: string
  rebalances: number
}

interface StatusObj {
  [key: string]: {
    color: ThemeColor
  }
}


const statusObj: StatusObj = {
  // applied: { color: 'info' },
  // rejected: { color: 'error' },
  long: { color: 'info' },
  short: { color: 'warning' },
  // professional: { color: 'success' }
}



const DashboardTable = () => {
  const web3 = useContext(Web3Context)
  const [strates, setStrates] = useState<any[]>([])

  useEffect(async () => {
    const strats = await web3.getStrategies()
    console.log('sTRATEGIES', await strats[0])

    const ss = (await Promise.allSettled(
      strats.map(async (s: any) => {
        return {
          address: s.address,
          status: await s.callStatic.status()
        }
      })

    )).map((i: any) => i.value)

   const events: any[] = await web3.getRebalanceEvents()
    let x: any = {}
    events.forEach((ev: any) => {
      if (!x[ev]) x[ev]= 1
      else x[ev] += 1
      return x
    })
    console.log('groupRebalances',x)
    const rows : any[]= []
    ss.forEach((s:RowType)=> rows.push({
      ...s,
      rebalances: x[s.address]
    }) )
    console.log(rows)
    setStrates(rows)
  }, [])




  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Address</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Rebalances</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {strates.map((strategy: any) => (
              <TableRow hover key={strategy.address} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{strategy.address}</Typography>
                    <Typography variant='caption'>{strategy.address}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{strategy.status}</TableCell>
               <TableCell>{strategy.rebalances}</TableCell>
                 {/*<TableCell>{strategy.time_frame}</TableCell>
                <TableCell>{strategy.period}</TableCell>
                <TableCell>{strategy.network}</TableCell>
                <TableCell>{strategy.upper_limit}</TableCell>
                <TableCell>{strategy.lower_limit}</TableCell>
                <TableCell>
                  <Chip
                    label={strategy.status}
                    color={statusObj[strategy.status].color}
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { fontWeight: 500 }
                    }}
                  />
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default DashboardTable
