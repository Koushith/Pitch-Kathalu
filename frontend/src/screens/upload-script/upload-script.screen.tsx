import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { useSubmitScriptMutation } from '@/slices/scriptApiSlice'
import { Loader2, Target } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

export const PreviousWinner = () => {
  return (
    <div className='mt-2'>
      <Accordion type='single' collapsible>
        <AccordionItem value='item-1'>
          <AccordionTrigger>
            Looking for an Inspiration? - Checkout our previous winner🏆
          </AccordionTrigger>
          <AccordionContent>
            <div className='mt-10' style={{ maxWidth: '700px' }}>
              <div>
                <h2 className='font-semibold leading-none tracking-tight'>
                  Logline
                </h2>
                <p className='text-sm text-muted-foreground mt-4 logline'>
                  A young student studying abroad juggles the demands of school
                  and caring for his parents, but when tragedy strikes and his
                  mother dies, he must learn to reconnect with his distant
                  father who despises technology in this heartwarming tale told
                  through computer and phone screens.
                </p>
              </div>
              <div className='mt-6'>
                <h2 className='font-semibold leading-none tracking-tight'>
                  Synopsis
                </h2>
                <p className='text-sm text-muted-foreground mt-4 synopsis'>
                  We are introduced to Vikram, a young man who cherishes the
                  happy family photo of himself, his dad, and his loving mother
                  before leaving abroad for college. Despite his deep connection
                  with his mom, Vikram's relationship with his father is distant
                  and formal. The film's theme is subtly stated: "Malli eppudu
                  dorukuthavo ento," reminding us of the uncertainty of life's
                  arrivals. Tragedy strikes when Vikram's beloved mother passes
                  away. It gets worse when Vikram is forced to take a
                  heart-wrenching decision: he tells his father that he can't
                  attend the funeral, causing his father to abruptly hang up on
                  him. Simultaneously, Vikram's personal life is falling apart
                  as he avoids his girlfriend. Desperate for emotional support,
                  he tries reaching out to his dad through video calls, but his
                  father remains closed off. Vikram breaks down while listening
                  to the playlist he made for his mother. He seeks solace in his
                  girlfriend, only to face another blow as she ends their
                  relationship. As Vikram's world crumbles, his father accuses
                  him of being a bad son. After which we discover that the
                  father honors his late wife's memory by making her a cup of
                  coffee whenever he has one. Memories flood back as Vikram
                  watches family videos that his mother sent him and he had
                  ignored, in which his mother points how how her husband loves
                  his son but cannot express it, but rather shows it by checking
                  in on him through his mother. Vikram takes a step towards
                  healing. He makes a cup of coffee and calls her phone. In the
                  emotional climax, Vikram tells his father that they don't need
                  words; he can simply be there for him. Finally, father and son
                  reconcile, bridging the gap that had separated them. In the
                  closing image, the father brings his wife's coffee cup into
                  the frame, completing the picture.
                </p>
              </div>
              <div className='mt-6'>
                <h2 className='font-semibold leading-none tracking-tight'>
                  Personal Connect
                </h2>
                <p className='text-sm text-muted-foreground mt-4 personalConnect'>
                  Ever since I’ve moved to the US for college 2 years ago, my
                  biggest fear was losing one of my own people. I’m extremely
                  close with my mother, and if anything happened to her and I
                  wouldn’t be able to go meet her would be my biggest nightmare.
                  So I’m trying to play off that emotion, and show how two men
                  who aren’t used to expressing emotions with each other without
                  their mother around learn to emote and get close again while
                  learning the value of family.
                </p>
              </div>

              <div className='mt-6'>
                <h2 className='font-semibold leading-none tracking-tight'></h2>
                <div className='text-sm text-muted-foreground mt-4 personalConnect'>
                  <Button
                    onClick={() =>
                      window.open(
                        'https://youtu.be/-RL797DTeEE?si=Os0QEELeWElWN0Os',
                        '_next'
                      )
                    }
                  >
                    Check the Video here
                  </Button>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

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
    <div className='left mt-6 mb-10'>
      <Toaster position='top-center' />
      <h1 className='font-semibold leading-none tracking-tight'>
        Upload Your Script 🚀
      </h1>

      <PreviousWinner />
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
