import {Text, View, StyleSheet, SafeAreaView, FlatList} from "react-native";
import AppBtn from "../../components/AppBtn";
import {forget, getValueFor} from "../../api/jwt";
import {router} from "expo-router";
import {useEffect, useState} from "react";
import WorkoutBox from "../../components/WorkoutBox";
import getWorkouts from "../../api/workouts";
import {useIsFocused} from "@react-navigation/native";
import me from "../../api/me";

export default function Profile() {
    const [userInfo, setUserInfo] = useState(null); // Add state to store user info
    const [workoutsList, setWorkoutsList] = useState([]);
    const isFocused = useIsFocused(); // Check if screen is opened to refresh workouts

    const signout = () => {
        forget("userJWT");
        router.replace("/");
    }

    const fetchUser = async () => {
        const jwtToken = await getValueFor("userJWT");
        const infos = await me(jwtToken);
        setUserInfo(infos); // Update state with user info
    };

    const fetchWorkouts = async () => {
        const jwtToken = await getValueFor("userJWT");
        const workouts = await getWorkouts(jwtToken); // Fetch workouts with token
        setWorkoutsList(workouts); // Update state with workouts
    };

    useEffect(() => {
        fetchUser();
        fetchWorkouts();
    }, [isFocused]); // fetch on every navigation

    if (!userInfo) {
        return <Text>Loading...</Text>; // Render a loading state if user info is not available yet
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text>Profile</Text>
            <Text>Bonjour {userInfo.email}</Text>
            <AppBtn
                title="Deconnexion"
                handlePress={() => {
                    signout();
                }}
            />
            <FlatList
                data={workoutsList}
                renderItem={({item}) => <WorkoutBox workout={item}/>}
            />

        </SafeAreaView>
    );
}