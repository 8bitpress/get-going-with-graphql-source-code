function Select({
  className,
  hiddenLabel,
  id,
  label,
  name,
  onChange,
  options,
  selectWidthClass,
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
      <div className={`inline-block relative w-64 ${selectWidthClass}`}>
        <select
          className={`block appearance-none w-full bg-white focus:bg-gray-100 border-b-2 border-red-500 hover:border-red-700 px-4 py-2 pr-8 leading-tight focus:outline-none w-full`}
          id={id}
          name={name}
          onChange={onChange}
          value={value}
          {...rest}
        >
          {options.map(({ text, value }) => (
            <option key={value} value={value}>
              {text}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Select;
