import { useState } from "react";
import ToDoEdit from "./ToDoEdit";

const ToDoItem = (props) => {
  const { todo, onDelete, onEdit } = props;
  const [showEdit, setShowEdit] = useState(false);

  const handleDelete = () => {
    onDelete(todo.id);
  };

  //   this does not edit anything, it just shows the form
  const handleEditClick = () => {
    setShowEdit(!showEdit);
  };

  //   this handle submit is for the edit form
  const handleSubmit = (id, newTitle) => {
    onEdit(id, newTitle);
    setShowEdit(false);
  };

  if (showEdit) {
    return <ToDoEdit todo={todo} onSubmit={handleSubmit} />;
  }

  return (
    <div className="flex items-center justify-between border-b border-gray-200 py-3">
      <span>{todo.title}</span>
      <div className="text-sm">
        <button onClick={handleEditClick} className="text-sm text-blue-600">
          Edit
        </button>
        <button onClick={handleDelete} className="text-sm text-red-600">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ToDoItem;
