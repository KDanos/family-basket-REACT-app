import { updateBasketStatus } from "../services/basketServices"
 

export const handleBasketStatus = async (e,basket,onStatusUpdate) => {
    
    const {status} = basket

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

