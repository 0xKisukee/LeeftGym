import "../global.css";
import {Stack} from "expo-router";
import {ExoProvider} from "../contexts/ExoContext";
import {UserProvider} from "../contexts/UserContext";
import {BottomSheetProvider} from "../contexts/BottomSheetContext";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

export default function RootLayout() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
    )
}