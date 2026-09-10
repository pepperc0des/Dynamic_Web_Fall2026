import styles from "./RecipeCard.module.css";

const IngredientList = (props) => {
  const { ingredients } = props;
  return (
    <div className={styles.ingredients_list}>
      <h3 className={styles.list_title}>Ingredients:</h3>
      <ul>
        {ingredients.map((ingred, index) => {
          return (
            <li key={index} className={styles.list_item}>
              {ingred}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default IngredientList;