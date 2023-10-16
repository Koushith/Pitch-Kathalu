import { AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import { useFetchAllScriptsQuery } from '@/slices/scriptApiSlice'
import { formatDate } from '@/utils/format-date'
import { Avatar } from '@radix-ui/react-avatar'
import { Link, useNavigate } from 'react-router-dom'

export const AllUploadsScreen = () => {
  const { data, isLoading } = useFetchAllScriptsQuery('', {
    refetchOnMountOrArgChange: true,
  })
  const navigate = useNavigate()

  return (
    <Card className='max-w-screen-lg bg-background'>
      <CardHeader>All Scripts</CardHeader>
      <div className='relative overflow-x-auto bg-background p-6'>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {data?.allScripts?.toReversed().map((script, index) => (
              <div
                key={script._id}
                className='bg-background border rounded-md shadow-md dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 p-4 cursor-pointer mb-4'
                onClick={() => navigate(`/view-script/${script._id}`)}
              >
                <h2 className='text-lg font-medium text-gray-900 dark:text-white mb-2'>
                  {script.logline}
                </h2>
                <div className='flex items-center mb-2'>
                  <Link
                    to={`/user/${script?.userUid}`}
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
                        src={script?.avatar}
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
                    {script?.userName}
                  </Link>
                </div>
                <p className='text-gray-500 dark:text-gray-400'>
                  Uploaded On: {formatDate(script?.uploadDate, 'mm/dd/yy')}/2023
                </p>
                <Button
                  variant='outline'
                  onClick={() => navigate(`/view-script/${script._id}`)}
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
    </Card>
  )
}
