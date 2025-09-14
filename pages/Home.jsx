import React from 'react'
import "./pages_css/home.css"
import { useState } from 'react'

const Home = () => {
    const [input,setInput] = useState(true);
  return (
    (input)?
    <>
        <div className='bgd'>
        <div className="container flex flex-col justify-center gap-7items-center">
        <div className="card">
         <h2>Enter Teacher's Code </h2>
        <input type="text" className="input-box" placeholder="- - - - -"/>
        </div>
        <h2 className='or'>OR</h2>
        <div className='card'>
        <button
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-semibold rounded-xl shadow-lg transition duration-300 hover:scale-105 hover:from-purple-600 hover:to-blue-600 animate-fade-in"
          onClick={()=>{setInput(false)}}
        >
          Self Learn
        </button>
        </div>
        </div>
        <div className="concept-two">
    <div className="hover"><h1>L</h1></div>
    <div className="hover"><h1>E</h1></div>
    <div className="hover"><h1>V</h1></div>
    <div className="hover"><h1>E</h1></div>
    <div className="hover"><h1>L</h1></div>
    <div className="hover"><h1>U</h1></div>
    <div className="hover"><h1>P</h1></div>
  </div>
      <div className='absolute login'>
            <button
      className="
        relative 
        px-6 py-3 
        rounded-lg 
        font-bold 
        text-white 
        bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 
        animate-gradient-x 
        hover:scale-110 
        hover:shadow-lg 
        transform 
        transition 
        duration-300 
        ease-in-out
        focus:outline-none
        focus:ring-4
        focus:ring-purple-300
        active:scale-95
      "
      style={{ backgroundSize: '200% 200%' }}
    >
      Login
      <span
        className="
          absolute inset-0 rounded-lg border-2 border-white opacity-0 
          hover:opacity-100 
          transition 
          duration-300 
          ease-in-out
          pointer-events-none
        "
      ></span>
    </button>
      </div>
      </div>
    </>
    :<>  <div className='bgd z-0'>
              <input type='text' className='z-1'/>
          </div>
    </>
  )
}

export default Home
