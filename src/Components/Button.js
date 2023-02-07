const Button = ({ text, disabled, handler }) => (
    <button
      type="button"
      onClick={handler}
      disabled={disabled}
      className="btn btn-outline-primary rounded-pill "
    >
      {text}
    </button>
  );
  
  export default Button;