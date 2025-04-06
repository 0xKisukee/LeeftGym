import {Text, View, SafeAreaView, TextInput, FlatList} from "react-native";
import AppBtn from "../../../components/AppBtn";
import FormField from "../../../components/FormField";
import {useEffect, useState} from "react";
import {router} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useIsFocused} from "@react-navigation/native";
import {ScreenContainer} from "../../../components/ScreenContainer";
import {SubTitle, Title} from "../../../components/StyledText";
import {getRoutines} from "../../../api/workouts";

export default function Index() {
    const [pendingWorkout, setPendingWorkout] = useState(false);
    const [routinesList, setRoutinesList] = useState([]);

    const isFocused = useIsFocused();

    const fetchRoutines = async () => {
        const workouts = await getRoutines(); // Fetch workouts with token
        setRoutinesList(workouts); // Update state with workouts
    };

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
        fetchRoutines();
    }, [isFocused]);

    return (
        <ScreenContainer>
            <Title>Workout</Title>

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

            <SubTitle className="mt-5">Routines</SubTitle>

            <FlatList
                data={routinesList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <SubTitle>- {item.name}</SubTitle>
                )}
            >

            </FlatList>
        </ScreenContainer>
    );
}
