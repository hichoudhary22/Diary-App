export default async function loginHelper(userInfo) {
  const serverRootUrl = import.meta.env.VITE_SERVER_ROOT_URL;

  try {
    const response = await fetch(`${serverRootUrl}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      withCredntials: true, //this line did not make any difference in receiving cookie
      credentials: "include", //this however allowed to capture cookie
      mode: "cors",
      body: JSON.stringify(userInfo),
    });
    return response;
  } catch (er) {
    alert(
      "Could not FETCH!!!\nCheck your Network and Try Again loginpage helper"
    );
    console.log(er);
  }
}
