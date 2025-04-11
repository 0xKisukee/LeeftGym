import {ActivityIndicator, FlatList, RefreshControl, Text, View} from "react-native";
import { ScreenContainer } from "../../components/ScreenContainer";
import { Title } from "../../components/StyledText";
import { me } from "../../api/login";
import React, {useState, useEffect, useRef, useMemo, useCallback} from "react";
import {WorkoutBox} from "../../components/boxes/WorkoutBox";
import {getAll} from "../../api/workouts";
import BottomSheet, {BottomSheetBackdrop, BottomSheetView} from "@gorhom/bottom-sheet";
import AppBtn from "../../components/AppBtn";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import pushWorkout from "../../api/pushWorkout";

export default function Home() {
    const [userInfo, setUserInfo] = useState(null);
    const [workouts, setWorkouts] = useState([]);
    const [selectedWorkout, setSelectedWorkout] = useState(emptyWorkout);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const emptyWorkout = {
        name: "",
        is_private: false, // set to default user choice
        Exercises: [],
    }

    const fetchUser = async () => {
        const infos = await me();
        setUserInfo(infos);
    };

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
        fetchUser();
        fetchWorkouts();
    }, []);

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
                    ListEmptyComponent={
                        <View className="flex-1 justify-center items-center p-4">
                            <Text className="text-gray-500 text-center">No workouts found</Text>
                        </View>
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