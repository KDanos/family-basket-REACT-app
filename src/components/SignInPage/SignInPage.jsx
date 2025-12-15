import { useNavigate } from 'react-router'
import { signIn } from '../../services/authService'
import './SignInPage.css'
import { useState } from 'react'


const SignInPage = () => {
    const navigate = useNavigate()
    
    //State Variables
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })
    const [errorData, setErrorData] = useState({})

    //Functions
    const handleChange = (e) => {
        setFormData ({...formData, [e.target.name] : e.target.value})
        setErrorData ({})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await signIn(formData)
            navigate('/index')
        } catch (error) {
            setErrorData(error.response.data)
        }
    }

    return (
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
    )
}

export default SignInPage