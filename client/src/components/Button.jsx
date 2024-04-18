import PropTypes from "prop-types";

//className="bg-black text-white rounded-3xl px-6 py-[3px] mx-[5px]"

export default function Button({ onClick, children, type }) {
  let style = "";
  if (type === "pill")
    style =
      "min-w-max h-full bg-black text-white rounded-3xl px-2 py-[3px] mx-[5px]";
  else if (type === "ham")
    style = "bg-slate-200 rounded-md py-2 text-2xl font-semibold";
  else style = "bg-black text-white px-3 h-fit py-[6px] mx-1 rounded-lg";

  // className="bg-black text-white rounded-lg my-2 p-4 border-slate-400 text-xl font-bold"

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
