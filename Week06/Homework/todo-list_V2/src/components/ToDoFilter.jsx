const FILTERS = ["all", "active", "done"];
 
const TodoFilter = (props) => {
  // this component does not own the filter -- App does. It only shows which
  // one is selected and reports clicks back up.
  const { filter, onChange } = props;
 
  const renderedButtons = FILTERS.map((name) => {
    const isSelected = name === filter;
    return (
      <button
        key={name}
        onClick={() => onChange(name)}
        className={
          isSelected
            ? "bg-blue-900 text-white px-4 py-1 rounded text-sm capitalize"
            : "border border-gray-300 text-gray-700 px-4 py-1 rounded text-sm capitalize"
        }
      >
        {name}
      </button>
    );
  });
 
  return <div className="flex gap-2 mb-4">{renderedButtons}</div>;
};
 
export default TodoFilter;