/* eslint-disable @typescript-eslint/no-explicit-any */
import App from "@/mpc-hello/src/App";
import {createContext, ReactNode, useState} from "react";

interface GlobalContextProps {
  someValue: string; // Define the data or state to share via context
  setSomeValue: (value: string) => void; // Define the function to update the state
  app: any;
}

const app = new App();

export const GlobalContext = createContext<GlobalContextProps>({
  someValue: "defaultValue",
  setSomeValue: () => {},
  app: app,
});

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
        app,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
