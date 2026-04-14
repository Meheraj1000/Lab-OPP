import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure to install axios or use fetch if you prefer

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState('user123'); // Simulated logged-in user ID
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // Replace this URL with your actual API endpoint
        const response = await axios.get('https://your-api.com/leaderboard');
        const data = response.data;

        // Sort users by score (descending)
        const sorted = data.sort((a, b) => b.score - a.score);
        setUsers(sorted);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch leaderboard data.');
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 px-4 py-10 sm:px-6 lg:py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 rounded-3xl border border-cyan-100/20 bg-white/5 p-6 shadow-2xl backdrop-blur-md sm:p-8">
          <p className="mb-2 inline-flex rounded-full border border-cyan-200/30 bg-cyan-300/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
            Competitive Board
          </p>
          <h1 className="text-4xl font-black text-white">Leaderboard</h1>
          <p className="mt-2 text-sm text-slate-300 sm:text-base">See top performers and compare quiz results.</p>
        </div>

        {loading && (
          <div className="rounded-2xl border border-cyan-100/20 bg-white/5 p-8 text-center text-cyan-100 shadow-xl">
            Loading...
          </div>
        )}
        {error && (
          <div className="rounded-2xl border border-rose-300/30 bg-rose-400/10 p-5 text-center text-rose-100 shadow-xl">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="overflow-hidden rounded-2xl border border-cyan-100/20 bg-slate-900/70 shadow-2xl">
            <table className="w-full border-collapse text-left text-slate-100">
              <thead className="bg-slate-950/70 text-cyan-200">
              <tr>
                <th className="p-4">Rank</th>
                <th className="p-4">Name</th>
                <th className="p-4">Score</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={`border-t border-cyan-100/10 ${
                    user.id === currentUserId ? 'bg-amber-300/20 font-bold text-amber-100' : 'hover:bg-white/5'
                  }`}
                >
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.score}</td>
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

export default Leaderboard;
