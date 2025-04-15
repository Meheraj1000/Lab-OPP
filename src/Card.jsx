import React from 'react';

const Card = ({ man }) => {
  return (
    <div className="transition-transform transform hover:scale-105">
      <div className="bg-gray-50 w-80 rounded-2xl shadow-lg overflow-hidden border border-gray-200">

        <figure className="bg-[#007074] flex justify-center items-center p-6">
          <img
            src={man.Image}
            alt={man.Name}
            className="rounded-full w-32 h-32 object-cover border-4 border-white shadow-md"
          />
        </figure>
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{man.Name}</h2>
          <p className="text-sm text-gray-600 mb-1">ID: <span className="font-medium text-gray-700">{man.Id}</span></p>
          <p className="text-sm text-gray-600 mb-1">Section: <span className="font-medium text-gray-700">{man.Section}</span></p>
          <p className="text-sm text-gray-600">
            University: <span className="font-medium text-gray-700">{man.University || man['University Name']}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
