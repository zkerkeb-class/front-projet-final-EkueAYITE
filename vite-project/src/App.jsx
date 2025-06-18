import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  RouterProvider,
} from "react-router";
import router from "./config/route";

function App() {
  const [count, setCount] = useState(0)

  return (
      <RouterProvider router={router} />
  )
}

export default App
