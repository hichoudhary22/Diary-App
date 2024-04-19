import { useEffect } from "react";
import { useDataContext } from "../contexts/DataContext";

import DiaryEntriesListItem from "../components/DiaryEntriesListItem";
import SearchComponent from "../components/SearchComponent";
import { useSearchParams } from "react-router-dom";
import SearchSummary from "../components/SearchSummary";

export default function DiaryHomePage() {
  const [{ diaryEntries }, dispatch] = useDataContext();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchData();
    async function fetchData() {
      const serverRootUrl = import.meta.env.VITE_SERVER_ROOT_URL;

      dispatch({ type: "setIsLoading", isLoading: true });
      try {
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
        dispatch({ type: "setIsLoading", isLoading: false });
        dispatch({
          type: "setData",
          userDiaryData,
        });
      } catch (er) {
        alert(er.message);
      }
    }
  }, [searchParams, dispatch]);

  return (
    <div className="flex gap-2">
      <div className="hidden sm:block min-w-[250px]">
        <SearchComponent />
      </div>
      <div className="flex flex-col flex-grow">
        <SearchSummary />
        {diaryEntries?.length === 0 ? (
          <DiaryEntriesListItem entry={"none"} />
        ) : (
          <div className="overflow-y-scroll h-[85vh] border-2 border-white rounded-md px-1">
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
