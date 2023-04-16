import pageNotFoundImg from '@/assets/images/page_404_not_found.svg'
import Button from '@/shared/components/Button/Button'
import { useTranslations } from '@/shared/hooks/useTranslations'
import { Link } from 'react-router-dom'

const NotFound = () => {
  const { formatMessage } = useTranslations()
  return (
    <main className='w-full h-full flex flex-col items-center justify-center mt-12 text-center p-5'>
      <h2 className='text-primary text-4xl'>{formatMessage({ id: 'notFound.title' })}</h2>
      <p className='text-secondary my-3'>{formatMessage({ id: 'notFound.subtitle' })}</p>
      <Link to={'/dashboard'}>
        <Button text={formatMessage({ id: 'notFound.backToDashboard' })} />
      </Link>
      <img src={pageNotFoundImg} alt='404 - page not found' className='mt-12 w-3/4 md:w-1/3' />
    </main>
  )
}

export default NotFound
