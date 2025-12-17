import './App.css'
import { Routes, Route, Navigate } from 'react-router'

import NavBar from './components/Navbar/Navbar'
import SignInPage from './components/SignInPage/SignInPage'
import SignUpPage from './components/SignUpPage/SignUpPage'
import BasketIndexPage from './components/BasketIndex/BasketIndex'
import BasketShow from './components/BasketShow/BasketShow'

// import UserShowPage from './components/UserShowPage/UserShowPage'
import NewBasketPage from './components/NewBasketPage/NewBasketPage'
import { useContext } from 'react'
import { UserContext } from './context/UserContext'

const App = () => {

  return (
    <>
      <main>
        <NavBar />
        <div className="route-container">
          <Routes>
            <Route path ="/" element = {<Navigate to='/sign-in' replace/>} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            {/* <Route path='/profile/:userId' element={<UserShowPage />} /> */}
            <Route path='/baskets' element={<BasketIndexPage />} />
            <Route path='/baskets/new' element={<NewBasketPage />} />
            <Route path='/baskets/:basketId' element={<BasketShow />} />
          </Routes>
        </div>
      </main>
    </>
  )
}

export default App