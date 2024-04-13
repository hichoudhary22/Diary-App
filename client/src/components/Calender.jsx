import { useState } from "react";

export default function Calender({
  activeDate,
  setActiveDate,
  setSearchParams,
}) {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "Nobember",
    "December",
  ];

  let calStr = "";

  const d = new Date(year, month);
  const lastDate = new Date(year, month + 1, 0).getDate();

  calStr += "<table><tr>";

  weekDays.map((weekDay) => (calStr += `<th>${weekDay}</th>`));

  calStr += "</tr><tr>";

  for (let i = 0; i < d.getDay(); i++) {
    calStr += "<td></td>";
  }

  const today = new Date();

  for (let i = 1; i <= lastDate; i++) {
    if (d.getMonth() === month) {
      let todayClass =
        d.getDate() === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
          ? "active"
          : "";
      calStr += `<td class="${todayClass}">${d.getDate()}</td>`;
    }
    if (d.getDay() === 6) calStr += "</tr><tr>";
    d.setDate(d.getDate() + 1);
  }
  calStr += "</tr></table>";

  function handelClick(e) {
    const d = Number(e.target.innerHTML);
    if (setSearchParams) {
      const params = {
        "date[gte]": `${year}-${month + 1}-${d}`,
        "date[lt]": `${year}-${month + 1}-${d + 1}`,
      };
      setSearchParams(params);
    }
    setActiveDate(`${d}-${monthArray[month]}-${year}`);
  }

  return (
    <div className="w-full">
      <div className="flex justify-between bg-slate-100 py-1 my-2 rounded-3xl">
        <button
          className="bg-black text-white rounded-3xl px-6 py-[3px] mx-[5px]"
          onClick={() => setYear(year - 1)}
        >
          &lt;
        </button>
        <p className="font-semibold text-xl">{year}</p>
        <button
          className="bg-black text-white rounded-3xl px-6 py-[3px] mx-[5px]"
          onClick={() => setYear(year + 1)}
        >
          &gt;
        </button>
      </div>
      <div className="flex justify-between bg-slate-100 py-1 my-2 rounded-3xl">
        <button
          className="bg-black text-white rounded-3xl px-6 py-[3px] mx-[5px]"
          onClick={() => {
            if (month > 0) setMonth((m) => m - 1);
            else {
              setMonth(11);
              setYear((y) => y - 1);
            }
          }}
        >
          &lt;
        </button>
        <p className="font-semibold text-xl">{monthArray[month]}</p>
        <button
          className="bg-black text-white rounded-3xl px-6 py-[3px] mx-[5px]"
          onClick={() => {
            if (month < 11) setMonth((m) => m + 1);
            else {
              setMonth(0);
              setYear((y) => y + 1);
            }
          }}
        >
          &gt;
        </button>
      </div>
      <div
        onClick={(e) => handelClick(e)}
        dangerouslySetInnerHTML={{ __html: calStr }}
      ></div>
      <p className="flex justify-between bg-slate-100 text-xl px-2 py-1 my-2 rounded-3xl">
        Active Date is{" "}
        <span className="bg-black text-white rounded-3xl px-6 mx-[1px]">
          {activeDate}
        </span>
      </p>
    </div>
  );
}
