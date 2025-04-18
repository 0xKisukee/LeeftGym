import { createContext, useContext, useState, useEffect } from 'react';
import {getValueFor} from "../api/jwt";
import {me} from "../api/login";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [isAuth, setIsAuth] = useState(false);
    const [userInfos, setUserInfos] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState(null);

    const refreshUser = async () => {
        console.log("Fetching user");
        setIsLoading(true);

        const currentToken = await getValueFor("userJWT");
        console.log("starting fetching user in user context");
        
        // Update token state to trigger useEffect
        setToken(currentToken);

        if (!currentToken) {
            console.log("no token - no auth");
            setIsAuth(false);
            setIsLoading(false);
            return;
        }

        console.log("now trying to call me() function from user context");
        const data = await me();

        if (!data.userId) {
            console.log("wrong token - probably expired");
            setIsAuth(false);
            setIsLoading(false);
            return;
        }

        console.log("user infos caught by user context:", data);
        setUserInfos(data);
        setIsAuth(true);
        setIsLoading(false);
    };

    // This effect will run when the component mounts and when isAuth changes
    useEffect(() => {
        refreshUser();
    }, [isAuth]);

    return (
        <UserContext.Provider value={{ userInfos, setUserInfos, isAuth, setIsAuth, isLoading, refreshUser }}>
            {children}
        </UserContext.Provider>
    );
}