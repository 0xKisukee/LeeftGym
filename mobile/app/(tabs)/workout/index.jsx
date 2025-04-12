import {Text, View, SafeAreaView, TextInput, FlatList} from "react-native";
import AppBtn from "../../../components/AppBtn";
import FormField from "../../../components/FormField";
import {useEffect, useState, useContext} from "react";
import {router} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useIsFocused} from "@react-navigation/native";
import {ScreenContainer} from "../../../components/ScreenContainer";
import {SubTitle, Title} from "../../../components/StyledText";
import {getRoutines, deleteWorkout} from "../../../api/workouts";
import RoutineBox from "../../../components/boxes/RoutineBox";
import {BottomSheetContext} from "../../../contexts/BottomSheetContext";

export default function Index() {
    const [pendingWorkout, setPendingWorkout] = useState(false);
    const [routinesList, setRoutinesList] = useState([]);
    const [selectedRoutine, setSelectedRoutine] = useState(null);
    const { openBottomSheet, closeBottomSheet } = useContext(BottomSheetContext);

    const isFocused = useIsFocused();

    const fetchRoutines = async () => {
        const workouts = await getRoutines();
        setRoutinesList(workouts);
    };

    const handleDeleteRoutine = async (id) => {
        try {
            await deleteWorkout(id);
            setRoutinesList(prevRoutines => 
                prevRoutines.filter(routine => routine.id !== id)
            );
        } catch (error) {
            console.error('Error deleting routine:', error);
        }
    };

    const openRoutineOptionsSheet = (routine) => {
        setSelectedRoutine(routine);
        openBottomSheet({
            title: "Options de la routine",
            snapPoints: ['25%'],
            content: (
                <AppBtn
                    className="mx-5"
                    title="Supprimer la routine"
                    handlePress={() => {
                        handleDeleteRoutine(routine.id);
                        closeBottomSheet();
                    }}
                    type="delete"
                />
            )
        });
    };

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

    // Retrieve workout data from AsyncStorage when the app starts
    useEffect(() => {
        loadWorkoutData();
        fetchRoutines();
    }, [isFocused]);

    return (
        <ScreenContainer>
            <Title className="mb-4 mt-8">Workout</Title>

            {pendingWorkout &&
                <AppBtn
                    title="Reprendre votre entraînement"
                    handlePress={() => router.push("/workout/create")}
                />
            }

            {!pendingWorkout &&
                <AppBtn
                    title="Commencer un entraînement vide"
                    handlePress={() => router.push("/workout/create")}
                />
            }

            <SubTitle className="mt-5 mb-4">Vos Routines</SubTitle>

            <FlatList
                data={routinesList}
                renderItem={({ item }) => (
                    <RoutineBox
                        workout={item}
                        onMenuPress={() => openRoutineOptionsSheet(item)}
                    />
                )}
            />
        </ScreenContainer>
    );
}
