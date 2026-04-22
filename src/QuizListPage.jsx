import { useEffect, useState } from 'react';
import axios from 'axios';

const QuizListPage = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('latest');

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
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 px-4 py-14">
                <div className="mx-auto flex h-64 max-w-6xl items-center justify-center rounded-3xl border border-cyan-100/20 bg-white/5 shadow-2xl backdrop-blur-md">
                    <span className="loading loading-spinner loading-lg text-cyan-300"></span>
                </div>
            </div>
        );
    }

    const normalizedSearch = searchTerm.trim().toLowerCase();

    const filteredQuizzes = quizzes.filter((quiz) => {
        const subject = String(quiz.subject || '').toLowerCase();
        const creator = String(quiz.createdBy || '').toLowerCase();
        return subject.includes(normalizedSearch) || creator.includes(normalizedSearch);
    });

    const sortedQuizzes = [...filteredQuizzes].sort((a, b) => {
        if (sortBy === 'durationAsc') {
            return (a.durationInMinutes || 0) - (b.durationInMinutes || 0);
        }

        if (sortBy === 'durationDesc') {
            return (b.durationInMinutes || 0) - (a.durationInMinutes || 0);
        }

        if (sortBy === 'questionsDesc') {
            return (b.questions?.length || 0) - (a.questions?.length || 0);
        }

        return 0;
    });

    return (
        <section className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 px-4 py-10 sm:px-6 lg:py-12">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8 rounded-3xl border border-cyan-100/20 bg-white/5 p-6 shadow-2xl backdrop-blur-md sm:p-8">
                    <p className="mb-2 inline-flex rounded-full border border-cyan-100/30 bg-cyan-300/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
                        Quiz Library
                    </p>
                    <h1 className="text-3xl font-black text-white sm:text-4xl">Discover And Attend Quizzes</h1>
                    <p className="mt-2 max-w-2xl text-sm text-slate-200 sm:text-base">
                        Pick a quiz by topic, check the time and question count, then jump straight into the challenge.
                    </p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_220px]">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by subject or creator..."
                            className="w-full rounded-xl border border-cyan-100/20 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-cyan-300 focus:outline-none"
                        />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full rounded-xl border border-cyan-100/20 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-cyan-300 focus:outline-none"
                        >
                            <option value="latest">Default Order</option>
                            <option value="durationAsc">Duration: Low to High</option>
                            <option value="durationDesc">Duration: High to Low</option>
                            <option value="questionsDesc">Most Questions</option>
                        </select>
                    </div>
                </div>

                {sortedQuizzes.length === 0 ? (
                    <div className="rounded-2xl border border-cyan-100/20 bg-white/5 p-10 text-center shadow-xl">
                        <h2 className="text-2xl font-bold text-white">No quizzes found</h2>
                        <p className="mt-2 text-slate-300">Try a different search term or check back later.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {sortedQuizzes.map((quiz) => (
                            <article
                                key={quiz.id}
                                className="group rounded-2xl border border-cyan-100/20 bg-slate-900/70 p-5 shadow-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-cyan-500/20"
                            >
                                <div className="mb-4 overflow-hidden rounded-xl border border-cyan-100/20">
                                    <img
                                        className="h-36 w-full object-cover transition duration-300 group-hover:scale-105"
                                        src={"https://static.vecteezy.com/system/resources/previews/003/206/208/non_2x/quiz-time-neon-signs-style-text-free-vector.jpg"}
                                        alt={quiz.subject}
                                    />
                                </div>

                                <h2 className="line-clamp-2 text-xl font-extrabold text-white">{quiz.subject}</h2>

                                <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
                                    <span className="rounded-full bg-cyan-400/20 px-3 py-1 text-cyan-200">
                                        {quiz.questions?.length || 0} Questions
                                    </span>
                                    <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-emerald-200">
                                        {quiz.durationInMinutes || 'N/A'} Minutes
                                    </span>
                                </div>

                                <p className="mt-3 text-sm text-slate-300">
                                    Created by: <span className="font-semibold text-slate-100">{quiz.createdBy || 'Anonymous'}</span>
                                </p>

                                <button
                                    className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-slate-900 transition hover:bg-cyan-300"
                                    onClick={() => {
                                        window.location.href = `/quiz/${quiz.id}`;
                                    }}
                                >
                                    Attend Quiz
                                </button>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default QuizListPage;
