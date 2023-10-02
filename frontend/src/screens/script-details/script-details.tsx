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
          <p className="text-gray-700 text-sm">
            {userName} - {email}
          </p>
          <p className="text-gray-600 text-xs">{uploadDate}</p>
        </div>
      </div>
      <h1 className="text-2xl font-semibold mt-4">{logline}</h1>
      <p className="text-lg mt-2">{synopsis}</p>
      <h2 className="text-xl font-semibold mt-4">Personal Connect</h2>
      <p className="text-lg mt-2">{personalConnect}</p>

      {!liked && isAdmin && (
        <Button onClick={() => likeHandler(scriptId as string)}>Like</Button>
      )}
    </div>
  )
}
