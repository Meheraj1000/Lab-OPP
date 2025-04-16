import { useEffect, useState } from 'react';
import axios from 'axios';

const QuizListPage = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/quizzes');
                setQuizzes(response.data);
            } catch (error) {
                console.error('Error fetching quizzes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Available Quizzes</h1>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className="w-1/4">Image</th>
                            <th className="w-1/2">Quiz Details</th>
                            <th className="w-1/4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quizzes.map((quiz, i) => (
                            <tr key={quiz.id} className={i%2 === 0 ? "bg-blue-200 " : "bg-blue-300"}>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className=" w-16 h-16 border">
                                                <img
                                                    src={"https://static.vecteezy.com/system/resources/previews/003/206/208/non_2x/quiz-time-neon-signs-style-text-free-vector.jpg"}
                                                    alt={quiz.subject}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div className="font-bold">{quiz.subject}</div>
                                        <div className="text-sm opacity-50">
                                            {quiz.questions?.length || 0} questions • {quiz.durationInMinutes || 'N/A'} mins
                                        </div>
                                        <div className="text-sm">Created by: {quiz.createdBy || 'Anonymous'}</div>
                                    </div>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => {
                                            // Handle attend quiz action
                                            window.location.href = `/quiz/${quiz.id}`;
                                        }}
                                    >
                                        Attend
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default QuizListPage;