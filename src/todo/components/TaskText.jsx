const TaskText = ({task}) => {
  return (
    <p className={`task__text ${task.isCompleted ? "done" : ""}`}>
      {task.title}
    </p>
  );
};

export default TaskText;
