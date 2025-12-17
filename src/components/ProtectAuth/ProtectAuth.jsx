import './ProtectAuth.css'
import { useContext } from 'react'
import { Navigate } from 'react-router'
import { UserContext } from '../../context/UserContext'

const ProtectAuth = ({ children }) => {
    const { user } = useContext(UserContext)
    if (user) {
        return <Navigate to='/baskets' replace></Navigate>
    }
    return children
}

export default ProtectAuth