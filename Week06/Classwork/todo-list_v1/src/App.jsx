import { useState } from "react";
import TodoCreate from "./components/TodoCreate";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);

  const createToDo = (title) => {
    // NEVER EVER EVER todos.push('something')
    // We always create a new copy of existing state using ...
    // then we add the new todo to the end with our setter
    // make a copy of the existing array
    const updatedTodos = [...todos, { id: crypto.randomUUID(), title: title }];
    setTodos(updatedTodos);
  };

  const deleteToDoById = (id) => {
    // we never Array.pop(), plus we want to make sure we can delete ANY todo at ANY TIME
    // we make a copy using filter()
    const updatedTodos = todos.filter((todo) => {
      // Array.filter() loops through and only returns the iterms that are matched by the condition
      return todo.id !== id;
    });

    // use the setter to update our todos with the one with the matching ID filtered out
    setTodos(updatedTodos);
  };

  const editToDoById = (id, newTitle) => {
    // map return a new array the SAME length, every todo comes back
    // the one we are editing comes back as a new object with a new title
    const updatedTodos = todos.map((todo) => {
      // find the one to edit by ID, copy all properties into a new object, THEN override the title
      if (todo.id === id) {
        return { ...todo, title: newTitle };
      }

      // return all other todos as is
      return todo;
    });

    setTodos(updatedTodos);
  };
  console.log(todos);

  return (
    <div className="max-x-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Todo List</h1>
      <TodoCreate onCreate={createToDo} />
      <TodoList todos={todos} onDelete={deleteToDoById} onEdit={editToDoById} />
    </div>
  );
}
export default App;
