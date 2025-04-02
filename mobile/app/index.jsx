import "../global.css";
import {Text, View} from "react-native";
import {Container} from "../components/Container";
import {router} from "expo-router";
import BetaBar from "../components/BetaBar";
import AppBtn from "../components/AppBtn";
import {useEffect, useState} from "react";
import {getValueFor, isAuth} from "../api/jwt";

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
        <Container>
            <BetaBar/>
            <Text className="mx-5">Bienvenue sur Leeft !</Text>
            <Text className="mx-5">Cliquez sur le bouton ci-dessous pour commencer</Text>
            <AppBtn
                title="Commencer"
                handlePress={() => router.push("/register")}
            />
        </Container>
    )
}