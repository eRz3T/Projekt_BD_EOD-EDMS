import { useEffect } from 'react'
import { useQuill } from 'react-quilljs'
import { ITextEditorProps } from './TextEditor.types'
import 'quill/dist/quill.snow.css'

const TextEditor = ({ setText }: ITextEditorProps) => {
  const modules = {
    toolbar: ['bold', 'italic', 'underline'],
  }

  const { quill, quillRef } = useQuill({ modules })

  useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        setText(quill.getText())
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
