import Header from '@/shared/components/Header/Header'
import TextEditor from '@/shared/components/TextEditor/TextEditor'
import FileUploadInput from '@/shared/components/FileUploadInput/FileUploadInput'
import CasePost from './casePost/CasePost'
import { IMainSectionProps } from './MainSection.types'
import { FormEvent, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/useStore'
import { createNewComment, getCaseComments } from '@/core/store/comments/commentsSlice'
import { selectUser } from '@/core/store/auth/authSelectors'
import { enqueueSnackbar } from 'notistack'

const MainSection = ({ setIsNewPost, isNewPost, caseDetails, comments }: IMainSectionProps) => {
  const dispatch = useAppDispatch()
  const userId = useAppSelector(selectUser)?.id
  const [commentText, setCommentText] = useState<string>('')
  const [commentFile, setCommentFile] = useState<File>()

  const handleNewComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (userId && commentText && caseDetails?.id) {
      dispatch(
        createNewComment({
          caseId: caseDetails?.id,
          userId: userId,
          content: commentText,
          file: commentFile,
        })
      ).then(() => dispatch(getCaseComments(caseDetails?.id)))
      setCommentText('')
      setCommentFile(undefined)
      setIsNewPost(false)
    } else {
      enqueueSnackbar('Błąd w trakcie dodawania komentarza', { variant: 'error' })
    }
  }

  return (
    <div className='overflow-x-auto bg-white p-4 rounded-md m-4 h-full'>
      <Header
        icon='bx-file'
        title={String(caseDetails?.title)}
        addon={`ID Sprawy: ${String(caseDetails?.id)}`}
      />
      <CasePost
        username={caseDetails?.created_by_details}
        createdAt={caseDetails?.created_at}
        description={caseDetails?.description}
      />

      {comments.length > 0 &&
        comments.map((comment) => (
          <CasePost
            key={comment.id}
            username={comment.created_by_details}
            createdAt={comment.created_at}
            description={comment.content}
            filename={comment.filename}
            fileId={comment.file_id}
          />
        ))}

      {isNewPost && (
        <div className='flex flex-col w-full'>
          <span className='my-4 min-w-full border'></span>
          <div className=' inline-flex items-center justify-between'>
            <h5 className='my-4 text-primary font-semibold text-lg '>Dodaj komentarz (plik)</h5>
            <div>
              {' '}
              <button
                className=' bg-red-400 text-white text-sm px-4 py-2 rounded-md font-medium'
                onClick={() => setIsNewPost(false)}
              >
                Anuluj
              </button>
            </div>
          </div>

          <form className='flex flex-col w-full' onSubmit={(e) => handleNewComment(e)}>
            <TextEditor setText={setCommentText} />

            <FileUploadInput setFile={setCommentFile} />

            <button
              className='bg-blueish text-white text-sm px-4 py-2 mt-4 rounded-md font-medium'
              type='submit'
            >
              Wyślij
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default MainSection
