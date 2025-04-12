import "../../global.css";
import {FlatList, Text, TouchableOpacity, View} from "react-native";
import {BodyText, SubTitle, Title} from "../StyledText";
import AppBtn from "../AppBtn";
import {router} from "expo-router";
import {ExoContext} from "../../contexts/ExoContext";
import {useContext} from "react";

export default function RoutineBox({workout, onMenuPress}) {
    const { allExos, isLoading, error } = useContext(ExoContext);

    const getExoNameById = (exoId) => {
        const exo = allExos.find(exo => exo.id === exoId);
        return exo ? exo.name : "Chargement...";
    };

    // Trier les exercices par ordre
    const sortedExercises = [...workout.Exercises].sort((a, b) => a.order - b.order);

    return (
        <View className="bg-bgsec rounded-lg mb-4 overflow-hidden p-4 pl-6">
            <View className="flex-row justify-between items-center mb-2">
                <SubTitle>{workout.name}</SubTitle>
                <TouchableOpacity
                    className="mr-4 -mt-2"
                    onPress={onMenuPress}
                >
                    <Title>...</Title>
                </TouchableOpacity>
            </View>

            <FlatList
                className="mb-6"
                data={sortedExercises}
                renderItem={({item}) => (
                    <BodyText className="font-bold">
                        - {getExoNameById(item.exo_id)}
                    </BodyText>
                )}
            />

            <AppBtn
                title="Commencer la routine"
                className="mb-2"
                handlePress={() => {
                    router.push({
                        pathname: "/workout/create",
                        params: { routineWorkout: JSON.stringify(workout) }
                    });
                }}
            />
        </View>
    )
}