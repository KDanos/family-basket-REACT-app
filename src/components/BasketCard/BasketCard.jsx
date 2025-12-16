import BasketIndexPage from '../BasketIndex/BasketIndex'
import './BasketCard.css'

const BasketCard = ({ basket }) => {
    const createDate = new Date(basket.created_at).toDateString()
    const owner = basket.owner.username
    const shared = basket.shared_with.map(user => user.username).join(', ')
    const status = basket.status
    let statusIcon = ''
    let statusClass = ''

    if (status.toLowerCase()=== 'open'){
        statusIcon = '🎁'
        statusClass = 'open'
    } else if (status.toLowerCase()==='completed'){
        statusIcon = '✓'
        statusClass = 'status-completed'
    } else if (status.toLowerCase()==='pending'){
        statusIcon = '🕒'
        statusClass = 'status-pending'
    }


    return (
        <>
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
                <div id="card-status">
                    <button className={`card-status-button ${statusClass}`}>
                        <span>{statusIcon}</span>
                        {status}
                    </button>
                </div>
            </div>
            <div className="card-bottom"></div>
        </>
    )
}

export default BasketCard