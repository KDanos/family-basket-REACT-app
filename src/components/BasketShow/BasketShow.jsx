import './BasketShow.css'
import { getBasket, addItem, editBasket } from '../../services/basketServices'
import { deleteItem } from '../../services/itemServices'
import { getAllUsers } from '../../services/authService'
import { useNavigate, useParams, } from 'react-router'
import { useEffect, useState, } from 'react'
import { handleBasketStatus } from '../../utils/basketUtils'
import ItemListed from '../ItemListed/ItemListed'
import SwipeableElement from '../SwipeableElement/SwipeableElement'

const BasketShow = () => {
    //State variables
    const [basket, setBasket] = useState(null)
    const [itemName, setItemName] = useState('')
    const [showFriendDropDown, setShowFriendDropDown] = useState(false)
    const [searchString, setSearchString] = useState('')
    const [allUsers, setAllUsers] = useState([])
    const [selectedUserIds, setSelectedUserIds] = useState([])

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

    //Basket Variables
    const createDate = new Date(basket.created_at).toDateString()
    const owner = basket.owner.username
    const shared = basket.shared_with.map(user => user.username).join(', ')
    const status = basket.status

    //Basket Status variables
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

    const filteredUsers = allUsers.filter(user => {
        //Filter by search string
        const matchedUsers = user.username.toLowerCase().startsWith(searchString.toLowerCase())
        //Find everybody it is already shared with (retrun array of user ids)
        const currentUsers = basket.shared_with.map(sharedUser => sharedUser.id)
        //Filter out users
        const availableUsers = !currentUsers.includes(user.id)
        const notOwner = user.id !== basket.owner.id

        return matchedUsers && availableUsers && notOwner
    })

    const handleSearchChange = (e) => {
        setSearchString(e.target.value)
    }

    const handleAddFriend = async () => {
        if (!showFriendDropDown) {
            //Add the dropdown menu and retrieve all users
            try {
                const response = await getAllUsers()
                setAllUsers(response.data)
                setSelectedUserIds([])
            } catch (error) {
                console.error('Error fetching all users',error)
            }
        }
        setShowFriendDropDown(!showFriendDropDown)
    }

    const handleUserSelect = (userId) => {
        setSelectedUserIds(
            prevSelected => {
                if(prevSelected.includes(userId)){
                    return prevSelected.filter(id=>id !==userId)
                }else{
                    return [...prevSelected, userId]
                }
            }
        )
    }

    const handleAddUserToBasket = async () => {
        if(selectedUserIds.length ===0){
            alert('You need to select at least one user')
            return
        }
        const currentUserIds = basket.shared_with.map (user => user.id)
        
        const updatedUserIds=[...new Set([...currentUserIds, ...selectedUserIds.map(id => parseInt(id))])]
        try {
            await editBasket(basket.id, { shared_with: updatedUserIds })
            await refreshBasket()
            setShowFriendDropDown(false)
setSearchString('')
setSelectedUserIds([])
        } catch (error) {
            console.error('Couldnt update the list of friend', error)
            alert ('Couldnt update the list of friends. Please try again later')
        }
        setShowFriendDropDown(false)
        setSearchString('')
    }

//Edit a basket



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
                        <button className="add-friend-button" onClick={handleAddFriend}> 👤➕ </button>
                        {showFriendDropDown && (
                            <div className="friend-dropdown">
                                <div className="dropdown-header">
                                    <h3>Add Friend to Basket</h3>
                                </div>

                                <input
                                    type="text"
                                    className="user-search-input"
                                    placeholder='Search by username...'
                                    value={searchString}
                                    onChange={handleSearchChange}
                                />
                            
                            <div className="user-list">
                                {filteredUsers.length === 0? (
                                    <p className="no-users-message">No users found</p>
                                ):(
                                filteredUsers.map((user)=> (
                                    <label key={user.id} className = "user-option">
                                        <input 
                                        type="checkbox"
                                        value={user.id}
                                        checked = {selectedUserIds.includes(user.id)}
                                        onChange = {() => handleUserSelect(user.id)}
                                        />
                                        <span>{user.username}</span>
                                    </label>
                                ))
                                )}
                            </div>
                            
                            <div className="dropdown-actions">
                                <button className="cancel-button"
                                onClick={()=>{
                                    setShowFriendDropDown(false)
                                    setSearchString('')
                                    setSelectedUserIds (null)
                                }}>Cancel</button>
                            <button className="add-button" onClick={handleAddUserToBasket}>Add</button>
                            </div>
                            
                            </div>
                        )}

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
                        value={itemName}
                        placeholder="Add an item to the list" />
                    <button type="submit" className="add-button">+</button>
                </form>
                <div className="list-container">
                    {basket.basket_items.map((item) => (
                        <SwipeableElement
                            key={item.id}
                            onDelete={() => handleDeleteItem(item.id)}
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