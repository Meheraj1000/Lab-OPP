import React from 'react';

const Card = ({man}) => {
    return (
        <div>
            <div className="card bg-[#007074] w-96 shadow-sm">
  <figure className="px-10 pt-10">
    <img
      src={man.image}
      alt="Shoes"
      className="rounded-xl" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">Name: {man.Name}</h2>
    <p>Id: {man.id}</p>
    <p>Section: {man.Section}</p>
    <p>University Name:{man.University}</p>
  </div>
</div>
        </div>
    );
};

export default Card;