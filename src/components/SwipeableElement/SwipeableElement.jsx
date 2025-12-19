import { useState, useRef } from 'react'
import './SwipeableElement.css'

const SwipeableElement = ({ children, onDelete, onEdit, maxDrag }) => {
    //Imported variables
    // const maxDrag = 150

    //State Variables
    const [dragX, setDragX] = useState(0)
    const [isDragging, setIsDragging] = useState(false)

    //Persistent across renders variables
    const startX = useRef(0)
    const currentX = useRef(0)
    const clicksDisabled = useRef(false)

    //Functions
    const handleDragStart = (e) => {
        clicksDisabled.current = true
        setIsDragging(true)
        startX.current = e.type.includes('mouse')
            ? e.clientX
            : (e.touches && e.touches[0]) ? e.touches[0].clientX : 0
        currentX.current = startX.current
    }

    const handleDragMove = (e) => {
        if (!isDragging) return
        currentX.current = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX
        const diff = currentX.current - startX.current
        //Only allow dragging to the left
        if (diff < 0) {
            setDragX(Math.max(diff, -maxDrag))//limit the drag to maxDrag
        }
    }

    const handleDragEnd = () => {
        setIsDragging(false)
        const diff = currentX.current - startX.current

        //Reset
        startX.current = currentX.current - dragX

        //Snap to open or closed position
        if (diff < (-maxDrag / 2))
            setDragX(-maxDrag)
        else setDragX(0)
        setTimeout(() => { clicksDisabled.current = false }, 100)
    }

    const handleClick = (e) => {
        if (clicksDisabled.current) {
            e.stopPropagation()
        }
    }
    
    const handleDelete = (e) => {
        e.stopPropagation()
        e.preventDefault()
        console.log('Delete button clicked')
        if (onDelete) {
            onDelete()
        }
    }
    const handleEdit = (e) => {
        e.stopPropagation()
        e.preventDefault()
        console.log('Edit button clicked')
    }
    return (

        <div className="swipeable-wrapper"
            //Dynamic styles
            style={{
                '--max-drag': `${maxDrag}px`  // Set CSS variable
            }}
        >
            <div className="sliding-wrapper">

                <div className="swipeable-buttons-container">
                    {onDelete && (
                        <button className="swip-del-btn"
                            onClick={handleDelete}
                        >🗑️</button>
                    )}
                    {onEdit && (
                        <button className="swop-edit-btn"
                            onClick={handleEdit}
                        >✏️</button>
                    )}

                </div>
                <div className="sliding-wrapper"

                    // Mouse events
                    onMouseDown={handleDragStart}
                    onMouseMove={handleDragMove}
                    onMouseUp={handleDragEnd}
                    onMouseLeave={handleDragEnd}
                    onClick={handleClick}

                    //Touch events
                    onTouchStart={handleDragStart}
                    onTouchMove={handleDragMove}
                    onTouchEnd={handleDragEnd}
                    style={{
                        transform: `translateX(${dragX}px)`,
                        transition: isDragging ? 'none' : 'transform 0.3s ease',
                        cursor: isDragging ? 'grabbing' : 'pointer'
                    }}
                >
                    {children}
                </div>
            </div>

        </div>
    )
}

export default SwipeableElement