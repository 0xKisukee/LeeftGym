import {Text, View, StyleSheet, SafeAreaView, TextInput} from "react-native";
import AppBtn from "../../../components/AppBtn";
import FormField from "../../../components/FormField";
import {useState} from "react";
import {createWorkout} from "../../../api/workouts";
import {router} from "expo-router";

export default function Index() {

    return (
        <SafeAreaView>
            <Text>Workout - Index</Text>

            <AppBtn
                title="Commencer un entrainement"
                handlePress={() => router.push("/workout/create")}
            />
        </SafeAreaView>
    );
}
