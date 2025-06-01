import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const Loading = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm z-50">
      <div className='flex flex-col items-center'>
        <ClipLoader className='text-slate-500' size={50} />
        <p className='mt-5 ml-2 text-slate-500 font-semibold text-xl'>Loading...</p>
      </div>
    </div>
  );
};

export default Loading;