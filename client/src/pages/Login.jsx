import React from 'react'
import ShowcaseRight from '../features/authPages/showcaseRight/ShowcaseRight'
import Input from '../shared/components/Input/Input'

const Login = () => {
  return (
    <div className='flex flex-col h-screen lg:flex-row' style={{ marginTop: '-72px' }}>
      <section className='flex flex-1 bg-white h-full items-center justify-center mx-4 lg:mx-0'>
        <div>
          <header className='text-left'>
            <h2 className='text-5xl -ml-4'>
              <span className='mx-0 px-0 tracking-normal -mr-2'>👋</span> Witaj ponownie!
            </h2>
            <p className='text-lg text-slate-500 mb-6 mt-4'>
              Podaj swoje dane logowania, aby wejść do systemu
            </p>
          </header>
          <form className='flex flex-col'>
            <Input
              label='Email'
              name='email'
              placeholder='Wpisz swój adres e-mail...'
              type='email'
              isRequired={true}
            />
            <Input
              label='Hasło'
              name='password'
              placeholder='Wpisz swoje hasło...'
              type='password'
              isRequired={true}
            />
            <p className='text-right my-5 text-violets'>Przywróć hasło</p>
            <button
              type='submit'
              className={
                'bg-violets text-white font-medium focus:outline-none rounded-md py-2 text-lg'
              }
            >
              Zaloguj się
            </button>
            <p className='text-secondary mt-6'>
              Nie masz konta? Skontaktuj się z administratorem <br />
              <span className='text-violets'>e-mail:</span>{' '}
              <a href='mailto:support@eobieg.com'>support@eobieg.com</a> <br />
              <span className='text-violets'>telefon:</span>{' '}
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
