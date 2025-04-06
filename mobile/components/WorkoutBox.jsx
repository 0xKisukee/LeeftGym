import "../global.css";
import {FlatList, Text, TextInput, View} from "react-native";
import ExerciseBox from "./ExerciseBox";
import {BodyText, Title} from "./StyledText";

export default function WorkoutBox({workout}) {
    return (
        <View className="my-3 rounded-lg bg-bgsec">
            <View className="border-b border-primary">
                <Title className="mx-10 my-3">{workout.name}</Title>
            </View>
            <FlatList
                data={workout.Exercises}
                renderItem={({item}) => <ExerciseBox exercise={item}/>}
            />
        </View>
    )
}