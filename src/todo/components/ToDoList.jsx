import { useTodo } from "../context/ToDoContext";
import Task from "./Task";

const ToDoList = () => {
  const { filteredTasks, error, isLoading, isError } = useTodo();
  
  if (isLoading) return <h1 className="nothing">Загрузка...</h1>;
  if (isError) return <h1 className="nothing">{error}</h1>;
  if (filteredTasks.length === 0) return <h1 className="nothing">Пусто 🤷🏼‍♂️</h1>;

  return (
    <div className="tasks-list">
      {filteredTasks.map((item) => (
        <Task key={item.id} task={item} />
      ))}
    </div>
  );
};

export default ToDoList;
