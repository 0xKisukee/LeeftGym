import {Text, View, SafeAreaView, TextInput} from "react-native";
import AppBtn from "../../../components/AppBtn";
import FormField from "../../../components/FormField";
import {useEffect, useState} from "react";
import {router} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useIsFocused} from "@react-navigation/native";
import {ScreenContainer} from "../../../components/ScreenContainer";
import {Title} from "../../../components/StyledText";

export default function Index() {
    const [pendingWorkout, setPendingWorkout] = useState(false);
    const isFocused = useIsFocused();

    // Retrieve workout data from AsyncStorage when the app starts
    useEffect(() => {
        const loadWorkoutData = async () => {
            try {
                const savedData = await AsyncStorage.getItem('workoutData');
                if (savedData !== null) {
                    setPendingWorkout(true);
                } else {
                    setPendingWorkout(false);
                }
            } catch (e) {
                console.error("Failed to load workout data", e);
            }
        };

        loadWorkoutData();
    }, [isFocused]);

    return (
        <ScreenContainer>
            <Title>Workout - Commencer</Title>

            {pendingWorkout &&
                <AppBtn
                    title="Reprendre votre entraînement"
                    handlePress={() => router.push("/workout/create")}
                />
            }

            {!pendingWorkout &&
                <AppBtn
                    title="Commencer l'entraînement"
                    handlePress={() => router.push("/workout/create")}
                />
            }
        </ScreenContainer>
    );
}
