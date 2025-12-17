import { useNavigate } from 'react-router'
import './NavbarWHamburger.css'
import { useState , useContext} from 'react'
import { UserContext } from '../src/context/UserContext'

const NavbarWHamburger = () => {
     const{user} = useContext(UserContext)
    
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
export default NavbarWHamburger