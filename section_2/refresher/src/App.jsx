import { useState } from "react";

import GoalList from "./components/GoalList/GoalList";
import NewGoal from "./components/NewGoal/NewGoal";
import "./App.css";

const App = () => {
  const [courseGoals, setCourseGoals] = useState([]);

  const addNewGoalHandler = (newGoal) => {
    setCourseGoals((prevCourseGoals) => [newGoal, ...prevCourseGoals]);
  };

  return (
    <>
      <h1>Course Goals</h1>
      <NewGoal onAddGoal={addNewGoalHandler} />
      <GoalList goals={courseGoals} />
    </>
  );
};

export default App;
