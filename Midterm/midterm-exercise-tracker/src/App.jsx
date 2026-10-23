import { useEffect } from "react";
import TodoCreate from "./components/ToDoCreate";
import TodoList from "./components/ToDoList";
// import our custom hook to consume context
import useTodosContext from "./hooks/use-todos-context";

const App = () => {
  // calling our custom hook which not only imports but the 2 items we always need to consume a context
  // it replaces out useContext(TodosContext) with our hook useTodosContext()
  const { todos, isLoading, error, fetchTodos } = useTodosContext();

  // [] = run once, when the component first appears. NOT every render --
  // that would fetch, set state, re-render, fetch again, forever.
  // We put the fetchTools in the dependency array because that function was not created in this file
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // derived from state, not stored -- always right, for free
  const remaining = todos.filter((todo) => !todo.done).length;
  const isEmpty = !isLoading && !error && todos.length === 0;

  return (
    <main className="mx-auto min-h-screen max-w-xl px-4 py-10 sm:px-8">
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-lime-400">
          Today's session
        </p>
        <h1 className="font-display text-5xl uppercase leading-none text-zinc-50">
          Lift Log
        </h1>
        <p className="mt-2 text-zinc-400">
          Your exercises, and the weight you need to beat from last time.
        </p>
      </header>

      <TodoCreate />

      {/* ERROR: something true and useful, not "something went wrong" */}
      {error && (
        <p
          role="alert"
          className="mb-4 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-red-300"
        >
          {error}
        </p>
      )}

      {/* LOADING */}
      {isLoading && (
        <p className="animate-pulse py-8 text-center text-zinc-500">
          Loading your workout...
        </p>
      )}

      {/* EMPTY vs the list */}
      {isEmpty ? (
        <div className="rounded-2xl border-2 border-dashed border-zinc-800 px-6 py-12 text-center">
          <p className="font-display text-2xl uppercase text-zinc-300">
            Rest day?
          </p>
          <p className="mt-2 text-zinc-500">
            Add your first exercise above. Leave the weight blank for bodyweight
            moves like push-ups.
          </p>
        </div>
      ) : (
        <TodoList />
      )}

      {todos.length > 0 && (
        <p className="mt-6 text-sm text-zinc-500">
          {remaining === 0
            ? "Session done. Nice work."
            : `${remaining} ${remaining === 1 ? "exercise" : "exercises"} left`}
        </p>
      )}
    </main>
  );
};

export default App;
