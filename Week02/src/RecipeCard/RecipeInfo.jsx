import { RECIPE_DATA } from "./recipe-data.js";
import styles from "./RecipeCard.module.css";

const RecipeInfo = () => {
  return (
    <div className={styles.recipe_info}>
      <h2 className={styles.recipe_title}>{RECIPE_DATA.title}</h2>
      <p className={styles.recipe_description}>{RECIPE_DATA.description}</p>
    </div>
  );
};

export default RecipeInfo;