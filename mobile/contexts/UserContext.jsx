import { createContext, useContext, useState, useEffect } from 'react';
import {getValueFor} from "../api/jwt";
import {me} from "../api/login";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [isAuth, setIsAuth] = useState(false);
    const [userInfos, setUserInfos] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            console.log("Fetching user");
            setIsLoading(true);

            const token = await getValueFor("userJWT");
            console.log("starting fetching user in user context");

            if (!token) {
                console.log("no token - no auth");
                setIsAuth(false);
                setIsLoading(false);
                return
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
        }
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ userInfos, setUserInfos, isAuth, isLoading }}>
            {children}
        </UserContext.Provider>
    );
}