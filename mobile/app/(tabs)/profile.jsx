import {Text, View, StyleSheet, SafeAreaView, FlatList} from "react-native";
import AppBtn from "../../components/AppBtn";
import {forget, getValueFor} from "../../api/jwt";
import {router} from "expo-router";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import WorkoutBox from "../../components/boxes/WorkoutBox";
import {getWorkouts} from "../../api/workouts";
import {useIsFocused} from "@react-navigation/native";
import {me} from "../../api/jwt";
import {SubTitle, Title} from "../../components/StyledText";
import {ScreenContainer} from "../../components/ScreenContainer";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import pushWorkout from "../../api/pushWorkout";

export default function Profile() {
    const [userInfo, setUserInfo] = useState(null);
    const [workoutsList, setWorkoutsList] = useState([]);
    const [selectedWorkout, setSelectedWorkout] = useState(emptyWorkout);
    const isFocused = useIsFocused();

    const emptyWorkout = {
        name: "",
        is_private: false, // set to default user choice
        started_at: new Date(), // i think we remove this and just push it in local storage to wait for completion to push
        completed_at: null,
        is_routine: false, // state of a checkbox
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
        const workouts = await getWorkouts();
        setWorkoutsList(workouts.filter(workout => workout.is_routine === false)); // exclude routines
    };

    useEffect(() => {
        fetchUser();
        fetchWorkouts();
    }, [isFocused]);





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





    // Bottom sheet
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





    if (!userInfo) {
        return <Text>Loading...</Text>;
    }

    return (
        <GestureHandlerRootView>
            <ScreenContainer>
                <Title className="mb-1 mt-4">Profile</Title>
                <SubTitle>Bonjour {userInfo.email}</SubTitle>
                <AppBtn
                    title="Deconnexion"
                    handlePress={() => {
                        signout();
                    }}
                />
                <FlatList
                    data={workoutsList}
                    renderItem={({item}) => (
                        <WorkoutBox
                            workout={item}
                            onMenuPress={() => {
                                setSelectedWorkout(item);
                                handleSnapPress(0)
                            }}
                        />
                    )}
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