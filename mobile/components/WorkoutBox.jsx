import "../global.css";
import {Container} from "./Container";
import {FlatList, Text, TextInput, View} from "react-native";
import WorkoutExerciseBox from "./WorkoutExerciseBox";

export default function WorkoutBox({workout}) {
    return (
        <View className="mx-5 my-2 border-2 border-blue-500">
            <Text className="text-xl font-bold">{workout.name}</Text>
            <FlatList
                data={workout.WorkoutExercises}
                renderItem={({item}) => <WorkoutExerciseBox workoutExercise={item}/>}
            />
        </View>
    )
}