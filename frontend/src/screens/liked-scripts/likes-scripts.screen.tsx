import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import {
  useDeleteLikedMutation,
  useFetAllLikedQuery,
} from '@/slices/scriptApiSlice'
import { formatDate } from '@/utils/format-date'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
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
      <Card className="max-w-screen-lg bg-background">
        <CardHeader>All Scripts</CardHeader>
        <div className="relative overflow-x-auto shadow-md rounded-xl bg-background p-6">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-background rounded-md border">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border">
              <tr>
                <th scope="col" className="px-6  bg-background">
                  SL No
                </th>
                <th scope="col" className="px-6 py-3  bg-background">
                  Script Title
                </th>
                <th scope="col" className="px-6 py-3  bg-background">
                  Uploaded By
                </th>
                <th scope="col" className="px-6 py-3  bg-background">
                  Uploaded On
                </th>
                {/* <th scope="col" className="px-6 py-3">
            Price
          </th> */}
                <th scope="col" className="px-6 py-3 bg-background">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <>Loading</>
              ) : (
                <>
                  {data?.map((script: any, index: number) => (
                    <tr
                      key={script._id}
                      className="bg-background border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 bg-background"
                    >
                      <td className="w-4 p-4 bg-background">{index + 1}</td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-background"
                      >
                        {script?.script?.logline}
                      </th>
                      <td className="px-6 py-4 bg-background cursor-pointer  ">
                        <Link
                          to={`/user/${script?.script?.userUid}`}
                          className="flex  items-center"
                        >
                          <Avatar
                            className="rounded-full mr-2"
                            style={{
                              borderRadius: '50%',
                              height: '30px',
                              width: '30px',
                            }}
                          >
                            <AvatarImage
                              src={script?.script?.avatar}
                              className="aspect-square h-full w-full"
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
                      </td>
                      <td className="px-6 py-4 bg-background">
                        {formatDate(script?.script?.uploadDate, 'mm/dd/yy')}
                        /2023
                      </td>

                      <td className="px-6 py-4 bg-background">
                        {/* <Button
                          variant={'outline'}
                          onClick={() => handleDelete(script?.script?._id)}
                          rel="noopener noreferrer"
                          className=""
                        >
                          Unlike
                        </Button> */}
                        <Button
                          variant={'outline'}
                          onClick={() =>
                            navigate(`/view-script/${script?.script?._id}`)
                          }
                          rel="noopener noreferrer"
                          className=""
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  )
}