import {Text, View, StyleSheet, SafeAreaView, TextInput} from "react-native";
import AppBtn from "../../../components/AppBtn";
import FormField from "../../../components/FormField";
import {useEffect, useState} from "react";
import {router} from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import pushWorkout from "../../../api/pushWorkout";
import {useIsFocused} from "@react-navigation/native";

export default function Create() {
    const isFocused = useIsFocused(); // Check if screen is opened to refresh workouts

    const emptyWorkout = {
        name: "",
        is_private: false, // set to default user choice
        started_at: new Date(), // i think we remove this and just push it in local storage to wait for completion to push
        completed_at: null,
        is_routine: false, // state of a checkbox
        WorkoutExercises: [],
    }

    const [createdWorkout, setCreatedWorkout] = useState(emptyWorkout);

    // Retrieve workout data from AsyncStorage when the app starts
    useEffect(() => {
        const loadWorkoutData = async () => {
            try {
                const savedData = await AsyncStorage.getItem('workoutData');
                if (savedData !== null) {
                    setCreatedWorkout(JSON.parse(savedData));
                }
            } catch (e) {
                console.error("Failed to load workout data", e);
            }
        };

        loadWorkoutData();
    }, [isFocused]);

    const saveWorkout = async (createdWorkout) => {
        // if check needed use this
        // const pushResult = await pushWorkout(createdWorkout);
        await pushWorkout(createdWorkout);

        // Delete workout from local storage
        await AsyncStorage.removeItem('workoutData');

        // Clear fields
        setCreatedWorkout(emptyWorkout);

        // Redirect
        router.push("/workout/congrats");
    }


    return (
        <SafeAreaView>
            <Text>Workout - Confirm</Text>
            <FormField
                title="Donnez un nom a votre seance"
                value={createdWorkout.name}
                handleChangeText={(e) => setCreatedWorkout({...createdWorkout, name: e})}
            />
            <AppBtn
                title="Enregistrer la séance"
                handlePress={() => {
                    saveWorkout(createdWorkout);
                }}
            />

        </SafeAreaView>
    );
}
