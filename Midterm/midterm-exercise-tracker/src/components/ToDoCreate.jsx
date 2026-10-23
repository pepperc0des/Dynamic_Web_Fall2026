import { useState } from "react";
import useTodosContext from "../hooks/use-todos-context";
import { toWeight } from "../weight";

// what an empty form looks like. Each key matches an input's `name`.
const EMPTY_FORM = { title: "", weight: "" };

const TodoCreate = () => {
  const { createTodo } = useTodosContext();
  // ONE state object for the whole form -- this component owns it, because
  // nobody else needs to know what you are halfway through typing.
  // weight stays a STRING while typing (that's what inputs give us), and is
  // only turned into a number when we submit.
  const [form, setForm] = useState(EMPTY_FORM);
  // the message shown under the Exercise box when the name is missing
  const [titleError, setTitleError] = useState("");
  // true while the request is on its way -- stops a double-click saving twice
  const [isSubmitting, setIsSubmitting] = useState(false);

  // one handler for every input: event.target.name says WHICH key to update,
  // which only works because each input's name matches a key in `form`
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
    // they've started fixing it, so stop telling them off
    if (name === "title") {
      setTitleError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // validation: an empty name does not create an exercise
    if (form.title.trim() === "") {
      setTitleError("Give the exercise a name, e.g. “Squat”.");
      return;
    }

    setIsSubmitting(true);
    const saved = await createTodo(form.title.trim(), toWeight(form.weight));
    setIsSubmitting(false);

    // only clear once the server said yes. If the save failed, your typing
    // is still here to try again. Only possible BECAUSE the inputs are controlled.
    if (saved) {
      setForm(EMPTY_FORM);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mb-8 grid grid-cols-[1fr_auto] gap-3 rounded-2xl bg-zinc-900 p-4 sm:grid-cols-[1fr_8rem_auto]"
    >
      <div className="col-span-2 flex flex-col gap-1 sm:col-span-1">
        <label
          htmlFor="new-title"
          className="text-xs font-semibold uppercase tracking-wider text-zinc-400"
        >
          Exercise
        </label>
        <input
          id="new-title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          placeholder="e.g. Bench press"
          aria-invalid={titleError !== ""}
          aria-describedby={titleError ? "new-title-error" : undefined}
          className={`w-full min-w-0 rounded-lg border bg-zinc-950 px-3 py-2.5 text-base text-zinc-100 placeholder:text-zinc-600 focus:outline-none ${
            titleError
              ? "border-red-400 focus:border-red-400"
              : "border-zinc-700 focus:border-lime-400"
          }`}
        />
        {/* the message next to the field, in words -- not just a red border */}
        {titleError && (
          <p id="new-title-error" className="text-sm text-red-300">
            {titleError}
          </p>
        )}
      </div>

      <div className="flex min-w-0 flex-col gap-1">
        <label
          htmlFor="new-weight"
          className="text-xs font-semibold uppercase tracking-wider text-zinc-400"
        >
          Weight (lb)
        </label>
        <input
          id="new-weight"
          name="weight"
          type="number"
          min="0"
          step="0.5"
          inputMode="decimal"
          value={form.weight}
          onChange={handleChange}
          placeholder="Bodyweight"
          className="w-full min-w-0 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-base text-zinc-100 placeholder:text-zinc-600 focus:border-lime-400 focus:outline-none"
        />
      </div>

      <button
        disabled={isSubmitting}
        className="self-end rounded-lg bg-lime-400 px-5 py-2.5 text-base font-bold text-zinc-950 hover:bg-lime-300 disabled:cursor-wait disabled:opacity-60"
      >
        {isSubmitting ? "Adding…" : "Add"}
      </button>
    </form>
  );
};

export default TodoCreate;
