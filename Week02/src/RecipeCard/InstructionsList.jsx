import styles from "./RecipeCard.module.css";

const InstructionsList = (props) => {
  const { instructions } = props;
  return (
    <div className={styles.instructions_list}>
      <h3 className={styles.list_title}>Instructions:</h3>
      <ol>
        {instructions.map((step, index) => {
          return (
            <li key={index} className={styles.list_item}>
              {step}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default InstructionsList;