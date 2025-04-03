import "../global.css";
import {Container} from "./Container";
import {Text, TextInput, View} from "react-native";
import {useState} from "react";

export default function SetBoxCreate({set}) {

    const [order, setOrder] = useState(set.order);
    const [weight, setWeight] = useState(set.weight);
    const [reps, setReps] = useState(set.reps);

    return (
        <View
            style={{flexDirection: "row", justifyContent: "space-around"}}
        >
            <Text className="text-sm">
                {order}
            </Text>

            <TextInput
                value = {String(weight)}
                onChangeText={(text) => setWeight(text)}
                className="text-sm">
            </TextInput>

            <TextInput
                value = {String(reps)}
                onChangeText={(text) => setReps(text)}
                className="text-sm">
            </TextInput>
        </View>
    )
}