import React from "react";

const TextArea = ({ title, fieldName, required, disabled, inputType }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm" htmlFor={fieldName}>
        {title}
        {required && "*"}
      </label>
      <textarea
        className="w-full p-2 text-sm border-[1px] border-black rounded-md h-44 disabled:cursor-no-drop"
        type={inputType}
        name={fieldName}
        id={fieldName}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

export default TextArea;
