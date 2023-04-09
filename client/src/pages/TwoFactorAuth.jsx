import React from 'react'
import qrImg from '@/assets/images/mock_qr.png'
import logoHuge from '@/assets/images/eobieg_logo_x480.png'

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
          <main className='flex flex-col'>
            <p className='mb-2 text-lg text-slate-800 font-medium'>QR</p>
            <img src={qrImg} alt='qr code' className=' self-center' />
            <p className='mb-2 mt-6 text-lg text-slate-800 font-medium'>Kod sześciocyfrowy</p>
            <input
              placeholder='Kod z aplikacji mobilnej...'
              type='text'
              className='border-solid border-2 border-gray-500 rounded-md px-3 py-2 mb-8'
            />
            <button
              type='submit'
              className='text-white font-medium focus:outline-none rounded-md py-2 text-lg'
              style={{ backgroundColor: '#A29BFE' }}
            >
              Przejdź do panelu
            </button>
          </main>
        </div>
      </section>

      <aside className='flex-1 hidden lg:flex relative' style={{ background: '#EAF1F9' }}>
        <img src={logoHuge} alt='eobieg logo' className='self-center mx-auto' />
        <div
          className='absolute w-full h-1/2 bottom-0 opacity-75 blur-2xl'
          style={{ background: '#EAF1F9' }}
        ></div>
      </aside>
    </div>
  )
}

export default TwoFactorAuth
