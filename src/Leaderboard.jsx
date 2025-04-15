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
    <div className="min-h-screen bg-[#F0F4F8] py-10 px-5">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">🏆 Leaderboard</h1>

      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="max-w-3xl mx-auto bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-emerald-500 text-white">
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
                  className={`text-gray-700 ${
                    user.id === currentUserId ? 'bg-yellow-100 font-bold' : 'hover:bg-gray-100'
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
  );
};

export default Leaderboard;
