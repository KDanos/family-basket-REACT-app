const TOKEN_KEY = 'userToken'

//Save token to local storage
export const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token)
}

//Retrieve token from local storage
export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY)
}

//Sign-out, remove token from local storage
export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY)
}

//Get the userdata from the token
export const getUserFromToken = () => {
    // 1. Get the token from local Storage
    const token = getToken()
    // 2. Error Catcher: If there is not token, return null
    if (!token) { return null }
    // 3. Get the middle payload of the token
    const userInfo = token.split('.')[1]
    // 4. Decode from BigInt64Array, using atob(method). This will return a json String
    const userString = atob(userInfo)
    // 5. User JSON.parse() to convert the string to a json onbject
    const {user, exp} = JSON.parse(userString)
    // 6. Check that the expiry date is still Valid
    if (exp<Date.now()/1000){
        removeToken()
        return null
    }
    // 7. Return the user
    return user
}