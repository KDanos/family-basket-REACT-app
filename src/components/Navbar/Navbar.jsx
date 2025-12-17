import { useNavigate } from 'react-router'
import './Navbar.css'
import { useState, useContext } from 'react'
import { UserContext  } from '../../context/UserContext'
import { removeToken } from '../../utils/token'

const NavBar = () => {
    const { user, signOut } = useContext(UserContext)

    const navigate = useNavigate()

    //Functions
    const handleLogOut = () => {
        try {
            console.log('Signing out...')
            signOut()
            console.log('Signout successful')
            navigate('/')
        } catch (error) {
            console.error('Failed to sign-out the user',error)
            
        }
    }

    return (
        <div id='NavBar-container'>
            <span className="Navbar-symbol">👤</span>

            <div className="NavBar-info">
                {user ? (
                    <>
                        <p style = {{fontWeight:'bold'}}> {user.username}</p>
                        <button className="link-button" onClick={handleLogOut}>Logout</button>
                    </>
                ) : (
                    null
                )
                }
            </div>
        </div>
    )
}
export default NavBar