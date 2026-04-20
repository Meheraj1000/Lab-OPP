import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { authContext } from './AuthProvider';
import { FaUserCircle } from "react-icons/fa";
import axios from 'axios';
import useUser from './hooks/UserHook';


const NavBar = () => {
  const [showProfile, setShowProfile] = useState(false);
  const { user, handleLogout } = useContext(authContext);
  const { userInfo } = useUser();
  const userRole = String(user?.role || userInfo?.role || '').toUpperCase();
  const isTeacher = userRole === 'TEACHER';
  const canCreateQuiz = userRole && userRole !== 'STUDENT';
  const [latestResult, setLatestResult] = useState(null);
  const [resultLoading, setResultLoading] = useState(false);
  const [teacherSummary, setTeacherSummary] = useState({ quizzes: 0, attempts: 0, avgScore: 0 });
  const [teacherSummaryLoading, setTeacherSummaryLoading] = useState(false);

  useEffect(() => {
    if (!isTeacher) {
      setTeacherSummary({ quizzes: 0, attempts: 0, avgScore: 0 });
      return;
    }

    const teacherId = userInfo?.id;
    if (!teacherId) {
      return;
    }

    const fetchTeacherSummary = async () => {
      setTeacherSummaryLoading(true);

      try {
        const quizzesRes = await axios.get('http://localhost:8080/api/quizzes');
        const allQuizzes = Array.isArray(quizzesRes.data) ? quizzesRes.data : [];
        const teacherQuizzes = allQuizzes.filter((quiz) => String(quiz?.createdBy) === String(teacherId));
        const teacherQuizIds = new Set(teacherQuizzes.map((quiz) => String(quiz?.id)).filter(Boolean));

        if (!teacherQuizIds.size) {
          setTeacherSummary({ quizzes: teacherQuizzes.length, attempts: 0, avgScore: 0 });
          return;
        }

        let submissions = [];
        const endpoints = [
          'http://localhost:8080/api/result-submissions',
          `http://localhost:8080/api/result-submissions?createdBy=${teacherId}`,
          `http://localhost:8080/api/result-submissions?teacherId=${teacherId}`,
        ];

        for (const endpoint of endpoints) {
          try {
            const resultRes = await axios.get(endpoint);
            const payload = resultRes.data;
            const list = Array.isArray(payload) ? payload : (Array.isArray(payload?.data) ? payload.data : []);
            if (list.length) {
              submissions = list;
              break;
            }
          } catch (endpointError) {
            // Continue with fallback endpoint.
          }
        }

        const filtered = submissions.filter((entry) => teacherQuizIds.has(String(entry?.quizId)));
        const avgScore = filtered.length
          ? Math.round(filtered.reduce((sum, row) => {
            const total = Number(row?.totalQuestions || 0);
            const score = Number(row?.score || 0);
            return sum + (total > 0 ? (score / total) * 100 : 0);
          }, 0) / filtered.length)
          : 0;

        setTeacherSummary({
          quizzes: teacherQuizzes.length,
          attempts: filtered.length,
          avgScore,
        });
      } catch (error) {
        setTeacherSummary({ quizzes: 0, attempts: 0, avgScore: 0 });
      } finally {
        setTeacherSummaryLoading(false);
      }
    };

    fetchTeacherSummary();
  }, [isTeacher, userInfo?.id]);

  useEffect(() => {
    if (isTeacher) {
      setLatestResult(null);
      return;
    }

    const attendeeId = userInfo?.id;
    if (!user?.email) {
      setLatestResult(null);
      return;
    }

    const localCacheById = attendeeId ? localStorage.getItem(`latestQuizResult_${attendeeId}`) : null;
    const localCacheGeneric = localStorage.getItem('latestQuizResult');

    try {
      const parsed = localCacheById ? JSON.parse(localCacheById) : (localCacheGeneric ? JSON.parse(localCacheGeneric) : null);
      if (parsed) {
        setLatestResult(parsed);
      }
    } catch (error) {
      console.error('Error reading cached result:', error);
    }

    if (!attendeeId) {
      return;
    }

    const getTimeValue = (item) => {
      const raw = item?.submittedAt || item?.createdAt || item?.updatedAt || item?.date;
      const value = raw ? new Date(raw).getTime() : 0;
      return Number.isNaN(value) ? 0 : value;
    };

    const pickLatest = (items) => {
      if (!Array.isArray(items) || items.length === 0) {
        return null;
      }

      const ownResults = items.filter((item) => {
        const itemAttendeeId = item?.attendeId || item?.attendeeId || item?.userId;
        return String(itemAttendeeId) === String(attendeeId);
      });

      const source = ownResults.length ? ownResults : items;
      const sorted = [...source].sort((a, b) => getTimeValue(b) - getTimeValue(a));
      return sorted[0] || source[source.length - 1] || null;
    };

    const fetchLatestResult = async () => {
      setResultLoading(true);

      const endpoints = [
        `http://localhost:8080/api/result-submissions/attendee/${attendeeId}`,
        `http://localhost:8080/api/result-submissions?attendeId=${attendeeId}`,
        `http://localhost:8080/api/result-submissions?attendeeId=${attendeeId}`,
      ];

      for (const endpoint of endpoints) {
        try {
          const response = await axios.get(endpoint);
          const payload = response?.data;
          const list = Array.isArray(payload) ? payload : (Array.isArray(payload?.data) ? payload.data : []);
          const latest = pickLatest(list);

          if (latest) {
            setLatestResult(latest);
            localStorage.setItem(`latestQuizResult_${attendeeId}`, JSON.stringify(latest));
            localStorage.setItem('latestQuizResult', JSON.stringify(latest));
            break;
          }
        } catch (error) {
          // Try fallback endpoint if the current endpoint is not available.
        }
      }

      setResultLoading(false);
    };

    fetchLatestResult();
  }, [isTeacher, user?.email, userInfo?.id]);

  const topicText = latestResult?.quizTitle || latestResult?.subject || 'No quiz yet';
  const scoreValue = latestResult?.score;
  const totalQuestionsValue = latestResult?.totalQuestions;
  const scoreText = typeof scoreValue === 'number'
    ? `${scoreValue}/${typeof totalQuestionsValue === 'number' ? totalQuestionsValue : '-'}`
    : 'No score yet';


  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full border-b border-cyan-200/10 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-[80px] w-[92%] max-w-7xl items-center justify-between">
      {/* Logo + Brand Name */}
      <NavLink to="/" className="text-2xl font-black tracking-wide text-cyan-300">
        QuizApp
      </NavLink>

      {/* Center Menu */}
      <div className='me-8 flex flex-1 items-center justify-end gap-5 text-sm font-bold uppercase tracking-wide text-slate-200'>
        {canCreateQuiz && <NavLink className={"rounded-lg px-3 py-2 transition hover:bg-white/10 hover:text-cyan-300"} to="/createQuiz">Create</NavLink>}
        {!isTeacher && <NavLink className={"rounded-lg px-3 py-2 transition hover:bg-white/10 hover:text-cyan-300"} to="/allQuizs">Attend</NavLink>}
         {!isTeacher && <NavLink className={"rounded-lg px-3 py-2 transition hover:bg-white/10 hover:text-cyan-300"} to="/ai">AI</NavLink>}
        {isTeacher && <NavLink className={"rounded-lg px-3 py-2 transition hover:bg-white/10 hover:text-cyan-300"} to="/teacher-results">Results</NavLink>}
      </div>

      {/* Right Side */}
      <div className="">
        {user?.email ? (
          <div className="relative">
            <button
              onClick={() => setShowProfile((prev) => !prev)}
              className="flex items-center focus:outline-none"
            >
              <div>
                <FaUserCircle
                  className="h-8 w-8 rounded-full border border-cyan-200/40 bg-cyan-200/20 text-cyan-100"
                />
              </div>

            </button>

            {showProfile && (
              <div className="absolute right-0 top-12 z-50 w-80 rounded-xl border border-cyan-200/20 bg-slate-900 p-5 text-slate-100 shadow-2xl">
                <div className="flex flex-col items-center text-center">
                  <img className="mb-2 h-16 w-16 rounded-full border border-cyan-200/30" src={user.photoURL} alt="Profile" />
                  <p className="font-semibold text-lg">
                    Hi, {user.displayName || 'User'}!
                  </p>
                  <p className="mt-1 text-sm text-slate-300">{user.email}</p>
                  <button className="mt-2 text-sm text-cyan-300 hover:underline">
                    Manage your Account
                  </button>
                </div>

                <div className="mt-5 flex flex-col items-center border-t border-cyan-100/20 pt-4 text-sm">
                  <div className="mb-4 w-full rounded-xl border border-cyan-100/20 bg-slate-800 p-4 text-left shadow-inner">
                    {isTeacher ? (
                      <>
                        <h3 className="text-md mb-2 font-bold text-cyan-200">
                          👨‍🏫 Teacher Summary
                        </h3>
                        <p><span className="font-semibold">Quizzes Created:</span> {teacherSummaryLoading ? 'Loading...' : teacherSummary.quizzes}</p>
                        <p><span className="font-semibold">Student Attempts:</span> {teacherSummaryLoading ? 'Loading...' : teacherSummary.attempts}</p>
                        <p><span className="font-semibold">Average Score:</span> {teacherSummaryLoading ? 'Loading...' : `${teacherSummary.avgScore}%`}</p>
                      </>
                    ) : (
                      <>
                        <h3 className="text-md mb-2 font-bold text-cyan-200">
                          🎯 Quiz Summary
                        </h3>
                        <p><span className="font-semibold">Topic:</span> {topicText}</p>
                        <p><span className="font-semibold">Score:</span> {resultLoading ? 'Loading...' : scoreText}</p>
                      </>
                    )}
                  </div>

                  <button
                    onClick={handleLogout}
                    className="btn btn-sm bg-red-500 hover:bg-red-600 text-white w-1/2"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-4 sm:gap-5">
            <NavLink to="/login" className="font-semibold text-slate-100 transition hover:text-cyan-300">
              Login
            </NavLink>
            <NavLink to="/register">
              <button className="rounded-full bg-cyan-400 px-4 py-1 font-semibold text-slate-900 transition-all hover:bg-cyan-300">
                Registration
              </button>
            </NavLink>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default NavBar;
