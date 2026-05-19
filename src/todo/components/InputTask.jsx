import { useCallback, useState } from "react";
import { useTodo } from "../context/ToDoContext";
import ErrorBox from "../../shared/ui/ErrorBox";

const InputTask = () => {
  const { addTask, loadingAddTask } = useTodo();
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const success = await addTask(text, setError);
      if (success) {
        setText("");
        setError("");
      }
      setText("");
    },
    [addTask, text],
  );

  return (
    <div className="todo__add-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => {
            if (error) setError("");
            setText(e.target.value);
          }}
          className={`todo__input-task ${error ? "error" : ""}`}
          placeholder="Новая задача..."
        />
        <button className="add-task-form__submit" type="submit">
          {loadingAddTask ? "Добавление..." : "Добавить ➕"}
        </button>
      </form>
      {error && <ErrorBox error={error} />}
    </div>
  );
};

export default InputTask;
