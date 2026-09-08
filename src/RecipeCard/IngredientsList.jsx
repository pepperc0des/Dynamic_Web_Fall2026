const IngredientList = (props) => {
  const { ingredients } = props;
  return (
    <div className="ingredients_list">
      <h3 className="list_title">Ingredients:</h3>
      <ul>
        {ingredients.map((ingred, index) => {
          return (
            <li key={index} className="list_item">
              {ingred}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default IngredientList;
