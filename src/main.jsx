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

const router = createBrowserRouter([
  {
    path: '/',
    element:<Home></Home>,
  },
  {
    path:'/register',
    element:<Register></Register>
  },
  {
    path:'/login',
    element:<Login></Login>
  },
  {
    path:'/createQuiz',
    element:<PrivateRoute><CreateQuiz></CreateQuiz></PrivateRoute>
  },
  {
    path:'/attendQuiz',
    element:<PrivateRoute><AttendQuiz></AttendQuiz></PrivateRoute>
  },
  {
    path: '/allQuizs',
    element: <PrivateRoute><QuizListPage></QuizListPage></PrivateRoute>
  },
  {
    path:'/leaderboard',
    element:<Leaderboard></Leaderboard>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
 <AuthProvider routes={<RouterProvider router={router} />}></AuthProvider>
  </StrictMode>
);
