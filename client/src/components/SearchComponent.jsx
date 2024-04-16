import { Form, useNavigate, useSearchParams } from "react-router-dom";
import Button from "./Button";
import { useDataContext } from "../contexts/DataContext";

export default function SearchComponent() {
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();
  const [{ contentContains, activeDate }, dispatch] = useDataContext();

  function setContentContains(val) {
    dispatch({ type: "setContentContains", contentContains: val });
  }

  function filterData(e) {
    e.preventDefault();
    const S_Params = {};
    if (Object.keys(activeDate).length !== 0) S_Params.activeDate = activeDate;
    if (contentContains) S_Params.contentContains = contentContains;
    setSearchParams(S_Params);
  }

  return (
    <div className="flex">
      <Button
        type={"pill"}
        onClick={() => {
          navigate("/");
        }}
      >
        all entries
      </Button>
      <Form className="bg-slate-100 py-1 w-fit rounded-3xl">
        <input
          className="bg-slate-100 w-16 sm:w-[140px] px-2 mx-2 text-xl py-0 my-0 focus:outline-none rounded-3xl"
          type="text"
          value={contentContains}
          onChange={(e) => setContentContains(e.target.value)}
        />
        <Button type={"pill"} onClick={filterData}>
          search
        </Button>
      </Form>
    </div>
  );
}
