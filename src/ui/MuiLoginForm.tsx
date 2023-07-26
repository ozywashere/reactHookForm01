import { TextField, Button, Stack, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'

type FormValues = {
  email: string
  password: string
}
function MuiLoginForm() {
  const form = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const { register, handleSubmit, formState } = form
  const { errors } = formState
  console.log(errors)
  //   console.log(register)

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }
  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Typography variant='h4' gutterBottom>
          Login
        </Typography>
        <Stack spacing={4} width={400}>
          <TextField
            label='Email'
            type='email'
            {...register('email', {
              required: {
                value: true,
                message: 'Email is required',
              },
              validate: (value) => value.includes('@') || 'Email must include @',
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label='Password'
            type='password'
            {...register('password', {
              required: {
                value: true,
                message: 'Password is required',
              },
              validate: (value) => value.length >= 8 || 'Password must be at least 8 characters',
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button type='submit' variant='contained' color='primary'>
            Login
          </Button>
        </Stack>
      </form>
    </>
  )
}

export default MuiLoginForm
