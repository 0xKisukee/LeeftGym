import "../global.css";
import {Container} from "./Container";
import {FlatList, Text, TextInput, View} from "react-native";
import SetBox from "./SetBox";
import getExoNameById from "../api/exercises";

export default function WorkoutExerciseBox({workoutExercise}) {
    console.log(workoutExercise);
    const exoName = getExoNameById(workoutExercise.exercise_id);
    return (
        <>
            <Text className="text-xl font-bold">{exoName}</Text>
            { workoutExercise.Sets.length > 0 &&
            <FlatList
                data={workoutExercise.Sets}
                renderItem={({item}) => <SetBox set={item}/>}
            />
            }
        </>
    )
}