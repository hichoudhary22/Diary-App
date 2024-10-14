import { useDataContext } from "../contexts/DataContext";
import DiaryEntriesListItem from "../components/DiaryEntriesListItem";
import SearchComponent from "../components/SearchComponent";
import SearchSummary from "../components/SearchSummary";
import diaryHomePageHelper from "../helperFunctions/diaryHomePageHelper";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default function DiaryHomePage() {
  const [{ diaryEntries }, dispatch] = useDataContext();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      dispatch({ type: "setIsLoading", isLoading: true });
      const response = await diaryHomePageHelper(searchParams);
      const responseJson = await response.json();
      dispatch({ type: "setIsLoading", isLoading: false });
      if (response.status !== 200) {
        alert(responseJson.message);
        navigate("/");
        return;
      }
      dispatch({ type: "setData", userDiaryData: responseJson });
    })();
  }, [diaryEntries.length, dispatch, searchParams, navigate]);

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
