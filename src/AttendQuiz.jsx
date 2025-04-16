import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AttendQuiz = () => {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/api/quizzes/${id}`);
        setQuiz(response.data);
        // Optionally store in localStorage
        localStorage.setItem('currentQuiz', JSON.stringify(response.data));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch quiz');
        console.error('Error fetching quiz:', err);
      } finally {
        setLoading(false);
      }
    };

    // First check localStorage for cached quiz
    const cachedQuiz = localStorage.getItem(`quiz_${id}`);
    if (cachedQuiz) {
      setQuiz(JSON.parse(cachedQuiz));
      setLoading(false);
    } else {
      fetchQuiz();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="alert alert-error max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <p className="text-xl text-gray-600">No quiz found.</p>
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
          <p><span className="font-semibold">Total Questions:</span> {quiz.questions?.length || 0}</p>
          <p><span className="font-semibold">Time Limit:</span> {quiz.durationInMinutes} Minutes</p>
        </div>

        {/* Instructions */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Instructions:</h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>No negative marking.</li>
            <li>You cannot go back to previous questions.</li>
            <li>Timer will start once you click "Start Quiz".</li>
          </ul>
        </div>

        {/* Start Quiz Button */}
        <div className="text-center">
          <button
            className="btn btn-primary w-full"
            onClick={() => {
              // Navigate to the first question or quiz session
              window.location.href = `/quiz/${id}/start`;
            }}
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendQuiz;