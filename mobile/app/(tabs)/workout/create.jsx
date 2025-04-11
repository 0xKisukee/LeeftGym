import {Text, View, StyleSheet, SafeAreaView, TextInput, FlatList, ScrollView, ActivityIndicator} from "react-native";
import AppBtn from "../../../components/AppBtn";
import FormField from "../../../components/FormField";
import {useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import {router, useLocalSearchParams} from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from "@react-navigation/native";
import WorkoutTimer from "../../../components/timers/WorkoutTimer";
import ExerciseBoxCreate from "../../../components/boxes/ExerciseBoxCreate";
import RestTimer from "../../../components/timers/RestTimer";
import {ScreenContainer} from "../../../components/ScreenContainer";
import {BodyText, SubTitle, Title} from "../../../components/StyledText";
import {ScreenContainerLight} from "../../../components/ScreenContainerLight";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import BottomSheet, {BottomSheetBackdrop, BottomSheetView} from "@gorhom/bottom-sheet";
import {ExoContext} from "../../../contexts/ExoContext";

export default function Create() {
    const { allExos, isLoading, error } = useContext(ExoContext);
    const { routineWorkout } = useLocalSearchParams();
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
    const [restTimer, setRestTimer] = useState(0);
    const [restTrigger, setRestTrigger] = useState(0);

    // Bottom sheet
    const sheetRef = useRef(null);
    const snapPoints = useMemo(() => ["50%", "90%"], []);

    // Bottom sheet callbacks
    const handleClosePress = useCallback(() => {
        sheetRef.current?.close();
    }, []);
    const handleSnapPress = useCallback((index) => {
        sheetRef.current?.snapToIndex(index);
    }, []);

    // Render backdrop component
    const renderBackdrop = useCallback(
        (props) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                pressBehavior="close"
            />
        ),
        []
    );

    // Initialize workout data
    useEffect(() => {
        const initializeWorkout = async () => {
            try {
                if (routineWorkout) {
                    
                    // If routine workout is passed as params, use it
                    const routineWorkoutData = JSON.parse(routineWorkout);
                    const newWorkout = {
                        ...routineWorkoutData,
                        is_routine: false,
                        started_at: new Date(),
                        completed_at: null,
                        Exercises: routineWorkoutData.Exercises.map(exercise => ({
                            ...exercise,
                            Sets: (exercise.Sets || []).map(set => ({
                                ...set,
                                completed: false
                            }))
                        }))
                    };

                    setCreatedWorkout(newWorkout);

                    // Save workout data to AsyncStorage to avoid losing it on the next useEffect
                    await AsyncStorage.setItem('workoutData', JSON.stringify(newWorkout));
                }
            } catch (e) {
                console.error("Failed to initialize workout data", e);
            }
        };

        initializeWorkout();
    }, [routineWorkout]);

    // Retrieve workout data from AsyncStorage on each screen focus
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
        // Check if any exercise has 0 sets
        const hasEmptyExercises = createdWorkout.Exercises.some(
            exercise => exercise.Sets.length === 0
        );

        const noExercise = createdWorkout.Exercises.length === 0;

        if (hasEmptyExercises || noExercise) {
            alert("Veuillez compléter vos exercises.");
            return;
        }

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

    // Function to add exercise
    const addExercise = async (exoId) => {
        const defaultOrder = createdWorkout.Exercises.length + 1;

        const newExercise = {
            order: defaultOrder,
            rest_time: 180, // HERE IT SHOULD SET THE USER PERSONAL VALUE, DEFINED IN LOCALSTORAGE OR DATABASE
            exo_id: exoId,
            Sets: [],
        };

        const updatedWorkout = {
            ...createdWorkout,
            Exercises: [...createdWorkout.Exercises, newExercise],
        };

        setCreatedWorkout(updatedWorkout);

        try {
            await AsyncStorage.setItem('workoutData', JSON.stringify(updatedWorkout));
            console.log("Exercise added to workout!");
        } catch (e) {
            console.error("Failed to save workout data", e);
        }
    };

    // Add set to state
    const addSet = (exerciseOrder, reps, weight) => {
        // Copier l'objet actuel
        const updatedWorkout = {...createdWorkout};

        // Trouver l'exercice correspondant
        const updatedExercises = updatedWorkout.Exercises.map((exercise) => {
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
        updatedWorkout.Exercises = updatedExercises;
        setCreatedWorkout(updatedWorkout);
    };

    const exoBtn = (exo) =>
        <AppBtn
            title={exo.name}
            handlePress={() => {
                addExercise(exo.id);
                handleClosePress();
            }}
        />

    const renderExercise = ({ item }) => (
        <ExerciseBoxCreate
            exercise={item}
            onAddSet={() => addSet(item.order, 12, 40)}
            onSetChange={(updatedExercise) => {
                const updatedWorkout = {
                    ...createdWorkout,
                    Exercises: createdWorkout.Exercises.map(exercise =>
                        exercise.order === updatedExercise.order ? updatedExercise : exercise
                    )
                };
                setCreatedWorkout(updatedWorkout);
            }}
            onSetCompleted={() => {
                setRestTimer(item.rest_time || 120); // Default to 120 seconds if no rest time specified
                setRestTrigger(prev => prev + 1); // Increment trigger to start rest timer
            }}
        />
    );

    // Boutons à afficher en bas de la liste
    const renderFooter = () => (
        <View className="px-5">
            <AppBtn
                title="Ajouter un exercice"
                handlePress={() => handleSnapPress(1)} // Example exercise ID
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

    if (error) {
        return (
            <ScreenContainer>
                <Title>Error</Title>
                <BodyText>Failed to load exercises: {error}</BodyText>
            </ScreenContainer>
        );
    }

    return (
        <GestureHandlerRootView>
            <ScreenContainerLight>
                <View className="flex-row justify-between px-4 py-6 bg-bgsec">
                    <Title>Entraînement en cours</Title>
                    <WorkoutTimer
                        startTimestamp={Math.floor(new Date(createdWorkout.started_at).getTime() / 1000)}
                    />
                </View>

                <FlatList
                    data={createdWorkout.Exercises}
                    renderItem={renderExercise}
                    ListFooterComponent={renderFooter}
                />
                <RestTimer
                    restDuration={restTimer}
                    trigger={restTrigger}
                />

                <BottomSheet
                    backgroundStyle={{
                        backgroundColor: "#232323",
                    }}
                    ref={sheetRef}
                    index={-1}
                    snapPoints={snapPoints}
                    enableDynamicSizing={false}
                    backdropComponent={renderBackdrop}
                    enablePanDownToClose={true}
                >
                    <BottomSheetView className="px-4">

                        <Title className="mb-3">Workout - Choose Exo</Title>
                        <BodyText className="mb-2">Choisissez un exercice à ajouter à votre workout</BodyText>
                        <TextInput
                            className="h-12 px-2 my-1 w-full bg-tertiary rounded-lg"
                            placeholder="Recherchez un exercice (fonctionnalité à venir)"
                            placeholderTextColor="#a8a8a8"
                        />

                        {isLoading ? (
                            <View className="flex-1 justify-center items-center">
                                <ActivityIndicator size="large" color="#0000ff" />
                            </View>
                        ) : (
                            <FlatList
                                data={allExos}
                                renderItem={({ item }) => (exoBtn(item))}
                            />
                        )}

                    </BottomSheetView>
                </BottomSheet>

            </ScreenContainerLight>
        </GestureHandlerRootView>
    );
}