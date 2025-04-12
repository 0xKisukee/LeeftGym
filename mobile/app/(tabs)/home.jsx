import {ActivityIndicator, FlatList, RefreshControl, Text, View} from "react-native";
import { ScreenContainer } from "../../components/ScreenContainer";
import { Title } from "../../components/StyledText";
import React, {useState, useEffect, useContext} from "react";
import {WorkoutBox} from "../../components/boxes/WorkoutBox";
import {deleteWorkout, getAll} from "../../api/workouts";
import AppBtn from "../../components/AppBtn";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {pushWorkout} from "../../api/workouts";
import {UserContext} from "../../contexts/UserContext";
import {BottomSheetContext} from "../../contexts/BottomSheetContext";

export default function Home() {
    const [workouts, setWorkouts] = useState([]);
    const [selectedWorkout, setSelectedWorkout] = useState(emptyWorkout);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const {userInfos} = useContext(UserContext);
    const { openBottomSheet, closeBottomSheet } = useContext(BottomSheetContext);

    const emptyWorkout = {
        name: "",
        is_private: false, // set to default user choice
        Exercises: [],
    }

    const fetchWorkouts = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getAll();
            setWorkouts(data);
        } catch (error) {
            console.error('Error fetching workouts:', error);
            setError('Failed to load workouts. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWorkouts();
    }, []);

    const copyAsRoutine = async (workoutToCopy) => {
        const routineWorkout = {
            ...workoutToCopy,
            is_routine: true,
            started_at: null,
            completed_at: null,
        };
        await pushWorkout(routineWorkout);
    }

    const handleDeleteWorkout = async (id) => {
        try {
            console.log(id)
            await deleteWorkout(id);
            setWorkouts(prevWorkouts =>
                prevWorkouts.filter(workout => workout.id !== id)
            );
        } catch (error) {
            console.error('Error deleting routine:', error);
        }
    };

    // Handle like updates
    const handleLikeUpdate = (workoutId, updatedWorkout) => {
        setWorkouts(prevWorkouts =>
            prevWorkouts.map(workout =>
                workout.id === workoutId ? updatedWorkout : workout
            )
        );
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchWorkouts();
        setRefreshing(false);
    };

    // Function to open the workout options bottom sheet
    const openWorkoutOptionsSheet = (workout) => {
        setSelectedWorkout(workout);
        openBottomSheet({
            title: "Options du workout",
            snapPoints: ['25%'],
            content: (
                <>
                    <AppBtn
                        className="mx-5"
                        title="Enregistrer comme routine"
                        handlePress={() => {
                            closeBottomSheet();
                            copyAsRoutine(workout);
                        }}
                    />
                    { (workout.User.id === userInfos.userId) &&
                        <AppBtn
                            className="mx-5"
                            title="Supprimer l'entraînement"
                            handlePress={() => {
                                closeBottomSheet();
                                handleDeleteWorkout(workout.id);
                            }}
                            type="delete"
                        />
                    }
                </>
            )
        });
    };

    if (loading && !refreshing) {
        return (
            <ScreenContainer className="justify-center items-center">
                <ActivityIndicator size="large" />
            </ScreenContainer>
        );
    }

    return (
        <GestureHandlerRootView>
            <ScreenContainer>
                <Title className="mb-1 mt-4">Feed</Title>
                <FlatList
                    className="mt-4"
                    data={workouts}
                    renderItem={({ item }) => (
                        <WorkoutBox
                            workout={item}
                            onLikeUpdate={handleLikeUpdate}
                            userInfo={userInfos}
                            onMenuPress={() => openWorkoutOptionsSheet(item)}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    ListEmptyComponent={
                        <View className="flex-1 justify-center items-center p-4">
                            <Text className="text-gray-500 text-center">No workouts found</Text>
                        </View>
                    }
                />
            </ScreenContainer>
        </GestureHandlerRootView>
    );
}