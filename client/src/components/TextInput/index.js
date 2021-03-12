function TextInput({
  className,
  error,
  hiddenLabel,
  id,
  inputWidthClass,
  label,
  name,
  onChange,
  placeholder,
  type,
  value,
  ...rest
}) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className={`block font-semibold ${hiddenLabel && "sr-only"}`}
      >
        {label}
      </label>
      <input
        className={`appearance-none bg-transparent focus:bg-gray-100 border-b-2 border-red-500 focus:border-red-700 focus:outline-none mr-2 px-3 py-2 text-gray-800 text-sm sm:text-base ${inputWidthClass}`}
        id={id}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        value={value}
        {...rest}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

TextInput.defaultProps = {
  inputWidthClass: "w-auto",
  type: "text"
};

export default TextInput;
