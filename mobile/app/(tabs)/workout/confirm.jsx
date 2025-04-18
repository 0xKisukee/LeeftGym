import {Text, View, StyleSheet, SafeAreaView, TextInput} from "react-native";
import AppBtn from "../../../components/AppBtn";
import FormField from "../../../components/FormField";
import {useEffect, useState} from "react";
import {router} from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {pushWorkout} from "../../../api/workouts";
import {useIsFocused} from "@react-navigation/native";
import {ScreenContainer} from "../../../components/ScreenContainer";
import {BodyText, Title} from "../../../components/StyledText";
import {updateExoRestTime} from "../../../api/restTimes";

export default function Confirm() {
    const isFocused = useIsFocused(); // Check if screen is opened to refresh workouts

    const emptyWorkout = {
        name: "",
        is_private: false, // set to default user choice
        started_at: new Date(), // i think we remove this and just push it in local storage to wait for completion to push
        completed_at: null,
        is_routine: false, // state of a checkbox
        Exercises: [],
    }

    const [createdWorkout, setCreatedWorkout] = useState(emptyWorkout);

    // Retrieve workout data from AsyncStorage when the app starts
    useEffect(() => {
        const loadWorkoutData = async () => {
            try {
                const savedData = await AsyncStorage.getItem('workoutData');
                console.log(savedData);
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
        if (!createdWorkout.name) {
            const updatedWorkout = {...createdWorkout};
            updatedWorkout.name = "Entraînement du soir";
            await pushWorkout(updatedWorkout);
        } else {
            await pushWorkout(createdWorkout);
        }

        // Delete workout from local storage
        await AsyncStorage.removeItem('workoutData');

        // Update rest times
        for (const exercise of createdWorkout.Exercises) {
            console.log(exercise.rest_time)
            await updateExoRestTime(exercise.exo_id, exercise.rest_time);
        }

        // Clear fields
        setCreatedWorkout(emptyWorkout);

        // Redirect
        router.push("/workout/congrats");
    }


    return (
        <ScreenContainer>
            <Title>Workout - Confirm</Title>
            <FormField
                title="Donnez un nom a votre seance"
                placeholder="Séance dos du jeudi"
                value={createdWorkout.name}
                handleChangeText={(e) => setCreatedWorkout({...createdWorkout, name: e})}
            />
            <AppBtn
                title="Enregistrer la séance"
                handlePress={() => {
                    saveWorkout(createdWorkout);
                }}
            />

        </ScreenContainer>
    );
}
