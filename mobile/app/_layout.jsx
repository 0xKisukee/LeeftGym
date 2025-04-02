import "../global.css";
import {Stack} from "expo-router";
import BetaBar from "../components/BetaBar";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{headerShown: false, gestureEnabled: false }}/>
            <Stack.Screen name="(auth)" options={{headerShown: false}}/>
            <Stack.Screen name="(tabs)" options={{headerShown: false, gestureEnabled: false }}/>
        </Stack>
    )
}