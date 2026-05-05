import React from 'react';

const LoadingSpinner = ({ size = 'md', color = 'blue' }) => {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const colors = {
    blue: 'border-blue-500',
    gray: 'border-gray-500',
    white: 'border-white',
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizes[size]} ${colors[color]} border-4 border-t-transparent rounded-full animate-spin`}
      />
    </div>
  );
};

export default LoadingSpinner;
