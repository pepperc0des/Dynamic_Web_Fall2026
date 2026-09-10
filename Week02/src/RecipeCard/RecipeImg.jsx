import { RECIPE_DATA } from "./recipe-data.js";

const RecipeImg = (props) => {
  //destructuring props to get imgSrc and imgAlt
  const { imgSrc, imgAlt } = props;
  //  const imgSrc = props.imgSrc;
  //  const imgAlt = props.imgAlt;
  return <img className="img" src={imgSrc} alt={imgAlt} />;
};

export default RecipeImg;

// props come in as an object as properties. We can destructure the object to get the properties we need. In this case, we need imgSrc and imgAlt. We can also use the RECIPE_DATA object to get the values for imgSrc and imgAlt.
// props = {
//   imgSrc: RECIPE_DATA.imgsrc,
//   imgAlt: RECIPE_DATA.imgalt,
// };
