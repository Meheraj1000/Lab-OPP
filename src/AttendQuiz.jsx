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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 px-4 py-10">
        <div className="rounded-2xl border border-cyan-100/20 bg-white/5 p-10 shadow-2xl backdrop-blur-md">
          <span className="loading loading-spinner loading-lg text-cyan-300"></span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 p-4">
        <div className="alert max-w-md border border-rose-300/30 bg-rose-400/10 text-rose-100">
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 p-4">
        <p className="text-xl text-cyan-100">No quiz found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 px-4 py-8 sm:px-6 lg:py-12">
      <div className="mx-auto w-full max-w-4xl rounded-3xl border border-cyan-100/20 bg-white/5 p-6 shadow-2xl backdrop-blur-md sm:p-10">
        <div className="mb-8 text-left sm:mb-10">
          <p className="mb-2 inline-flex items-center rounded-full border border-cyan-200/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-100">
            Quiz Portal
          </p>
          <h1 className="text-3xl font-black leading-tight text-white sm:text-4xl">Ready to start?</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-300 sm:text-base">
            Review the details and instructions below before entering the live quiz session.
          </p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-cyan-100/20 bg-slate-900/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Quiz Title</p>
            <p className="mt-1 text-lg font-bold text-white">{quiz.subject}</p>
          </div>
          <div className="rounded-2xl border border-cyan-100/20 bg-slate-900/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Total Questions</p>
            <p className="mt-1 text-lg font-bold text-white">{quiz.questions?.length || 0}</p>
          </div>
          <div className="rounded-2xl border border-cyan-100/20 bg-slate-900/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Time Limit</p>
            <p className="mt-1 text-lg font-bold text-white">{quiz.durationInMinutes} Minutes</p>
          </div>
        </div>

        <div className="mb-8 rounded-2xl border border-emerald-300/30 bg-emerald-400/10 p-5 sm:p-6">
          <h2 className="mb-3 text-lg font-bold text-emerald-100">Instructions</h2>
          <ul className="space-y-2 text-sm text-emerald-50 sm:text-base">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-300"></span>
              <span>No negative marking.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-300"></span>
              <span>You cannot go back to previous questions.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-300"></span>
              <span>Timer will start once you click "Start Quiz".</span>
            </li>
          </ul>
        </div>

        <div className="text-center">
          <button
            className="inline-flex w-full items-center justify-center rounded-xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-cyan-300 focus:outline-none focus:ring-4 focus:ring-cyan-300/30 sm:w-auto sm:min-w-56"
            onClick={() => {
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