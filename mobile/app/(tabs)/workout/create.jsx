import {Text, View, StyleSheet, SafeAreaView, TextInput, FlatList, ScrollView} from "react-native";
import AppBtn from "../../../components/AppBtn";
import FormField from "../../../components/FormField";
import {useEffect, useState} from "react";
import {router} from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from "@react-navigation/native";
import Chronometer from "../../../components/Chrono";
import ExerciseBoxCreate from "../../../components/ExerciseBoxCreate";
import SetBoxCreate from "../../../components/SetBoxCreate";

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

    const confirmWorkout = async () => {
        // Save workout to local storage
        await AsyncStorage.setItem('workoutData', JSON.stringify(createdWorkout));

        // Redirect
        router.push("/workout/confirm");
    }

    const cancelWorkout = async () => {
        // Delete workout from local storage
        await AsyncStorage.removeItem('workoutData');

        // Redirect
        router.back();
    }

    // Add exercise to state
    const addExercise = (exoId) => {
        // Calculate order
        const defaultOrder = createdWorkout.WorkoutExercises.length + 1;

        // Create the new exercise object
        const newExercise = {
            order: defaultOrder,
            rest_time: 180,
            exercise_id: exoId,
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

    // Add set to state
    const addSet = (exerciseOrder, reps) => {
        // Copier l'objet actuel
        const updatedWorkout = {...createdWorkout};

        // Trouver l'exercice correspondant
        const updatedExercises = updatedWorkout.WorkoutExercises.map((exercise) => {
            if (exercise.order === exerciseOrder) {
                // Créer le nouvel ensemble (set)
                const newSet = {
                    order: exercise.Sets.length + 1,
                    weight: 60, // Valeur par défaut
                    reps: reps,
                    completed: true,
                };

                // Ajouter le set à l'exercice
                return {
                    ...exercise,
                    Sets: [...exercise.Sets, newSet],
                };
            }
            return exercise;
        });

        // Mettre à jour l'état
        updatedWorkout.WorkoutExercises = updatedExercises;
        setCreatedWorkout(updatedWorkout);
    };

    const renderExercise = ({ item }) => (
        <ExerciseBoxCreate
            exercise={item}
            handlePress={() => addSet(item.order, 12)}
        />
    );

    // Boutons à afficher en bas de la liste
    const renderFooter = () => (
        <View>
            <AppBtn
                title="Ajouter un exercice"
                handlePress={() => addExercise(1)} // Example exercise ID
            />
            <AppBtn
                title="Terminer la séance"
                handlePress={confirmWorkout}
            />
            <AppBtn
                title="Annuler la séance"
                handlePress={cancelWorkout}
            />
        </View>
    );

    return (
        <SafeAreaView>
            <FlatList
                data={createdWorkout.WorkoutExercises}
                renderItem={renderExercise}
                ListHeaderComponent={
                    <>
                        <Text>Workout - Create</Text>
                        <Chronometer
                            startTimestamp={Math.floor(new Date(createdWorkout.started_at).getTime() / 1000)}
                        />
                    </>
                }
                ListFooterComponent={renderFooter}
            />
        </SafeAreaView>
    );
}