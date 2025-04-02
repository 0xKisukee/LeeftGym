import {Text, View, StyleSheet, SafeAreaView, TextInput, FlatList} from "react-native";
import AppBtn from "../../../components/AppBtn";
import FormField from "../../../components/FormField";
import {useEffect, useState} from "react";
import {router} from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import WorkoutBox from "../../../components/WorkoutBox";
import WorkoutExerciseBox from "../../../components/WorkoutExerciseBox";
import {useIsFocused} from "@react-navigation/native";
import Chronometer from "../../../components/Chrono";

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
                } else {
                    setCreatedWorkout(emptyWorkout);
                }
            } catch (e) {
                console.error("Failed to load workout data", e);
            }
        };

        loadWorkoutData();
    }, [isFocused]);

    // Save workout data to AsyncStorage whenever it changes
    useEffect(() => {
        const saveWorkoutData = async () => {
            try {
                await AsyncStorage.setItem('workoutData', JSON.stringify(createdWorkout));
            } catch (e) {
                console.error("Failed to save workout data", e);
            }
        };

        saveWorkoutData();

    }, [createdWorkout]);

    const confirmWorkout = async (createdWorkout) => {
        // Delete workout from local storage
        await AsyncStorage.setItem('workoutData', JSON.stringify(createdWorkout));

        // Redirect
        router.push("/workout/confirm");
    }

    // Add exercise to state
    const addExercise = (exerciseId) => {
        // Create the new exercise object
        const newExercise = {
            order: 1,
            rest_time: 180,
            exercise_id: exerciseId,
            Sets: []
        };

        // Create a new workout object with the updated exercise list
        const updatedWorkout = {
            ...createdWorkout, // Copy existing workout data
            WorkoutExercises: createdWorkout.WorkoutExercises.concat(newExercise) // Create a new array
        };

        // Update state
        setCreatedWorkout(updatedWorkout);
    };

    return (
        <SafeAreaView>
            <Text>Workout - Create</Text>
            <Chronometer
                startTimestamp={Math.floor(new Date(createdWorkout.started_at).getTime()/1000)}
            />
            <FlatList
                data={createdWorkout.WorkoutExercises}
                renderItem={({item}) => <WorkoutExerciseBox workoutExercise={item}/>}
            />
            <AppBtn
                title="Ajouter un exercice"
                handlePress={() => {
                    addExercise(1); // for now the added exercise will be hard coded (2)
                }}
            />
            <AppBtn
                title="Terminer la séance"
                handlePress={() => {
                    confirmWorkout(createdWorkout);
                }}
            />
        </SafeAreaView>
    );
}
