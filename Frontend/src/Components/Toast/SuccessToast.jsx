import PropTypes from "prop-types";
const SuccessToast = ({ toast, message }) => {
  return (
    <div
      className={`${
        toast.visible ? "animate-enter" : "animate-leave"
      } bg-green-500 p-4 rounded-3xl w-64 lg:w-72 lg:p-6`}
    >
      <h1 className="text-base lg:text-[1.1rem] text-center font-semibold text-white">
        {message}
      </h1>
    </div>
  );
};

SuccessToast.propTypes = {
  message: PropTypes.string.isRequired,
  toast: PropTypes.any.isRequired,
};

export default SuccessToast;
