import "../global.css";
import {FlatList, Text, TextInput, TouchableOpacity, View} from "react-native";
import ExerciseBox from "./boxes/ExerciseBox";
import {BodyText, SubTitle, Title} from "./StyledText";
import AppBtn from "./AppBtn";
import {router} from "expo-router";
import {useExos} from "../contexts/ExoContext";

export default function RoutineBox({workout, onMenuPress}) {
    const allExos = useExos();

    const getExoNameById = (exoId) => {
        const exo = allExos.find(exo => exo.id === exoId);
        return exo ? exo.name : "Chargement...";
    };

    return (
        <View className="my-3 rounded-lg bg-bgsec">

            <View className="flex-row justify-between border-b border-primary mb-5">

                <SubTitle className="mx-5 my-3">{workout.name}</SubTitle>

                <TouchableOpacity 
                    className="mr-5 mt-1"
                    onPress={onMenuPress}
                >
                    <Title>
                        ...
                    </Title>
                </TouchableOpacity>

            </View>

            <FlatList
                className="border-b border-secondary mb-4 pb-4"
                data={workout.Exercises}
                renderItem={({item}) => (
                    <BodyText className="ml-2">
                        {getExoNameById(item.exo_id)}
                    </BodyText>
                )}
            />

            <AppBtn
                title="Commencer la routine"
                className="mb-6"
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