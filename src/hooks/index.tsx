import { createContext, useContext } from "react";

export const AuthContext = createContext(false);
export function useAuthContext() {
    return useContext(AuthContext);
}