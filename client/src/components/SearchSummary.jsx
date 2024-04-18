import { useSearchParams } from "react-router-dom";

export default function SearchSummary() {
  const [searchParams] = useSearchParams();

  let searchSummary = "";
  if (searchParams.get("date[gte]")) {
    searchSummary += `Yours Entries of Date ${searchParams.get("date[gte]")}`;
  }
  if (searchParams.get("contentContains")) {
    searchSummary += ` and Entries Containing "${searchParams.get(
      "contentContains"
    )}"`;
  } else {
    searchSummary = "All Entries :-";
  }
  return <div className="text-2xl">{searchSummary}</div>;
}
