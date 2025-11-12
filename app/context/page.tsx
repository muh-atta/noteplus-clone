"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface UIContextType {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  openAddModal: boolean;
  setOpenAddModal: (v: boolean) => void;
  triggerRefresh: boolean;
  setTriggerRefresh: (v: boolean) => void;
}

const UIContext = createContext<UIContextType | null>(null);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [triggerRefresh, setTriggerRefresh] = useState(false);

  return (
    <UIContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        openAddModal,
        setOpenAddModal,
        triggerRefresh,
        setTriggerRefresh,
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
