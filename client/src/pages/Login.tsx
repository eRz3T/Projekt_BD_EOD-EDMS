import { useTranslations } from '@/shared/hooks/useTranslations'
import ShowcaseRight from '../features/authPages/showcaseRight/ShowcaseRight'
import Input from '../shared/components/Input/Input'

const Login = () => {
  const { formatMessage } = useTranslations()

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
          <form className='flex flex-col'>
            <Input
              label={formatMessage({ id: 'email' })}
              name='email'
              placeholder={formatMessage({ id: 'login.provideYourEmail' })}
              type='email'
              isRequired={true}
            />
            <Input
              label={formatMessage({ id: 'password' })}
              name='password'
              placeholder={formatMessage({ id: 'login.provideYourPassword' })}
              type='password'
              isRequired={true}
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
