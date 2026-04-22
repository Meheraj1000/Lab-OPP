import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useUser from './hooks/UserHook';

const QuizSession = () => {
    const { userInfo } = useUser();
    const { id } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(null);
    const [loading, setLoading] = useState(true);

    // কুইজ ডাটা ফেচ করা
    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/quizzes/${id}`);
                setQuiz(response.data);
                setTimeLeft(response.data.durationInMinutes * 60); // সেকেন্ডে কনভার্ট
            } catch (error) {
                console.error('Error fetching quiz:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuiz();
    }, [id]);

    // টাইমার ইফেক্ট
    useEffect(() => {
        if (!timeLeft) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmit(); // টাইম শেষ হলে অটো সাবমিট
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    // উত্তর সিলেক্ট করার ফাংশন
    const handleAnswerSelect = (answer) => {
        const newAnswers = [...selectedAnswers];
        newAnswers[currentQuestionIndex] = answer;
        setSelectedAnswers(newAnswers);
    };

    // নেক্সট প্রশ্নে যাওয়া
    const handleNext = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    // প্রিভিয়াস প্রশ্নে যাওয়া
    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };


    const handleSubmit = async () => {
        // Calculate score and collect correct answers
        const result = quiz.questions.reduce((acc, question, index) => {
            const isCorrect = selectedAnswers[index] === question.correctAnswer;

            return {
                score: acc.score + (isCorrect ? 1 : 0),
                correctAnswers: [...acc.correctAnswers, {
                    question: question.questionText,
                    correctAnswer: question.correctAnswer,
                    userAnswer: selectedAnswers[index] || 'Not answered',
                    isCorrect
                }]
            };
        }, { score: 0, correctAnswers: [] });

        const resultData = {
            totalQuestions: quiz.questions.length,
            score: result.score,
            correctAnswers: result.correctAnswers,
            quizTitle: quiz.subject,
            quizId: id,
            timeTaken: quiz.durationInMinutes * 60 - timeLeft // Calculate time taken
        };

        try {
            // Post the result data to the API
            await axios.post('http://localhost:8080/api/result-submissions', { ...resultData, attendeId: userInfo?.id });

            // Keep latest result for profile summary fallback.
            if (userInfo?.id) {
                localStorage.setItem(`latestQuizResult_${userInfo.id}`, JSON.stringify(resultData));
            }
            localStorage.setItem('latestQuizResult', JSON.stringify(resultData));

            // Redirect to result page after successful submission
            navigate(`/quiz/${id}/result`, {
                state: resultData
            });
        } catch (error) {
            console.error('Error submitting result:', error);
            alert('Failed to submit the result. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900">
                <span className="loading loading-spinner loading-lg text-cyan-300"></span>
            </div>
        );
    }

    if (!quiz) {
        return (
            <div className="flex h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900">
                <p className="text-xl text-cyan-100">কুইজ লোড করতে সমস্যা হয়েছে</p>
            </div>
        );
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 px-4 py-6 sm:px-6 lg:py-10">
            <div className="mx-auto w-full max-w-4xl rounded-3xl border border-cyan-100/20 bg-white/5 p-5 shadow-2xl backdrop-blur-md sm:p-8">
                <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
                    <div>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-cyan-100">Live Quiz Session</p>
                        <h1 className="text-2xl font-black text-white sm:text-3xl">{quiz.subject}</h1>
                    </div>
                    <div className="rounded-xl border border-amber-300/30 bg-amber-400/10 px-4 py-2 text-lg font-bold text-amber-200 shadow-sm">
                        {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
                    </div>
                </div>

                <div className="mb-6">
                    <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-200 sm:text-sm">
                        <span>Question Progress</span>
                        <span>{currentQuestionIndex + 1} / {quiz.questions.length}</span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800">
                        <div
                            className="h-3 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-300"
                            style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
                        ></div>
                    </div>
                </div>

                <div className="mb-8 rounded-2xl border border-cyan-100/20 bg-slate-900/70 p-5 sm:p-6">
                    <h2 className="mb-4 text-lg font-bold leading-relaxed text-white sm:text-xl">
                        Qn {currentQuestionIndex + 1}: {currentQuestion.questionText}
                    </h2>

                    <div className="space-y-3">
                        {currentQuestion.options.map((option, idx) => (
                            <button
                                key={idx}
                                className={`w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition sm:text-base ${selectedAnswers[currentQuestionIndex] === option
                                    ? 'border-emerald-400/70 bg-emerald-400/15 text-emerald-100 shadow-sm'
                                    : 'border-cyan-100/20 bg-slate-950/70 text-slate-100 hover:border-cyan-300/40 hover:bg-slate-800/70'
                                    }`}
                                onClick={() => handleAnswerSelect(option)}
                            >
                                <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-cyan-200">
                                    {String.fromCharCode(65 + idx)}
                                </span>
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                    <button
                        className="rounded-xl border border-cyan-100/30 bg-slate-900/70 px-5 py-2.5 text-sm font-semibold text-cyan-100 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                        onClick={handlePrevious}
                        disabled={currentQuestionIndex === 0}
                    >
                        Back
                    </button>

                    {isLastQuestion ? (
                        <button
                            className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    ) : (
                        <button
                            className="rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-cyan-300"
                            onClick={handleNext}
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuizSession;
