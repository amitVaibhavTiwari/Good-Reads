import PropTypes from "prop-types";
const FormInput = ({
  title,
  fieldName,
  required,
  disabled,
  inputType,
  value,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm" htmlFor={fieldName}>
        {title}
        {required && "*"}
      </label>
      <input
        className="w-full p-2 text-sm border-[1px] border-black text-black rounded-md focus:outline-none disabled:cursor-no-drop"
        type={inputType}
        name={fieldName}
        id={fieldName}
        defaultValue={value}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

FormInput.propTypes = {
  title: PropTypes.string.isRequired,
  fieldName: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  handleClick: PropTypes.func,
  inputType: PropTypes.string,
  value: PropTypes.any,
};

export default FormInput;
