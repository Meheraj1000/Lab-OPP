import React from 'react';
import {  NavLink } from 'react-router-dom';
const Banner = () => {
    return (
        <div
        className="hero min-h-screen "
        style={{
          backgroundImage: "url(https://img.freepik.com/free-vector/quiz-neon-sign_1262-19629.jpg)",
        }}>
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
           <div className='flex justify-center items-center gap-8'>
           <button className="btn btn-primary"><NavLink to='createQuiz'>Create Quiz</NavLink></button>
           <button className="btn btn-primary"><NavLink to='attendQuiz'>Attend Quiz</NavLink></button>
           </div>
          </div>
        </div>
      </div>
    );
};

export default Banner;