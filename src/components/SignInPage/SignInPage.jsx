import { useNavigate } from 'react-router'
import { signIn } from '../../services/authService'
import './SignInPage.css'
import { useState, useContext } from 'react'
import { setToken, getUserFromToken } from '../../utils/token'
import { UserContext } from '../../context/UserContext'
import logoImage from '../../images/logos/logo.png'


const SignInPage = () => {
    //Context
    const {user, setUser} =useContext(UserContext)
    //Navigation
    const navigate = useNavigate()

    //State Variables
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })
    const [errorData, setErrorData] = useState({})

    //Functions
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setErrorData({})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log('Calling signIn...')
            const response = await signIn(formData)
            //Save the token to local storage
            const token = response.data.access
            if (token) setToken(token)
            
            //Get the user from local storage and set it to the globle state user variable
            setUser(getUserFromToken())
            navigate(`/baskets`)
        } catch (error) {
            setErrorData(error.response?.data || {detail:'Error during sign in. Please try again later.'} )
        }
    }

    return (
        <>
        <div className="logo-container">
            <img src={logoImage} alt="basket.logo" />
        </div>
        <form id="auth-form" onSubmit={handleSubmit}>
            <h2>Sign in</h2>
            <div id="input-container">
                <label htmlFor="username" hidden></label>
                <input type="text" id="username" name="username" placeholder='Username' required onChange={handleChange} />


                <label htmlFor="password" hidden></label>
                <input type="password" id="password" name="password" placeholder="password" required onChange={handleChange} />
                {errorData.detail && <p className="error-message">{`${errorData.detail}`}</p>}

                <button type="submit" className="form-button">Sign-in</button>
            </div>
            <div id="footer">
                <p>Don't have an account yet?</p>
                <a href="/sign-up">Register</a>
            </div>
        </form>
        </>
    )
}

export default SignInPage