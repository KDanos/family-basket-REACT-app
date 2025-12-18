import axios from "axios"
import { getToken } from "../utils/token"


//Creat an axios instance, with the base URL defined in the environment variables
const api = axios.create({
    baseURL:`${import.meta.env.VITE_API_URL}/items`
})

// Update Item status
export const updateItemStatus = (itemId, newStatus) => {
    return api.put(`${itemId}/`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${getToken()}` }
    })
}

//Delete a basket
export const deleteItem = (itemId) => {
    return api.delete(`${itemId}/`,
        {headers: {Authorization: `Bearer ${getToken()}`}
    })
}


