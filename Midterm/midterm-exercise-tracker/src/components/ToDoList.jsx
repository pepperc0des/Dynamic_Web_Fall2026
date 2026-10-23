import TodoItem from "./ToDoItem";
import useTodosContext from "../hooks/use-todos-context";

const TodoList = () => {
  const { todos } = useTodosContext();

  const renderedTodos = todos.map((todo) => {
    return <TodoItem key={todo.id} todo={todo} />;
  });

  return <ul className="flex flex-col gap-2">{renderedTodos}</ul>;
};

export default TodoList;
