import { useSearchParams } from "react-router-dom";
import Button from "./Button";
import Input from "./Input";
import Calender from "./Calender";
import { useState } from "react";

export default function SearchComponent() {
  const [, setSearchParams] = useSearchParams();
  const [params, setParams] = useState({
    "date[gte]": "",
    "date[lt]": "",
    contentContains: "",
  });

  function filterData(e) {
    e.preventDefault();
    if (!params["date[gte]"] && !params.contentContains)
      alert("please add any info to search");

    const S_Params = { ...params };
    if (!params.contentContains) delete S_Params.contentContains;
    if (!params["date[gte]"]) {
      delete S_Params["date[gte]"];
      delete S_Params["date[lt]"];
    } else {
      let date = new Date(params["date[gte]"]);
      date.setDate(date.getDate() + 1);
      date = date
        .toLocaleDateString("en-GB", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
        .split(" ")
        .join("-");
      S_Params["date[lt]"] = date;
    }
    setSearchParams(S_Params);
  }

  return (
    <div className="flex flex-col gap-2 bg-slate-200 rounded-3xl p-4 ">
      <h1 className="text-2xl font-semibold">Filter</h1>
      <Input
        name={"content"}
        value={params.contentContains}
        onChange={(val) => setParams({ ...params, contentContains: val })}
      />
      <Calender
        name={"Date"}
        value={params["date[gte]"]}
        setDate={(d) => setParams({ ...params, "date[gte]": d })}
      />
      <div className="w-full flex gap-2 mt-3 justify-between items-center">
        <Button onClick={() => setSearchParams({})}>All Entries</Button>
        <Button onClick={filterData}>Filter</Button>
      </div>
    </div>
  );

  // return (
  //   <div className="flex">
  //     <Button
  //       type={"pill"}
  //       onClick={() => {
  //         navigate("/");
  //       }}
  //     >
  //       all entries
  //     </Button>
  //     <Form className="bg-slate-100 py-1 w-fit rounded-3xl">
  //       <input
  //         className="bg-slate-100 w-16 sm:w-[140px] px-2 mx-2 text-xl py-0 my-0 focus:outline-none rounded-3xl"
  //         type="text"
  //         value={contentContains}
  //         onChange={(e) => setContentContains(e.target.value)}
  //       />
  //       <Button type={"pill"} onClick={filterData}>
  //         search
  //       </Button>
  //     </Form>
  //   </div>
  // );
}
