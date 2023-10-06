import { AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import {
  useDeleteLikedMutation,
  useFetAllLikedQuery,
} from '@/slices/scriptApiSlice'
import { formatDate } from '@/utils/format-date'
import { Avatar } from '@radix-ui/react-avatar'
import { Link, useNavigate } from 'react-router-dom'

export const LikedScriptsScreens = () => {
  const { data, isLoading, refetch } = useFetAllLikedQuery('', {
    refetchOnMountOrArgChange: true,
  })

  const [deleteLiked] = useDeleteLikedMutation()
  const handleDelete = async (id: string) => {
    const res = await deleteLiked(id).unwrap()
    console.log(res)
    refetch()
  }
  console.log('liked script', data)
  const navigate = useNavigate()
  if (isLoading) {
    return <h1>Loading.....</h1>
  }
  return (
    <>
      <Card className='max-w-screen-lg bg-transparent'>
        {' '}
        {/* Use bg-transparent */}
        <CardHeader>All Shortlisted scripts</CardHeader>
        <div className='relative overflow-x-auto shadow-md rounded-xl p-6'>
          {' '}
          {/* Removed bg-background */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                {data?.map((script: any, index: number) => (
                  <div
                    key={script._id}
                    className='bg-white border rounded-md shadow-md dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 p-4 cursor-pointer mb-4'
                    onClick={() =>
                      navigate(`/view-script/${script?.script?._id}`)
                    }
                  >
                    <h2 className='text-lg font-medium text-gray-900 dark:text-white mb-2'>
                      {script?.script?.logline}
                    </h2>
                    <div className='flex items-center mb-2'>
                      <Link
                        to={`/user/${script?.script?.userUid}`}
                        className='flex items-center'
                      >
                        <Avatar
                          className='rounded-full mr-2'
                          style={{
                            borderRadius: '50%',
                            height: '30px',
                            width: '30px',
                          }}
                        >
                          <AvatarImage
                            src={script?.script?.avatar}
                            className='aspect-square h-full w-full'
                            style={{
                              borderRadius: '50%',
                              height: '30px',
                              width: '30px',
                            }}
                          />
                          <AvatarFallback
                            style={{
                              borderRadius: '50%',
                              height: '30px',
                              width: '30px',
                            }}
                          >
                            OM
                          </AvatarFallback>
                        </Avatar>
                        {script?.script?.userName}
                      </Link>
                    </div>
                    <p className='text-gray-500 dark:text-gray-400'>
                      Uploaded On:{' '}
                      {formatDate(script?.script?.uploadDate, 'mm/dd/yy')}/2023
                    </p>
                    <Button
                      variant='outline'
                      onClick={() =>
                        navigate(`/view-script/${script?.script?._id}`)
                      }
                      rel='noopener noreferrer'
                      className='mt-2'
                    >
                      View
                    </Button>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </Card>
    </>
  )
}
