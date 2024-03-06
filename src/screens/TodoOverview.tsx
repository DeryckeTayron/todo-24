import React, { useEffect, useState } from 'react'
import { Plus, Trash } from 'lucide-react' // Import Trash icon
import { uid } from 'uid'
import { AppHeader } from '../components/AppHeader'
import { AppFooter } from '../components/AppFooter'
import { Todo } from '../models/Todo'

export const TodoOverview = () => {
  // Keep todos in localStorage
  const [todos, setTodos] = useState<Todo[]>(
    localStorage.todos ? JSON.parse(localStorage.todos) : [],
  )

  const [newTodo, setNewTodo] = useState<Todo>({
    task: '',
    category: 'choose',
    isCompleted: false,
  })

  const [timeoutId, setTimeoutId] = useState<number | null>(null)

  useEffect(() => {
    localStorage.todos = JSON.stringify(todos)
  }, [todos])

  const addNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (newTodo.task === '' || newTodo.category === 'choose') return

    const currentNewTodo = { ...newTodo, id: uid() }
    setTodos([...todos, currentNewTodo])
    setNewTodo({
      task: '',
      category: 'choose',
      isCompleted: false,
    })
  }

  const handleCheckboxClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id
    const updatedTodos = todos.map(todo =>
      todo.id === id
        ? { ...todo, isCompleted: !todo.isCompleted, opacity: 0.5 }
        : todo,
    )

    // Find the todo item that was clicked
    const clickedTodo = todos.find(todo => todo.id === id)
    if (!clickedTodo) return

    // Update the state with the modified todos
    setTodos(updatedTodos)

    // Check if the completion status has changed
    if (clickedTodo.isCompleted !== !clickedTodo.isCompleted) {
      // Cancel previous timeout if any
      if (timeoutId) {
        clearTimeout(timeoutId)
        setTimeoutId(null) // Reset timeoutId state
      }

      // Start timer if isCompleted is true
      if (!clickedTodo.isCompleted) {
        const newTimeoutId = setTimeout(() => {
          setTodos(prevTodos => {
            const updatedTodosFiltered = prevTodos.filter(
              todo => todo.id !== id,
            )
            localStorage.todos = JSON.stringify(updatedTodosFiltered)
            return updatedTodosFiltered
          })
        }, 2000)
        setTimeoutId(newTimeoutId)
      }
    }
  }

  const handleTrashClick = (id: string | undefined) => {
    if (!id) return // Check if id is undefined
    const updatedTodos = todos.filter(todo => todo.id !== id)
    setTodos(updatedTodos)
    localStorage.todos = JSON.stringify(updatedTodos) // Update localStorage
  }

  return (
    <div className="max-w-screen-md mx-auto">
      <AppHeader todoCount={todos.length} />
      <div className="flex-1">
        <form className="flex gap-3" onSubmit={addNewTodo}>
          <button className="hover:bg-orange-600 h-auto rounded-full p-2 ">
            <Plus />
            <span className="sr-only">Add todo</span>
          </button>
          <input
            className="block w-full border border-neutral-800 rounded-md p-2 focus:outline-none dark:bg-gray-800 focus:ring-2 focus:ring-orange-600 focus:border-transparent mb-1"
            type="text"
            name="new-todo"
            id="new-todo"
            value={newTodo.task}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setNewTodo({ ...newTodo, task: event.target.value })
            }
          />
          <select
            className=" border-neutral-200 dark:border-neutral-700 rounded-md p-2 outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent dark:bg-gray-800 text-neutral dark:text-white"
            name="category"
            id="category"
            value={newTodo.category}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              setNewTodo({ ...newTodo, category: event.target.value })
            }
          >
            <option hidden value="choose">
              Choose
            </option>
            <option className="hobby" value="hobby">
              Hobby
            </option>
            <option className="work" value="work">
              Work
            </option>
          </select>
        </form>
        {todos.map(todo => (
          <div
            key={todo.id}
            className="flex w-full justify-center items-center"
          >
            <ul className="w-full">
              <li
                className={`flex justify-between mt-10 ${
                  todo.isCompleted ? 'opacity-50' : ''
                }`}
              >
                <input
                  type="checkbox"
                  id={todo.id}
                  checked={todo.isCompleted}
                  onChange={handleCheckboxClick}
                  className={`rounded-full appearance-none border-2 w-8 h-8 ml-1 border-white cursor-pointer transition-colors duration-300 hover:bg-orange-600 hover:border-orange-600 ${
                    todo.isCompleted ? 'bg-orange-600 border-orange-600' : ''
                  }`}
                />

                <div className="flex row">
                  <label className="text-right" htmlFor={todo.id}>
                    <div>
                      {todo.task}
                      <p>{todo.category}</p>
                    </div>
                  </label>
                  <button
                    className="ml-10"
                    onClick={() => handleTrashClick(todo.id)}
                  >
                    <Trash />
                  </button>
                </div>
              </li>
            </ul>
          </div>
        ))}
      </div>
      <AppFooter />
    </div>
  )
}
