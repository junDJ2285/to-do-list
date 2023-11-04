import { useState } from 'react';
import { Button } from 'antd';
import './App.css';

function App() {
  const TODO = localStorage.getItem("todos")

  const initialValue = TODO ? JSON.parse(TODO) : []


  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [description, setDescription] = useState("")
  const [todos, setTodos] = useState(initialValue)
  const [todoId, setTodoId] = useState("")
  const date = new Date()
  const id = date.getMilliseconds()


  const onSubmit = (e) => {
    e.preventDefault()
    if (todoId) {
      const updated = todos.map(todo => {
        return todo.id === todoId ? { ...todo, name: name, email: email, id: id, description: description } : todo
      })
      setTodos(updated)
      localStorage.setItem("todos", JSON.stringify(updated))
    } else {
      const updated = [...todos, { name: name, email: email, description: description, id: id }]
      setTodos(updated)
      localStorage.setItem("todos", JSON.stringify(updated))
    }
    setTodoId("")
    setName("")
    setDescription("")
    setEmail("")
  }

  const onClick = (todo) => {
    const update = todos.filter(t => t.id !== todo.id)
    setTodos(update)
    localStorage.setItem("todos", JSON.stringify(update))

  }

  const onEdit = (t) => {
    setTodoId(t.id)
    setName(t.name)
    setEmail(t.email)
    setDescription(t.description)
  }
  return (
    <div className="App">
      <div className='form-container'>
        <div className='form'>
          <h1 style={{textAlign:"center", padding:"22px"}}>Contact App</h1>
          <form onSubmit={onSubmit}>
            <label>
               Name
            </label>
            <input value={name} name='name' placeholder=' Name' required onChange={(e) => {
              setName(e.target.value)
            }} />
            <label>
              Email
            </label>
            <input value={email} name='name' placeholder='contact' required onChange={(e) => {
              setEmail(e.target.value)
            }} />

            <br />
            <br />
            <label>
              Address
            </label>
            <input value={description} name='description' placeholder='address' rows={3} required onChange={(e) => {

              setDescription(e.target.value)
            }} />
            <br />
            <button type='submit'>
              {
                todoId ? "Update" : 'Create'
              }
            </button>
          </form>


          <div className='todo-container'>

            {todos.map((t) => {
              return <div key={t.id} className='todo-card'>
                <h3>{t.name}</h3>
                <h3>Id : {t.id}</h3>
                <h3>{t.email}</h3>
                <p>{t.description}</p>
                <button onClick={() => {
                  onEdit(t)
                }}>Edit</button>
                <button onClick={() => onClick(t)}>Delete</button>
              </div>
            })}



          </div>

        </div>
      </div>
    </div>
  );
}

export default App;