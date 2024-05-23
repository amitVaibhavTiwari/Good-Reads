const FillButton = ({ title, handleClick, fullWidth, type, disabled }) => {
  return (
    <button
      disabled={disabled}
      type={type ? type : "button"}
      className={`px-4 py-2 text-white bg-[#1a2e05] rounded-3xl text-sm hover:bg-[#3f6212] ${
        fullWidth ? "w-full" : "w-fit"
      } disabled:opacity-50 disabled:cursor-no-drop`}
      onClick={handleClick ? () => handleClick() : null}
    >
      {title}
    </button>
  );
};

export default FillButton;
