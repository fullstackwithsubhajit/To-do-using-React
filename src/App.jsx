import { useEffect, useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Header from './components/Header'
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";



function App() {
  const [todo,setTodo] = useState("")
  const [todos,setTodos] = useState([])



// Prevent saving to localStorage on initial mount
const isFirstRender = useRef(true);

useEffect(() => {
  let todoString = localStorage.getItem("todos")
  if(todoString){
    let todos = JSON.parse(todoString)
    setTodos(todos)
  }
}, [])

// Save todos to localStorage whenever todos changes
useEffect(() => {
  if (isFirstRender.current) {
    isFirstRender.current = false;
    return;
  }
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);



  // Removed saveToLS, now handled by useEffect



const handleEdit = (e) => {
  let id = e.target.name;
  let t = todos.filter(i => i.id === id);
  setTodo(t[0].todo);
  let newTodos = todos.filter((item) => {
    return item.id !== id;
  });
  setTodos(newTodos);
};

const handleDelete = (e) => {
  let id = e.target.name;
  let newTodos = todos.filter((item) => {
    return item.id !== id;
  });
  setTodos(newTodos);
};

const handleAdd = () => {
  if (todo.length > 0) {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
  } else {
    alert("Please enter a todo");
  }
};

const handleChange = (e) => {
  setTodo(e.target.value);
}

const handleCheckbox = (e)=>{
  
  let id = e.target.name
  console.log(e.target.value)
  console.log(id)
  let index = todos.findIndex((item) =>{
    
    return item.id === id
  })
  console.log(index)
  
  let newTodos = [...todos]
  newTodos[index].isCompleted = !newTodos[index].isCompleted
  setTodos(newTodos)
  // saveToLS()

}

  return (
    <>
      <Navbar />
      <div className='p-4'>
        <Header />
      </div>
      <div className="container bg-amber-100 p-4 mx-auto flex w-fit flex-col items-center gap-4 min-h-[80vh] rounded-2xl">

      <div className="Todo">
        <div className=" p-4">
         <h2 className='text-lg font-bold'>Add your Todos</h2> {/* add Todos here */}
         </div>
         <div className='px-4 flex gap-2 items-center'>

         <input onChange={handleChange} value={todo} className='border-2 border-black-300 rounded w-full px-2' type="text" name="text" id="text" />
         <button  onClick={handleAdd} className='px-4 cursor-pointer border-1 bg-violet-600 hover:bg-violet-800 py-1 rounded-xl text-white'>Add </button>
         </div>
          
          {/* todos will be shown here */}


        

         <h2 className='text-lg font-bold'>Your Todos</h2>


         <div className="todos flex gap-4 flex-col">

          {todos.map(item => {

return(
 <div key={item.id} className="flex flex-row justify-between">
  <div className='flex gap-2 justify-center'>

          <input name={item.id} onChange={handleCheckbox} type="checkbox" value={item.isCompleted} className='cursor-pointer' />
          <div className={item.isCompleted?"line-through":""} >{item.todo}</div>
  </div>
          <div className="btns gap-2 flex">
            <button name={item.id} onClick={handleEdit} className='px-2 cursor-pointer border-1 hover:bg-violet-800 bg-violet-600 py-1 rounded-xl text-white'><FaRegEdit /> </button>
              
            <button name={item.id} onClick={handleDelete}  className='px-2 cursor-pointer border-1 hover:bg-violet-800  bg-violet-600 py-1 rounded-xl text-white'><MdDelete /></button>
          </div>
          </div>
            )
        
      })}
         </div>
      </div>
      </div>


    </>
  )
}

export default App
