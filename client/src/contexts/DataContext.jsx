import { createContext, useContext, useReducer, useEffect } from "react";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [data, dispatch] = useReducer(dataReducer, initialData);

  useEffect(() => {
    const checkAuth = async () => {
      const serverRootUrl = import.meta.env.VITE_SERVER_ROOT_URL;
      try {
        const response = await fetch(`${serverRootUrl}/user/check-auth`, {
          credentials: 'include',
        });
        if (response.ok) {
          dispatch({ type: 'setAuth', auth: true });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        dispatch({ type: 'setAuthLoading', authLoading: false });
      }
    };

    checkAuth();
  }, []);

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
  auth: false,
  authLoading: true,
  // token:"",
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
    case "setAuthLoading":
      return { ...data, authLoading: action.authLoading };
    default:
      return "something went wrong ";
  }
}
