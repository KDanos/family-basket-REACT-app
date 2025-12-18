
import './BasketCard.css'
import { useNavigate } from 'react-router'

import { handleBasketStatus } from '../../utils/basketUtils'

const BasketCard = ({ basket,onStatusUpdate }) => {
    
    //Navigation
    const navigate = useNavigate()

    //Static variables
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

    //Functions
    const handleCardClick = (e) => {
        navigate(`/baskets/${basket.id}`)
    }
    
    return (

        <div className="basket-card-clickable" onClick={handleCardClick}>
            <h2>{`${basket.name}`}</h2>
            <div className="card-middle">
                <div id="card-content">
                    <p>Created:</p>
                    <p>{createDate}</p>
                    <p></p>
                    <p>By: {owner}</p>
                    {(basket.shared_with.length===0)
                     ? 
                     <p style={{fontStyle:'italic'}}>'Just you on this list'</p>
                    :(
                    <>
                    <p>Shared with:</p>
                    <p style={{fontStyle:'italic'}}>{shared}</p>     
                    </>
                    )
                }
   
                </div>
                <div id="card-status" >
                    <button className={`card-status-button ${statusClass}`}
                        onClick={(e)=>handleBasketStatus(e,basket,onStatusUpdate)}
                        type='button'
                    >
                        <span>{statusIcon}</span>
                        <span>{status}</span>
                    </button>
                </div>
            </div>
            <div className="card-bottom"></div>
        </div>
    )
}

export default BasketCard