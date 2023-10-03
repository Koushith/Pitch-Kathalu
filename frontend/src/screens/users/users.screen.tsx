import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { RecentSignups } from '../dashboard/recent-signup.component'
import { useFetchAllUsersQuery } from '@/slices/userApiSlice'
import { useIsAdmin } from '@/hooks'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'

export const UsersScreen = () => {
  const {
    data: users,
    isLoading: isUserLoading,
    refetch: refetchUsers,
  } = useFetchAllUsersQuery('', {
    refetchOnMountOrArgChange: true,
  })

  const hooktest = useIsAdmin()
  console.log('hookkkkkkk', hooktest)
  return (
    <Card className="bg-background max-w-screen-lg">
      <CardHeader>
        <CardTitle>All Users</CardTitle>
        <CardDescription>
          Showing 6 of {users?.data?.length} users
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AllUsers users={users?.data} />
      </CardContent>
    </Card>
  )
}

const AllUsers = ({ users }: any) => {
  const navigate = useNavigate()
  return (
    <div className="space-y-8">
      {users?.map((u: any) => (
        <div
          className="flex items-center cursor-pointer"
          key={u?._id}
          onClick={() => navigate(`/user/${u?.uid}`)}
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src={u?.avatar} className="rounded" alt="Avatar" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{u?.displayName}</p>
            <p className="text-sm text-muted-foreground">{u?.email}</p>
          </div>
          {/* <div className="ml-auto font-medium">+$1,999.00</div> */}
        </div>
      ))}
    </div>
  )
}
