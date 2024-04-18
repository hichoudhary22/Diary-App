export default function Input({ name, type, value, onChange, flexDir }) {
  return (
    <div className={`w-full ${flexDir}`}>
      <label className="mx-1 text-md capitalize" htmlFor={name}>
        {name}
      </label>
      {type === "textArea" ? (
        <textarea
          className="text-xl rounded-md px-2 text-justify"
          rows="10"
          //   type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        >
          {value}
        </textarea>
      ) : (
        <input
          className="text-md rounded-md p-2"
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}

Input.defaultProps = {
  flexDir: "flex flex-col",
  type: "text",
};
