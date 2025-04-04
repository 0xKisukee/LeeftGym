import {Text, View, StyleSheet, SafeAreaView, TextInput, FlatList, ScrollView} from "react-native";
import AppBtn from "../../../components/AppBtn";
import FormField from "../../../components/FormField";
import {useEffect, useState} from "react";
import {router} from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from "@react-navigation/native";
import WorkoutTimer from "../../../components/WorkoutTimer";
import ExerciseBoxCreate from "../../../components/ExerciseBoxCreate";
import chooseExo from "./chooseExo";
import RestTimer from "../../../components/RestTimer";

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
    const [restTimer, setRestTimer] = useState(0);
    const [restTrigger, setRestTrigger] = useState(0);

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

    // Add set to state
    const addSet = (exerciseOrder, reps, weight) => {
        // Copier l'objet actuel
        const updatedWorkout = {...createdWorkout};

        // Trouver l'exercice correspondant
        const updatedExercises = updatedWorkout.WorkoutExercises.map((exercise) => {
            if (exercise.order === exerciseOrder) {
                // Créer le nouvel ensemble (set)
                const newSet = {
                    order: exercise.Sets.length + 1,
                    weight: weight || 40, // Valeur par défaut
                    reps: reps || 12,
                    completed: false,
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
            onAddSet={() => addSet(item.order, 12, 40)}
            onSetChange={(updatedExercise) => {
                const updatedWorkout = {
                    ...createdWorkout,
                    WorkoutExercises: createdWorkout.WorkoutExercises.map(exercise =>
                        exercise.order === updatedExercise.order ? updatedExercise : exercise
                    )
                };
                setCreatedWorkout(updatedWorkout);
            }}
            onSetCompleted={() => {
                console.log("pressed");
                setRestTimer(item.rest_time || 120); // Default to 120 seconds if no rest time specified
                setRestTrigger(prev => prev + 1); // Increment trigger to start rest timer
            }}
        />
    );

    // Boutons à afficher en bas de la liste
    const renderFooter = () => (
        <View>
            <AppBtn
                title="Ajouter un exercice"
                handlePress={() => router.push("/workout/chooseExo")} // Example exercise ID
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
        <SafeAreaView style={{ flex: 1 }}>
            <Text>Workout - Create</Text>
            <WorkoutTimer
                startTimestamp={Math.floor(new Date(createdWorkout.started_at).getTime() / 1000)}
            />
            <FlatList
                data={createdWorkout.WorkoutExercises}
                renderItem={renderExercise}
                ListFooterComponent={renderFooter}
            />
            <RestTimer
                restDuration={restTimer}
                trigger={restTrigger}
            />
        </SafeAreaView>
    );
}