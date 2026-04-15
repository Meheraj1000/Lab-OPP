import React, { useState } from 'react';
import useUser from './hooks/UserHook';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const CreateQuiz = () => {
  const { user, loading: authLoading } = useAuth();
  console.log('Auth User:', user);
  const { userInfo, loading } = useUser(); 
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const userRole = String(userInfo?.role || user?.role || '').toUpperCase();
  console.log('User Role:', userInfo);
  const creatorId = userInfo?.id || user?.id || user?.userId;
  const canCreateQuiz = userRole && userRole !== 'STUDENT';

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
      },
    ]);
  };

  const handleQuestionChange = (index, value) => {
    const updated = [...questions];
    updated[index].questionText = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const handleCorrectAnswerChange = (qIndex, optIndex) => {
    const updated = [...questions];
    updated[qIndex].correctAnswer = optIndex;
    setQuestions(updated);
  };

  const handleSaveQuiz = async () => {
    if (!creatorId) {
      Swal.fire({
        title: 'Unable to publish',
        text: 'User identity is missing. Please login again.',
        icon: 'error',
      });
      return;
    }
    if (!title.trim() || !duration || questions.length === 0) {
      Swal.fire({
        title: 'Incomplete quiz',
        text: 'Please add subject, duration, and at least one question.',
        icon: 'warning',
      });
      return;
    }
    

    const hasInvalidQuestion = questions.some((q) => {
      if (!q.questionText.trim()) {
        return true;
      }

      const hasEmptyOption = q.options.some((opt) => !String(opt).trim());
      return hasEmptyOption;
    });

    if (hasInvalidQuestion) {
      Swal.fire({
        title: 'Question data missing',
        text: 'Each question must have text and all options filled.',
        icon: 'warning',
      });
      return;
    }

    const quizData = {
      subject: title,
      createdBy: creatorId,
      published: true,
      durationInMinutes: parseInt(duration),
      questions: questions.map((q) => ({
        questionText: q.questionText,
        options: q.options,
        correctAnswer: q.options[q.correctAnswer] || '',
      })),
    };


    try {
      const res = await fetch('http://localhost:8080/api/quizzes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizData),
      });

      const data = await res.json();
      console.log('API Response:', data);
      console.log("quizData:", quizData);

      if (!res.ok) {
        throw new Error(data?.message || 'Failed to create quiz');
      }

      Swal.fire({
        title: 'Good job!',
        text: 'Question is created!',
        icon: 'success'
      });
      navigate('/');
    } catch (err) {
      Swal.fire({
        title: 'Oh no!',
        text: err?.message || 'Something went wrong while creating quiz.',
        icon: 'error'
      });
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 p-4">
        <div className="rounded-2xl border border-cyan-100/20 bg-white/5 p-8 shadow-2xl backdrop-blur-md">
          <span className="loading loading-spinner loading-lg text-cyan-300"></span>
        </div>
      </div>
    );
  }

  if (!canCreateQuiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 p-4">
        <div className="max-w-lg rounded-2xl border border-cyan-100/20 bg-white/5 p-8 shadow-2xl text-center text-slate-100 backdrop-blur-md">
          <h2 className="mb-3 text-2xl font-bold text-white">Access Restricted</h2>
          <p className="mb-6 text-slate-300">Students can attend quizzes but cannot create quizzes.</p>
          <button className="inline-flex items-center justify-center rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-slate-900 transition hover:bg-cyan-300" onClick={() => navigate('/allQuizs')}>
            Go To Attend Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 px-4 py-10 sm:px-6 lg:py-12">
      <div className="mx-auto w-full max-w-4xl rounded-3xl border border-cyan-100/20 bg-white/5 p-6 shadow-2xl backdrop-blur-md sm:p-8">
        <div className="mb-6 text-left">
          <p className="mb-2 inline-flex rounded-full border border-cyan-200/30 bg-cyan-300/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
            Teacher Workspace
          </p>
          <h2 className="text-3xl font-black text-white">Create New Quiz</h2>
          <p className="mt-2 text-sm text-slate-300">Set your quiz title, duration, and add well-structured questions.</p>
        </div>

        <div className="rounded-2xl border border-cyan-100/20 bg-slate-900/70 p-5 sm:p-6">
            <form className="space-y-4">
              {/* Quiz Title */}
              <div>
                <label className="label">
                  <span className="label-text text-slate-200">Subject</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter quiz title"
                  className="w-full rounded-xl border border-cyan-100/20 bg-slate-950/70 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-cyan-300 focus:outline-none"
                />
              </div>



              {/* Time Limit */}
              <div>
                <label className="label">
                  <span className="label-text text-slate-200">Time Limit (in minutes)</span>
                </label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  min="1"
                  placeholder="e.g. 30"
                  className="w-full rounded-xl border border-cyan-100/20 bg-slate-950/70 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-cyan-300 focus:outline-none"
                />
              </div>

              {/* Dynamic Questions */}
              <div className="mt-6 space-y-6">
                <h3 className="text-lg font-semibold text-cyan-100">Questions</h3>
                {questions.map((q, qIndex) => (
                  <div key={qIndex} className="space-y-4 rounded-xl border border-cyan-100/20 bg-slate-950/70 p-4">
                    <div>
                      <label className="label">
                        <span className="label-text text-slate-200">Question {qIndex + 1}</span>
                      </label>
                      <input
                        type="text"
                        value={q.questionText}
                        onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                        className="w-full rounded-xl border border-cyan-100/20 bg-slate-900 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-cyan-300 focus:outline-none"
                        placeholder="Enter question"
                      />
                    </div>
                    {q.options.map((opt, optIndex) => (
                      <div key={optIndex} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`correct-${qIndex}`}
                          checked={q.correctAnswer === optIndex}
                          onChange={() => handleCorrectAnswerChange(qIndex, optIndex)}
                          className="radio border-cyan-200/40 checked:border-cyan-300 checked:bg-cyan-300"
                        />
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                          className="w-full rounded-xl border border-cyan-100/20 bg-slate-900 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-cyan-300 focus:outline-none"
                          placeholder={`Option ${optIndex + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                ))}
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-xl border border-cyan-300/60 bg-transparent px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-cyan-200 transition hover:bg-cyan-300/10"
                  onClick={addQuestion}
                >
                  Add Question
                </button>
              </div>

              {/* Save Button */}
              <div className="text-center mt-6">
                <button type="button" className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-500 px-4 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-emerald-600" onClick={handleSaveQuiz}>
                  Publish Quiz
                </button>
              </div>
            </form>
        </div>
      </div>
    </section>
  );
};

export default CreateQuiz;
