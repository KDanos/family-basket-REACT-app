import BasketIndexPage from '../BasketIndex/BasketIndex'
import './BasketCard.css'
import { useNavigate } from 'react-router'
import { updateBasketStatus } from '../../services/basketServices'

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

    const handleBasketStatus = async (e) => {
        e.stopPropagation()//Stops us from going to the basketShow page
        e.preventDefault()
        let newStatus
        if (status.toLowerCase() === 'pending') {
            newStatus = 'Open'
        } else if (status.toLowerCase() === 'open') {
            newStatus = 'Completed'
        } else {
            newStatus = 'Pending'
        }

        try {
            await updateBasketStatus(basket.id, newStatus)
            console.log(`Status updated to ${newStatus}`)

            // Trigger parent to refetch data
            if (onStatusUpdate) {
                onStatusUpdate()
            }
        } catch (error) {
            console.error('Error updating status:', error)
        }
    }
    return (

        <div className="basket-card-clickable" onClick={handleCardClick}>
            <h2>{`${basket.name}`}</h2>
            <div className="card-middle">
                <div id="card-content">
                    <p>Created:</p>
                    <p>{createDate}</p>
                    <p></p>
                    <p>{owner}</p>
                    <p>Shared with:</p>
                    <p>{shared}</p>
                </div>
                <div id="card-status" >
                    <button className={`card-status-button ${statusClass}`}
                        onClick={handleBasketStatus}
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