import {Text, View, StyleSheet, SafeAreaView, FlatList, ActivityIndicator, RefreshControl} from "react-native";
import AppBtn from "../../components/AppBtn";
import {forget, getValueFor} from "../../api/jwt";
import {router} from "expo-router";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {WorkoutBox} from "../../components/boxes/WorkoutBox";
import {getAll, getWorkouts} from "../../api/workouts";
import {useIsFocused} from "@react-navigation/native";
import {me} from "../../api/login";
import {SubTitle, Title} from "../../components/StyledText";
import {ScreenContainer} from "../../components/ScreenContainer";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import pushWorkout from "../../api/pushWorkout";

export default function Profile() {
    const [userInfo, setUserInfo] = useState(null);
    const [workouts, setWorkouts] = useState([]);
    const [selectedWorkout, setSelectedWorkout] = useState(emptyWorkout);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const fetchUser = async () => {
        const infos = await me();
        setUserInfo(infos);
    };

    const fetchWorkouts = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getWorkouts();
            setWorkouts(data.filter(workout => workout.is_routine === false)); // exclude routines
        } catch (error) {
            console.error('Error fetching workouts:', error);
            setError('Failed to load workouts. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
        fetchWorkouts();
    }, []); // I removed "isFocused", this should be refreshed only when needed

    const copyAsRoutine = async () => {
        const routineWorkout = {
            ...selectedWorkout,
            is_routine: true,
            started_at: null,
            completed_at: null,
        };
        console.log(routineWorkout)
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


    // Bottom sheet //
    const sheetRef = useRef(null);
    const snapPoints = useMemo(() => ["20%", "50%", "90%"], []);

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

    if ((loading && !refreshing) || !userInfo) {
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
                <SubTitle>Bonjour {userInfo.username}</SubTitle>
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
                            userInfo={userInfo}
                            onMenuPress={() => {
                                setSelectedWorkout(item);
                                handleSnapPress(0)
                            }}
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

                <BottomSheet
                    backgroundStyle={{backgroundColor: "#232323"}}
                    ref={sheetRef}
                    index={-1}
                    snapPoints={snapPoints}
                    enableDynamicSizing={false}
                    backdropComponent={renderBackdrop}
                    enablePanDownToClose={true}
                >
                    <BottomSheetView>

                        <AppBtn
                            className="mx-5"
                            title="Enregistrer la routine"
                            handlePress={() => {
                                copyAsRoutine()
                                handleClosePress()
                            }}
                        />

                    </BottomSheetView>
                </BottomSheet>

            </ScreenContainer>
        </GestureHandlerRootView>
    );
} 