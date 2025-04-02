import {Stack} from "expo-router";
import BetaBar from "../../components/BetaBar";

export default function AuthLayout() {
    return (
        <Stack>
            <Stack.Screen name="register" options={{headerShown: false}}/>
            <Stack.Screen name="login" options={{headerShown: false}}/>
        </Stack>
    )
}