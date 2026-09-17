import { ChangeEvent } from "react";
import { TaskEditFormProps } from "../../types/types";

const TaskEditForm = ({
  editText,
  setEditText,
  error,
  setError,
  handleKeyDown,
}: TaskEditFormProps) => {
  return (
    <input
      value={editText}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        setEditText(e.target.value);
        if (error) setError("");
      }}
      onKeyDown={handleKeyDown}
      className={`edit-wrapper__input ${error ? "error" : ""}`}
      autoFocus
    />
  );
};

export default TaskEditForm;
