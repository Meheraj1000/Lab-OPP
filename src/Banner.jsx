import React from 'react';
import { NavLink } from 'react-router-dom';

const Banner = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(https://img.freepik.com/free-vector/quiz-neon-sign_1262-19629.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="hero-overlay  bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-2xl px-6">
          <h1 className="mb-6 text-5xl font-extrabold text-white drop-shadow-lg">
            Welcome to QuizApp
          </h1>
          <p className="mb-8 text-lg text-gray-200">
            Dive into the world of knowledge! Create your own quizzes or test your skills with quizzes from others.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <NavLink to="/createQuiz" className="btn btn-primary border px-6 py-3 text-lg rounded-xl shadow-md">
              Create Quiz
            </NavLink>
<<<<<<< HEAD
            <NavLink to="/attendQuiz" className="btn btn-outline bg-amber-50 text-blue-900 btn-primary px-6 py-3 text-lg rounded-xl shadow-md">
=======
            <NavLink to="/allQuizs" className="btn btn-outline text-primary bg-white hover:text-white hover:bg-primary px-6 py-3 text-lg rounded-xl shadow-md">
>>>>>>> 9d4dd493a23237f0fb314be481e2256c4ad8c54e
              Attend Quiz
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
