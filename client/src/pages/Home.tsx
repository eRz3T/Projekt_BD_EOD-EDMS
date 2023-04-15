import { logout } from '@/core/store/auth/authSlice'
import { useAppDispatch } from '@/shared/hooks/useStore'

const Home = () => {
  const dispatch = useAppDispatch()
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => dispatch(logout())}>Log out</button>
    </div>
  )
}

export default Home
