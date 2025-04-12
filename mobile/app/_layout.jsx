import "../global.css";
import {Stack} from "expo-router";
import {ExoProvider} from "../contexts/ExoContext";
import {UserProvider} from "../contexts/UserContext";
import {BottomSheetProvider} from "../contexts/BottomSheetContext";

export default function RootLayout() {

    return (
        <ExoProvider>
            <UserProvider>
                <BottomSheetProvider>
                    <Stack>
                        <Stack.Screen name="index" options={{headerShown: false, gestureEnabled: false }}/>
                        <Stack.Screen name="(auth)" options={{headerShown: false}}/>
                        <Stack.Screen name="(tabs)" options={{headerShown: false, gestureEnabled: false }}/>
                    </Stack>
                </BottomSheetProvider>
            </UserProvider>
        </ExoProvider>
    )
}