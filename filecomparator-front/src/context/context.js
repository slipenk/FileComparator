import React, { useState, useContext, createContext } from "react";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);
    const data = [auth, setAuth];

    return <AuthContext.Provider value={data}>
        {children}
    </AuthContext.Provider>;

};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("\"useAuth\" може використовуватися лише в \"AuthProvider\"");
    }
    return context;
};

const cont = {
    AuthProvider,
    useAuth,
};

export default cont;

