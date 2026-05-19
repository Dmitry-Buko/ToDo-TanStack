import FilteredTasks from "./FilteredTasks";
import InputTask from "./InputTask";
import ToDoList from "./ToDoList";

const ToDo = () => {
  return (
    <>
      <InputTask />
      <ToDoList />
      <FilteredTasks />
    </>
  );
};

export default ToDo;
