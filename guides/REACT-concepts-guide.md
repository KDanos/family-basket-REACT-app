# React Concepts Guide - From Lesson Notes

This comprehensive guide covers all the React concepts and patterns used throughout the lesson notes, including state management, routing, API calls, authentication, and more.

---

## Table of Contents

1. [React Hooks - useState](#1-react-hooks---usestate)
2. [React Hooks - useEffect](#2-react-hooks---useeffect)
3. [Fetching Data from APIs](#3-fetching-data-from-apis)
4. [React Router - Basic Routing](#4-react-router---basic-routing)
5. [React Router - Navigation and Parameters](#5-react-router---navigation-and-parameters)
6. [React Context API](#6-react-context-api)
7. [Form Handling](#7-form-handling)
8. [Authentication with Tokens](#8-authentication-with-tokens)
9. [Protected Routes](#9-protected-routes)
10. [CRUD Operations](#10-crud-operations)
11. [Environment Variables](#11-environment-variables)
12. [Service Layer Pattern](#12-service-layer-pattern)

---

## 1. React Hooks - useState

`useState` is a React Hook that lets you add state to functional components.

### Basic Usage

```jsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}
```

**Explanation:**  
- `useState(0)` – Initializes state with value `0`.  
- Returns an array: `[currentValue, setterFunction]`.  
- Use array destructuring to get both values.  
- `setCount` – Function to update the state.

### Managing Object State

```jsx
import { useState } from 'react'

function Form() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })

  const handleChange = (e) => {
    const input = e.target
    setFormData({ ...formData, [input.name]: input.value })
  }

  return (
    <form>
      <input 
        name="username" 
        value={formData.username} 
        onChange={handleChange} 
      />
      <input 
        name="password" 
        type="password"
        value={formData.password} 
        onChange={handleChange} 
      />
    </form>
  )
}
```

**Explanation:**  
- Use spread operator `...formData` to preserve other fields.  
- `[input.name]` – Computed property name to update the correct field.

### Managing Array State

```jsx
import { useState } from 'react'

function TeamBuilder() {
  const [team, setTeam] = useState([])

  const addMember = (member) => {
    setTeam([...team, member])
  }

  const removeMember = (id) => {
    setTeam(team.filter(member => member.id !== id))
  }

  return (
    <div>
      {team.map(member => (
        <div key={member.id}>
          {member.name}
          <button onClick={() => removeMember(member.id)}>Remove</button>
        </div>
      ))}
    </div>
  )
}
```

**Explanation:**  
- Use spread operator to add items: `[...team, member]`.  
- Use `filter()` to remove items.  
- Always use `key` prop when rendering lists.

[React useState Documentation](https://react.dev/reference/react/useState)

---

## 2. React Hooks - useEffect

`useEffect` lets you perform side effects in functional components (like data fetching, subscriptions, or manually changing the DOM).

### Basic Usage - Run Once on Mount

```jsx
import { useState, useEffect } from 'react'

function WeatherApp() {
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCurrentWeather('London')
        setWeatherData(response.data)
      } catch (error) {
        console.error('Error:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      {weatherData ? <p>{weatherData.temp}°C</p> : <p>Loading...</p>}
    </div>
  )
}
```

**Explanation:**  
- Empty dependency array `[]` means the effect runs only once when component mounts.  
- Use async functions inside `useEffect` to fetch data.

### Run When Dependencies Change

```jsx
import { useState, useEffect } from 'react'

function UserProfile({ userId }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUser(userId)
      setUser(response.data)
    }
    fetchUser()
  }, [userId]) // Runs when userId changes

  return user ? <div>{user.name}</div> : <div>Loading...</div>
}
```

**Explanation:**  
- Include `userId` in dependency array to re-run when it changes.  
- Always include all values from component scope that change over time.

### Cleanup Function

```jsx
import { useState, useEffect } from 'react'

function Timer() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1)
    }, 1000)

    // Cleanup function
    return () => clearInterval(interval)
  }, [])

  return <div>Timer: {seconds}s</div>
}
```

**Explanation:**  
- Return a cleanup function to clear intervals, cancel requests, or remove event listeners.  
- Prevents memory leaks.

[React useEffect Documentation](https://react.dev/reference/react/useEffect)

---

## 3. Fetching Data from APIs

### Using Axios

First, install Axios:

```bash
npm install axios
```

### Basic API Call

```jsx
import { useState, useEffect } from 'react'
import axios from 'axios'

function DataFetcher() {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get('https://api.example.com/data')
        setData(response.data)
      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  return <div>{JSON.stringify(data)}</div>
}
```

**Explanation:**  
- `axios.get()` – Makes a GET request.  
- `response.data` – Contains the response body.  
- Use try/catch for error handling.  
- `finally` block runs regardless of success or failure.

### Using Fetch (Alternative)

```jsx
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('https://api.example.com/data')
      if (!response.ok) throw new Error('Failed to fetch')
      const data = await response.json()
      setData(data)
    } catch (error) {
      setError(error.message)
    }
  }
  fetchData()
}, [])
```

**Explanation:**  
- `fetch()` – Native browser API.  
- `response.json()` – Parses JSON response.  
- Check `response.ok` for HTTP errors.

---

## 4. React Router - Basic Routing

React Router enables client-side routing in React applications.

### Installation

```bash
npm install react-router
```

### Setup in main.jsx

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

**Explanation:**  
- `BrowserRouter` – Enables routing functionality.  
- Wrap your App component with it.

### Define Routes

```jsx
import { Routes, Route } from 'react-router'
import Home from './components/Home/Home'
import About from './components/About/About'
import Contact from './components/Contact/Contact'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  )
}
```

**Explanation:**  
- `Routes` – Container for all routes.  
- `Route` – Defines a single route.  
- `path` – URL path to match.  
- `element` – Component to render.

[React Router Documentation](https://reactrouter.com/)

---

## 5. React Router - Navigation and Parameters

### Navigation with useNavigate

```jsx
import { useNavigate } from 'react-router'

function SignIn() {
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    // ... authentication logic
    navigate('/') // Navigate to home page
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  )
}
```

**Explanation:**  
- `useNavigate()` – Returns a navigate function.  
- `navigate('/path')` – Navigates to the specified path.  
- `navigate(-1)` – Go back one page.  
- `navigate(1)` – Go forward one page.

### URL Parameters with useParams

```jsx
import { useParams } from 'react-router'

function HootDetails() {
  const { hootId } = useParams()

  return <div>Viewing hoot: {hootId}</div>
}
```

**Route Definition:**

```jsx
<Route path="/hoots/:hootId" element={<HootDetails />} />
```

**Explanation:**  
- `:hootId` – URL parameter (colon prefix).  
- `useParams()` – Returns an object with all URL parameters.  
- Access specific param: `params.hootId`.

### Protected Routes with Navigate

```jsx
import { Navigate } from 'react-router'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

function ProtectedPage() {
  const { user } = useContext(UserContext)

  if (!user) {
    return <Navigate to="/sign-in" />
  }

  return <div>Protected Content</div>
}
```

**Explanation:**  
- `Navigate` component redirects to another route.  
- Use conditional rendering to protect routes.

### Link Component for Navigation

```jsx
import { Link } from 'react-router'

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  )
}
```

**Explanation:**  
- `Link` – Creates navigation links without page reload.  
- `to` prop specifies the destination path.

---

## 6. React Context API

Context provides a way to pass data through the component tree without prop drilling.

### Create Context

```jsx
import { createContext, useState } from 'react'

const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const signOut = () => {
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, setUser, signOut }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }
```

**Explanation:**  
- `createContext()` – Creates a new context.  
- `Provider` – Makes context value available to children.  
- `value` prop contains the data/functions to share.

### Setup in main.jsx

```jsx
import { UserProvider } from './contexts/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
```

### Use Context in Components

```jsx
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

function Home() {
  const { user, setUser } = useContext(UserContext)

  return (
    <div>
      {user ? (
        <h1>Welcome back, {user.username}!</h1>
      ) : (
        <h1>Welcome, guest!</h1>
      )}
    </div>
  )
}
```

**Explanation:**  
- `useContext(UserContext)` – Accesses the context value.  
- Destructure to get specific values/functions.  
- Any component inside the Provider can access the context.

[React Context Documentation](https://react.dev/reference/react/createContext)

---

## 7. Form Handling

### Controlled Components

```jsx
import { useState } from 'react'

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  })
  const [errorData, setErrorData] = useState({})

  const handleChange = (e) => {
    const input = e.target
    setFormData({ ...formData, [input.name]: input.value })
    // Clear error for this field when user types
    setErrorData({ ...errorData, [input.name]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await signUpService(formData)
      // Handle success
    } catch (error) {
      if (error.response?.status === 500) {
        setErrorData({ message: 'Something went wrong. Please try again.' })
      } else {
        setErrorData(error.response?.data || { message: 'An error occurred' })
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      {errorData.username && <p className="error">{errorData.username}</p>}

      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
      />
      {errorData.email && <p className="error">{errorData.email}</p>}

      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
      />
      {errorData.password && <p className="error">{errorData.password}</p>}

      {errorData.message && <p className="error">{errorData.message}</p>}

      <button type="submit">Sign Up</button>
    </form>
  )
}
```

**Explanation:**  
- Controlled components: form values are controlled by React state.  
- `handleChange` updates state on every keystroke.  
- `handleSubmit` prevents default form submission.  
- Display validation errors from API response.

---

## 8. Authentication with Tokens

### Token Utilities

Create `src/utils/token.js`:

```jsx
const tokenName = 'authToken'

export const getToken = () => {
  return localStorage.getItem(tokenName)
}

export const setToken = (token) => {
  localStorage.setItem(tokenName, token)
}

export const removeToken = () => {
  localStorage.removeItem(tokenName)
}

export const getUserFromToken = () => {
  const token = getToken()
  if (!token) return null

  // Decode JWT token (middle part is the payload)
  const payloadString = token.split('.')[1]
  const payloadJSON = atob(payloadString)
  const { user, exp } = JSON.parse(payloadJSON)

  // Check if token is expired
  if (exp < Date.now() / 1000) {
    removeToken()
    return null
  }

  return user
}
```

**Explanation:**  
- `localStorage` – Browser storage that persists across sessions.  
- JWT tokens have 3 parts separated by dots.  
- Middle part (payload) contains user data and expiration.  
- `atob()` – Decodes base64 string.  
- Check expiration before returning user.

### Sign In Component

```jsx
import { useState, useContext } from 'react'
import { signInService } from '../../services/auth'
import { getUserFromToken, setToken } from '../../utils/token'
import { useNavigate } from 'react-router'
import { UserContext } from '../../contexts/UserContext'

function SignIn() {
  const { setUser } = useContext(UserContext)
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await signInService(formData)
      const token = response.data.token

      if (token) {
        setToken(token) // Save to localStorage
        setUser(getUserFromToken()) // Update context
        navigate('/') // Redirect to home
      }
    } catch (error) {
      console.error('Sign in error:', error)
      // Handle error
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  )
}
```

**Explanation:**  
- Save token to localStorage after successful login.  
- Decode token to get user info and update context.  
- Navigate to home page after authentication.

### Sign Out

```jsx
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { useNavigate } from 'react-router'

function Navbar() {
  const { user, signOut } = useContext(UserContext)
  const navigate = useNavigate()

  const handleSignOut = () => {
    signOut() // Removes token and clears user state
    navigate('/sign-in')
  }

  return (
    <nav>
      {user ? (
        <>
          <span>Welcome, {user.username}</span>
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      ) : (
        <Link to="/sign-in">Sign In</Link>
      )}
    </nav>
  )
}
```

---

## 9. Protected Routes

### Using Navigate Component

```jsx
import { Navigate } from 'react-router'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

function HootCreate() {
  const { user } = useContext(UserContext)

  if (!user) {
    return <Navigate to="/sign-in" />
  }

  return (
    <form>
      {/* Create form */}
    </form>
  )
}
```

### Using ProtectedRoute Component (Reusable)

Create `src/components/ProtectedRoute/ProtectedRoute.jsx`:

```jsx
import { Navigate } from 'react-router'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

function ProtectedRoute({ children }) {
  const { user } = useContext(UserContext)

  if (!user) {
    return <Navigate to="/sign-in" />
  }

  return children
}

export default ProtectedRoute
```

**Usage:**

```jsx
<Route 
  path="/hoots/new" 
  element={
    <ProtectedRoute>
      <HootCreate />
    </ProtectedRoute>
  } 
/>
```

---

## 10. CRUD Operations

### Service Layer Pattern

Create `src/services/hoots.js`:

```jsx
import axios from 'axios'
import { getToken } from '../utils/token'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/hoots`
})

// Create
export const hootCreate = (formData) => {
  return api.post('', formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
}

// Read All
export const hootIndex = () => {
  return api.get('')
}

// Read One
export const hootShow = (hootId) => {
  return api.get(`/${hootId}`)
}

// Update
export const hootUpdate = (hootId, formData) => {
  return api.put(`/${hootId}`, formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
}

// Delete
export const hootDelete = (hootId) => {
  return api.delete(`/${hootId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
}
```

**Explanation:**  
- `axios.create()` – Creates a configured axios instance.  
- `baseURL` – Common base URL for all requests.  
- Include token in Authorization header for protected endpoints.

### Create Component

```jsx
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { hootCreate } from '../../services/hoots'

function HootCreate() {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    category: "News"
  })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await hootCreate(formData)
      navigate('/hoots') // Redirect to list
    } catch (error) {
      console.error('Error creating hoot:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  )
}
```

### Read Component (List)

```jsx
import { useState, useEffect } from 'react'
import { hootIndex } from '../../services/hoots'
import { Link } from 'react-router'

function HootIndex() {
  const [hoots, setHoots] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await hootIndex()
        setHoots(data)
      } catch (error) {
        console.error('Error fetching hoots:', error)
      } finally {
        setIsLoading(false)
      }
    }
    getData()
  }, [])

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      {hoots.map(hoot => (
        <div key={hoot._id}>
          <Link to={`/hoots/${hoot._id}`}>
            <h2>{hoot.title}</h2>
          </Link>
        </div>
      ))}
    </div>
  )
}
```

### Read Component (Details)

```jsx
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { hootShow } from '../../services/hoots'

function HootDetails() {
  const [hoot, setHoot] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { hootId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await hootShow(hootId)
        setHoot(data)
      } catch (error) {
        if (error.response?.status === 404) {
          navigate('/page-not-found')
        }
      } finally {
        setIsLoading(false)
      }
    }
    getData()
  }, [hootId, navigate])

  if (isLoading) return <div>Loading...</div>
  if (!hoot) return <div>Hoot not found</div>

  return (
    <div>
      <h1>{hoot.title}</h1>
      <p>{hoot.text}</p>
    </div>
  )
}
```

### Update Component

```jsx
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { hootShow, hootUpdate } from '../../services/hoots'

function HootUpdate() {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    category: "News"
  })
  const { hootId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      const { data } = await hootShow(hootId)
      setFormData(data)
    }
    getData()
  }, [hootId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await hootUpdate(hootId, formData)
      navigate(`/hoots/${hootId}`)
    } catch (error) {
      console.error('Error updating hoot:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  )
}
```

### Delete Component

```jsx
import { useNavigate } from 'react-router'
import { hootDelete } from '../../services/hoots'

function DeleteHoot({ hootId }) {
  const navigate = useNavigate()

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this hoot?')) {
      try {
        await hootDelete(hootId)
        navigate('/hoots')
      } catch (error) {
        console.error('Error deleting hoot:', error)
      }
    }
  }

  return (
    <button onClick={handleDelete}>Delete</button>
  )
}
```

---

## 11. Environment Variables

Vite uses environment variables prefixed with `VITE_`.

### Create .env File

Create `.env` in the project root:

```
VITE_API_URL=http://localhost:3000/api
VITE_API_KEY=your-api-key-here
```

### Access in Code

```jsx
// In service files
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/hoots`
})

// In components
const apiKey = import.meta.env.VITE_API_KEY
```

**Explanation:**  
- `import.meta.env` – Vite's way to access environment variables.  
- Only variables prefixed with `VITE_` are exposed to client code.  
- Add `.env` to `.gitignore` to keep secrets safe.

### .gitignore Entry

```
.env
.env.local
.env.production
```

---

## 12. Service Layer Pattern

Organize API calls in a service layer for better code organization.

### Structure

```
src/
├── services/
│   ├── auth.js          # Authentication endpoints
│   ├── hoots.js          # Hoot CRUD operations
│   └── weatherService.js # Weather API calls
```

### Example: Auth Service

```jsx
import axios from 'axios'
import { getToken } from '../utils/token'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/auth`
})

export const signInService = (formData) => {
  return api.post('/sign-in', formData)
}

export const signUpService = (formData) => {
  return api.post('/sign-up', formData)
}
```

### Example: Weather Service

```jsx
import axios from 'axios'

const baseUrl = `http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}`

export const getCurrentWeather = (city) => {
  const url = baseUrl + `&q=${city}`
  return axios.get(url)
}
```

**Benefits:**  
- Centralized API configuration.  
- Reusable functions.  
- Easier to test and maintain.  
- Consistent error handling.

---

## Best Practices Summary

1. **State Management:** Use `useState` for local state, Context for global state.
2. **Data Fetching:** Always use `useEffect` with proper dependencies.
3. **Error Handling:** Always wrap API calls in try/catch blocks.
4. **Loading States:** Show loading indicators while fetching data.
5. **Form Validation:** Display errors from API responses.
6. **Protected Routes:** Check authentication before rendering protected content.
7. **Service Layer:** Keep API calls organized in service files.
8. **Environment Variables:** Use `.env` files for configuration.
9. **Token Management:** Store tokens securely and check expiration.
10. **Component Organization:** Keep components focused and reusable.

---

✅ You now have a comprehensive understanding of React concepts used throughout the lesson notes!

**Useful Resources:**
- [React Documentation](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Axios Documentation](https://axios-http.com/)
- [Vite Documentation](https://vite.dev/)

