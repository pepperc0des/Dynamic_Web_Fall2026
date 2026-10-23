import { useState } from "react";
import TodoEdit from "./ToDoEdit";
import useTodosContext from "../hooks/use-todos-context";
import { formatWeight } from "../weight";

const TodoItem = (props) => {
  // we still need the concept of an individual todo as a prop
  const { todo } = props;
  // these are not onEdit etc... they are the functions from valuesToShare in TodosContext Provider component
  const { deleteTodoById, editTodoById, toggleTodoById } = useTodosContext();
  // THIS one belongs here. Whether this row is showing its edit form is
  // nobody else's business -- App does not care, the other rows do not care.
  const [showEdit, setShowEdit] = useState(false);

  const handleDelete = () => {
    deleteTodoById(todo.id);
  };

  const handleEditClick = () => {
    // this stays the same, it updates this components local state,
    // no other component care about this, it does not move up to context
    setShowEdit(!showEdit);
  };

  const handleSubmit = async (id, newTitle, newWeight) => {
    const saved = await editTodoById(id, newTitle, newWeight);
    // close the form only once the server said yes. If it failed, the form
    // stays open with your changes still in it.
    if (saved) {
      setShowEdit(false);
    }
  };

  const handleCancel = () => {
    setShowEdit(false);
  };

  const handleToggle = () => {
    // send the OPPOSITE of what it is now
    toggleTodoById(todo.id, !todo.done);
  };

  if (showEdit) {
    return (
      <li>
        <TodoEdit todo={todo} onSubmit={handleSubmit} onCancel={handleCancel} />
      </li>
    );
  }

  // null AND missing (old rows) both mean "no weight" -- see weight.js
  const hasWeight = todo.weight !== null && todo.weight !== undefined;

  return (
    <li className="flex items-center gap-3 rounded-xl bg-zinc-900 px-4 py-3">
      {/* the padding makes a bigger area to tap on a phone */}
      <label className="-m-2 shrink-0 cursor-pointer p-2">
        <input
          type="checkbox"
          checked={todo.done || false}
          onChange={handleToggle}
          aria-label={`Mark ${todo.title} done`}
          className="block h-6 w-6 accent-lime-400"
        />
      </label>

      <div className="min-w-0 flex-1">
        <p
          className={`truncate font-medium ${
            todo.done ? "text-zinc-500 line-through" : "text-zinc-100"
          }`}
        >
          {todo.title}
        </p>
        {/* -ml-2 + px-2 / py-1.5: lines the text up but gives a fingertip room */}
        <div className="-ml-2 mt-0.5 flex text-sm">
          <button
            onClick={handleEditClick}
            className="px-2 py-1.5 text-zinc-400 hover:text-lime-400"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-2 py-1.5 text-zinc-400 hover:text-red-400"
          >
            Delete
          </button>
        </div>
      </div>

      {/* the new field, shown in the list */}
      <p
        className={`shrink-0 text-right font-display text-xl leading-none ${
          hasWeight ? "text-lime-400" : "text-zinc-500"
        }`}
      >
        {formatWeight(todo.weight)}
      </p>
    </li>
  );
};

export default TodoItem;
