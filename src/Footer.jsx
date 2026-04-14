import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-cyan-100/10 bg-slate-950 text-white py-12 px-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* About Section */}
        <div>
          <h6 className="mb-3 text-xl font-bold text-cyan-300">QuizApp</h6>
          <p className="text-sm text-slate-300">
            Empowering your knowledge journey through fun and interactive quizzes. Whether you're preparing for exams or just curious, we've got something for you.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h6 className="mb-3 text-lg font-semibold text-cyan-300">Quick Links</h6>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><a href="/createQuiz" className="transition hover:text-cyan-300">Create Quiz</a></li>
            <li><a href="/allQuizs" className="transition hover:text-cyan-300">Attend Quiz</a></li>
            <li><a href="/leaderboard" className="transition hover:text-cyan-300">Leaderboard</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h6 className="mb-3 text-lg font-semibold text-cyan-300">Contact Us</h6>
          <p className="text-sm text-slate-300">Email: meherajkarim510@gmail.com</p>
          <p className="text-sm text-slate-300">Phone: 01890602565</p>
        </div>

        {/* Social Media */}
        <div>
          <h6 className="mb-3 text-lg font-semibold text-cyan-300">Follow Us</h6>
          <div className="flex space-x-4">
            <a href="https://x.com/twitter?lang=en" className="text-slate-300 transition hover:text-cyan-300">
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a href="https://www.youtube.com/" className="text-slate-300 transition hover:text-cyan-300">
              <i className="fab fa-youtube text-xl"></i>
            </a>
            <a href="" className="text-slate-300 transition hover:text-cyan-300">
              <i className="fab fa-facebook-f text-xl"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} QuizApp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
