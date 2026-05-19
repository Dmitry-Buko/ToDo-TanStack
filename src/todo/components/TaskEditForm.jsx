const TaskEditForm = ({
  editText,
  setEditText,
  error,
  setError,
  handleKeyDown,
}) => {
  return (
    <input
      value={editText}
      onChange={(e) => {
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
