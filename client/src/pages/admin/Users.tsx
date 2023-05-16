import { selectAuthToken } from '@/core/store/auth/authSelectors'
import { selectAllUsers, selectUsersStatus } from '@/core/store/users/usersSelectors'
import { getAllUsers } from '@/core/store/users/usersSlice'
import CreateEditUser from '@/features/admin/users/createEditUser/CreateEditUser'
import UsersList from '@/features/admin/users/usersList/UsersList'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/useStore'
import { useEffect } from 'react'

const Users = () => {
  const dispatch = useAppDispatch()

  const token = useAppSelector(selectAuthToken)
  const usersStatus = useAppSelector(selectUsersStatus)
  const users = useAppSelector(selectAllUsers)

  useEffect(() => {
    if (!!token && usersStatus === 'idle') {
      dispatch(getAllUsers(token))
    }
  }, [dispatch, token, usersStatus])

  return (
    <main className='bg-light min-h-[calc(100vh-76px)]'>
      <div className='mx-auto flex flex-row'>
        <section className='flex-[0.65]'>
          <UsersList data={users} />
        </section>
        <section className='flex-[0.35]'>
          <CreateEditUser />
        </section>
      </div>
    </main>
  )
}

export default Users
