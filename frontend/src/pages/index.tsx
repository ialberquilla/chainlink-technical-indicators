// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Nstrategies from 'src/views/dashboard/Nstrategies'
import Nrebalances from 'src/views/dashboard/Nrebalances'

const Dashboard = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={3} lg={4}>
          <Nstrategies />
        </Grid>
        <Grid item xs={12} md={3} lg={8}>
          <Nrebalances />
        </Grid>
        <Grid item xs={12}>
          <Table />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
