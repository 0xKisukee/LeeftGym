import "../global.css";
import {ActivityIndicator, Text} from "react-native";
import {ScreenContainer} from "../components/ScreenContainer";
import {router} from "expo-router";
import AppBtn from "../components/AppBtn";
import React, {useContext, useEffect, useState} from "react";
import {BodyText, Title} from "../components/StyledText";
import {UserContext} from "../contexts/UserContext";

export default function Index() {
    const [pageLoaded, setPageLoaded] = useState(false)

    const {userInfos, isAuth, isLoading} = useContext(UserContext);

    useEffect(() => {
        console.log("index use effect");
        // Only proceed with navigation if loading is complete
        if (!isLoading) {
            if (isAuth) {
                console.log("Authenticated, redirecting to profile");
                router.replace("/profile");
            } else {
                console.log("Unauthenticated, redirecting to login");
                router.replace("/login");
            }
        }
    }, [isAuth, isLoading]); // Add isLoading to dependencies

    return (
        <ScreenContainer>
            <ActivityIndicator size="large" />
        </ScreenContainer>
    )
}