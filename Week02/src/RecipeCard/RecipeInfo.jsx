import { RECIPE_DATA } from "./recipe-data.js";

const RecipeInfo = () => {
  return (
    <div className="recipe_info">
      <h2 className="recipe_title">{RECIPE_DATA.title}</h2>
      <p className="recipe_description">{RECIPE_DATA.description}</p>
    </div>
  );
};

export default RecipeInfo;
