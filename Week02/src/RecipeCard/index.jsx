//other components
import Card from "./Card.jsx";
import RecipeImg from "./RecipeImg";
import RecipeInfo from "./RecipeInfo";
import IngredientsList from "./IngredientsList";
import InstructionsList from "./InstructionsList";
import UserRating from "./UserRating.jsx";

//library
import { RECIPE_DATA } from "./recipe-data.js";

// Styles
import styles from "./RecipeCard.module.css";

const RecipeCard = () => {
  return (
    <Card>
      <RecipeImg imgSrc={RECIPE_DATA.imgsrc} imgAlt={RECIPE_DATA.imgalt} />
      <div className={styles.card_text}>
        <RecipeInfo
          title={RECIPE_DATA.title}
          description={RECIPE_DATA.description}
        />
        <div className={styles.card_lists}>
          <IngredientsList ingredients={RECIPE_DATA.ingredients} />
          <InstructionsList instructions={RECIPE_DATA.instructions} />
        </div>
        <UserRating />
      </div>
    </Card>
  );
};

export default RecipeCard;