import axios from "axios"
import { getToken } from "../utils/token"


//Creat an axios instance, with the base URL defined in the environment variables
const api = axios.create({
    baseURL:`${import.meta.env.VITE_API_URL}/baskets`
})

//Index all baskets
export const showAllBaskets =()=>{
    return api.get(``,{
    headers: {Authorization: `Bearer ${getToken()}`}
}
)}

//Create a new basket
export const createNewBasket =(formData)=>{
    return api.post('/new/',formData,{
    headers: {Authorization: `Bearer ${getToken()}`}
}
)}

// Update basket status
export const updateBasketStatus = (basketId, newStatus) => {
    return api.put(`${basketId}/`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${getToken()}` }
    })
}

//Delete a basket
export const deleteBasket = (basketId) => {
    return api.delete(`${basketId}/`,
        {headers: {Authorization: `Bearer ${getToken()}`}
    })
}

//Retrieve a basket details
export const getBasket = (basketId) => {
    return api.get (`${basketId}/`,
        {headers: {Authorization: `Bearer ${getToken()}`}}
    )
}