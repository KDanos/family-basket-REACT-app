import './SignInPage.css'

const SignInPage = () => {
    return (
        <div id="auth-form">
            <h2>Sign in</h2>
            <div id="input-container">
                <label htmlFor="username" id="username" hidden></label>
                <input type="text" id="username" name="username" placeholder= 'Username' />
                <label htmlFor="password" id="password" hidden></label>
                <input type="text" id="password" name ="password" placeholder="password" />
                <button type="submit" className="form-button">Sign-in</button>
            </div>

        </div>
    )
}

export default SignInPage