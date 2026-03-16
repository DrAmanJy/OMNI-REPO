import React from 'react';

const HoverRevealCard = () => {
  return (
    <div className="relative overflow-hidden w-60 h-80 rounded-3xl cursor-pointer text-2xl font-bold bg-purple-400 group">
      <div className="absolute -top-32 -left-16 w-32 h-44 rounded-full bg-purple-300 transition-transform duration-700 ease-in-out group-hover:scale-[4] group-hover:translate-x-8 group-hover:translate-y-20"></div>

      <div className="absolute inset-0 flex items-center justify-center uppercase transition-opacity duration-700 ease-in-in-out group-hover:opacity-0">
        hover me
      </div>

      <div className="absolute -bottom-32 -right-16 w-36 h-44 rounded-full bg-purple-300 transition-transform duration-700 ease-in-out group-hover:scale-[5] group-hover:-translate-x-4 group-hover:-translate-y-4"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-xl text-center opacity-0 translate-y-8 transition-all delay-150 duration-150 ease-in group-hover:opacity-100 group-hover:translate-y-0">
        Nice to meet u,
        <br />
        Uiverse
      </div>
    </div>
  );
};

export default HoverRevealCard;
