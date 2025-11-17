"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useSession } from "next-auth/react";
interface UIContextType {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  openAddModal: boolean;
  setOpenAddModal: (v: boolean) => void;
  triggerRefresh: boolean;
  setTriggerRefresh: (v: boolean) => void;
  userName: string;
  setUserName: (name: string) => void;
  userId: string;
  setUserId: (userId: string) => void;
  sessionLoading: boolean;
}

const UIContext = createContext<UIContextType | null>(null);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();

  const [searchQuery, setSearchQuery] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [triggerRefresh, setTriggerRefresh] = useState(false);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const sessionLoading = status === "loading";

  useEffect(() => {
    if (status === "authenticated" && session?.user?.name) {
      setUserName(session.user.name);
      setUserId(session.user.id)
    } else if (status === "unauthenticated") {
      setUserName("");
    }

  }, [session, status]);


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
        userId,
        setUserId,
        sessionLoading,
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
