import './SignUpPage.css'
import { useState, useContext } from 'react'
import { signUp, signIn} from '../../services/authService'
import { setToken, getUserFromToken} from '../../utils/token'
import { useNavigate } from 'react-router'
import { UserContext } from '../../context/UserContext'
import logoImage from '../../images/logos/logo.png'

const SignUpPage = () => {
    const navigate = useNavigate()

    //Context variables
    const {user, setUser} = useContext(UserContext)

    //StateVariable
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password: ''
    })
    const [errorData, setErrorData] = useState({})

    //Functions
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await signUp(formData)
            handleSignIn()
        } catch (error) {
            setErrorData(error.response.data)
        }
    }

    const handleSignIn = async () => {
        const response = await signIn({
            "username": formData.username,
            "password": formData.password
        })

        //Save the token to local storage
        const token = response.data.access
        if (token) setToken(token)

        //Get the user from local storage and set it to the globle state user variable
        setUser(getUserFromToken())
        navigate(`/baskets`)
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setErrorData({ ...errorData, [e.target.name]: '' })
    }

    return (
        <>
        <div className="logo-container">
            <img src={logoImage} alt="basket.logo" />
        </div>
            <form id="auth-form" onSubmit={handleSubmit}>
                <h2>Create an account</h2>
                <div id="input-container">
                    <label htmlFor="username" hidden>Username</label>
                    <input type="text" id="username" name="username" placeholder="username" required onChange={handleChange} />
                    {errorData.username && <p className='error-message'>{`${errorData.username}`}</p>}

                    <label htmlFor="email" hidden>Username</label>
                    <input type="text" id="email" name="email" placeholder="email@domain.com" required onChange={handleChange} />
                    {errorData.email && <p className='error-message'>{`${errorData.email}`}</p>}

                    <label htmlFor="password" hidden>Username</label>
                    <input type="password" id="password" name="password" placeholder="Password" required onChange={handleChange} />
                    {errorData.password && <p className='error-message'>{`${errorData.password}`}</p>}

                    <label htmlFor="confirmPassword" hidden>Username</label>
                    <input type="password" id="confirmPassword" name="confirm_password" placeholder="Confirm Password" required onChange={handleChange} />
                    {errorData.confirm_password && <p className='error-message'>{`${errorData.confirm_password}`}</p>}

                    <button type="submit" className="form-button"> Create an account</button>
                    <div id="footer">
                        <p>Already registered?</p>
                        <a href="sign-in">Sign-in</a>
                    </div>
                </div>
            </form>
        </>
    )
}

export default SignUpPage