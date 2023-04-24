const ObservedDocuments = () => {
  return (
    <div className='bg-violets mt-4 mr-4 h-full rounded-md '>
      <div className='bg-white px-3 py-5 w-full rounded-t-md flex items-center justify-between'>
        <h3 className='font-medium'>
          <i className='bx bx-bookmark-plus'></i> Obserwowane:{' '}
          <span className='text-blueish'>0</span>
        </h3>
        <button className='bg-blueish text-white text-sm px-4 py-2 rounded-md font-medium'>
          Odznacz
        </button>
      </div>
    </div>
  )
}

export default ObservedDocuments
