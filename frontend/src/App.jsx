import { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUpPage from './pages/SignUp';
import LoginPage from './pages/Login';
import SiteHeadingAndNav from './components/SiteHeadingAndNav';
import NotFoundPage from './pages/NotFound';
import UserContext from './contexts/current-user-context';
import { checkForLoggedInUser } from './adapters/auth-adapter';
import UsersPage from './pages/Users';
import UserPage from './pages/User';
import SignUpLogin from './pages/SignupLogin';
import DoctorReview from './pages/DoctorReview';
import Welcome from './pages/Welcome';
import CreatePost from './pages/CreatePost';


export default function App() {
  const { setCurrentUser } = useContext(UserContext);
  useEffect(() => {
    checkForLoggedInUser().then(setCurrentUser);
  }, [setCurrentUser]);

  return <>
    <SiteHeadingAndNav />
    <main>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path = '/signuplogin' element={<SignUpLogin />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/create-post' element={<CreatePost />} />
        <Route path='/users' element={<UsersPage />} />
        <Route path='/users/:id' element={<UserPage />} />
        <Route path='/doctor/:id' element={<DoctorReview />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </main>
  </>;
}
