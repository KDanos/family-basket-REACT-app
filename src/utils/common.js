

export const handleDragStart = (e,setIsDragging) => {
    setIsDragging(true)
    startX.current = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX
    currentX.current = startX.current
}

export const handleDragMove = (e, isDragging, setDragX) => {
    if (!isDragging) return
    currentX.current = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX
    const diff = currentX.current - startX.current

    //Only allow dragging to the left
    if (diff < 0) {
        setDragX(Math.max(diff, -150))//limit the drag to -150px
    }
}

export const handleDragEnd = (setIsDragging, setDragX, setShowDelete) => {
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

export const handleCancelDelete = (e, setDragX, setShowDelete) =>{
    e.stopPropagation()
    setDragX(0)
    setShowDelete(false)
}

export const handleSwipeCardClick = (e, showDelete, dragX) => {
    // Prevent the wrapped card from being clicked during/after swipe
    if (showDelete || Math.abs(dragX) > 5) {
        e.stopPropagation()
        e.preventDefault()
    }
}