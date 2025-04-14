import React, { useEffect, useState } from 'react';
import Card from './Card';
const Men = () => {
    const [mans, setMans] = useState([]);

    useEffect(() => {
        fetch("/src/Man.json") // Adjust path as needed
            .then((response) => response.json())
            .then((data) => setMans(data));
            
    }, []);
    return (
        <div className='bg-[#F38C79]'>
            <div className='p-5'>
                <h1 className='font-extrabold text-center m-4'>Mide By</h1>
            </div>
            <div>
                {
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
                        {mans.map((man) => (
                            <Card man={man} key={man.id}></Card>
                        ))}
                    </div>
                }
            </div>
        </div>
    );
};

export default Men;