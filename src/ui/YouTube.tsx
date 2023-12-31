import { useForm, useFieldArray, FieldErrors } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { useEffect } from 'react'

let render = 0
type FormValues = {
  username: string
  email: string
  channel: string
  social: {
    twitter: string
    facebook: string
    github: string
  }
  phoneNumbers: string[]
  phNumbers: {
    number: string
  }[]
  age: number
  dob: Date
}
function YouTube() {
  const form = useForm<FormValues>({
    defaultValues: {
      username: 'bill',
      email: 'bill@bill.com',
      channel: 'bill channel',
      social: {
        twitter: '',
        facebook: '',
        github: '',
      },
      phoneNumbers: ['', ''],
      phNumbers: [{ number: '' }],
      age: 0,
      dob: new Date(),
    },
  })
  console.log(form)
  const { register, reset, control, handleSubmit, formState, watch, getValues, setValue } = form
  const {
    errors,
    touchedFields,
    dirtyFields,
    isDirty,
    isValid,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
    submitCount,
  } = formState

  console.log(
    'Submitting',
    isSubmitting,
    'Submitted',
    isSubmitted,
    'isSubmitSuccessfull',
    isSubmitSuccessful,
    'SubmitCount',
    submitCount
  )
  // console.log('touched fields', touchedFields, 'dirtyFields', dirtyFields, isValid, isSubmitting)

  const { fields, append, remove } = useFieldArray({
    name: 'phNumbers',
    control,
  })
  const onSubmit = (data: FormValues) => {
    console.log(data, 'data on submit')
  }

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log('Form Errors', errors)
  }

  const handleGetValues = () => {
    console.log('Get Values', getValues(['username', 'channel']))
  }
  const handleSetValues = () => {
    setValue('username', '', {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }
  useEffect(() => {
    const subscription = watch((value) => {
      console.log(value)
    })
    return () => subscription.unsubscribe()
  }, [watch])

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful, reset])
  render++
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <h3>Youtube Form {render / 2}</h3>
        {/* Username */}
        <div className='form-control'>
          <label htmlFor='username'>Username</label>
          <input
            {...register('username', {
              required: {
                value: true,
                message: 'Username is required',
              },
            })}
            id='username'
            type='text'
          />
          {errors.username?.message && <p className='error'>{errors.username?.message}</p>}
        </div>
        {/* Email */}
        <div className='form-control'>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            {...register('email', {
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'invalid email address',
              },
              validate: {
                notAdmin: (value) => {
                  return value !== 'admin@example.com' || 'Enter Different email please'
                },
                notBlackListed: (value) => {
                  return !value.endsWith('baddomain.com') || 'Domain is not allowed'
                },
              },
            })}
            type='email'
          />
          {errors.email?.message && <p className='error'>{errors.email?.message}</p>}
        </div>
        {/* Channel */}
        <div className='form-control'>
          <label htmlFor='channel'>Channel</label>
          <input
            id='channel'
            {...register('channel', {
              required: {
                value: true,
                message: 'Channel is required',
              },
            })}
            type='text'
          />
          {errors.channel?.message && <p className='error'>{errors.channel?.message}</p>}
        </div>

        {/* Social */}
        <div className='form-control'>
          <label htmlFor='twitter'>Twitter</label>
          <input id='twitter' {...register('social.twitter')} type='text' />
        </div>
        {/* Social */}
        <div className='form-control'>
          <label htmlFor='facebook'>Facebook</label>
          <input id='facebook' {...register('social.facebook')} type='text' />
        </div>
        {/* Social */}
        <div className='form-control'>
          <label htmlFor='github'>Github</label>
          <input
            id='github'
            {...register('social.github', {
              disabled: true,
            })}
            type='text'
          />
        </div>
        {/* Phone Numbers 1 */}
        <div className='form-control'>
          <label htmlFor='primary-phone'>Primary Phone Number</label>
          <input id='primary-phone' {...register('phoneNumbers.0')} type='text' />
        </div>
        {/* Phone Numbers 2*/}
        <div className='form-control'>
          <label htmlFor='secondary-phone'>Secondary Phone Number</label>
          <input id='secondary-phone' {...register('phoneNumbers.1')} type='text' />
        </div>
        {/* Dynamic Fields Array */}
        <div>
          <label>List of Phone Numbers</label>
          <div>
            {fields.map((field, index) => {
              return (
                <div className='form-control' key={field.id}>
                  <input type='text' {...register(`phNumbers.${index}.number` as const)} />
                  {index > 0 && (
                    <button type='button' className='btn' onClick={() => remove(index)}>
                      Remove Phone Number
                    </button>
                  )}
                </div>
              )
            })}
            <button type='button' className='btn submit' onClick={() => append({ number: '' })}>
              {' '}
              Add Phone Number
            </button>
          </div>
        </div>
        {/* Age */}
        <div className='form-control'>
          <label htmlFor='age'>Age</label>
          <input
            {...register('age', {
              valueAsNumber: true,
              required: {
                value: true,
                message: 'Age is required',
              },
            })}
            id='age'
            type='number'
          />
          {errors.age?.message && <p className='error'>{errors.age?.message}</p>}
        </div>
        <div className='form-control'>
          <label htmlFor='username'>Date</label>
          <input
            {...register('dob', {
              valueAsDate: true,
              required: {
                value: true,
                message: 'Date is required',
              },
            })}
            id='dob'
            type='date'
          />
          {errors.dob?.message && <p className='error'>{errors.dob?.message}</p>}
        </div>
        {/* Submit */}
        <button className='btn btn-submit' disabled={!isDirty || !isValid || isSubmitting}>
          <span>Submit</span>
          <span></span>
        </button>
        <button className='btn' onClick={() => reset()}>
          Reset
        </button>
        <button className='btn' onClick={handleGetValues}>
          Get Values
        </button>
        <button className='btn' onClick={handleSetValues}>
          Set Values
        </button>
      </form>

      <DevTool control={control} />
    </div>
  )
}

export default YouTube
