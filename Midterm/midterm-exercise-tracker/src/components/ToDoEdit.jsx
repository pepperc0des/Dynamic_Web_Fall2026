import { useState } from "react";
import { toWeight, toInputValue } from "../weight";

const TodoEdit = (props) => {
  const { todo, onSubmit, onCancel } = props;
  // ONE state object, starting at the exercise's CURRENT values, so editing
  // means changing what is there rather than retyping it.
  // toInputValue turns null / missing (old rows) into "" so the box is just empty.
  const [form, setForm] = useState({
    title: todo.title,
    weight: toInputValue(todo.weight),
  });
  const [titleError, setTitleError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ids must be unique on the page, and several rows could be editing at once
  const titleId = `edit-title-${todo.id}`;
  const weightId = `edit-weight-${todo.id}`;

  // same single handler as the create form: name picks the key
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
    if (name === "title") {
      setTitleError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (form.title.trim() === "") {
      setTitleError("The exercise needs a name.");
      return;
    }
    setIsSubmitting(true);
    // onSubmit comes from TodoItem; it only closes this form if the save worked
    await onSubmit(todo.id, form.title.trim(), toWeight(form.weight));
    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="grid grid-cols-[1fr_6.5rem] gap-x-2 gap-y-1 rounded-xl border border-lime-400/60 bg-zinc-900 p-3"
    >
      <label
        htmlFor={titleId}
        className="text-xs font-semibold uppercase tracking-wider text-zinc-400"
      >
        Exercise
      </label>
      <label
        htmlFor={weightId}
        className="text-xs font-semibold uppercase tracking-wider text-zinc-400"
      >
        Weight (lb)
      </label>

      <input
        id={titleId}
        name="title"
        type="text"
        value={form.title}
        onChange={handleChange}
        aria-invalid={titleError !== ""}
        aria-describedby={titleError ? `${titleId}-error` : undefined}
        className={`w-full min-w-0 rounded-lg border bg-zinc-950 px-3 py-2 text-base text-zinc-100 focus:outline-none ${
          titleError
            ? "border-red-400 focus:border-red-400"
            : "border-zinc-700 focus:border-lime-400"
        }`}
      />
      <input
        id={weightId}
        name="weight"
        type="number"
        min="0"
        step="0.5"
        inputMode="decimal"
        value={form.weight}
        onChange={handleChange}
        placeholder="none"
        className="w-full min-w-0 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-base text-zinc-100 placeholder:text-zinc-600 focus:border-lime-400 focus:outline-none"
      />

      {titleError && (
        <p id={`${titleId}-error`} className="col-span-2 text-sm text-red-300">
          {titleError}
        </p>
      )}

      <div className="col-span-2 mt-2 flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg px-4 py-2.5 text-zinc-400 hover:text-zinc-100"
        >
          Cancel
        </button>
        <button
          disabled={isSubmitting}
          className="rounded-lg bg-lime-400 px-5 py-2.5 font-bold text-zinc-950 hover:bg-lime-300 disabled:cursor-wait disabled:opacity-60"
        >
          {isSubmitting ? "Saving…" : "Save"}
        </button>
      </div>
    </form>
  );
};

export default TodoEdit;
