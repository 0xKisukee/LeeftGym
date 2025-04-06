import {Text, View, StyleSheet, SafeAreaView, FlatList} from "react-native";
import AppBtn from "../../../components/AppBtn";
import {forget, getValueFor} from "../../../api/jwt";
import {router} from "expo-router";
import {useEffect, useState} from "react";
import WorkoutBox from "../../../components/boxes/WorkoutBox";
import {getWorkouts} from "../../../api/workouts";
import {useIsFocused} from "@react-navigation/native";
import me from "../../../api/me";
import {SubTitle, Title} from "../../../components/StyledText";
import {ScreenContainer} from "../../../components/ScreenContainer";

export default function Profile() {
    const [userInfo, setUserInfo] = useState(null);
    const [workoutsList, setWorkoutsList] = useState([]);
    const isFocused = useIsFocused();

    const signout = () => {
        forget("userJWT");
        router.replace("/");
    }

    const fetchUser = async () => {
        const jwtToken = await getValueFor("userJWT");
        const infos = await me(jwtToken);
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

    if (!userInfo) {
        return <Text>Loading...</Text>;
    }

    return (
        <ScreenContainer>
            <Title>Profile</Title>
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
                            router.push({
                                pathname: "/profile/copyRoutine",
                                params: { workout: JSON.stringify(item) }
                            });
                        }}
                    />
                )}
            />
        </ScreenContainer>
    );
} 