const TaskText = ({task}) => {
  return (
    <p className={`task__text ${task.completed ? "done" : ""}`}>
      {task.title}
    </p>
  );
};

export default TaskText;
