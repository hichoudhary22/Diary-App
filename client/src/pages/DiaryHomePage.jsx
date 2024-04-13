import { useEffect, useState } from "react";
import DiaryEntriesList from "../components/DiaryEntriesList";
import { useData, useDataDispatch } from "../contexts/DataContext";
import { Form, useNavigate, useSearchParams } from "react-router-dom";
import Calender from "../components/Calender";
import calenderImg from "../assets/calender.png";

export default function DiaryHomePage() {
  const data = useData();
  const navigate = useNavigate();
  const dataDispatch = useDataDispatch();
  const [contentContains, setContentContains] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeDate, setActiveDate] = useState("None");

  let searchSummary = "";

  const [showCalender, setShowCalender] = useState(false);

  if (searchParams.get("date[gte]")) {
    searchSummary = `Yours Entries of Date ${activeDate} :-`;
  } else if (searchParams.get("contentContains")) {
    searchSummary = `Entries Containing "${searchParams.get(
      "contentContains"
    )}" :-`;
  } else {
    searchSummary = "All Entries :-";
  }

  useEffect(() => {
    const serverRootUrl = import.meta.env.VITE_SERVER_ROOT_URL;
    async function fetchDiary() {
      const response = await fetch(
        `${serverRootUrl}/diary?${searchParams.toString()}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const userDiaryData = await response.json();
      dataDispatch({
        type: "setData",
        userName: userDiaryData.user,
        diaryEntries: userDiaryData.diaryEntries,
      });
      setContentContains("");
    }
    fetchDiary();
  }, [dataDispatch, searchParams]);

  function searchFunction(e) {
    e.preventDefault();
    if (!contentContains) return;
    setSearchParams({ contentContains });
  }

  return (
    <>
      <div className="flex justify-end gap-2">
        <button
          className="bg-black text-white text-sm rounded-3xl px-4"
          onClick={() => {
            setSearchParams("");
            setActiveDate("None");
          }}
        >
          ALL ENTRIES
        </button>

        <div className="lg:hidden self-end">
          <button
            className="h-8 w-8 sm:h-10 sm:w-10"
            onClick={() => setShowCalender((val) => !val)}
          >
            <img src={calenderImg} />
          </button>
          {showCalender && (
            <div className="fixed right-4 m-4 bg-slate-100 rounded-3xl p-4 bg-opacity-[0.93]">
              <Calender
                activeDate={activeDate}
                setActiveDate={setActiveDate}
                setSearchParams={setSearchParams}
              />
            </div>
          )}
        </div>

        <Form className="bg-slate-100 py-1 w-fit rounded-3xl">
          <input
            className="bg-slate-100 w-20 sm:w-[140px] px-2 mx-2 text-xl py-0 my-0 focus:outline-none rounded-3xl"
            type="text"
            value={contentContains}
            onChange={(e) => setContentContains(e.target.value)}
          />
          <button
            className="h-full bg-black text-white rounded-3xl px-2 py-[3px] mx-[5px]"
            onClick={(e) => searchFunction(e)}
          >
            search
          </button>
        </Form>
      </div>
      <div className="flex flex-col lg:flex-row lg:gap-4">
        <div className="hidden lg:block lg:w-1/4">
          <Calender
            activeDate={activeDate}
            setActiveDate={setActiveDate}
            setSearchParams={setSearchParams}
          />
        </div>
        <div className="lg:w-3/4">
          <div className="text-3xl flex justify-between">{searchSummary}</div>
          {data?.diaryEntries?.length === 0 ? (
            <p className="px-4 border-2 border-white rounded-md my-2 py-4 text-2xl font-semibold">
              seems like you do not have any entry, create
              <span
                className="bg-black p-2 text-white font-thin rounded-lg border-slate-400 mx-2 text-xl cursor-pointer"
                onClick={() => {
                  navigate("/diary/newEntry");
                }}
              >
                new entry
              </span>
            </p>
          ) : (
            <div className="overflow-scroll h-5/6">
              <ul>
                {data?.diaryEntries?.map((entry) => (
                  <DiaryEntriesList entry={entry} key={entry._id} />
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
