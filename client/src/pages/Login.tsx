import { useTranslations } from '@/shared/hooks/useTranslations'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/shared/hooks/useStore'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import ShowcaseRight from '../features/authPages/showcaseRight/ShowcaseRight'
import Input from '../shared/components/Input/Input'
import { LoginForm } from '@/shared/types/LoginForm.types'
import { login } from '@/core/store/auth/authSlice'
import { useSnackbar } from 'notistack'
import { unwrapResult } from '@reduxjs/toolkit'

const Login = () => {
  const { formatMessage } = useTranslations()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const schema = yup.object().shape({
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
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: LoginForm) => {
    if (!errors.email && !errors.password) {
      try {
        const result = await dispatch(login(data))
        unwrapResult(result)
        enqueueSnackbar(formatMessage({ id: 'login.successfulyLoggedIn' }), {
          variant: 'success',
        })
        navigate('/')
      } catch (error) {
        console.log(error)
        switch (Number(error)) {
          case 401:
            enqueueSnackbar(formatMessage({ id: 'login.incorrectCredentials' }), {
              variant: 'error',
            })
            break
          case 404:
            enqueueSnackbar(formatMessage({ id: 'login.userNotFound' }), { variant: 'error' })
            break
          default:
            enqueueSnackbar(`${formatMessage({ id: 'login.loginError' })}: ${error}`, {
              variant: 'error',
            })
        }
      }
    }
  }

  return (
    <div className='flex flex-col h-screen lg:flex-row' style={{ marginTop: '-72px' }}>
      <section className='flex flex-1 bg-white h-full items-center justify-center mx-4 lg:mx-0'>
        <div>
          <header className='text-left'>
            <h2 className='text-5xl -ml-4'>
              <span className='mx-0 px-0 tracking-normal -mr-2'>👋</span>{' '}
              {formatMessage({ id: 'login.welcomeBack' })}!
            </h2>
            <p className='text-lg text-slate-500 mb-6 mt-4'>
              {formatMessage({ id: 'login.subtitle' })}
            </p>
          </header>
          <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
            <Input
              label={formatMessage({ id: 'email' })}
              name='email'
              placeholder={formatMessage({ id: 'login.provideYourEmail' })}
              register={register('email')}
              error={errors?.email?.message}
            />
            <Input
              label={formatMessage({ id: 'password' })}
              name='password'
              placeholder={formatMessage({ id: 'login.provideYourPassword' })}
              type='password'
              register={register('password')}
              error={errors?.password?.message}
            />
            <p className='text-right my-5 text-violets'>
              {formatMessage({ id: 'login.restorePassword' })}
            </p>
            <button
              type='submit'
              className={
                'bg-violets text-white font-medium focus:outline-none rounded-md py-2 text-lg'
              }
            >
              {formatMessage({ id: 'login.logIn' })}
            </button>
            <p className='text-secondary mt-6'>
              {formatMessage({ id: 'login.dontHaveAnAccount' })} <br />
              <span className='text-violets'>e-mail:</span>{' '}
              <a href='mailto:support@eobieg.com'>support@eobieg.com</a> <br />
              <span className='text-violets'>
                {formatMessage({ id: 'phone' }).toLowerCase()}:
              </span>{' '}
              <a href='tel:+481812345'>+48 18 123 45</a> <br />
            </p>
          </form>
        </div>
      </section>

      <ShowcaseRight />
    </div>
  )
}

export default Login
