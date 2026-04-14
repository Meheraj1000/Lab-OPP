import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import AuthProvider from './AuthProvider';
import CreateQuiz from './CreateQuiz';
import AttendQuiz from './AttendQuiz';
import PrivateRoute from '../PrivateRoute';
import Leaderboard from './Leaderboard';
import QuizListPage from './QuizListPage';
import QuizSession from './QuizSession';
import QuizResult from './QuizResult';
import TeacherResults from './TeacherResults';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
  },
  {
    path: '/register',
    element: <Register></Register>
  },
  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: '/createQuiz',
    element: <PrivateRoute><CreateQuiz></CreateQuiz></PrivateRoute>
  },
  {
    path: '/allQuizs',
    element: <PrivateRoute allowedRoles={['STUDENT', 'ADMIN']}><QuizListPage></QuizListPage></PrivateRoute>
  },
  {
    path: '/quiz/:id',
    element: <PrivateRoute allowedRoles={['STUDENT', 'ADMIN']}><AttendQuiz></AttendQuiz></PrivateRoute>
  },
  {
    path: '/quiz/:id/start',
    element: <PrivateRoute allowedRoles={['STUDENT', 'ADMIN']}><QuizSession></QuizSession></PrivateRoute>
  },
  {
    path: '/quiz/:id/result',
    element: <PrivateRoute allowedRoles={['STUDENT', 'ADMIN']}><QuizResult></QuizResult></PrivateRoute>
  },
  {
    path: '/teacher-results',
    element: <PrivateRoute allowedRoles={['TEACHER', 'ADMIN']}><TeacherResults></TeacherResults></PrivateRoute>
  },
  {
    path: '/leaderboard',
    element: <Leaderboard></Leaderboard>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider routes={<RouterProvider router={router} />}></AuthProvider>
  </StrictMode>
);
