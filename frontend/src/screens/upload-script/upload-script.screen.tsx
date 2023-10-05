import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useSubmitScriptMutation } from '@/slices/scriptApiSlice'
import { Loader2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

export const UploadScriptScreen = () => {
  const [logline, setLogLine] = useState('')
  const [synopsis, setSynopsis] = useState('')
  const [personalConnect, setPersonalConnect] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Form field validity state variables
  const [loglineValid, setLoglineValid] = useState(false)
  const [synopsisValid, setSynopsisValid] = useState(false)
  const [personalConnectValid, setPersonalConnectValid] = useState(false)
  const [phoneNumberValid, setPhoneNumberValid] = useState(false)
  const [errors, setErrors] = useState('')
  const [disabled, setDisabled] = useState(false)
  const { mongoUserId, uid, displayName, email } = useSelector(
    (state) => state?.auth.userInfo
  )
  const [submitScript] = useSubmitScriptMutation()
  const navigate = useNavigate()

  // Validation functions
  // const validateLogline = () => {
  //   setLoglineValid(logline !== '')
  // }

  // const validateSynopsis = () => {
  //   setSynopsisValid(synopsis !== '')
  // }

  // const validatePersonalConnect = () => {
  //   setPersonalConnectValid(personalConnect !== '')
  // }

  // const validatePhoneNumber = () => {
  //   // You can add validation logic for phone number here
  //   setPhoneNumberValid(phoneNumber.length > 8) // Example: Require at least 10 characters
  // }

  // Update character counts and validate fields as the user types
  const handleLoglineChange = (value) => {
    setLogLine(value)
    setLoglineValid(true) // Assume it's valid as long as it's not over the limit
  }

  const handleSynopsisChange = (value) => {
    setSynopsis(value)
    setSynopsisValid(true) // Assume it's valid as long as it's not over the limit
  }

  const handlePersonalConnectChange = (value) => {
    setPersonalConnect(value)
    setPersonalConnectValid(true) // Assume it's valid as long as it's not over the limit
  }

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value)
    setPhoneNumberValid(true) // Assume it's valid as long as it meets the minimum requirement
  }

  // Determine whether to disable the submit button

  const maxLoglineWords = 50 // Set the maximum word count for logline
  const maxSynopsisWords = 350 // Set the maximum word count for synopsis
  const maxPersonalConnectWords = 150 // Set the maximum word count for personalConnect

  const wordCount = (text: any) =>
    text.split(/\s+/).filter((word: any) => word !== '').length

  const submitScriptHandler = async () => {
    // Check if any of the fields are empty

    let isValid = false
    if (
      wordCount(logline) > maxLoglineWords ||
      wordCount(synopsis) > maxSynopsisWords ||
      wordCount(personalConnect) > maxPersonalConnectWords
    ) {
      alert('One or more fields exceed the maximum word count.')
      setDisabled(true)
      isValid = false
      return // Don't proceed with submission
    } else {
      try {
        setDisabled(false)
        const res = await submitScript({
          logline,
          synopsis,
          personalConnect,
          userId: mongoUserId,
          userUid: uid,
          userName: displayName,
          email: email,
          phoneNumber: phoneNumber,
        }).unwrap()

        if (res.isSuccess) {
          setPersonalConnect('')
          setLogLine('')
          setSynopsis('')
          setPhoneNumber('')
          navigate('/profile')
          toast.success('Success.. submitted')
        } else {
          if (res.status === 400) {
            toast.error(res.message)
          }
        }

        console.log('submitted???', res)
      } catch (e) {
        console.log('Something went wrong....', e)

        toast.error(e?.data.message)
      }
    }
  }

  return (
    <div className='left mt-6'>
      <Toaster position='top-center' />
      <h1 className='font-semibold leading-none tracking-tight'>
        Upload Your Script 🚀
      </h1>
      <div className='mt-6 w-full md:w-1/2'>
        <div className='space-y-2'>
          <label
            htmlFor='title'
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            {' '}
            Log Line
          </label>
          <Input
            type='text'
            className='mt-2'
            value={logline}
            onChange={(e) => handleLoglineChange(e.target.value)}
          />
          <p className='text-[0.8rem] text-muted-foreground'>
            One-sentence summary or description of a movie (Max{' '}
            {maxLoglineWords} characters).
          </p>
          <p
            className={`text-[0.8rem] text-muted-foreground text-${
              loglineValid ? 'gray' : 'red'
            } text-xs`}
          >
            Words remaining: {maxLoglineWords - wordCount(logline)}
          </p>
        </div>

        <div className='space-y-2 mt-6'>
          <label
            htmlFor='title'
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            {' '}
            Synopsis
          </label>
          <Textarea
            placeholder='Type your message here.'
            value={synopsis}
            onChange={(e) => handleSynopsisChange(e.target.value)}
          />
          <p className='text-[0.8rem] text-muted-foreground'>
            Write-up that describes the plot and world of your story (Max{' '}
            {maxSynopsisWords} words).
          </p>
          <p
            className={`text-[0.8rem] text-muted-foreground text-${
              synopsisValid ? 'gray' : 'red'
            } text-xs`}
          >
            Words remaining: {maxSynopsisWords - wordCount(synopsis)}
          </p>
        </div>

        <div className='space-y-2 mt-6'>
          <label
            htmlFor='title'
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            {' '}
            Personal Connect
          </label>

          <Textarea
            placeholder='Type your message here.'
            value={personalConnect}
            onChange={(e) => handlePersonalConnectChange(e.target.value)}
          />
          <p className='text-[0.8rem] text-muted-foreground'>
            Tell us why you want to tell this story (Max{' '}
            {maxPersonalConnectWords} words).
          </p>
          <p
            className={`text-[0.8rem] text-muted-foreground text-${
              personalConnectValid ? 'gray' : 'red'
            } text-xs`}
          >
            Words remaining:{' '}
            {maxPersonalConnectWords - wordCount(personalConnect)}
          </p>
        </div>

        <div className='space-y-2 mt-6'>
          <label
            htmlFor='title'
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            {' '}
            Phone Number
          </label>

          <Input
            required
            type='tel'
            placeholder='Enter your Phone Number'
            value={phoneNumber}
            onChange={(e) => handlePhoneNumberChange(e.target.value)}
          />
          <p className='text-[0.8rem] text-muted-foreground'>
            We will contact you if things go well 🚀
          </p>
          <p
            className={`text-[0.8rem] text-muted-foreground text-${
              phoneNumberValid ? 'gray' : 'red'
            } text-xs`}
          >
            Please enter a valid phone number.
          </p>
        </div>

        <Button
          variant='default'
          size='lg'
          className={`mt-4`}
          onClick={submitScriptHandler}
        >
          {isLoading && (
            <Loader2 className='h-[1.2rem] w-[1.2rem] mr-2 animate-spin' />
          )}
          {isLoading ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </div>
  )
}
