import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const Banner = () => {
  const { user } = useAuth();
  const userRole = String(user?.role || '').toUpperCase();
  const isTeacher = userRole === 'TEACHER';
  const canCreateQuiz = userRole ? userRole !== 'STUDENT' : true;

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-slate-950 via-cyan-950 to-emerald-950 px-4 py-20 sm:px-6 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, #14b8a6 0%, transparent 35%), radial-gradient(circle at 80% 10%, #22d3ee 0%, transparent 30%), radial-gradient(circle at 75% 85%, #10b981 0%, transparent 35%)' }}></div>
      <div className="pointer-events-none absolute -left-28 top-16 h-72 w-72 rounded-full border border-cyan-300/20"></div>
      <div className="pointer-events-none absolute -right-20 bottom-10 h-64 w-64 rounded-full border border-emerald-300/20"></div>

      <div className="relative mx-auto max-w-6xl rounded-3xl border border-white/15 bg-white/5 p-6 shadow-2xl backdrop-blur-md sm:p-10 lg:p-12">
        <p className="mb-4 inline-flex rounded-full border border-cyan-200/30 bg-cyan-300/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
          Smart Quiz Platform
        </p>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              Build. Challenge.
              <span className="block text-cyan-300">Level Up Learning.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
              Create question sets, join timed exams, and track your performance in one unified experience designed for both teachers and students.
            </p>

            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              {canCreateQuiz && (
                <NavLink
                  to="/createQuiz"
                  className="inline-flex items-center justify-center rounded-xl bg-cyan-400 px-6 py-3 text-sm font-bold uppercase tracking-wide text-slate-900 transition hover:bg-cyan-300"
                >
                  Create Quiz
                </NavLink>
              )}
              {!isTeacher ? (
                <NavLink
                  to="/allQuizs"
                  className="inline-flex items-center justify-center rounded-xl border border-white/40 bg-white/10 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white/20"
                >
                  Attend Quiz
                </NavLink>
              ) : (
                <NavLink
                  to="/teacher-results"
                  className="inline-flex items-center justify-center rounded-xl border border-white/40 bg-white/10 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white/20"
                >
                  View Results
                </NavLink>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-white/20 bg-slate-900/40 p-6 text-left text-white shadow-xl">
            <h2 className="text-lg font-bold text-cyan-200">Live Snapshot</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-100">
              <div className="flex items-center justify-between rounded-lg bg-white/10 px-4 py-3">
                <span>Active Quizzes</span>
                <span className="font-bold text-cyan-200">24</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-white/10 px-4 py-3">
                <span>Avg Completion</span>
                <span className="font-bold text-cyan-200">86%</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-white/10 px-4 py-3">
                <span>Top Category</span>
                <span className="font-bold text-cyan-200">Programming</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
