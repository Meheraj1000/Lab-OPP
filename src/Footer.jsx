import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#1F2937] text-white py-10 px-5 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* About Section */}
        <div>
          <h6 className="text-xl font-bold mb-3 text-emerald-400">QuizApp</h6>
          <p className="text-sm text-gray-300">
            Empowering your knowledge journey through fun and interactive quizzes. Whether you're preparing for exams or just curious, we've got something for you.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h6 className="text-lg font-semibold mb-3 text-emerald-400">Quick Links</h6>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/createQuiz" className="hover:underline">Create Quiz</a></li>
            <li><a href="/attendQuiz" className="hover:underline">Attend Quiz</a></li>
            <li><a href="/leaderboard" className="hover:underline">Leaderboard</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h6 className="text-lg font-semibold mb-3 text-emerald-400">Contact Us</h6>
          <p className="text-sm text-gray-300">Email: meherajkarim510@gmail.com</p>
          <p className="text-sm text-gray-300">Phone: 01890602565</p>
        </div>

        {/* Social Media */}
        <div>
          <h6 className="text-lg font-semibold mb-3 text-emerald-400">Follow Us</h6>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-300 hover:text-white">
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <i className="fab fa-youtube text-xl"></i>
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <i className="fab fa-facebook-f text-xl"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="text-center mt-10 text-sm text-gray-400">
        © {new Date().getFullYear()} QuizApp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
