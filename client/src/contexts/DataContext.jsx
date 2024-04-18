import { createContext, useContext, useReducer } from "react";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [data, dispatch] = useReducer(dataReducer, initialData);
  return (
    <DataContext.Provider value={{ data, dispatch }}>
      {children}
    </DataContext.Provider>
  );
}
export function useDataContext() {
  const dataContextArray = useContext(DataContext);
  return [dataContextArray.data, dataContextArray.dispatch];
}

const initialData = {
  isLoading: false,
  // token:"",
  auth: false,
  userId: "",
  userName: "",
  userEmail: "",
  noOfEntries: "",
  diaryEntries: [],
  // ---------------
  // activeDate: {},
  // contentContains: "",
};

function dataReducer(data, action) {
  switch (action.type) {
    case "setData":
      return {
        ...data,
        ...action.userDiaryData,
      };
    case "deleteOneEntry":
      return {
        ...data,
        diaryEntries: data.diaryEntries.filter((el) => el._id !== action.id),
      };
    case "resetData":
      return initialData;
    case "setActiveDate":
      return { ...data, activeDate: action.activeDate };
    case "setContentContains":
      return {
        ...data,
        contentContains: action.contentContains,
      };
    case "setIsLoading":
      return { ...data, isLoading: action.isLoading };
    case "setAuth":
      return { ...data, auth: action.auth };
    default:
      return "something went wrong ";
  }
}
