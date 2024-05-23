const Button = ({ title, handleClick, disabled }) => {
  return (
    <button
      className="px-4 py-2 text-lime-950 font-semibold border-[1px] border-lime-950  rounded-3xl text-sm hover:text-white  hover:bg-[#3f6212] disabled:cursor-no-drop"
      onClick={() => handleClick()}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default Button;
