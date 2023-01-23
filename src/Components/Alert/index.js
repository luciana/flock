const Alert = ({ type, text }) => (
    <div
      role="alert" 
      className={`py-3 alert 
      ${!text && "d-none"} ${
        type === "error"
          ? "alert-danger"
          : type === "info"
          ? "alert-info"
          : "alert-secondary"
      }`}
    >
    {text}
    </div>
  );
  
  export default Alert;