import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSubmitScriptMutation } from '@/slices/scriptApiSlice'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { Textarea } from '@/components/ui/textarea'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export const UploadScriptScreen = () => {
  const [logline, setLogLine] = useState('')
  const [synopsis, setSynopsis] = useState('')
  const [personalConnect, setPersonalConnect] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { mongoUserId, uid, displayName, email } = useSelector(
    (state) => state?.auth.userInfo
  )
  const [submitScript] = useSubmitScriptMutation()

  const maxLoglineCharacters = 100 // Define the maximum character limit for logline
  const maxSynopsisCharacters = 500 // Define the maximum character limit for synopsis
  const maxPersonalConnectCharacters = 200 // Define the maximum character limit for personalConnect

  // Character count state variables
  const [loglineCharCount, setLoglineCharCount] = useState(0)
  const [synopsisCharCount, setSynopsisCharCount] = useState(0)
  const [personalConnectCharCount, setPersonalConnectCharCount] = useState(0)

  const navigate = useNavigate()
  const submitScriptHandler = async () => {
    try {
      const res = await submitScript({
        logline,
        synopsis,
        personalConnect,
        userId: mongoUserId,
        userUid: uid,
        userName: displayName,
        email: email,
      }).unwrap()

      if (res.isSuccess) {
        setPersonalConnect('')
        setLogLine('')
        setSynopsis('')
        navigate('/profile')
      }

      console.log('submitted???', res)
    } catch (e) {
      console.log('Something went wrong....', e)
    }
  }

  // Update character counts as the user types
  const handleLoglineChange = (value) => {
    setLogLine(value)
    setLoglineCharCount(value.length)
  }

  const handleSynopsisChange = (value) => {
    setSynopsis(value)
    setSynopsisCharCount(value.length)
  }

  const handlePersonalConnectChange = (value) => {
    setPersonalConnect(value)
    setPersonalConnectCharCount(value.length)
  }

  // Determine whether to disable the submit button
  const isSubmitDisabled = () => {
    if (
      loglineCharCount > maxLoglineCharacters ||
      synopsisCharCount > maxSynopsisCharacters ||
      personalConnectCharCount > maxPersonalConnectCharacters
    ) {
      return true // Disable the button if any of the fields exceed their character limits
    }
    return false // Enable the button if all fields are within character limits
  }

  return (
    <>
      <div className="left mt-6">
        <h1 className="font-semibold leading-none tracking-tight">
          Upload Your Script 🚀
        </h1>
        <div className="mt-6 w-1/2">
          <div>
            <label htmlFor="title"> Log Line</label>
            <Input
              type="text"
              className="mt-2"
              value={logline}
              onChange={(e) => handleLoglineChange(e.target.value)}
            />
            <p className="">
              One-sentence summary or description of a movie (Max{' '}
              {maxLoglineCharacters} characters).
            </p>
            <p
              className={`text-${
                loglineCharCount > maxLoglineCharacters ? 'red' : 'gray'
              } text-xs`}
            >
              Characters remaining: {maxLoglineCharacters - loglineCharCount}
            </p>
          </div>
          <div>
            <label htmlFor="title"> Synopsis</label>
            <Textarea
              placeholder="Type your message here."
              value={synopsis}
              onChange={(e) => handleSynopsisChange(e.target.value)}
            />
            {/* <ReactQuill theme="snow" value={synopsis} onChange={handleSynopsisChange} /> */}
            <p className="">
              Write-up that describes the plot and world of your story (Max{' '}
              {maxSynopsisCharacters} characters).
            </p>
            <p
              className={`text-${
                synopsisCharCount > maxSynopsisCharacters ? 'red' : 'gray'
              } text-xs`}
            >
              Characters remaining: {maxSynopsisCharacters - synopsisCharCount}
            </p>
          </div>

          <div>
            <label htmlFor="title"> Personal Connect</label>
            {/* <Input
              type="text"
              className="mt-2"
              value={personalConnect}
              onChange={(e) => handlePersonalConnectChange(e.target.value)}
            /> */}
            <Textarea
              placeholder="Type your message here."
              value={personalConnect}
              onChange={(e) => handlePersonalConnectChange(e.target.value)}
            />
            <p className="">
              Tell us why you want to tell this story (Max{' '}
              {maxPersonalConnectCharacters} characters).
            </p>
            <p
              className={`text-${
                personalConnectCharCount > maxPersonalConnectCharacters
                  ? 'red'
                  : 'gray'
              } text-xs`}
            >
              Characters remaining:{' '}
              {maxPersonalConnectCharacters - personalConnectCharCount}
            </p>
          </div>

          <Button
            variant="default"
            size="lg"
            className="mt-4"
            onClick={submitScriptHandler}
            disabled={isSubmitDisabled()} // Disable the button based on character counts
          >
            {isLoading && (
              <Loader2 className="h-[1.2rem] w-[1.2rem] mr-2 animate-spin" />
            )}
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </div>
    </>
  )
}
