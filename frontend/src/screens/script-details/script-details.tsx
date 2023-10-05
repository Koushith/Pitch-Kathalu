import React, { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import jsPDF from 'jspdf'

import { Button } from '@/components/ui/button'
import { useIsAdmin } from '@/hooks'
import {
  useFetchOneScriptQuery,
  useLikeScriptMutation,
} from '@/slices/scriptApiSlice'
import { useParams } from 'react-router-dom'
import './ScriptDetailsScreen.css' // You can create a CSS file for your component

export const ScriptDetailsScreen = () => {
  const [liked, setLiked] = useState(false)
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  const { scriptId } = useParams()
  const isAdmin = useIsAdmin()

  const onDocumentLoadSuccess = ({ numPages }: any) => {
    setNumPages(numPages)
  }

  const { data, isLoading, isSuccess } = useFetchOneScriptQuery(
    scriptId as string
  )

  const [likeScript, { isLoading: isLikeLoading }] = useLikeScriptMutation()

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (!isSuccess || !data) {
    return <p>Error loading script details.</p>
  }

  const likeHandler = async (id: string) => {
    try {
      const res = await likeScript({ scriptId: id }).unwrap()

      if (res.isSuccess) {
        setLiked(true)
      }
    } catch (error) {
      console.log('Something went wrong', error)
      alert('Already Shortlisted', error)
    }
  }

  const {
    avatar,
    email,
    logline,
    personalConnect,
    synopsis,
    uploadDate,
    userName,
    phoneNumber,
  } = data.script

  const downloadAsPDF = () => {
    const pdf = new jsPDF({
      orientation: 'portrait', // Portrait orientation for A4 size
      unit: 'mm', // Millimeters as the measurement unit
      format: 'a4', // A4 page size
    })

    // Set the maximum width for text content
    const maxTextWidth = pdf.internal.pageSize.width - 40 // Leave some margin
    const lineHeight = 10 // Height of each line

    // User Details
    pdf.setFontSize(12)
    pdf.text(`User Details:`, 10, 10)
    pdf.text(`Name: ${userName}`, 20, 20, { maxWidth: maxTextWidth })
    pdf.text(`Email: ${email}`, 20, 30, { maxWidth: maxTextWidth })
    pdf.text(`Phone Number: ${phoneNumber}`, 20, 40, { maxWidth: maxTextWidth })

    // Logline
    pdf.text(`Logline:`, 10, 60)
    pdf.textWithLink(
      `${logline}`,
      20,
      70,
      { url: '', maxWidth: maxTextWidth },
      null,
      'underline'
    )

    // Synopsis
    const synopsisLines = pdf.splitTextToSize(synopsis, maxTextWidth)
    let currentY = 100 // Start at 100 to give space for the title
    pdf.text(`Synopsis:`, 10, currentY)
    currentY += lineHeight
    for (const line of synopsisLines) {
      if (currentY + lineHeight > pdf.internal.pageSize.height - 20) {
        pdf.addPage()
        currentY = 20
      }
      pdf.text(line, 20, currentY)
      currentY += lineHeight
    }

    // Personal Connect
    const personalConnectLines = pdf.splitTextToSize(
      personalConnect,
      maxTextWidth
    )
    currentY = pdf.internal.pageSize.height - 20 // Start at the bottom
    pdf.text(`Personal Connect:`, 10, currentY)
    currentY += lineHeight
    for (const line of personalConnectLines) {
      if (currentY + lineHeight > pdf.internal.pageSize.height - 20) {
        pdf.addPage()
        currentY = 20
      }
      pdf.text(line, 20, currentY)
      currentY += lineHeight
    }

    // Save the PDF to a file
    pdf.save('script_details.pdf')
  }

  return (
    <div className='max-w-3xl mx-auto p-4'>
      <div className='flex items-center'>
        <img
          src={avatar}
          alt={`${userName}'s avatar`}
          className='w-10 h-10 rounded-full mr-2'
        />
        <div>
          <p className='text-sm font-medium leading-none'>
            {userName} - {email} - {phoneNumber}
          </p>
          <p className='text-sm text-muted-foreground'>{uploadDate}</p>
        </div>
      </div>
      <div className='mt-10'>
        <div>
          <h2 className='font-semibold leading-none tracking-tight'>Logline</h2>
          <p className='text-sm text-muted-foreground mt-4 logline'>
            {logline}
          </p>
        </div>
        <div className='mt-6'>
          <h2 className='font-semibold leading-none tracking-tight'>
            Synopsis
          </h2>
          <p className='text-sm text-muted-foreground mt-4 synopsis'>
            {synopsis}
          </p>
        </div>
        <div className='mt-6'>
          <h2 className='font-semibold leading-none tracking-tight'>
            Personal Connect
          </h2>
          <p className='text-sm text-muted-foreground mt-4 personalConnect'>
            {personalConnect}
          </p>
        </div>
      </div>

      {!liked && isAdmin && (
        <div className='flex gap-4'>
          <Button
            className='mt-4'
            onClick={() => likeHandler(scriptId as string)}
          >
            Shortlist
          </Button>{' '}
          <Button variant={'outline'} className='mt-4' onClick={downloadAsPDF}>
            Download as PDF
          </Button>
        </div>
      )}

      {/* PDF Document */}
    </div>
  )
}
