import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from '../pages/Home'
import Classes from "../pages/Classes.jsx"
import SubjectPage from '../pages/Subject.jsx'
import LoginPage from '../pages/Login.jsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/class' element={<Classes/>}/>
        <Route path="/subjects/:classId" element={<SubjectPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
