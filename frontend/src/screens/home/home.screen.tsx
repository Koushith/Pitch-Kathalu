import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { HomeContainer } from './home.styles'
import { FileImage, UploadIcon } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export const HomeScreen = () => {
  const [paymentLink, setPaymentLink] = useState('')

  const navigate = useNavigate()

  const onButtonClick = () => {
    navigate('/upload-script')
  }

  return (
    <HomeContainer className="">
      {/* <h1 className="font-semibold leading-none mt-4 tracking-tight">Home</h1> */}
      <div className="flex gap-8 items-start mt-4 justify-start lg:w-1/2">
        <div
          style={{ width: '150px' }}
          className="bg-background"
          onClick={onButtonClick}
        >
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col items-center justify-between rounded-md border-2 border-muted cursor-pointer bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&amp;:has([data-state=checked])]:border-primary"
            htmlFor="card"
            style={{ paddingTop: '30px', paddingBottom: '30px' }}
          >
            <UploadIcon className="mb-6" />
            Submit Script
          </label>
        </div>
        {/* TODO: This is for testing- remove later */}
        <div
          style={{ width: '150px' }}
          className="bg-background"
          onClick={() => navigate('/profile')}
        >
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col items-center justify-between rounded-md border-2 border-muted cursor-pointer bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&amp;:has([data-state=checked])]:border-primary"
            htmlFor="card"
            style={{ paddingTop: '30px', paddingBottom: '30px' }}
          >
            <FileImage className="mb-6" />
            View Submitted
          </label>
        </div>
      </div>
      {/* <Button onClick={onButtonClick}>Grenerate payment link</Button> */}
      <Toaster position="top-right" reverseOrder={false} />
    </HomeContainer>
  )
}

/**
 * Payment Success Response 
 * {status: 'success', paymentId: 'MOJO3913E05Q49944019'}
paymentId
: 
"MOJO3913E05Q49944019"
status
: 
"success"
 */
