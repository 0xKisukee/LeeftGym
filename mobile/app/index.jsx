import "../global.css";
import {Text} from "react-native";
import {ScreenContainer} from "../components/ScreenContainer";
import {router} from "expo-router";
import AppBtn from "../components/AppBtn";
import {useEffect, useState} from "react";
import {isAuth} from "../api/login";
import {Title} from "../components/StyledText";

export default function Index() {
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        const authenticated = await isAuth();
        if (authenticated) {
            router.replace("/profile");
        } else {
            router.replace("/login");
        }
    };

    useEffect( () => {
        checkAuth();
    }, []);

    if (loading) {
        return <Text>Loading...</Text>; // Display loading state while checking token
    }
    return (
        <ScreenContainer>
            <Title className="mx-5">Bienvenue sur Leeft !</Title>
            <Text className="mx-5">Cliquez sur le bouton ci-dessous pour commencer</Text>
            <AppBtn
                title="Commencer"
                handlePress={() => router.push("/register")}
            />
        </ScreenContainer>
    )
}