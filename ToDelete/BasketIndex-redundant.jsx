import './BasketIndex.css'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../src/context/UserContext'
import { showAllBaskets } from '../src/services/basketServices'
import BasketCard from '../src/components/BasketCard/BasketCard'
import BasketCardSwipeable from './BasketCardSwipeable/BasketCardSwipeable'
import { useNavigate } from 'react-router'

const BasketIndex = () => {
    //Static variables
    const navigate = useNavigate()

    //Context Variables
    const { user } = useContext(UserContext)

    //State Variables
    const [baskets, setBaskets] = useState([])

    //Functions    
    const refreshBaskets = async () => {
        try {
            const allBaskets = await showAllBaskets(user.id)
            //Sort baskets in descending pk order
            const sortedBaskets = allBaskets.data.sort((a, b) => b.id - a.id)
            setBaskets(allBaskets.data)
        } catch (error) {
            console.error('Error refreshing baskets:', error)
        }
    }

    useEffect(() => {
        refreshBaskets()
    }, [])

    return (
        <>
            <div className="basket-page-wrapper">
                <div className="user-page-container">
                    <button className="form-button" onClick={() => navigate('new/')}>
                        Make new list
                    </button>
                    <div className="basket-container">
                        {baskets.map((basket) => (
                            <div className="basket-card-container" key={basket.id}>
                                {/* <BasketCard  */}
                                <BasketCardSwipeable
                                basket={basket}
                                onStatusUpdate={refreshBaskets} />

                            </div>
                        ))}
                    </div>




                </div>
            </div>
        </>
    )
}

export default BasketIndex