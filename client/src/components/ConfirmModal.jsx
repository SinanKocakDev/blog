const ConfirmModal = ({show, onClose, onConfirm}) => {
    if(!show) {
        return null
    }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50'>
        <div className='bg-neutral-300 p-6 rounded-lg border-2'>
            <h2>Postu Silmek istiyor musunuz ?</h2>
            <div className='mt-4 flex justify-end gap-2'>
                <button onClick={onClose} className='p-2 bg-gray-200 rounded-lg hover:bg-gray-400'>
                    Hayır
                </button>
                <button onClick={onConfirm} className='p-2 bg-red-600 rounded-lg hover:bg-red-500'>
                    Evet
                </button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmModal