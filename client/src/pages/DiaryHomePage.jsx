import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useDataContext } from "../contexts/DataContext";

import DiaryEntriesListItem from "../components/DiaryEntriesListItem";
import SearchComponent from "../components/SearchComponent";
import CalendarComponent from "../components/CalendarComponent";
import fetchData from "../utils/fetchData";

export default function DiaryHomePage() {
  const [{ activeDate, diaryEntries }, dispatch] = useDataContext();

  const [searchParams] = useSearchParams();

  let searchSummary = "";
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
    (async () => {
      const userDiaryData = await fetchData(searchParams.toString());
      dispatch({
        type: "setData",
        userDiaryData,
      });
    })();
  }, [searchParams, dispatch]);

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <div className="flex md:flex-col min-w-[330px]">
        <SearchComponent />
        <CalendarComponent />
      </div>
      <div className="flex flex-col flex-grow">
        <div className="text-3xl">{searchSummary}</div>
        {diaryEntries?.length === 0 ? (
          <DiaryEntriesListItem entry={"none"} />
        ) : (
          <div className="overflow-scroll h-5/6">
            <ul>
              {diaryEntries?.map((entry) => (
                <DiaryEntriesListItem entry={entry} key={entry._id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
