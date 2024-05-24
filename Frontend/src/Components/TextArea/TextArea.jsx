import PropTypes from "prop-types";
const TextArea = ({
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
      <textarea
        className="w-full p-2 text-sm border-[1px] text-black border-black rounded-md h-44 disabled:cursor-no-drop"
        type={inputType}
        name={fieldName}
        maxLength={500}
        defaultValue={value}
        id={fieldName}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

TextArea.propTypes = {
  title: PropTypes.string.isRequired,
  fieldName: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  inputType: PropTypes.string,
  value: PropTypes.any,
};

export default TextArea;
