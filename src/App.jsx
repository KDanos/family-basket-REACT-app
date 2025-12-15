import './App.css'
import { Routes, Route } from 'react-router'
import NavBar from './components/Navbar/Navbar'
import SignInPage from './components/SignInPage/SignInPage'
import SignUpPage from './components/SignUpPage/SignUpPage'
import BasketIndexPage from './components/BasketIndex/BasketIndex'

const App = () => {

  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path='index' element={<BasketIndexPage/>}/>
        </Routes>
      </main>
    </>
  )
}

export default App