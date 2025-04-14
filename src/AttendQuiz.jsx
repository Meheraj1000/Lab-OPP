// AttendQuiz.jsx
import React, { useEffect, useState } from 'react';

const AttendQuiz = () => {
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const storedQuiz = localStorage.getItem('latestQuiz');
    if (storedQuiz) {
      setQuiz(JSON.parse(storedQuiz));
    }
  }, []);

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <p className="text-xl text-gray-600">No quiz found. Please create one first.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="bg-base-100 shadow-xl rounded-lg p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-4 text-center">Welcome to the Quiz</h1>

        {/* Quiz Info */}
        <div className="mb-6 space-y-2">
          <p><span className="font-semibold">Quiz Title:</span> {quiz.subject}</p>
          <p><span className="font-semibold">Total Questions:</span> {quiz.questions.length}</p>
          <p><span className="font-semibold">Time Limit:</span> {quiz.durationInMinutes} Minutes</p>
        </div>

        {/* Instructions */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Instructions:</h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Each question carries 1 mark.</li>
            <li>No negative marking.</li>
            <li>You cannot go back to previous questions.</li>
            <li>Timer will start once you click "Start Quiz".</li>
          </ul>
        </div>

        {/* Start Quiz Button */}
        <div className="text-center">
          <button className="btn btn-primary w-full">Start Quiz</button>
        </div>
      </div>
    </div>
  );
};

export default AttendQuiz;
