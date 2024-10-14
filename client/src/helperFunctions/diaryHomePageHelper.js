export default async function diaryHomePageHelper(searchParams) {
  const serverRootUrl = import.meta.env.VITE_SERVER_ROOT_URL;
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
    return response;
  } catch (er) {
    alert(
      "Could not FETCH!!!\nCheck your Network and Try Again\nDiary HomePage Helper"
    );
    console.log(er);
  }
}
