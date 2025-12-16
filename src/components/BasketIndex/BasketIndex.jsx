import './BasketIndex.css'
import { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'



const BasketIndexPage =()=> {
    const {user} = useContext (UserContext)
    console.log ('============The user is ==================')
    console.log(user)
    return (
        <h1>This is the basket index page</h1>
    )
}

export default BasketIndexPage