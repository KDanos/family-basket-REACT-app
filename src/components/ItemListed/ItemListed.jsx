import './ItemListed.css'
import { useState, useEffect } from 'react'
import { updateItemStatus } from '../../services/itemServices'

const ItemListed = ({ item }) => {
    //StateVariables
    const [statusClassNameIndex, setStatusClassNameIndex] = useState('')
    const statusClassNames = ['bought', 'ignored', 'active']
    
    //Static variables
    const status = statusClassNames[statusClassNameIndex]

    //Functions
    useEffect(() => {
        const initialStatusIndex = statusClassNames.indexOf(item.status)
        setStatusClassNameIndex(initialStatusIndex) 
    }, [])


    const handleClick = (e) => {
        console.log(`you have clicked ${item.name}`)
        console.log(`The initial status is ${status}`)
        const currentIndex = statusClassNameIndex
        let newIndex = currentIndex
        if (currentIndex < statusClassNames.length-1) {
            newIndex +=1
        } else
            newIndex = 0
        setStatusClassNameIndex(newIndex)
        console.log(`The status has been changed to ${statusClassNames[newIndex]}`)
        updateItemStatus(item.id,statusClassNames[newIndex] )
    }

    return (
        <p
            className={statusClassNames[statusClassNameIndex]}
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
        >{item.name}</p>
    )
}

export default ItemListed