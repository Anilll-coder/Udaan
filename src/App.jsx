import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from '../pages/Home'
import Classes from "../pages/Classes.jsx"
import SubjectPage from '../pages/Subject.jsx'
import LevelMap from '../pages/Levels.jsx'
import LoginPage from '../pages/Login.jsx'
import Register from '../pages/Register.jsx'
import MainPage from '../pages/Mainpage.jsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/class' element={<Classes/>}/>
        <Route path="/subjects/:classId" element={<SubjectPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/level" element={<LevelMap/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/main" element={<MainPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
