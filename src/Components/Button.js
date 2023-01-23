const Button = ({ text, disabled, handler }) => (
    <button
      type="button"
      onClick={handler}
      disabled={disabled}
      className="btn btn-primary"
    >
      {text}
    </button>
  );
  
  export default Button;