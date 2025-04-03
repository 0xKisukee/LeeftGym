import "../global.css";
import {Container} from "./Container";
import {FlatList, Text, TextInput, View} from "react-native";
import getExoNameById from "../api/exercises";
import {useEffect, useState} from "react";
import AppBtn from "./AppBtn";
import SetBoxCreate from "./SetBoxCreate";

export default function ExerciseBoxCreate({exercise, handlePress}) {
    const [exoName, setExoName] = useState("");

    useEffect(() => {
        async function fetchExerciseName() {
            const name = await getExoNameById(exercise.exercise_id);
            setExoName(name);
        }

        fetchExerciseName();
    }, []);

    return (
        <View className="mx-3 my-3 border-2 border-gray-500">
            <Text className="mx-5 text-xl">{exoName}</Text>
            <TextInput
                className="mx-3 my-2"
                placeholder="Plus tard vous pourrez ajouter des notes ici"
            />

            <View
                style={{flexDirection: "row", justifyContent: "space-around"}}
            >
                <Text>Série</Text>
                <Text>Kg</Text>
                <Text>Reps</Text>
            </View>

            {exercise.Sets.length > 0 &&
                <FlatList
                    data={exercise.Sets}
                    renderItem={({item}) => <SetBoxCreate set={item}/>}
                />
            }

            <AppBtn
                title="Ajouter une série"
                handlePress={handlePress}
            />
        </View>
    )
}