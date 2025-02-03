function Spinner() {
  return (
    <span className='inset-0 flex items-center justify-center'>
      <svg className='animate-spin h-5 w-5 mr-3' viewBox='0 0 24 24'>
        <circle
          className='opacity-25'
          cx='12'
          cy='12'
          r='10'
          stroke='currentColor'
          strokeWidth='4'
        ></circle>
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 014.46 4.46L2 2v4a8 8 0 018 8h4l-2.434-2.434a5 5 0 00-7.072 7.072L9.072 20.5A7.963 7.963 0 0110 20H4v-2.709z'
        ></path>
      </svg>
    </span>
  );
}

export default Spinner;
