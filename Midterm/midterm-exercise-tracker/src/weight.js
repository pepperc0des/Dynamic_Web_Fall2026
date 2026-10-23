// Small helpers for the weight field, shared by the create AND edit forms so
// they can never disagree about what "empty" means.

// A number input's value is always a STRING ("" when the box is empty).
// The server should get a real number, or null for "no weight" (bodyweight).
// "" is not 0: 0 would mean "I lifted zero pounds", which is not true.
export const toWeight = (inputValue) => {
  if (inputValue === "") {
    return null;
  }
  return Number(inputValue);
};

// Going the other way, for the edit form: the input needs a string.
// Old rows in db.json have no weight at all (undefined), so treat that the
// same as null -> an empty box.
export const toInputValue = (weight) => {
  if (weight === null || weight === undefined) {
    return "";
  }
  return String(weight);
};

// What the list shows. Missing (old rows) and null both read as "Bodyweight".
export const formatWeight = (weight) => {
  if (weight === null || weight === undefined) {
    return "Bodyweight";
  }
  return `${weight} lb`;
};
