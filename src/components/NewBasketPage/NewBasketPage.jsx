import './NewBasketPage.css'
import './KeepOpenToggle.css'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import { UserContext } from '../../context/UserContext'
import { createNewBasket } from '../../services/basketServices'



const NewBasketPage = () => {

    //Context
    const { user, setUser } = useContext(UserContext)

    //Navigation
    const navigate = useNavigate()

    //State Variables
    const [formData, setFormData] = useState({
        name: "",
        store: ""
    })
    const [keepOpen, setKeepOpen] = useState(false)
    const [errorData, setErrorData] = useState({})


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setErrorData({})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        //Add the status variable 
        
        
        const dataWithStatus = ({
            ...formData,
            status: keepOpen ? 'Open' : 'Pending'
        })
       
        console.log ('the status is ', status)
        setFormData (dataWithStatus)
        const response = await createNewBasket(dataWithStatus)
        navigate(-1)
    }
    return (
        <form id="auth-form" onSubmit={handleSubmit}>
            <h2>New List</h2>
            <div id="input-container">
                <label htmlFor="name" hidden></label>
                <input type="text" id="name" name="name" placeholder='Name the list' required onChange={handleChange} />

                <label htmlFor="store" hidden></label>
                <input type="store" id="store" name="store" placeholder="Want to name a store (optional)?" onChange={handleChange} />
                {errorData.detail && <p className="error-message">{`${errorData.detail}`}</p>}

                <div className="toggle-container">
                    <label htmlFor="keepOpen">Keep Open?</label>
                    <label className="toggle-switch">
                        <input type="checkbox" id="keepOpen" checked={keepOpen} onChange={(e) => setKeepOpen(e.target.checked)} />
                
                        <span className="toggle-slider"></span>
                    </label>
                </div>
                <button type="submit" className="form-button">Add some items to the basket!</button>


            </div>

            <div id="footer">
                <p>Changed you mind?</p>
                <button
                    className="link-button"
                    onClick={() => navigate(-1)}
                >Go back</button>

            </div>

        </form >
    )
}

export default NewBasketPage