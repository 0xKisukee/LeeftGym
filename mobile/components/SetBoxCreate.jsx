import "../global.css";
import {Container} from "./Container";
import {Text, TextInput, View} from "react-native";

export default function SetBoxCreate({set}) {
    return (
        <View
            style={{flexDirection: "row", justifyContent: "space-around"}}
        >
            <Text className="text-sm">{set.order}</Text>
            <Text className="text-sm">{set.weight}</Text>
            <Text className="text-sm">{set.reps}</Text>
        </View>
    )
}