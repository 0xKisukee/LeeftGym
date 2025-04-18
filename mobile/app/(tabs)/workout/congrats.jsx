import {Text, View, StyleSheet, SafeAreaView, TextInput} from "react-native";
import AppBtn from "../../../components/AppBtn";
import FormField from "../../../components/FormField";
import {useEffect, useState} from "react";
import {createWorkout} from "../../../api/workouts";
import {router} from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScreenContainer} from "../../../components/ScreenContainer";
import {SubTitle, Title} from "../../../components/StyledText";

export default function Create() {
    const emptyWorkout = {
        name: "",
        is_private: false, // set to default user choice
        started_at: new Date(), // i think we remove this and just push it in local storage to wait for completion to push
        completed_at: null,
        is_routine: false, // state of a checkbox
        Exercises: [],
    }



    return (
        <ScreenContainer>
            <Title>Workout - Congrats</Title>
            <SubTitle>Felicitations, votre entraînement a été enregistré</SubTitle>

            <AppBtn
                title="Retourner au profil"
                handlePress={() => {
                    router.back();
                    router.back();
                    router.back();
                    router.replace("/profile");
                }}
            />
        </ScreenContainer>
    );
}
