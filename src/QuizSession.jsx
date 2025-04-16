import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const QuizSession = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(null);
    const [loading, setLoading] = useState(true);

    console.log(selectedAnswers);

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

    // কুইজ সাবমিট করা
    const handleSubmit = () => {
        // স্কোর ক্যালকুলেট করা
        const score = quiz.questions.reduce((total, question, index) => {
            return total + (selectedAnswers[index] === question.correctAnswer ? 1 : 0);
        }, 0);

        // রেজাল্ট পেজে রিডাইরেক্ট
        navigate(`/quiz/${id}/result`, {
            state: {
                totalQuestions: quiz.questions.length,
                score,
                quizTitle: quiz.subject
            }
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (!quiz) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl">কুইজ লোড করতে সমস্যা হয়েছে</p>
            </div>
        );
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

    return (
        <div className="min-h-screen bg-base-200 p-4">
            <div className="max-w-3xl mx-auto bg-base-100 rounded-lg shadow-lg p-6">
                {/* হেডার সেকশন */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">{quiz.subject}</h1>
                    <div className="badge bg-orange-400/20 border border-orange-600 font-bold text-orange-600 w-16">
                         {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
                    </div>
                </div>

                {/* প্রোগ্রেস বার */}
                <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
                    <div
                        className="bg-primary h-4 rounded-full"
                        style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
                    ></div>
                </div>

                {/* বর্তমান প্রশ্ন */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">
                        Qn {currentQuestionIndex + 1}/{quiz.questions.length}: {currentQuestion.questionText}
                    </h2>

                    <div className="space-y-3">
                        {currentQuestion.options.map((option, idx) => (
                            <button
                                key={idx}
                                className={`btn btn-block justify-start ${selectedAnswers[currentQuestionIndex] === option
                                        ? 'bg-green-600/20 border border-green-600'
                                        : ''
                                    }`}
                                onClick={() => handleAnswerSelect(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                {/* নেভিগেশন বাটন */}
                <div className="flex justify-between">
                    <button
                        className="btn"
                        onClick={handlePrevious}
                        disabled={currentQuestionIndex === 0}
                    >
                        Back
                    </button>

                    {isLastQuestion ? (
                        <button
                            className="btn btn-primary"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    ) : (
                        <button
                            className="btn btn-primary"
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