const Button = ({ text, disabled, handler }) => (
    <button
      type="button"
      onClick={handler}
      disabled={disabled}
      className="btn rounded-pill btn-ouline-primary-no-hover"
    >
      {text}
    </button>
  );
  
  export default Button;