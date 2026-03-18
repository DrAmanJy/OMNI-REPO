import React from 'react';

const WindowCard = ({ children }) => {
  return (
    <div className="bg-white w-48 h-64 rounded-lg p-2 overflow-hidden flex flex-col">
      <div className="flex items-center gap-1 mt-1">
        <span
          aria-hidden="true"
          className="bg-blue-500 w-3 h-3 rounded-full"
        ></span>
        <span
          aria-hidden="true"
          className="bg-purple-500 w-3 h-3 rounded-full"
        ></span>
        <span
          aria-hidden="true"
          className="bg-pink-500 w-3 h-3 rounded-full"
        ></span>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
};

export default WindowCard;
