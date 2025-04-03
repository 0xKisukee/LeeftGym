import {Stack} from "expo-router";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{headerShown: false, /*gestureEnabled: false USELESS???*/ }}/>
            <Stack.Screen name="create" options={{headerShown: false}}/>
            <Stack.Screen name="chooseExo" options={{headerShown: false, presentation: "modal"}}/>
            <Stack.Screen name="confirm" options={{headerShown: false}}/>
            <Stack.Screen name="congrats" options={{headerShown: false}}/>
        </Stack>
    )
}