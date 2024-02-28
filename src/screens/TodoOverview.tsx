import { useState, useEffect } from 'react'
import { ChevronDown, Plus } from 'lucide-react'

import { AppHeader } from '../components/AppHeader'
import { AppFooter } from '../components/AppFooter'
import { Todo } from '../models/Todo'

//Todo 1: als er niets ingevuld is, mag de todo niet toegevoegd worden
//Todo 2: een geldige todo krijgt een unieke id (met de npm uid package)
//Todo 3: je kan ook een categorie kiezen voor je todo deze wordt ook getoond in de lijst
//Todo 4: je kan een todo verwijderen

export const TodoOverview = () => {
  const [todos, setTodos] = useState<Todo[]>([])

  const [newTodo, setNewTodo] = useState<Todo>({
    task: '',
    category: '',
    isCompleted: false,
  })

  const addNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault() //stop posting naar zelfde pagina
    setTodos([...todos, newTodo]) //combineer de huidige todos met de nieuwe todo
  }

  useEffect(() => {
    console.log({ newTodo }, newTodo)
  })

  return (
    <div className="max-w-screen-md mx-auto">
      <AppHeader />
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
            onInput={(event: React.FormEvent<HTMLInputElement>) => {
              setNewTodo({ ...newTodo, task: event.currentTarget.value })
            }}
          />
          <select
            className="border border-neutral-200 dark:border-neutral-700 rounded-md p-2 outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent dark:bg-gray-800 text-neutral dark:text-white"
            name="category"
            id="category"
            defaultValue={'choose'}
          >
            <option value="hobby">Hobby</option>
            <option value="work">Work</option>
          </select>
        </form>

        {todos.map((todo: Todo) => (
          <div className="flex w-full">
            <ul className="w-full">
              <li className="flex justify-between mt-5">
                <input type="checkbox" id={todo.id} />
                <label htmlFor={todo.id}>{todo.task}</label>
              </li>
            </ul>
          </div>
        ))}
      </div>

      <AppFooter />
    </div>
  )
}
