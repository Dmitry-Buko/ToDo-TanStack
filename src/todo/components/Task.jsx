import { useCallback, useState } from "react";
import { useTodo } from "../context/ToDoContext";
import ErrorBox from "../../shared/ui/ErrorBox";
import TaskText from "./TaskText";
import TaskEditForm from "./TaskEditForm";

const Task = ({ task }) => {
  const {
    deleteTask,
    isDoneToggler,
    editTitle,
    loading,
    loadingDeleteTask,
    loadingChangeTask,
  } = useTodo();

  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(task.title || "");
  const [error, setError] = useState("");

  const validateAndSave = useCallback(
    async (text) => {
      const success = await editTitle(task.id, text, setError);
      if (success) {
        setError("");
        setIsEdit(false);
        setEditText(text);
        return true;
      }
      return false;
    },
    [editTitle, task.id],
  );

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      await validateAndSave(editText);
    } else if (e.key === "Escape") {
      setIsEdit(false);
      setEditText(task.title);
      setError("");
    }
  };

  const toggleEdit = async () => {
    if (isEdit) {
      await validateAndSave(editText);
    } else {
      setIsEdit(true);
      setError("");
    }
  };

  return (
    <div className="task">
      <input
        type="checkbox"
        className="task__checkbox"
        checked={!!task.isCompleted}
        onChange={() => isDoneToggler(task.id)}
      />

      <div className="task__content">
        {isEdit ? (
          <div className="edit-wrapper">
            <TaskEditForm
              editText={editText}
              setEditText={setEditText}
              error={error}
              setError={setError}
              handleKeyDown={handleKeyDown}
            />
            {error && <ErrorBox error={error} />}
          </div>
        ) : (
          <TaskText task={task} />
        )}
      </div>

      <div className="task__actions">
        <button
          onClick={toggleEdit}
          disabled={loading}
          className="task__btn--edit"
        >
          {isEdit
            ? "Сохранить ✅"
            : loadingChangeTask
              ? "Изменение.."
              : "Изменить ✍️"}
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          disabled={loading}
          className="task__btn--delete"
        >
          {loadingDeleteTask ? "Удаление.." : "Удалить 🗑"}
        </button>
      </div>
    </div>
  );
};

export default Task;
