import React from 'react';

const LoadDots = () => {
  return (
    <div className="flex justify-center items-center h-4 space-x-2">
      <div className="w-2 h-2 bg-neutral-600 rounded-full animate-bounce delay-75"></div>
      <div className="w-2 h-2 bg-neutral-600 rounded-full animate-bounce delay-150"></div>
      <div className="w-2 h-2 bg-neutral-600 rounded-full animate-bounce delay-225"></div>
    </div>
  );
};

export default LoadDots;
