import DocumentsList from '@/features/dashboard/documentsList/DocumentsList'
import { documents } from '@/features/dashboard/documentsList/dummyData'
import ObservedDocuments from '@/features/dashboard/observedDocuments/ObservedDocuments'

const Dashboard = () => {
  return (
    <main className='bg-light min-h-[calc(100vh-76px)]'>
      <div className='mx-auto flex flex-row'>
        <section className='flex-[0.7]'>
          <DocumentsList data={documents} />
        </section>
        <section className='flex-[0.3]'>
          <ObservedDocuments />
        </section>
      </div>
    </main>
  )
}

export default Dashboard
