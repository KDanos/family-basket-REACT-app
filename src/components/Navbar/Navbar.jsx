import { useNavigate } from 'react-router'
import './Navbar.css'
import { useState, useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { removeToken } from '../../utils/token'
import { deleteAccount } from '../../services/authService'

const NavBar = () => {
    const { user, signOut, setUser } = useContext(UserContext)

    const navigate = useNavigate()

    //Functions
    const handleLogOut = () => {
        try {
            console.log('Signing out...')
            signOut()
            console.log('Signout successful')
            navigate('/')
        } catch (error) {
            console.error('Failed to sign-out the user', error)

        }
    }

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Please confirm deletion of account')
        if (!confirmDelete) {
            return
        }
        try {
            console.log('Deleting account...')
            await deleteAccount(user.id)
            signOut()
            console.log('Deletion succesfull')
            navigate('/')
        } catch (error) {
            console.error('Failed to delete the account')
        }
    }
    const handleReturn = () => (
        navigate(-1)
    )

    return (
        <div id='NavBar-container'>
            <div className="navigation-container">
                <button className="return-button" onClick={() => navigate(-1)}>⟵</button>
            </div>
            <div id="NavBar-body">
                <span className="Navbar-symbol">👤</span>

                <div className="NavBar-info">
                    {user ? (
                        <>
                            <button
                                className="link-button"
                                style={{ fontWeight: 'bold' }}
                                onClick={() => { navigate('/baskets') }}>
                                {user.username}
                            </button>

                            <button className="link-button" onClick={handleLogOut}>Logout</button>
                            <button className="link-button" onClick={handleDelete}>Delete Account</button>
                        </>
                    ) : (
                        null
                    )
                    }
                </div>
            </div>
        </div>
    )
}
export default NavBar