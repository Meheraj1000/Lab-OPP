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
    <div className="bg-[#D1FAE5] py-14 px-6 "> {/* Light Mint */}
      <div className="text-center mb-10">
  <h1 className="text-4xl font-extrabold text-black tracking-wide">
    Made By
  </h1>
  <p className="text-black mt-2 text-xl">
    Meet the creators behind this project
  </p>
  <div className="mt-4 flex justify-center">
    <div className="w-3xl h-1 bg-emerald-500 rounded-full shadow-sm"></div>
  </div>
</div>


      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-5 max-w-7xl w-full items-stretch">
          {mans.length > 0 ? (
            mans.map((man) => (
              <Card man={man} key={man.id} />
            ))
          ) : (
            <div className="col-span-full text-black text-center text-lg">
              Loading team...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Men;
