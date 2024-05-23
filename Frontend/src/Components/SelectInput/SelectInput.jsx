const SelectInput = ({ title, fieldName, required, disabled, children }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm" htmlFor={fieldName}>
        {title}
        {required && "*"}
      </label>
      <select
        name={fieldName}
        className="w-full p-2 text-sm border-[1px] border-black rounded-md focus:outline-none disabled:cursor-no-drop"
        disabled={disabled}
        required={required}
      >
        {children}
      </select>
    </div>
  );
};

export default SelectInput;
