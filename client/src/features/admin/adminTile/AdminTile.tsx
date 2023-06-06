import { Link } from 'react-router-dom'
import Header from '@/shared/components/Header/Header'
import { IAdminTileProps } from './AdminTile.types'

const AdminTile = ({ title, subtitle, icon, path }: IAdminTileProps) => {
  return (
    <Link to={path} className='bg-light flex flex-col rounded-md'>
      <div className='p-4 flex flex-col'>
        <Header title={title} subtitle={subtitle} />
        <span className='self-center text-7xl text-secondary my-4'>
          <i className={`bx ${icon}`}></i>
        </span>
      </div>
      <div className='bg-violets min-h-2 py-2 min-w-full rounded-b-md'></div>
    </Link>
  )
}

export default AdminTile
