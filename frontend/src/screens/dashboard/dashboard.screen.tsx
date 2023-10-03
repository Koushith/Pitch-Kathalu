import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card'
import { RecentSignups } from './recent-signup.component'
import { RecentUploads } from './recent-uploads'
import {
  useFetAllLikedQuery,
  useFetchAllScriptsQuery,
} from '@/slices/scriptApiSlice'
import { useFetchAllUsersQuery } from '@/slices/userApiSlice'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

export const DashboardScreen = () => {
  const { data, isLoading } = useFetchAllScriptsQuery('', {
    refetchOnMountOrArgChange: true,
  })

  const {
    data: users,
    isLoading: isUserLoading,
    refetch: refetchUsers,
  } = useFetchAllUsersQuery('', {
    refetchOnMountOrArgChange: true,
  })
  const { data: liked } = useFetAllLikedQuery('', {
    refetchOnMountOrArgChange: true,
  })

  const navigate = useNavigate()

  const likedCount = liked ? liked.length : 0
  const usersCount = users?.data?.length || 0
  const allScriptsCount = data?.allScripts?.length || 0

  return (
    <>
      <h1 className="mb-4 font-semibold leading-none tracking-tight">
        Hello Koushith 👋
      </h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3  max-w-screen-lg">
        <Card className="bg-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shortlisted</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="10" y1="18" x2="8" y2="18" />
              <line x1="10" y1="6" x2="8" y2="6" />
              <line x1="10" y1="12" x2="8" y2="12" />
              <circle cx="12" cy="12" r="9" />
            </svg>
          </CardHeader>
          <CardContent>
            {likedCount > 0 ? (
              <div className="text-2xl font-bold">{likedCount}</div>
            ) : (
              <p className="text-2xl font-bold">0</p>
            )}
          </CardContent>
        </Card>
        <Card className="bg-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">All Users</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            {usersCount > 0 ? (
              <div className="text-2xl font-bold">{usersCount}</div>
            ) : (
              <p className="text-2xl font-bold">No users available</p>
            )}
          </CardContent>
        </Card>
        <Card className="bg-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">All Scripts</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            {allScriptsCount > 0 ? (
              <div className="text-2xl font-bold">{allScriptsCount}</div>
            ) : (
              <p className="text-2xl font-bold">No scripts available</p>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 max-w-screen-lg mt-4 bg-background">
        <Card className="bg-background">
          <CardHeader>
            <CardTitle>Recently uploaded Scripts</CardTitle>
            <CardDescription>
              {data?.allScripts?.length > 0
                ? `Showing 5 of ${data?.allScripts?.length} scripts`
                : 'No scripts available'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data?.allScripts?.length > 0 ? (
              <RecentUploads
                allScripts={data?.allScripts}
                isLoading={isLoading}
              />
            ) : (
              <p>No scripts available</p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-background">
          <CardHeader>
            <CardTitle>Recent Signups</CardTitle>
            <CardDescription>
              {users?.data?.length > 0
                ? `Showing 6 of ${users?.data?.length} users`
                : 'No users available'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {users?.data?.length > 0 ? (
              <RecentSignups users={users?.data} />
            ) : (
              <p>No users available</p>
            )}
            {users?.data?.length > 0 && (
              <Button
                className="w-full mt-4"
                onClick={() => navigate('/users')}
              >
                View More
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
