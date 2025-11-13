"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface UIContextType {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  openAddModal: boolean;
  setOpenAddModal: (v: boolean) => void;
  triggerRefresh: boolean;
  setTriggerRefresh: (v: boolean) => void;
  userName: string;
  setUserName: (name: string) => void;
}

const UIContext = createContext<UIContextType | null>(null);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [triggerRefresh, setTriggerRefresh] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("userSession");
    console.log("userSession", storedUser);

    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUserName(parsed.user?.name || "");
    }
  }, []);

  return (
    <UIContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        openAddModal,
        setOpenAddModal,
        triggerRefresh,
        setTriggerRefresh,
        userName,
        setUserName,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
};
