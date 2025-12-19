import './BasketIndex.css'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { showAllBaskets , deleteBasket } from '../../services/basketServices'
import BasketCard from '../BasketCard/BasketCard'
import SwipeableElement from '../SwipeableElement/SwipeableElement'
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

    //Functions
    const handleDeleteCard = async (basketId) => {
        //Two step delete confirmation 
        const confirm = window.confirm('Are you sure you want to delete this basket?')

        if (confirm) {
            try {
                await deleteBasket(basketId)
                console.log('Basket has been deleted successfully!')
                await refreshBaskets()
            } catch (error) {
                console.error('Error deleting basket:', error)
                alert('Failed to delete the basket. Are you sure you have permission to do so?')
            }
        }
    }

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
                                <SwipeableElement
                                    onDelete={()=>handleDeleteCard(basket.id)}
                                    maxDrag={150}
                                    >
                                    <BasketCard
                                        basket={basket}
                                        onStatusUpdate={refreshBaskets} />
                                </SwipeableElement>
                            </div>
                        ))}
                    </div>




                </div>
            </div>
        </>
    )
}

export default BasketIndex