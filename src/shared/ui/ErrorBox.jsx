const ErrorBox = ({ error }) => {
  return (
    <div className="error-box">
      <span className="error-icon">⚠️</span>
      <span className="error-text">{error}</span>
    </div>
  );
};

export default ErrorBox;
