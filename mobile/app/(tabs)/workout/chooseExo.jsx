import {Text, View, SafeAreaView, TextInput, FlatList} from "react-native";
import AppBtn from "../../../components/AppBtn";
import {useEffect, useState} from "react";
import {router} from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getItem} from "expo-secure-store";
import {useExos} from "../../../contexts/ExoContext";
import {ScreenContainer} from "../../../components/ScreenContainer";
import {BodyText, SubTitle, Title} from "../../../components/StyledText";

export default function ChooseExo() {
    const emptyWorkout = {
        name: "",
        is_private: false,
        started_at: new Date(),
        completed_at: null,
        is_routine: false,
        Exercises: [],
    };

    const [createdWorkout, setCreatedWorkout] = useState(emptyWorkout);

    const allExos = useExos()

    // Load workout from AsyncStorage
    useEffect(() => {
        const loadWorkoutData = async () => {
            try {
                const savedData = await AsyncStorage.getItem('workoutData');
                if (savedData) {
                    setCreatedWorkout(JSON.parse(savedData));
                }
            } catch (e) {
                console.error("Failed to load workout data", e);
            }
        };

        loadWorkoutData();
        console.log(allExos);
    }, []);

    // Function to add exercise
    const addExercise = async (exoId) => {
        const defaultOrder = createdWorkout.Exercises.length + 1;

        const newExercise = {
            order: defaultOrder,
            rest_time: 180,
            exo_id: exoId,
            Sets: [],
        };

        const updatedWorkout = {
            ...createdWorkout,
            Exercises: [...createdWorkout.Exercises, newExercise],
        };

        setCreatedWorkout(updatedWorkout);

        try {
            await AsyncStorage.setItem('workoutData', JSON.stringify(updatedWorkout));
            console.log("Workout updated and saved successfully!");

            // Navigate **only after** state + storage update
            router.back();
        } catch (e) {
            console.error("Failed to save workout data", e);
        }
    };
    const exoBtn = (exo) =>
        <AppBtn
            title={exo.name}
            handlePress={() => addExercise(exo.id)}
        />

    return (
        <ScreenContainer>
            <Title className="mb-3">Workout - Choose Exo</Title>
            <BodyText className="mb-2">Choisissez un exercice à ajouter à votre workout</BodyText>
            <TextInput
                className="text-text h-12 px-2 my-1 w-full bg-bgsec rounded-lg"
                placeholder="Recherchez un exercice (fonctionnalité à venir)"
                placeholderTextColor="#a8a8a8"
            />

            <FlatList
                data={allExos}
                renderItem={({ item }) => (exoBtn(item))}
            />

        </ScreenContainer>
    );
}
