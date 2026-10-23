import { createContext, useState, useCallback } from "react";
import {
  fetchTodos as fetchTodosRequest,
  createTodo as createTodoRequest,
  updateTodo as updateTodoRequest,
  deleteTodo as deleteTodoRequest,
  toggleTodo as toggleTodoRequest,
} from "../api";

// createContext makes a channel, Nothing is in it yet
const TodosContext = createContext();

// Provider is an ordinary component. Everything used to live in App,
// lives here now -- the state, and the five functions that actually change it
const Provider = (props) => {
  const { children } = props;
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // this will need useCallback once we see the jslint warning

  //   useCallBack: give me back the SAME functiob object between renders
  //  fetchToDos goes in a useEffect depenecy array in App
  //   rebuilt every render is a new value every render -- -- which would make
  // them effect  run forever. [] here in useCallback means "never rebuilt this"
  const fetchTodos = useCallback(async () => {
    try {
      const todos = await fetchTodosRequest();
      setTodos(todos);
    } catch (err) {
      // the usual cause: you forgot to start the server in the second tab
      console.error(err);
      setError("Could not reach the server. Is `npm run server` running?");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // one message for any change that fails (add, edit, delete, tick)
  const SAVE_ERROR =
    "Couldn't save that change. Is `npm run server` still running?";

  const createTodo = async (title, weight) => {
    // the server makes the id now, so we no longer invent one
    try {
      const newTodo = await createTodoRequest(title, weight);
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      setError(null);
      // tell the form it worked, so it knows it's safe to clear
      return true;
    } catch (err) {
      console.error(err);
      setError(SAVE_ERROR);
      // tell the form it failed, so it KEEPS what you typed
      return false;
    }
  };

  const deleteTodoById = async (id) => {
    // ask the server first. If it refuses, we never touch our state, and the
    // screen keeps telling the truth.
    try {
      await deleteTodoRequest(id);

      const updatedTodos = todos.filter((todo) => {
        return todo.id !== id;
      });
      setTodos(updatedTodos);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(SAVE_ERROR);
    }
  };

  const editTodoById = async (id, newTitle, newWeight) => {
    // find the whole todo and send all of it, because PUT replaces.
    // weight MUST be in here too -- leave it out and PUT wipes it from db.json
    const todo = todos.find((todo) => todo.id === id);
    try {
      const updated = await updateTodoRequest({
        ...todo,
        title: newTitle,
        weight: newWeight,
      });

      // map returns a new array the SAME length. Every todo comes back; the one
      // we edited comes back as the object the SERVER sent us.
      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          return updated;
        }
        return todo;
      });
      setTodos(updatedTodos);
      setError(null);
      // same as create: the edit form only closes if this is true
      return true;
    } catch (err) {
      console.error(err);
      setError(SAVE_ERROR);
      return false;
    }
  };

  const toggleTodoById = async (id, done) => {
    // same shape as every other one: ask the server, then map the answer in
    try {
      const updated = await toggleTodoRequest(id, done);

      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          return updated;
        }
        return todo;
      });
      setTodos(updatedTodos);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(SAVE_ERROR);
    }
  };

  //   This is still an object! if the key and value have tehe sane name, you can shorthand it
  //   so below...
  //   fetchTodos: fetchTodos,
  const valuesToShare = {
    todos,
    isLoading,
    error,
    fetchTodos,
    createTodo,
    deleteTodoById,
    editTodoById,
    toggleTodoById,
  };

  return (
    <TodosContext.Provider value={valuesToShare}>
      {children}
    </TodosContext.Provider>
  );
};

export { Provider };
export default TodosContext;
