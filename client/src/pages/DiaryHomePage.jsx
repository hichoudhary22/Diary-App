import { useEffect } from "react";
import { useDataContext } from "../contexts/DataContext";

import DiaryEntriesListItem from "../components/DiaryEntriesListItem";
import SearchComponent from "../components/SearchComponent";
import fetchData from "../utils/fetchData";
import { useSearchParams } from "react-router-dom";
import SearchSummary from "../components/SearchSummary";
import Loading from "../components/Loading";

export default function DiaryHomePage() {
  const [{ isLoading, diaryEntries }, dispatch] = useDataContext();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    (async () => {
      dispatch({ type: "setIsLoading", isLoading: true });
      const userDiaryData = await fetchData(searchParams.toString());
      dispatch({ type: "setIsLoading", isLoading: false });
      dispatch({
        type: "setData",
        userDiaryData,
      });
    })();
  }, [searchParams, dispatch]);

  return (
    <div className="flex gap-2">
      {isLoading && <Loading />}
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
