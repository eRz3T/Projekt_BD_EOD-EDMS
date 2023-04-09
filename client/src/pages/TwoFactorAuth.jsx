import React from 'react'
import qrImg from '@/assets/images/mock_qr.png'
import Input from '../shared/components/Input/Input'
import ShowcaseRight from '../features/authPages/showcaseRight/ShowcaseRight'

const TwoFactorAuth = () => {
  return (
    <div className='flex flex-col h-screen lg:flex-row' style={{ marginTop: '-72px' }}>
      <section className='flex flex-1 bg-white h-full items-center justify-center mx-4 lg:mx-0'>
        <div>
          <header className='text-left'>
            <h2 className='text-5xl -ml-4'>
              <span className='mx-0 px-0 tracking-normal -mr-2'>🔒</span> 2FA
            </h2>
            <p className='text-lg text-slate-500 mb-6 mt-4'>
              Zeskanuj kod QR w aplikacji mobilnej lub wpisz kod
            </p>
          </header>
          <form className='flex flex-col'>
            <p className='mb-2 text-lg text-slate-800 font-medium'>QR</p>
            <img src={qrImg} alt='qr code' className=' self-center' />
            <Input
              label='Kod sześciocyfrowy'
              name='qrCode'
              placeholder='Kod z aplikacji mobilnej...'
              type='tel'
              isRequired={true}
            />
            <button
              type='submit'
              className='text-white font-medium focus:outline-none rounded-md py-2 mt-8 text-lg'
              style={{ backgroundColor: '#A29BFE' }}
            >
              Przejdź do panelu
            </button>
          </form>
        </div>
      </section>

      <ShowcaseRight />
    </div>
  )
}

export default TwoFactorAuth
