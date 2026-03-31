import Navbar from './components/Navbar.jsx'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ForgotPassPage from './pages/ForgotPassPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'

function App() {

  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/forgot-pass' element={<ForgotPassPage />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Routes>
      </div>
    </>
  )
}

export default App
