import axios from "axios"
import { getToken } from "../utils/token"


//Creat an axios instance, with the base URL defined in the environment variables
const api = axios.create({
    baseURL:`${import.meta.env.VITE_API_URL}/items`
})



