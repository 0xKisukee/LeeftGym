import "../global.css";
import {FlatList, Text, TextInput, View} from "react-native";
import ExerciseBox from "./ExerciseBox";

export default function WorkoutBox({workout}) {
    return (
        <View className="mx-3 my-3 border-2 border-blue-500">
            <Text className="mx-10 text-xl font-bold">{workout.name}</Text>
            <FlatList
                data={workout.WorkoutExercises}
                renderItem={({item}) => <ExerciseBox exercise={item}/>}
            />
        </View>
    )
}