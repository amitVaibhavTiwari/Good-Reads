import PropTypes from "prop-types";

const Button = ({ title, handleClick, disabled }) => {
  return (
    <button
      className="px-4 py-2 text-lime-950 font-semibold border-[1px] border-lime-950  rounded-3xl text-sm hover:text-white  hover:bg-[#3f6212] disabled:cursor-no-drop dark:border-lime-700 dark:text-lime-600 dark:hover:bg-lime-200"
      onClick={() => handleClick()}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Button;
