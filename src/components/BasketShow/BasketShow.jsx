import { getBasket } from '../../services/basketServices'
import './BasketShow.css'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { handleBasketStatus } from '../../utils/basketUtils'


const BasketShow = () => {
    //State variables
    const [basket, setBasket] = useState(null)

    //Static variables
    const { basketId } = useParams()

    //Functions
    useEffect(() => {
        const retrieveBasket = async () => {
            console.log('======================================')
            try {
                console.log(`the basket id is ${basketId}`)
                const response = await getBasket(basketId)
                setBasket(response.data)
                console.log(response)
            } catch (error) {
                console.error('Basket not currently available')
            }
        }
        retrieveBasket()
    }, [])

    //Guard in case anything tries to load before the basket it fetched
    if (!basket) return null

    const createDate = new Date(basket.created_at).toDateString()
    const owner = basket.owner.username
    const shared = basket.shared_with.map(user => user.username).join(', ')
    const status = basket.status

    let statusIcon = ''
    let statusClass = ''
    if (status.toLowerCase() === 'open') {
        statusIcon = '🎁'
        statusClass = 'status-open'
    } else if (status.toLowerCase() === 'completed') {
        statusIcon = '✓'
        statusClass = 'status-completed'
    } else if (status.toLowerCase() === 'pending') {
        statusIcon = '🕒'
        statusClass = 'status-pending'
    }

    const refreshBasket = async () => {
        const response = await getBasket(basketId)
        setBasket(response.data)
    }

    return (

        <div className="basket-show-container">
            < div className="basket-show-top" >
                <h2>{`${basket.name}`}</h2>
                <div className="card-middle">
                    <div id="card-content">
                        <p>Created:</p>
                        <p>{createDate}</p>
                        <p></p>
                        <p>By: {owner}</p>
                        {(basket.shared_with.length === 0)
                            ?
                            <p style={{ fontStyle: 'italic' }}>'Just you on this list'</p>
                            : (
                                <>
                                    <p>Shared with:</p>
                                    <p style={{ fontStyle: 'italic' }}>{shared}</p>
                                </>
                            )
                        }

                    </div>
                    <div id="card-status" >
                        <button className={`card-status-button ${statusClass}`}
                            onClick={(e) => handleBasketStatus(e, basket, refreshBasket)}
                            type='button'
                        >
                            <span>{statusIcon}</span>
                            <span>{status}</span>
                        </button>
                    </div>
                </div>
                <div className="card-bottom"></div>
            </div >
            <div className="basket-show-items">
            </div>
            

        </div>
    )
}

export default BasketShow