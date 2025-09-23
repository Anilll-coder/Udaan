import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Classes from "../pages/classes/Classes.jsx"
import SubjectPage from '../pages/classes/Subject.jsx'
import Quiz1 from '../pages/games/Quiz1.jsx'
import LoginPage from '../pages/auth/Login.jsx'
import Register from '../pages/auth/Register.jsx'
import MainPage from '../pages/Mainpage.jsx'
import LevelsPage from '../pages/Levelspage.jsx'
import SelectClass from '../pages/classes/Selectclass.jsx'
import ClassLearning from '../pages/classes/ClassLearning.jsx'
import TeacherDashboard from '../pages/dashboards/TeachersDashboard.jsx'
import Home from '../pages/Home.jsx'
import LandingPage from '../pages/Join.jsx'
import Main1 from '../pages/Main1.jsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/learn/class/:classId' element={<Main1/>}/>
        <Route path="/subjects/:classId" element={<SubjectPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/quiz1" element={<Quiz1/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/learn" element={<LandingPage/>}/>
        <Route path='/leader' element={<LevelsPage/>}/>
        <Route path='/self-learn' element={<SelectClass/>}/>
        <Route path='/self-learn/class/:classId' element={<ClassLearning/>}/>
        <Route path='/teachers/dashboard' element={<TeacherDashboard/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
