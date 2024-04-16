export default async function fetchData(searchParameters) {
  const serverRootUrl = import.meta.env.VITE_SERVER_ROOT_URL;
  const response = await fetch(`${serverRootUrl}/diary?${searchParameters}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const searchedData = await response.json();
  return searchedData;
}
