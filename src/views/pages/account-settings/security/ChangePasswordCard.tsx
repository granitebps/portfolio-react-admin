'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Third-party Imports
import { Controller, useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import type { InferInput } from 'valibot'
import { object, minLength, string, pipe, nonEmpty, maxLength } from 'valibot'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { toast } from 'react-toastify'

//Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Util Imports
import { getError, type ErrorResponseType } from '@/utils/getError'

type FormData = InferInput<typeof schema>

const schema = object({
  old_password: pipe(
    string(),
    nonEmpty('Old Password is Required'),
    minLength(8, 'Old Password is too short. Min length is 8 characters'),
    maxLength(255, 'Old Password is too long. Max length is 255 characters')
  ),
  password: pipe(
    string(),
    nonEmpty('Old Password is Required'),
    minLength(8, 'Old Password is too short. Min length is 8 characters'),
    maxLength(255, 'Old Password is too long. Max length is 255 characters')
  ),
  password_confirmation: pipe(
    string(),
    nonEmpty('Old Password is Required'),
    minLength(8, 'Old Password is too short. Min length is 8 characters'),
    maxLength(255, 'Old Password is too long. Max length is 255 characters')
  )
})

const ChangePasswordCard = () => {
  const { data: session } = useSession()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: valibotResolver(schema),
    defaultValues: {
      old_password: '',
      password: '',
      password_confirmation: ''
    }
  })

  // States
  const [isCurrentPasswordShown, setIsCurrentPasswordShown] = useState(false)
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)
  const [isNewPasswordShown, setIsNewPasswordShown] = useState(false)
  const [errorState, setErrorState] = useState<ErrorResponseType | null>(null)

  const handleClickShowCurrentPassword = () => {
    setIsCurrentPasswordShown(!isCurrentPasswordShown)
  }

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      const accessToken = session?.user?.access_token

      if (accessToken) {
        const { data: dataRes } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile-password`,
          {
            old_password: data.old_password,
            password: data.password,
            password_confirmation: data.password_confirmation
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        )

        toast.success(dataRes.message)
      }
    } catch (error) {
      const formattedError = getError(error)

      if (formattedError?.server) {
        toast.error(formattedError.server)
      } else {
        setErrorState(formattedError)
      }
    }
  }

  return (
    <Card>
      <CardHeader title='Change Password' />
      <CardContent>
        <form noValidate autoComplete='off' action={() => {}} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name='old_password'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Current Password'
                    type={isCurrentPasswordShown ? 'text' : 'password'}
                    placeholder='············'
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onClick={handleClickShowCurrentPassword}
                              onMouseDown={e => e.preventDefault()}
                            >
                              <i className={isCurrentPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }
                    }}
                    onChange={e => {
                      field.onChange(e.target.value)
                      errorState !== null && setErrorState(null)
                    }}
                    {...((errors.old_password || errorState?.old_password) && {
                      error: true,
                      helperText: errors?.old_password?.message || errorState?.old_password
                    })}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid container className='mbs-0' spacing={6}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name='password'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='New Password'
                    type={isNewPasswordShown ? 'text' : 'password'}
                    placeholder='············'
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onClick={() => setIsNewPasswordShown(!isNewPasswordShown)}
                              onMouseDown={e => e.preventDefault()}
                            >
                              <i className={isNewPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }
                    }}
                    onChange={e => {
                      field.onChange(e.target.value)
                      errorState !== null && setErrorState(null)
                    }}
                    {...((errors.password || errorState?.password) && {
                      error: true,
                      helperText: errors?.password?.message || errorState?.password
                    })}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name='password_confirmation'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Confirm New Password'
                    type={isConfirmPasswordShown ? 'text' : 'password'}
                    placeholder='············'
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onClick={() => setIsConfirmPasswordShown(!isConfirmPasswordShown)}
                              onMouseDown={e => e.preventDefault()}
                            >
                              <i className={isConfirmPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }
                    }}
                    onChange={e => {
                      field.onChange(e.target.value)
                      errorState !== null && setErrorState(null)
                    }}
                    {...((errors.password_confirmation || errorState?.password_confirmation) && {
                      error: true,
                      helperText: errors?.password_confirmation?.message || errorState?.password_confirmation
                    })}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }} className='flex flex-col gap-4'>
              <Typography variant='h6'>Password Requirements:</Typography>
              <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-2.5'>
                  <i className='tabler-circle-filled text-[8px]' />
                  Minimum 8 characters long - the more, the better
                </div>
                <div className='flex items-center gap-2.5'>
                  <i className='tabler-circle-filled text-[8px]' />
                  At least one lowercase & one uppercase character
                </div>
                <div className='flex items-center gap-2.5'>
                  <i className='tabler-circle-filled text-[8px]' />
                  At least one number, symbol, or whitespace character
                </div>
              </div>
            </Grid>
            <Grid size={{ xs: 12 }} className='flex gap-4'>
              <Button variant='contained' type='submit'>
                Save Changes
              </Button>
              <Button variant='tonal' type='reset' color='secondary'>
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default ChangePasswordCard
