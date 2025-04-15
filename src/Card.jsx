import React from 'react';

const Card = ({ man }) => {
  return (
    <div>
      <div className="card bg-[#007074] w-96 shadow-sm">
        <figure className="px-10 pt-10">
          <img
            src={man.Image}
            alt={man.Name}
            className="rounded-xl w-40 h-40 object-cover"
          />
        </figure>
        <div className="card-body text-white">
          <h2 className="card-title">Name: {man.Name}</h2>
          <p>Id: {man.Id}</p>
          <p>Section: {man.Section}</p>
          <p>University Name: {man.University || man['University Name']}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
