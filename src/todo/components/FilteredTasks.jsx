import { useTodo } from "../context/ToDoContext";

const FilteredTasks = () => {
  const { filter, setFilter, activeCount, clearCompeted } = useTodo();

  return (
    <div className="todo__footer">
      <div className="filters">
        <button
          className={`filters__btn ${filter === "all" ? "filters__btn--active" : ""}`}
          onClick={() => setFilter("all")}
        >
          Все
        </button>
        <button
          className={`filters__btn ${filter === "active" ? "filters__btn--active" : ""}`}
          onClick={() => setFilter("active")}
        >
          Активные
        </button>
        <button
          className={`filters__btn ${filter === "completed" ? "filters__btn--active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Завершенные
        </button>
      </div>
      <div className="footer">
        <p className="todo__counter">Осталось дел: {activeCount}</p>
        <button
          className="todo__clear-completed"
          onClick={() => clearCompeted()}
        >
          Очистить выполненные
        </button>
      </div>
    </div>
  );
};

export default FilteredTasks;
