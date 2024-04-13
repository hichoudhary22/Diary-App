import PropTypes from "prop-types";

export default function Button({ onClick, children }) {
  return (
    <button
      className="bg-black text-white py-0 px-2 my-0 rounded-lg border-slate-400"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.string,
};
