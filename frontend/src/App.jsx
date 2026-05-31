import Navbar from './components/Navbar.jsx'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ForgotPassPage from './pages/ForgotPassPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import { useAuthStore } from './store/useAuthStore.js'
import { useThemeStore } from './store/useThemeStore.js'
import { useEffect } from 'react'
import { Loader } from "lucide-react";
import { Toaster } from 'react-hot-toast'
import SettingsPage from './pages/SettingsPage.jsx'

function App() {

  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isCheckingAuth && !authUser) {
    return (
      <div className=" flex items-center justify-center h-screen">
        <Loader className=' size-10 animate-spin' />
      </div>
    )
  }

  return (
    <>
      <Toaster position='top-center' />
      <div data-theme={theme}>
        <Navbar />
        <Routes>
          <Route path='/' element={authUser ? <HomePage /> : <Navigate to={"/login"} />} />

          <Route path='/signup' element={!authUser ? <SignupPage /> : <Navigate to={"/"} />} />

          <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />

          <Route path='/forgot-pass' element={<ForgotPassPage />} />

          <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />} />

          <Route path='/settings' element={authUser ? <SettingsPage /> : <Navigate to={"/login"} />} />


        </Routes>
      </div>
    </>
  );
}

export default App
