import PropTypes from "prop-types";

const FillButton = ({ title, handleClick, fullWidth, type, disabled }) => {
  return (
    <button
      disabled={disabled}
      type={type ? type : "button"}
      className={`px-4 py-2 text-white bg-lime-950 dark:bg-lime-900 rounded-3xl text-sm hover:bg-lime-700 dark:hover:bg-lime-950 ${
        fullWidth ? "w-full" : "w-fit"
      } disabled:opacity-50 disabled:cursor-no-drop`}
      onClick={handleClick ? () => handleClick() : null}
    >
      {title}
    </button>
  );
};

FillButton.propTypes = {
  title: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  type: PropTypes.string,
};

export default FillButton;
