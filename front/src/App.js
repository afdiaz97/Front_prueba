import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import Dashboard from './components/navbar'
import Login from './components/Login'
import Inicio from './components/Inicio'
import Cliente from './components/cliente'
import ClienteForm from './components/crearcliente'
import './App.css'
import { useEffect, useState } from 'react'
function App() {
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  return (
    <div className="App">
      
        {location.pathname !== '/login' && <Dashboard />}
        <Routes>
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setUsername={setUsername} />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/cliente" element={<Cliente />} />
          <Route path="/crearcliente" element={<ClienteForm />} />
        </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
export default AppWrapper;
