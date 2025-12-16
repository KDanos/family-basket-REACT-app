import './UserShowPage.css'
import { UserContext} from '../../context/UserContext'
import { useContext } from 'react'

const UserShowPage = () => {
//Context

const {user} = useContext (UserContext)
console.log('============================')
console.log ("User",user)

    return(       
        <>
        </>
        
        



         
    
    
    )

}

export default UserShowPage