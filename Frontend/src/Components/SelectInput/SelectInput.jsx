import PropTypes from "prop-types";
const SelectInput = ({
  title,
  fieldName,
  required,
  disabled,
  children,
  value,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm" htmlFor={fieldName}>
        {title}
        {required && "*"}
      </label>
      <select
        name={fieldName}
        className="w-full p-2 text-sm border-[1px] text-black border-black rounded-md focus:outline-none disabled:cursor-no-drop"
        disabled={disabled}
        defaultValue={value}
        required={required}
      >
        {children}
      </select>
    </div>
  );
};

SelectInput.propTypes = {
  title: PropTypes.string.isRequired,
  fieldName: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.any,
  value: PropTypes.any,
};

export default SelectInput;
