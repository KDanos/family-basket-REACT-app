import './BasketCardSwipeable.css'

import { useState, useRef } from 'react'
import { deleteBasket } from '../../services/basketServices'
import BasketCard from '../BasketCard/BasketCard'

const BasketCardSwipeable = ({ basket, onStatusUpdate }) => {
    //State variables (for swipe functionality)
    const [dragX, setDragX] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [showDelete, setShowDelete] = useState(false)

    //Persistent storage variables
    const startX = useRef(0)
    const currentX = useRef(0)

    //Functions
    const handleDeleteCard = async (e) => {
        e.stopPropagation()
        e.preventDefault()

        //Two step delete confirmation 
        const confirm = window.confirm('Are you sure you want to delete this basket?')

        if (confirm) {
            try {
                await deleteBasket(basket.id)
                console.log('Basket has been deleted successfully!')

                //Refrese the basket list
                if (onStatusUpdate) { //check if a status update function has been passed as a prop from BasketIndex
                    onStatusUpdate() // execute the StatusUpdate function that has been passed down (i.e. refreshBaskets )
                }
            } catch (error) {
                console.error('Error deleting basket:', error)
                alert('Failed to delete the basket. Please try again later')
            }
        }
    }

    const handleDragStart = (e) => {
        setIsDragging(true)
        startX.current = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX
        currentX.current = startX.current
    }

    const handleDragMove = (e) => {
        if (!isDragging) return
        currentX.current = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX
        const diff = currentX.current - startX.current

        //Only allow dragging to the left
        if (diff < 0) {
            setDragX(Math.max(diff, -150))//limit the drag to -150px
        }
    }

    const handleDragEnd = () => {
        setIsDragging(false)

        //Calculate the dragged distance
        //Use ref hook rather than state hook. State does not update untill re-render
        const diff = currentX.current - startX.current

        //Reset startX for next drag
        startX.current = currentX.current - dragX

        //Snap to locked or closed poisition
        if (diff<-80) {
            setDragX (-150)
            setShowDelete(true)
        } else {
                setDragX(0)
                setShowDelete (true)
        }

        //Show the delete button, after 80px
        if (diff < -80) {
            setDragX(-150)
            setShowDelete(true)
        } else {
            //Snap back
            setDragX(0)
            setShowDelete(false)
        }
    }

    const handleCancelDelete = (e) =>{
        e.stopPropagation()
        setDragX(0)
        setShowDelete(false)
    }

    const handleSwipeCardClick = (e) => {
        // Prevent the wrapped card from being clicked during/after swipe
        if (showDelete || Math.abs(dragX) > 5) {
            e.stopPropagation()
            e.preventDefault()
        }
    }

    return (
        <div className="swipeable-wrapper" onClick={handleSwipeCardClick}>

            <div className="swipeable-delete-bg">
                <button className="swipeable-delete-button"
                    onClick={handleDeleteCard}>🗑️</button>
            </div>

            <div className="swipeable-card-container"
                // Mouse events (for desktop)
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}

                // Touch events (for mobile)
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}

                //Dynamic styles
                style={{
                    transform: `translateX(${dragX}px)`,
                    transition: isDragging ? 'none' : 'transform 0.3s ease',
                    cursor: isDragging ? 'grabbing' : 'pointer'
                }}
            >
                <BasketCard basket={basket} onStatusUpdate={onStatusUpdate} />
            </div>


            {/* <button className="swipeable-cancel-button" onClick={handleCancelDelete}></button> */}
        </div>
    )
}

export default BasketCardSwipeable