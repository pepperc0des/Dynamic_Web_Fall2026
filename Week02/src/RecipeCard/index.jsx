import { RECIPE_DATA } from "./recipe-data.js";
import Card from "./Card.jsx";
import RecipeImg from "./RecipeImg.jsx";
import RecipeInfo from "./RecipeInfo.jsx";
import IngredientsList from "./IngredientsList.jsx";
import InstructionsList from "./InstructionsList.jsx";
import "../global.css";
const RecipeCard = () => {
  return (
    <Card>
      <RecipeImg imgSrc={RECIPE_DATA.imgsrc} imgAlt={RECIPE_DATA.imgalt} />
      <RecipeInfo
        title={RECIPE_DATA.title}
        description={RECIPE_DATA.description}
      />
      <IngredientsList ingredients={RECIPE_DATA.ingredients} />
      <InstructionsList instructions={RECIPE_DATA.instructions} />
    </Card>
  );
};

export default RecipeCard;
