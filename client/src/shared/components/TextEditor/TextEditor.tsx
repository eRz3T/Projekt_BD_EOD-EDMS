import { useEffect } from 'react'
import { useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css'

const TextEditor = () => {
  const modules = {
    toolbar: ['bold', 'italic', 'underline'],
  }

  const { quill, quillRef } = useQuill({ modules })

  useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        console.log(quill.getText())
      })
    }
  }, [quill])

  return (
    <div style={{ width: '100%', height: 240 }}>
      <div ref={quillRef} />
    </div>
  )
}

export default TextEditor
