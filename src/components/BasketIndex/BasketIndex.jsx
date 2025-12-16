import './BasketIndex.css'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { showAllBaskets } from '../../services/basketServices'
import BasketCard from '../BasketCard/BasketCard'
import { useNavigate } from 'react-router'

const BasketIndexPage = () => {
    //Static variables
    const navigate = useNavigate()

    //Context Variables
    const { user } = useContext(UserContext)

    //State Variables
    const [baskets, setBaskets] = useState([])

    //Functions    
    useEffect(() => {
        const getAllBaskets = async () => {
            try {
                const allBaskets = await showAllBaskets(user.id)
                setBaskets(allBaskets.data)
            } catch (error) {
            }
        }
        getAllBaskets()
    }, [])



    console.log('Number of baskets:', baskets.length)
console.log('All baskets:', baskets)
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
                                    <BasketCard basket={basket} />
                                    {console.log(basket)}
                                </div>
                            ))}
                        </div>
                    



                </div>
            </div>
        </>
    )
}

export default BasketIndexPage