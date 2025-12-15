import { signIn } from '../../../services/authService'
import './SignInPage.css'
import { useState } from 'react'


const SignInPage = () => {
    //State Variables
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })
    const [errorData, setErrorData] = useState({})

    //Functions
    const handleChange = (e) => {
        setFormData ({...formData, [e.target.name] : e.target.value})
        setErrorData ({...errorData, [e.target.name] : ""})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await signIn(formData)
            console.log ('you have signed in')
        } catch (error) {
            console.log ('================================')
            console.log(error)
            // setErrorData(error.response.data)
        }
    }

    return (
        <form id="auth-form" onSubmit={handleSubmit}>
            <h2>Sign in</h2>
            <div id="input-container">
                <label htmlFor="username" hidden></label>
                <input type="text" id="username" name="username" placeholder='Username' required onChange={handleChange} />
                {errorData.username && <p className="error-message">{`${error.data.username}`}</p>}

                <label htmlFor="password" hidden></label>
                <input type="password" id="password" name="password" placeholder="password" required onChange={handleChange} />
                {errorData.password && <p className="error-message">{`${error.data.password}`}</p>}

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