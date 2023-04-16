import logoHuge from '@/assets/images/eobieg_logo_x480.png'

const ShowcaseRight = () => {
  return (
    <aside className='flex-1 hidden lg:flex relative' style={{ background: '#EAF1F9' }}>
      <img src={logoHuge} alt='eobieg logo' className='self-center mx-auto' />
      <div
        className='absolute w-full h-1/2 bottom-0 opacity-75 blur-2xl'
        style={{ background: '#EAF1F9' }}
      ></div>
    </aside>
  )
}

export default ShowcaseRight
