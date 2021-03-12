function Button({ className, onClick, text, type }) {
  let buttonClasses =
    "bg-red-500 hover:bg-red-700 font-semibold rounded px-4 py-2 shadow hover:shadow-md focus:outline-none focus:shadow-outline text-white text-sm sm:text-base";

  if (className) {
    buttonClasses = `${buttonClasses} ${className}`;
  }

  return (
    <button className={buttonClasses} onClick={onClick} type={type}>
      {text}
    </button>
  );
}

Button.defaultProps = {
  onClick: () => {},
  type: "button"
};

export default Button;
