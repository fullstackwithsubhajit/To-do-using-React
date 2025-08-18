import React from 'react'


const Navbar = () => {
  return (
    <nav>

        <div className="container bg-purple-800 flex justify-between items-center py-4 text-white px-4">
            
        <div className="left text-lg font-sans"><b>Desk-Task</b></div>
        
        <div className="right ">
            <ul className='flex gap-6'>
                <li>Home</li>
                <li>Your Tasks</li>
            </ul>
        </div>
        </div>
        
        </nav>
  )
}

export default Navbar
