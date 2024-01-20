import { useState } from "react";

import "./NewGoal.css";

const NewGoal = (props) => {
  const [enteredText, setEnteredText] = useState("");

  const addGoalHandler = (event) => {
    event.preventDefault();

    if (enteredText.trim().length === 0) {
      alert("You must enter a goal");
      return;
    }

    const newGoal = {
      id: Date.now().toString(),
      text: enteredText,
    };

    props.onAddGoal(newGoal);

    setEnteredText("");
  };

  const textChangeHandler = (event) => {
    setEnteredText(event.target.value);
  };

  return (
    <form className="new-goal" onSubmit={addGoalHandler}>
      <input
        type="text"
        value={enteredText}
        onChange={textChangeHandler}
        placeholder="Enter your goal"
      />
      <button type="submit">Add Goal</button>
    </form>
  );
};

export default NewGoal;
