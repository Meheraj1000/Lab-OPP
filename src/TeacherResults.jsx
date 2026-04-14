import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import useUser from './hooks/UserHook';

const TeacherResults = () => {
  const { userInfo, loading: userLoading } = useUser();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const teacherId = userInfo?.id;
    if (!teacherId) {
      setLoading(false);
      return;
    }

    const fetchTeacherResults = async () => {
      setLoading(true);
      setError('');

      try {
        const quizzesRes = await axios.get('http://localhost:8080/api/quizzes');
        const allQuizzes = Array.isArray(quizzesRes.data) ? quizzesRes.data : [];
        const teacherQuizzes = allQuizzes.filter((quiz) => String(quiz?.createdBy) === String(teacherId));
        const teacherQuizIds = new Set(teacherQuizzes.map((quiz) => String(quiz?.id)).filter(Boolean));

        if (!teacherQuizIds.size) {
          setRows([]);
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
            // Try next fallback endpoint.
          }
        }

        const filtered = submissions.filter((entry) => teacherQuizIds.has(String(entry?.quizId)));
        const mapped = filtered.map((entry, index) => {
          const total = Number(entry?.totalQuestions || 0);
          const score = Number(entry?.score || 0);
          const percent = total > 0 ? Math.round((score / total) * 100) : 0;

          return {
            id: entry?.id || `${entry?.quizId || 'q'}-${entry?.attendeId || index}`,
            student: entry?.studentName || entry?.attendeeName || entry?.userName || `Student ${entry?.attendeId || entry?.attendeeId || 'Unknown'}`,
            studentId: entry?.attendeId || entry?.attendeeId || entry?.userId || 'Unknown',
            subject: entry?.quizTitle || entry?.subject || 'Untitled Quiz',
            score,
            total,
            percent,
            takenAt: entry?.submittedAt || entry?.createdAt || entry?.updatedAt || null,
          };
        });

        const sorted = mapped.sort((a, b) => {
          const aTime = a.takenAt ? new Date(a.takenAt).getTime() : 0;
          const bTime = b.takenAt ? new Date(b.takenAt).getTime() : 0;
          return bTime - aTime;
        });

        setRows(sorted);
      } catch (fetchError) {
        setError('Failed to load teacher results.');
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherResults();
  }, [userInfo?.id]);

  const stats = useMemo(() => {
    const attempts = rows.length;
    const avgScore = attempts ? Math.round(rows.reduce((sum, row) => sum + row.percent, 0) / attempts) : 0;
    const topScore = attempts ? Math.max(...rows.map((row) => row.percent)) : 0;

    return { attempts, avgScore, topScore };
  }, [rows]);

  if (userLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 px-4 py-12">
        <div className="mx-auto flex h-72 max-w-6xl items-center justify-center rounded-3xl border border-cyan-100/20 bg-white/5 shadow-2xl backdrop-blur-md">
          <span className="loading loading-spinner loading-lg text-cyan-300"></span>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 px-4 py-10 sm:px-6 lg:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 rounded-3xl border border-cyan-100/20 bg-white/5 p-6 shadow-2xl backdrop-blur-md sm:p-8">
          <p className="mb-2 inline-flex rounded-full border border-cyan-200/30 bg-cyan-300/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
            Teacher Dashboard
          </p>
          <h1 className="text-3xl font-black text-white sm:text-4xl">Quiz Attempts And Student Scores</h1>
          <p className="mt-2 text-sm text-slate-300 sm:text-base">Track who attended your quizzes and how much they scored.</p>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-cyan-100/20 bg-slate-900/70 p-4">
              <p className="text-xs font-semibold uppercase text-slate-300">Total Attempts</p>
              <p className="mt-1 text-2xl font-black text-cyan-200">{stats.attempts}</p>
            </div>
            <div className="rounded-xl border border-cyan-100/20 bg-slate-900/70 p-4">
              <p className="text-xs font-semibold uppercase text-slate-300">Average Score</p>
              <p className="mt-1 text-2xl font-black text-emerald-200">{stats.avgScore}%</p>
            </div>
            <div className="rounded-xl border border-cyan-100/20 bg-slate-900/70 p-4">
              <p className="text-xs font-semibold uppercase text-slate-300">Top Score</p>
              <p className="mt-1 text-2xl font-black text-amber-200">{stats.topScore}%</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-rose-300/30 bg-rose-400/10 p-4 text-rose-100">{error}</div>
        )}

        {rows.length === 0 ? (
          <div className="rounded-2xl border border-cyan-100/20 bg-white/5 p-10 text-center shadow-xl">
            <h2 className="text-2xl font-bold text-white">No attempts yet</h2>
            <p className="mt-2 text-slate-300">Students have not submitted results for your quizzes yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-cyan-100/20 bg-slate-900/70 shadow-2xl">
            <table className="table w-full text-slate-100">
              <thead>
                <tr className="border-b border-cyan-100/20 bg-slate-950/70 text-cyan-200">
                  <th>Student</th>
                  <th>Student ID</th>
                  <th>Subject</th>
                  <th>Score</th>
                  <th>Accuracy</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-b border-cyan-100/10 hover:bg-white/5">
                    <td className="font-semibold">{row.student}</td>
                    <td>{row.studentId}</td>
                    <td>{row.subject}</td>
                    <td>{row.score}/{row.total || '-'}</td>
                    <td>
                      <span className="rounded-full bg-cyan-300/20 px-2.5 py-1 text-xs font-bold text-cyan-100">
                        {row.percent}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default TeacherResults;
