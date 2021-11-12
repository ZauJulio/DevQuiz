import { ReactNode, useState } from "react";
import { UserContext } from "./context";

interface UserContextProviderProps {
  children?: ReactNode;
}

export function UserContextProvider(props: UserContextProviderProps) {
  const [username, setUsername] = useState("");
  const [dificulty, setDificulty] = useState("easy");

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        dificulty,
        setDificulty,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
