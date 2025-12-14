# React + Vite Getting Started Guide

This guide will walk you through setting up a React project using Vite, installing dependencies, and creating your first React application.

---

## 1. Prerequisites

Before starting, make sure you have Node.js and npm installed on your system:

```bash
node --version
npm --version
```

If not installed, download Node.js from [nodejs.org](https://nodejs.org/). This will install both Node.js and npm.

---

## 2. Create a Project Folder and Open in VSCode

Create a folder for your project and open it in VSCode:

```bash
mkdir ~/code/ga/labs/my_react_app
cd ~/code/ga/labs/my_react_app
code .
```

---

## 3. Create a New React Project with Vite

Vite is a fast build tool that provides a better development experience than Create React App. Create your React project:

```bash
npm create vite@latest . -- --template react
```

**Explanation:**  
- `npm create vite@latest` – Creates a new Vite project.  
- `.` – Creates the project in the current directory.  
- `--template react` – Uses the React template.  

**Alternative:** If you want to create a project in a new folder:

```bash
npm create vite@latest my-react-app -- --template react
cd my-react-app
```

[Vite Documentation](https://vite.dev/)  
[React Documentation](https://react.dev/)

---

## 4. Install Dependencies

Install all the project dependencies:

```bash
npm install
```

**Explanation:**  
This reads the `package.json` file and installs all dependencies listed there, including React, React DOM, and Vite.

---

## 5. Start the Development Server

Run the development server:

```bash
npm run dev
```

**Explanation:**  
- Starts the Vite development server with Hot Module Replacement (HMR).  
- Your app will be available at `http://localhost:5173` (or another port if 5173 is busy).  
- Changes to your code will automatically refresh in the browser.

---

## 6. Project Structure

Your React project will have the following structure:

```
my-react-app/
├── public/          # Static assets (images, icons, etc.)
├── src/             # Source code
│   ├── App.jsx      # Main App component
│   ├── main.jsx     # Entry point that renders the app
│   └── ...
├── index.html       # HTML template
├── package.json     # Dependencies and scripts
├── vite.config.js   # Vite configuration
└── README.md        # Project documentation
```

---

## 7. Understanding the Entry Point

Open `src/main.jsx`:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

**Explanation:**  
- `createRoot` – Creates a React root for rendering.  
- `document.getElementById('root')` – Finds the root element in `index.html`.  
- `<StrictMode>` – Enables additional React development checks.  
- `<App />` – Renders your main App component.

---

## 8. Your First Component

Open `src/App.jsx`:

```jsx
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Hello, React!</h1>
      <button onClick={() => setCount(count + 1)}>
        Count is {count}
      </button>
    </div>
  )
}

export default App
```

**Explanation:**  
- `useState` – React Hook for managing component state.  
- `count` – The current state value.  
- `setCount` – Function to update the state.  
- `onClick` – Event handler for button clicks.

[React Hooks Documentation](https://react.dev/reference/react)

---

## 9. Create a New Component

Create a new file `src/components/HelloWorld.jsx`:

```jsx
function HelloWorld() {
  return (
    <div>
      <h2>Hello, World!</h2>
      <p>This is my first React component.</p>
    </div>
  )
}

export default HelloWorld
```

Import and use it in `App.jsx`:

```jsx
import { useState } from 'react'
import HelloWorld from './components/HelloWorld.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <HelloWorld />
      <button onClick={() => setCount(count + 1)}>
        Count is {count}
      </button>
    </div>
  )
}

export default App
```

**Explanation:**  
- Components are reusable pieces of UI.  
- Import the component and use it like an HTML tag: `<HelloWorld />`.

---

## 10. Add React Router (Optional)

If you need routing in your app, install React Router:

```bash
npm install react-router
```

Update `src/main.jsx`:

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
- `BrowserRouter` – Enables client-side routing.  
- Wrap your App component to use routing features.

[React Router Documentation](https://reactrouter.com/)

---

## 11. Add Axios for API Calls (Optional)

If you need to make HTTP requests, install Axios:

```bash
npm install axios
```

Use it in your components:

```jsx
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    axios.get('https://api.example.com/data')
      .then(response => setData(response.data))
      .catch(error => console.error('Error:', error))
  }, [])

  return (
    <div>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
    </div>
  )
}

export default App
```

**Explanation:**  
- `useEffect` – Hook that runs after component renders.  
- `axios.get()` – Makes a GET request to an API.  
- The empty array `[]` means the effect runs only once on mount.

[Axios Documentation](https://axios-http.com/)

---

## 12. Build for Production

When you're ready to deploy, create a production build:

```bash
npm run build
```

**Explanation:**  
- Creates an optimized production build in the `dist/` folder.  
- The build is minified and optimized for performance.

---

## 13. Preview Production Build

Preview your production build locally:

```bash
npm run preview
```

**Explanation:**  
- Serves the production build locally so you can test it before deploying.

---

## 14. Available Scripts

Your `package.json` includes these scripts:

- `npm run dev` – Start development server  
- `npm run build` – Build for production  
- `npm run preview` – Preview production build  
- `npm run lint` – Run ESLint to check code quality  

---

## 15. Common Next Steps

1. **Add Styling:** Use CSS modules, styled-components, or Tailwind CSS
2. **State Management:** Consider Context API or libraries like Zustand or Redux
3. **Forms:** Use libraries like React Hook Form
4. **Testing:** Set up Vitest or React Testing Library
5. **Deployment:** Deploy to Vercel, Netlify, or GitHub Pages

---

✅ You now have a working React application with Vite! Start building your components and features.

**Useful Resources:**
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vite.dev/)
- [React Router](https://reactrouter.com/)
- [MDN Web Docs - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

