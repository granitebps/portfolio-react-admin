// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports
import ChangePasswordCard from './ChangePasswordCard'
import TwoFactorAuthenticationCard from './TwoFactorAuthenticationCard'

const Security = () => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <ChangePasswordCard />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TwoFactorAuthenticationCard />
      </Grid>
    </Grid>
  )
}

export default Security
