import {Text, View, StyleSheet, SafeAreaView, FlatList} from "react-native";
import AppBtn from "../../components/AppBtn";
import {forget, getValueFor} from "../../api/jwt";
import {router} from "expo-router";
import {useEffect, useState} from "react";
import WorkoutBox from "../../components/WorkoutBox";
import getWorkouts from "../../api/workouts";
import { useIsFocused } from "@react-navigation/native";

export default function Profile() {
    const [workoutsList, setWorkoutsList] = useState([]);
    const isFocused = useIsFocused(); // Check if screen is opened to refresh workouts

    const signout = () => {
        forget("userJWT");
        router.replace("/");
    }

    const fetchWorkouts = async () => {
        const jwtToken = await getValueFor("userJWT"); // Get the token
        const workouts = await getWorkouts(jwtToken); // Fetch workouts with token
        setWorkoutsList(workouts); // Update state
    };

    useEffect( () => {
        fetchWorkouts();
    }, [isFocused]); // fetch on every navigation

    return (
        <SafeAreaView>
            <Text>Profile</Text>
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