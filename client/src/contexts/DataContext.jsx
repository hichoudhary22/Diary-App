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
export function useData() {
  const { data } = useContext(DataContext);
  return data;
}
export function useDataDispatch() {
  const { dispatch } = useContext(DataContext);
  return dispatch;
}

const initialData = {
  // token:"",
  userName: "",
  diaryEntries: [],
};

function dataReducer(data, action) {
  switch (action.type) {
    case "setData":
      return {
        ...data,
        userName: action.userName,
        diaryEntries: action.diaryEntries,
      };
    case "deleteOneEntry":
      return {
        ...data,
        diaryEntries: data.diaryEntries.filter((el) => el._id !== action.id),
      };
    case "resetData":
      return initialData;
    default:
      return "something went wrong ";
  }
}
