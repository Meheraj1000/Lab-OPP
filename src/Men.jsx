import React, { useEffect, useState } from 'react';
import Card from './Card';

const Men = () => {
  const [mans, setMans] = useState([]);

  useEffect(() => {
    fetch("/src/Man.json") // Adjust this path depending on your app structure
      .then((response) => response.json())
      .then((data) => setMans(data));
  }, []);

  return (
    <section className="bg-gradient-to-b from-slate-950 via-cyan-950 to-slate-900 py-16 px-6">
      <div className="text-center mb-10">
  <h1 className="text-4xl font-extrabold text-white tracking-wide">
    Made By
  </h1>
  <p className="text-cyan-100 mt-2 text-xl">
    Meet the creators behind this project
  </p>
  <div className="mt-4 flex justify-center">
    <div className="h-1 w-80 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 shadow-sm"></div>
  </div>
</div>


      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-5 max-w-7xl w-full items-stretch">
          {mans.length > 0 ? (
            mans.map((man) => (
              <Card man={man} key={man.Id || man.Name} />
            ))
          ) : (
            <div className="col-span-full text-cyan-100 text-center text-lg">
              Loading team...
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Men;
