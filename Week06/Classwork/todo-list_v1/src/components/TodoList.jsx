import ToDoItem from "./ToDoItem";

const TodoList = (props) => {
  const { todos, onDelete, onEdit } = props;

  const renderedTodos = todos.map((todo) => {
    // we dont need to pull out an index here because each todo has an unique ID
    return (
      <ToDoItem key={todo.id} todo={todo} onDelete={onDelete} onEdit={onEdit} />
    );
  });
  return <div>{renderedTodos}</div>;
};

export default TodoList;
