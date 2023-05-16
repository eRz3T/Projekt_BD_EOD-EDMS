import { deleteUser } from '@/core/api/httpApi'
import { selectAuthToken } from '@/core/store/auth/authSelectors'
import { getAllUsers, setUserToEdit, setUsersAction } from '@/core/store/users/usersSlice'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/useStore'
import { IUser } from '@/shared/types/users'
import moment from 'moment'
import { enqueueSnackbar } from 'notistack'

const UsersList = ({ data }: { data: IUser[] }) => {
  const dispatch = useAppDispatch()
  const token = useAppSelector(selectAuthToken)

  const handleEditUser = (
    firstName: string,
    lastName: string,
    userId: string,
    role: string,
    email: string
  ) => {
    dispatch(setUsersAction('edit'))
    dispatch(
      setUserToEdit({
        first_name: firstName,
        last_name: lastName,
        id: userId,
        role,
        email,
      })
    )
  }

  const handleDeleteUser = async (userId: string) => {
    if (token) {
      try {
        if (confirm('Czy jesteś pewien że chcesz usunąć użytkownika?') === true) {
          await deleteUser(token, userId)
            .then(() => dispatch(getAllUsers(token)))
            .finally(() => {
              enqueueSnackbar('Użytkownik został usunięty', { variant: 'info' })
            })
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className='overflow-x-auto bg-white p-4 rounded-md m-4 h-full'>
      <div className='flex justify-between my-3 items-center'>
        <h3 className='text-xl'>
          <i className='bx bx-file mr-2'></i>Aktualne dokumenty
        </h3>
        <p className='text-sm text-blueish'>Ilość użytkowników: {data.length}</p>
      </div>
      <table className='min-w-full divide-y divide-gray-200 h-2'>
        <thead className='bg-white border-b-[2.5px] border-gray-200'>
          <tr className='text-secondary'>
            <th className='px-6 py-5 text-left text-md font-medium tracking-wider'>Lp.</th>
            <th className='px-6 py-5 text-left text-md font-medium tracking-wider'>
              Imie i nazwisko
            </th>
            <th className='px-6 py-5 text-left text-md font-medium tracking-wider'>Email</th>
            <th className='px-6 py-5 text-left text-md font-medium tracking-wider'>Rola</th>
            <th className='px-6 py-5 text-left text-md font-medium tracking-wider'>Utworzono</th>
            <th className='px-6 py-5 text-left text-md font-medium tracking-wider'>Akcje</th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200 text-secondary'>
          {data.length > 0 &&
            data.map((item, index) => (
              <tr key={item.id}>
                <td className='px-6 py-4 whitespace-nowrap'>{index + 1}</td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {item.first_name + ' ' + item.last_name}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>{item.email}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{item.role}</td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {moment(item.created_at).format('YYYY-MM-DD')}
                </td>
                <td className='pl-6 pr-1 py-4 whitespace-nowrap'>
                  <span
                    className='px-2 py-1 cursor-pointer hover:text-blue-400'
                    onClick={() =>
                      handleEditUser(
                        item.first_name,
                        item.last_name,
                        item.id,
                        item.role,
                        item.email
                      )
                    }
                  >
                    <i className='bx bxs-edit'></i>
                  </span>
                  <span
                    className='px-2 py-1 ml-2 cursor-pointer hover:text-red-400'
                    onClick={() => handleDeleteUser(item.id)}
                  >
                    <i className='bx bx-trash'></i>
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersList
