import React from 'react';

const Card = ({ man }) => {
  return (
    <div className="h-full flex"> {/* Ensure full height inside grid */}
      <div className="w-full overflow-hidden rounded-2xl border border-cyan-100/20 bg-slate-900/80 shadow-xl transition-transform transform hover:scale-105 hover:shadow-cyan-500/20">
        <figure className="flex items-center justify-center bg-gradient-to-r from-cyan-500 to-emerald-500 p-6">
          <img
            src={man.Image}
            alt={man.Name}
            className="rounded-full w-32 h-32 object-cover border-4 border-white shadow-md"
          />
        </figure>
        <div className="p-6 text-center flex-grow flex flex-col justify-between">
          <div>
            <h2 className="mb-2 text-2xl font-bold text-white">{man.Name}</h2>
            <p className="mb-1 text-sm text-slate-300">
              ID: <span className="font-medium text-cyan-200">{man.Id}</span>
            </p>
            <p className="mb-1 text-sm text-slate-300">
              Section: <span className="font-medium text-cyan-200">{man.Section}</span>
            </p>
            <p className="text-sm text-slate-300">
              University: <span className="font-medium text-cyan-200">{man.University || man['University Name']}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
