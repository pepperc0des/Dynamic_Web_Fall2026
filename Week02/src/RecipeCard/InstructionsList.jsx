const IntructionList = (props) => {
  const { instructions } = props;
  return (
    <div className="instructions_list">
      <h3 className="list_title">Instructions:</h3>
      <ol>
        {instructions.map((step, index) => {
          return (
            <li key={index} className="list_item">
              {step}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default IntructionList;
