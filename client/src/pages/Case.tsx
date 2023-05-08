import { useState } from 'react'
import { useParams } from 'react-router-dom'

import CasePreviewBar from '@/features/caseContent/casePreviewBar/CasePreviewBar'
import MainSection from '@/features/caseContent/mainSection/MainSection'

const Case = () => {
  const [isNewPost, setIsNewPost] = useState<boolean>(false)
  const { id } = useParams()

  return (
    <main className='bg-light min-h-[calc(100vh-76px)] py-6'>
      <div className='container mx-auto flex flex-row'>
        <section className='flex-[0.7]'>
          <MainSection setIsNewPost={setIsNewPost} isNewPost={isNewPost} />
        </section>
        <section className='flex-[0.3]'>
          <CasePreviewBar setIsNewPost={setIsNewPost} isNewPost={isNewPost} />
        </section>
      </div>
    </main>
  )
}

export default Case
