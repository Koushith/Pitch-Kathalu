import { Button } from '@/components/ui/button'
import { useIsAdmin } from '@/hooks'
import {
  useFetchOneScriptQuery,
  useLikeScriptMutation,
} from '@/slices/scriptApiSlice'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export const ScriptDetailsScreen = () => {
  const [liked, setLiked] = useState(false)

  const { scriptId } = useParams()
  const isAdmin = useIsAdmin()
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
      console.log('somehing went wrong', error)
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

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex items-center">
        <img
          src={avatar}
          alt={`${userName}'s avatar`}
          className="w-10 h-10 rounded-full mr-2"
        />
        <div>
          <p className="text-sm font-medium leading-none">
            {userName} - {email} - {phoneNumber}
          </p>
          <p className="text-sm text-muted-foreground">{uploadDate}</p>
        </div>
      </div>
      <div className="mt-10">
        <div>
          <h2 className="font-semibold leading-none tracking-tight">Logline</h2>
          <p className="text-sm text-muted-foreground mt-4">{logline}</p>
        </div>
        <div className="mt-6">
          <h2 className="font-semibold leading-none tracking-tight">
            Synopsis
          </h2>
          <p className="text-sm text-muted-foreground mt-4">{synopsis}</p>
        </div>
        <div className="mt-6">
          <h2 className="font-semibold leading-none tracking-tight ">
            Personal Connect
          </h2>
          <p className="text-sm text-muted-foreground mt-4">
            {personalConnect}
          </p>
        </div>
      </div>

      {!liked && isAdmin && (
        <Button
          className="mt-4"
          onClick={() => likeHandler(scriptId as string)}
        >
          Shortlist
        </Button>
      )}
    </div>
  )
}
