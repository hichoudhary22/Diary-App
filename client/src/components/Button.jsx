import PropTypes from "prop-types";

//className="bg-black text-white rounded-3xl px-6 py-[3px] mx-[5px]"

export default function Button({ onClick, children, type }) {
  const style =
    type === "pill"
      ? "min-w-max h-full bg-black text-white rounded-3xl px-2 py-[3px] mx-[5px]"
      : " bg-black text-white px-3 h-fit py-[6px] mx-1 rounded-lg";

  return (
    <button className={style} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.string,
  type: PropTypes.string,
};
