import GoalList from "./components/GoalList";
import "./App.css";

const App = () => {
  const courseGoals = [
    { id: "cg1", text: "Finish the Course" },
    { id: "cg2", text: "Learn all about the Course Main Topic" },
    { id: "cg3", text: "Help other students in the Course Q&A" },
  ];

  return (
    <>
      <h1>Course Goals</h1>
      <GoalList goals={courseGoals} />
    </>
  );
};

export default App;
