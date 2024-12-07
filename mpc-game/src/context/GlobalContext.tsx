import { createContext, ReactNode, useState } from "react";

interface GlobalContextProps {
  someValue: string; // Define the data or state to share via context
  setSomeValue: (value: string) => void; // Define the function to update the state
}

export const GlobalContext = createContext<GlobalContextProps | undefined>(
  undefined
);

export default function GlobalContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [someValue, setSomeValue] = useState("defaultValue"); // Example state

  return (
    <GlobalContext.Provider
      value={{
        someValue,
        setSomeValue,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
