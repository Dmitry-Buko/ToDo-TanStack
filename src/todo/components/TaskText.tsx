import { Task } from "../../types/types";

const TaskText = ({ task }: { task: Task }) => {
  return (
    <p className={`task__text ${task.completed ? "done" : ""}`}>{task.title}</p>
  );
};

export default TaskText;
