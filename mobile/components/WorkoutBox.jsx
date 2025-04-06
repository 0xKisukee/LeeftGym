import "../global.css";
import {FlatList, Text, TextInput, TouchableOpacity, View} from "react-native";
import ExerciseBox from "./ExerciseBox";
import {BodyText, SubTitle, Title} from "./StyledText";

export default function WorkoutBox({workout}) {
    return (
        <View className="my-3 rounded-lg bg-bgsec">

            <View className="flex-row justify-between border-b border-primary">

                <SubTitle className="mx-5 my-3">{workout.name}</SubTitle>

                <TouchableOpacity className="mr-5 mt-1">
                    <Title>
                        ...
                    </Title>
                </TouchableOpacity>

            </View>

            <FlatList
                data={workout.Exercises}
                renderItem={({item}) => <ExerciseBox exercise={item}/>}
            />

        </View>
    )
}