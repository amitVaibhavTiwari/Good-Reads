const formatNum = (num) => {
  return new Intl.NumberFormat("en-IN").format(num);
};
const RangeInput = ({
  title,
  fieldName,
  required,
  disabled,
  maxValue,
  value,
  step,
}) => {
  return (
    <div className=" w-full p-1 flex flex-col gap-1 ">
      <label className="text-sm" htmlFor={fieldName}>
        {title}
      </label>
      <input
        className="h-2"
        min={0}
        max={maxValue}
        step={step}
        type="range"
        //   value={value}
        name={fieldName}
        id={fieldName}
        disabled={disabled}
        required={required}
        //   onChange={(e) => setValue(e.target.value)}
      />
      <div className=" text-[.8rem] mt-1 flex items-center justify-between">
        <h1>{formatNum(value)}</h1>
        <h1> {formatNum(maxValue)} </h1>
      </div>
      {/* <h1 className="actual-amount-value">{formatNum(value) + "₹"}</h1> */}
    </div>
  );
};

export default RangeInput;
