import axios from 'axios'
import { getToken } from '../utils/token'

//Creat an axios instance, with the base URL defined in the environment variables
const api = axios.create ({
    baseURL: `${import.meta.env.VITE_API_URL}/auth/`
})

//Test Function
export const testConnection = () =>{
    console.log('BaseURL: ', api.defaults.baseURL)
    console.log('Environment variable:', import.meta.env.VITE_API_URL)

}

//Sign-up 
export const signUp = (formData) =>{
    return api.post ('sign-up/', formData)
}

//Sign-in
export const signIn = (formData) =>{
    return api.post ('sign-in/', formData)
}

//Delete account
export const deleteAccount = (userId) =>{
    return api.delete(`${userId}/`,
        {headers: {Authorization: `Bearer ${getToken()}`}
        })
}


