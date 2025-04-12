import {Text, View, StyleSheet, SafeAreaView, FlatList, ActivityIndicator, RefreshControl} from "react-native";
import AppBtn from "../../components/AppBtn";
import {forget, getValueFor} from "../../api/jwt";
import {router} from "expo-router";
import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import {WorkoutBox} from "../../components/boxes/WorkoutBox";
import {getAll, getWorkouts} from "../../api/workouts";
import {useIsFocused} from "@react-navigation/native";
import {me} from "../../api/login";
import {SubTitle, Title} from "../../components/StyledText";
import {ScreenContainer} from "../../components/ScreenContainer";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {pushWorkout} from "../../api/workouts";
import {UserContext} from "../../contexts/UserContext";
import {BottomSheetContext} from "../../contexts/BottomSheetContext";

export default function Profile() {
    const [workouts, setWorkouts] = useState([]);
    const [selectedWorkout, setSelectedWorkout] = useState(emptyWorkout);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const {userInfos} = useContext(UserContext);
    const { openBottomSheet, closeBottomSheet } = useContext(BottomSheetContext);

    const isFocused = useIsFocused();

    const emptyWorkout = {
        name: "",
        is_private: false, // set to default user choice
        Exercises: [],
    }

    const signout = () => {
        forget("userJWT");
        router.replace("/");
    }

    const fetchWorkouts = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getWorkouts();
            const filteredWorkouts = data.filter(workout => workout.is_routine === false);
            setWorkouts(filteredWorkouts); // exclude routines
        } catch (error) {
            console.error('Error fetching workouts:', error);
            setError('Failed to load workouts. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWorkouts();
    }, []); // I removed "isFocused", this should be refreshed only when needed

    const copyAsRoutine = async (workoutToCopy) => {
        const routineWorkout = {
            ...workoutToCopy,
            is_routine: true,
            started_at: null,
            completed_at: null,
        };
        await pushWorkout(routineWorkout);
    }

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
                <AppBtn
                    className="mx-5"
                    title="Enregistrer comme routine"
                    handlePress={() => {
                        closeBottomSheet();
                        copyAsRoutine(workout);
                    }}
                />
            )
        });
    };

    if ((loading && !refreshing) || !userInfos) {
        return (
            <ScreenContainer className="justify-center items-center">
                <ActivityIndicator size="large" />
            </ScreenContainer>
        );
    }

    return (
        <GestureHandlerRootView>
            <ScreenContainer>
                <Title className="mb-1 mt-4">Profile</Title>
                <SubTitle>Bonjour {userInfos.username}</SubTitle>
                <AppBtn
                    title="Deconnexion"
                    handlePress={() => {
                        signout();
                    }}
                />
                <FlatList
                    className="mt-4"
                    data={workouts}
                    renderItem={({item}) => (
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
                />
            </ScreenContainer>
        </GestureHandlerRootView>
    );
} 