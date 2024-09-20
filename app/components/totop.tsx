const ToTop = () => {
  return (
    <button
      className='fixed bottom-4 right-4 m-0 inline-flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-black bg-none p-0 text-sm font-medium normal-case leading-5 hover:bg-gray-700 hover:text-gray-900 disabled:pointer-events-none disabled:opacity-50'
      type='button'
      aria-haspopup='dialog'
      aria-expanded='false'
      data-state='closed'
    >
      <svg
        xmlns=' http://www.w3.org/2000/svg'
        width='30'
        height='40'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
        className='block border-gray-200 align-middle text-white'
      >
        <path d='m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z' className='border-gray-200'></path>
      </svg>
    </button>
  )
}

export default ToTop
