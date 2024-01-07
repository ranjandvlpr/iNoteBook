import './App.css';
import Navbar from './components/Navbar.js';
import About from './components/About.js';
import Signup from './components/Signup.js';
import Login from './components/Login.js';
import Home from './components/Home.js';
import { Route, Routes } from 'react-router-dom';
import NoteState from './context/NoteState.js';
import Alert from './components/Alert.js';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState("")

  const showAlert = (msg, type) => {
    setAlert({
      msg: msg,
      type: type
    })
    setTimeout(() => {
      setAlert("")
    }, 1500)
  }

  return (
    <>
      <NoteState>
        <Navbar />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home showAlert={showAlert} />} ></Route>
            <Route path="/about" element={<About showAlert={showAlert} />} ></Route>
            <Route path="/login" element={<Login showAlert={showAlert} />} ></Route>
            <Route path="/signup" element={<Signup showAlert={showAlert} />} ></Route>
          </Routes>
        </div>
      </NoteState>
    </>
  )
}

export default App;
