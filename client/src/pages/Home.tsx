import { logout } from '@/core/store/auth/authSlice'
import { useAppDispatch } from '@/shared/hooks/useStore'

const Home = () => {
  const dispatch = useAppDispatch()
  return (
    <div className='bg-light min-h-[calc(100vh-76px)]'>
      <h1>Home</h1>
      <button onClick={() => dispatch(logout())}>Log out</button>
    </div>
  )
}

export default Home
