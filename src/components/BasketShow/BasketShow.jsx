import { getBasket, addItem } from '../../services/basketServices'
import './BasketShow.css'
import { useNavigate, useParams,} from 'react-router'
import { useEffect, useState, } from 'react'
import { handleBasketStatus } from '../../utils/basketUtils'
import ItemListed from '../ItemListed/ItemListed'
import SwipeableElement from '../SwipeableElement/SwipeableElement'
import { deleteItem } from '../../services/itemServices'


const BasketShow = () => {
    //State variables
    const [basket, setBasket] = useState(null)
    const [itemName, setItemName] = useState('')

    //Static variables
    const { basketId } = useParams()

    //Navigation
    const navigate = useNavigate()
    //Functions
    useEffect(() => {
        const retrieveBasket = async () => {
            try {
                const response = await getBasket(basketId)
                setBasket(response.data)
            } catch (error) {
                console.error('Basket not currently available')
            }
        }
        retrieveBasket()
    }, [])

    //Guard in case anything tries to load before the basket it fetched
    if (!basket) return null

    //Variables
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

    const handleChange = (e) => {
        setItemName(e.target.value)
    }

    const handleCreateItem = async (e) => {
        e.preventDefault()

        try {
            await addItem(basketId, { name: itemName })
            setItemName('')
            await refreshBasket()
            setItemName('')
        }
        catch (error) {
            console.error('Item failed to create', error)
        }
    }

    const handleDeleteItem = async (itemId) => {
        //Two step delete confirmation 
        const confirm = window.confirm('Are you sure you want to delete this item?')

        if (confirm) {
            try {
                await deleteItem(itemId)
                console.log('Item has been deleted successfully!')
                await refreshBasket()
            } catch (error) {
                console.error('Error deleting item:', error)
                alert('Failed to delete the item. Are you sure you have permission to do so?')
            }
        }
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
                    <div id="card-buttons" >
                        <button className={`card-status-button ${statusClass}`}
                            onClick={(e) => handleBasketStatus(e, basket, refreshBasket)}
                            type='button'
                        >
                            <span>{statusIcon}</span>
                            <span>{status}</span>
                        </button>
                        <button className="add-friend-button"> 👤➕ </button>
                    </div>
                </div>
                <div className="card-bottom">
                    
                </div>
            </div >

            <div className="basket-show-items">
                <form className="item-submit-form" onSubmit={handleCreateItem}>
                    <label htmlFor="item-input"></label>
                    <input type="text"
                        className="item-input-box"
                        name="item-input"
                        onChange={handleChange}
                        onSubmit={handleCreateItem}
                        value = {itemName}
                        placeholder="Add an item to the list" />
                    <button type="submit" className="add-button">+</button>
                </form>
                <div className="list-container">
                    {basket.basket_items.map((item) => (
                   <SwipeableElement
                   key = {item.id}
                   onDelete ={()=>handleDeleteItem(item.id)}
                   maxDrag={40}>
                   <ItemListed
                        
                        item={item}
                        />
                   </SwipeableElement>   
                   ))}
                </div>
            </div>


        </div >
    )
}

export default BasketShow