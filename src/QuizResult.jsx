import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const QuizResult = () => {
    // রাউটার থেকে ডাটা নেওয়া (Fetching data from router state)
    const { state } = useLocation();
    const navigate = useNavigate();

    // ডিফল্ট ভ্যালু সেট করা (Setting default values)
    const {
        score = 0,
        totalQuestions = 1,
        quizTitle = "Quiz",
        timeTaken = 0,
        correctAnswers = [],
        quizId
    } = state || {};

    // পার্সেন্টেজ ক্যালকুলেশন (Calculate percentage)
    const percentage = Math.round((score / totalQuestions) * 100);

    // স্কোর এর উপর ভিত্তি করে মেসেজ (Score-based message)
    const getResultMessage = () => {
        if (percentage >= 80) return "Excellent! You're a quiz master!";
        if (percentage >= 60) return "Good job! You passed with flying colors!";
        if (percentage >= 40) return "Not bad! Keep practicing!";
        return "Keep learning and try again!";
    };

    // যদি ডাটা না থাকে (If no data available)
    if (!state) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-4">
                <div className="alert alert-error max-w-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>No result data found. Please complete a quiz first.</span>
                </div>
                <button
                    className="btn btn-primary mt-4"
                    onClick={() => navigate('/quizzes')}
                >
                    Back to Quizzes
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
            <div className="bg-base-100 shadow-xl rounded-lg p-8 w-full max-w-2xl">
                {/* রেজাল্ট হেডার (Result Header) */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">{quizTitle} - Result</h1>
                    <p className="text-lg text-primary">{getResultMessage()}</p>
                </div>

                {/* মেইন রেজাল্ট সেকশন (Main Result Section) */}
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                    {/* স্কোর কার্ড (Score Card) */}
                    <div className="flex-1 card bg-primary text-primary-content">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-2xl">Your Score</h2>
                            <div className="radial-progress text-4xl font-bold"
                                style={{ "--value": percentage, "--size": "12rem" }}>
                                {percentage}%
                            </div>
                            <p className="text-xl mt-4">
                                {score} out of {totalQuestions} correct
                            </p>
                        </div>
                    </div>

                    {/* ডিটেইলস কার্ড (Details Card) */}
                    <div className="flex-1 space-y-4">
                        <div className="stats shadow w-full">
                            <div className="stat">
                                <div className="stat-title">Time Taken</div>
                                <div className="stat-value">{Math.floor(timeTaken / 60)}m {timeTaken % 60}s</div>
                            </div>
                        </div>

                        <div className="stats shadow w-full">
                            <div className="stat">
                                <div className="stat-title">Correct Answers</div>
                                <div className="stat-value">{score}</div>
                                <div className="stat-desc">{percentage}% accuracy</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* অ্যাকশন বাটন (Action Buttons) */}
                <div className="flex flex-wrap justify-center gap-4 mt-6">
                    {/* <button
                        className="btn btn-primary"
                        onClick={() => navigate(`/quiz/${quizId}/review`, { state })}
                    >
                        Review Answers
                    </button> */}

                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate(`/quiz/${quizId}/start`)}
                    >
                        Retry Quiz
                    </button>

                    <button
                        className="btn btn-accent"
                        onClick={() => navigate('/allQuizs')}
                    >
                        Browse More Quizzes
                    </button>
                </div>

                {/* ফিডব্যাক সেকশন (Feedback Section) */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        How was your quiz experience? We'd love your feedback!
                    </p>
                    <div className="rating rating-md mt-2">
                        <input type="radio" name="rating" className="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating" className="mask mask-star-2 bg-orange-400" checked />
                        <input type="radio" name="rating" className="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating" className="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating" className="mask mask-star-2 bg-orange-400" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizResult;