import "../GoalList/GoalList.css";

const GoalList = (props) => {
  return (
    <ul className="goal-list">
      {props.goals.length === 0 ? (
        <p>Add your first goal!</p>
      ) : (
        props.goals.map((goal) => {
          return <li key={goal.id}>{goal.text}</li>;
        })
      )}
    </ul>
  );
};

export default GoalList;
