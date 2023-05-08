import { enqueueSnackbar } from 'notistack'
import React, { useRef, useState, ChangeEvent, DragEvent } from 'react'

interface Props {}

const FileUploadInput: React.FC<Props> = () => {
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const handleFiles = (files: FileList) => {
    const maxFiles = 3
    if (uploadedFiles.length < maxFiles) {
      const newFiles: File[] = Array.from(files).slice(0, maxFiles - uploadedFiles.length)
      setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles])
    } else {
      enqueueSnackbar(`Można przesłać maksymalnie: ${maxFiles} pliki`, { variant: 'error' })
    }
  }

  console.log(uploadedFiles)

  const handleDrag = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center w-full'>
      <label
        htmlFor='dropzone-file'
        className={`flex flex-col mt-14 items-center justify-center w-full h-32 border-2 rounded-lg cursor-pointer bg-gray-50 ${
          dragActive ? 'border-blue-400 border-solid' : 'border-gray-300 border-dashed'
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <div className='flex flex-col items-center justify-center pt-5 pb-6'>
          <svg
            aria-hidden='true'
            className='w-10 h-10 mb-3 text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
            ></path>
          </svg>
          <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
            <span className='font-semibold'>Kliknij, aby przesłać</span> lub przeciągnij i upuść
          </p>
          <p className='text-xs text-gray-500 dark:text-gray-400'>
            PDF, DOC, DOCX, PPTX, TXT (MAX. 10MB)
          </p>
        </div>
        <input
          id='dropzone-file'
          type='file'
          className='hidden'
          ref={inputRef}
          multiple={true}
          onChange={handleChange}
        />
      </label>
      <div className='mt-4 flex flex-col gap-2'>
        {uploadedFiles &&
          uploadedFiles.map((file) => (
            <div className='flex items-center gap-4  border-2 p-2 rounded-md'>
              {/* <img src={docImg} alt='Doc document file' width={32} /> */}
              <p className='text-secondary'>{file.name}</p>
            </div>
          ))}
      </div>
    </div>
  )
}

export default FileUploadInput
