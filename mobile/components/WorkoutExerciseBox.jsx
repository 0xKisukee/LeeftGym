import "../global.css";
import {Container} from "./Container";
import {FlatList, Text, TextInput, View} from "react-native";
import SetBox from "./SetBox";
import getExoNameById from "../api/exercises";
import {useEffect, useState} from "react";

export default function WorkoutExerciseBox({workoutExercise}) {
    const [exoName, setExoName] = useState("");

    useEffect(() => {
        async function fetchExerciseName() {
            const name = await getExoNameById(workoutExercise.exercise_id);
            setExoName(name);
        }
        fetchExerciseName();
    }, []);

    return (
        <View className="mx-1 my-1">
            <Text className="text-xl">{exoName}</Text>
            { workoutExercise.Sets.length > 0 &&
            <FlatList
                data={workoutExercise.Sets}
                renderItem={({item}) => <SetBox set={item}/>}
            />
            }
        </View>
    )
}