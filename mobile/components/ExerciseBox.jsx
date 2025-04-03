import "../global.css";
import {FlatList, Text, TextInput, View} from "react-native";
import SetBox from "./SetBox";
import getExoNameById from "../api/exercises";
import {useEffect, useState} from "react";

export default function ExerciseBox({exercise}) {
    const [exoName, setExoName] = useState("");

    useEffect(() => {
        async function fetchExerciseName() {
            const name = await getExoNameById(exercise.exercise_id);
            setExoName(name);
        }

        fetchExerciseName();
    }, []);

    return (
        <View className="mx-1 my-1 border-2 border-gray-400">
            <Text className="text-xl">{exoName}</Text>

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
                    renderItem={({item}) => <SetBox set={item}/>}
                />
            }
        </View>
    )
}