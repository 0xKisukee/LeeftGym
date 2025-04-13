import {router, Stack, useLocalSearchParams} from "expo-router";
import { Button } from "react-native";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{headerShown: false, /*gestureEnabled: false USELESS???*/ }}/>
            <Stack.Screen name="create" options={{headerShown: false}}/>
            <Stack.Screen name="confirm" options={{headerShown: false}}/>
            <Stack.Screen name="congrats" options={{headerShown: false}}/>
            <Stack.Screen 
                name="[id]"
                options={{
                    title: "Workout Details",
                    headerStyle: {
                        backgroundColor: '#232323',
                    },
                    headerTintColor: '#ededed',
                    headerLeft: () => {
                        const params = useLocalSearchParams();
                        const source = params.source || 'workout'
                        
                        return (
                            <Button
                                onPress={() => {
                                    if (source === 'home') {
                                        router.push('/workout');
                                        router.replace('/home');
                                    } else if (source === 'profile') {
                                        router.push('/workout');
                                        router.replace('/profile');
                                    } else {
                                        console.error('WHERE ARE YOU FROM???');
                                        router.push('/workout');
                                        router.replace('/home');
                                    }
                                }} 
                                title="Back" 
                            />
                        );
                    }
                }}
            />
        </Stack>
    )
}