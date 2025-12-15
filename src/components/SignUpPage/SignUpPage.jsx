import './SignUpPage.css'
import {useState} from 'react'

const SignUpPage = () => {
    //StateVariable
    const [formData, setFormData] = useState({
        username: '',
        email:'',
        password:'',
        confirmPassword:''
    })
    //Functions
    const handleSubmit = (e) =>{ 
        e.preventDefault()
        
        console.log('you have pressed the submit button')
    }
    
    const handleChange = () => {

    }
    return (
        <>

            <form id="auth-form" onSubmit={handleSubmit}>
                <h2>Create an account</h2>
                <div id="input-container">
                    <label htmlFor="username" hidden>Username</label>
                    <input type="text" id="username" placeholder="username" required onChange={handleChange} value ="paul" />
                    <label htmlFor="email" hidden>Username</label>
                    <input type="text" id="email" placeholder="email@domain.com" required onChange={handleChange} value="paul@domain.com" />
                    <label htmlFor="password" hidden>Username</label>
                    <input type="password" id="password" placeholder="Password" required onChange={handleChange} value="123" />
                    <label htmlFor="confirmPassword" hidden>Username</label>
                    <input type="password" id="confirmPassword" placeholder="Confirm Password" required onChange={handleChange} value = "123"/>
            
                    <button type="submit" className="form-button"> Create an account</button>
                </div>
            

            </form>
        </>
    )
}

export default SignUpPage