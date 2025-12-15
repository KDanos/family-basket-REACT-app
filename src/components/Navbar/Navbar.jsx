import { useNavigate } from 'react-router'
import './Navbar.css'
import { useState } from 'react'

const NavBar = () => {
    const navigate = useNavigate()
    
    //State variables
    const [isOpen, setIsOpen] = useState (false) 

    const handleShowMenu = (e) =>{
        setIsOpen (!isOpen)
        navigate('/mary')
        setIsOpen (!isOpen)

    }

    return (
            <div id='NavBar-container'>
                <span className="Navbar-symbol">👤</span>
                <span className="Navbar-symbol">
                    <button className={`hamburger ${isOpen? 'open':""}`} onClick={handleShowMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </span>
            </div>
    )
}
export default NavBar