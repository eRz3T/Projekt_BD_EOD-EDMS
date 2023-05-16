import { useTranslations } from '@/shared/hooks/useTranslations'
import { useSnackbar } from 'notistack'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Header from '@/shared/components/Header/Header'
import Input from '@/shared/components/Input/Input'
import { ICreateEditUserForm, UserRoles } from './CreateEditUser.types'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/useStore'
import { selectUserToEdit, selectUsersAction } from '@/core/store/users/usersSelectors'
import { getAllUsers, setUserToEdit, setUsersAction } from '@/core/store/users/usersSlice'
import { useEffect } from 'react'
import { createUser } from '@/core/store/auth/authSlice'
import { updateUser } from '@/core/api/httpApi'
import { selectAuthToken } from '@/core/store/auth/authSelectors'
import { serializeEditedData } from './CreateEditUser.utils'

const CreateEditUser = () => {
  const dispatch = useAppDispatch()
  const { formatMessage } = useTranslations()
  const { enqueueSnackbar } = useSnackbar()
  const token = useAppSelector(selectAuthToken)
  const actionType = useAppSelector(selectUsersAction)
  const userToEdit = useAppSelector(selectUserToEdit)

  const createUserSchema = yup.object().shape({
    firstName: yup.string().required('Wprowadź imię'),
    lastName: yup.string().required('Wprowadź nazwisko'),
    email: yup
      .string()
      .email(formatMessage({ id: 'login.provideValidEmail' }))
      .required(formatMessage({ id: 'login.emailIsRequired' }))
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        formatMessage({ id: 'login.provideValidEmail' })
      ),
    password: yup
      .string()
      .required(formatMessage({ id: 'login.passwordIsRequired' }))
      .matches(/(?=.*[a-z])/, formatMessage({ id: 'login.minOneLowercase' }))
      .matches(/(?=.*[A-Z])/, formatMessage({ id: 'login.minOneUppercase' }))
      .matches(/(?=.*[0-9])/, formatMessage({ id: 'login.minOneDigit' }))
      .matches(/(?=.*[!@#\$%\^&\*])/, formatMessage({ id: 'login.minOneSpecialCharacter' }))
      .matches(/(?=.{8,})/, formatMessage({ id: 'login.min8characters' })),
    role: yup.string(),
  })

  const editUserSchema = yup.object().shape({
    firstName: yup.string(),
    lastName: yup.string(),
    email: yup
      .string()
      .email(formatMessage({ id: 'login.provideValidEmail' }))
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        formatMessage({ id: 'login.provideValidEmail' })
      ),
    password: yup.string().test('password', 'Invalid password', function (value) {
      const { path, createError } = this
      if (!value || value.length === 0) {
        return true
      }
      return (
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(value) ||
        createError({
          path,
          message:
            'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long',
        })
      )
    }),
    role: yup.string(),
  })

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateEditUserForm>({
    resolver: yupResolver(actionType === 'create' ? createUserSchema : editUserSchema),
  })

  useEffect(() => {
    if (userToEdit) {
      setValue('firstName', userToEdit.first_name)
      setValue('lastName', userToEdit.last_name)

      setValue('role', userToEdit.role as UserRoles)
    } else {
      reset()
    }
  }, [userToEdit])

  const handleEditCancel = () => {
    dispatch(setUsersAction('create'))
    dispatch(setUserToEdit(null))
  }

  const onSubmit = async (data: ICreateEditUserForm) => {
    try {
      if (token) {
        if (actionType === 'create') {
          dispatch(
            createUser({
              first_name: data.firstName,
              last_name: data.lastName,
              ...data,
            })
          )
            .then(() => dispatch(getAllUsers(token)))
            .finally(() => {
              enqueueSnackbar('Nowy użytkownik został utworzony', { variant: 'success' })
            })
        } else {
          if (userToEdit) {
            await updateUser(token, userToEdit?.id, serializeEditedData(data)).then(() =>
              dispatch(getAllUsers(token)).finally(() => {
                enqueueSnackbar('Użytkownik został zedytowany', { variant: 'info' })
              })
            )
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='bg-white mt-4 mr-4 h-full rounded-md '>
      <div
        className={`px-3 py-5 w-full rounded-t-md flex items-center justify-between text-white ${
          actionType === 'create' ? 'bg-blueish' : 'bg-yellow-400'
        }`}
      >
        <Header
          title={
            actionType === 'create'
              ? formatMessage({ id: 'users.createUser' })
              : formatMessage({ id: 'users.editUser' })
          }
          icon='bx-user-plus'
        />
        {actionType === 'edit' && (
          <button
            className='bg-red-400 text-white text-sm px-4 py-2 rounded-md font-medium'
            onClick={handleEditCancel}
          >
            {formatMessage({ id: 'cancel' })}
          </button>
        )}
      </div>
      <div className='flex flex-col gap-3 p-3'>
        <form className='flex flex-col w-4/5 mx-auto max-w-sm' onSubmit={handleSubmit(onSubmit)}>
          <Input
            label={formatMessage({ id: 'users.firstName' })}
            name='firstName'
            placeholder={formatMessage({ id: 'users.provideFirstName' })}
            register={register('firstName')}
            error={errors?.firstName?.message}
          />
          <Input
            label={formatMessage({ id: 'users.lastName' })}
            name='lastName'
            placeholder={formatMessage({ id: 'users.provideLastName' })}
            register={register('lastName')}
            error={errors?.lastName?.message}
          />
          <Input
            label={formatMessage({ id: 'email' })}
            name='email'
            placeholder={formatMessage({ id: 'users.provideEmail' })}
            register={register('email')}
            error={errors?.email?.message}
          />
          <Input
            label={formatMessage({ id: 'password' })}
            name='password'
            placeholder={formatMessage({ id: 'users.providePassword' })}
            type='password'
            register={register('password')}
            error={errors?.password?.message}
          />
          <label htmlFor={'roles'} className='mb-2 mt-4 text-lg text-primary font-medium'>
            {formatMessage({ id: 'users.role' })}{' '}
            <span className='text-sm text-red-500'>{errors?.role?.message}</span>
          </label>
          <select
            {...register('role')}
            name='roles'
            id='roles'
            className='border-solid border-2 rounded-md px-3 py-2 border-gray-300 '
          >
            <option defaultValue={UserRoles.USER} value={UserRoles.USER}>
              User
            </option>
            <option value={UserRoles.ADMIN}>Admin</option>
          </select>
          <button
            type='submit'
            className={
              'bg-green-400 text-white font-medium focus:outline-none rounded-md py-2 mt-8 text-lg'
            }
          >
            {actionType === 'create'
              ? formatMessage({ id: 'users.createUser' })
              : formatMessage({ id: 'users.editUser' })}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateEditUser
