import "../global.css";
import {Container} from "./Container";
import {Text, TextInput, View} from "react-native";

export default function SetBox({set}) {
    return (
        <>
            <Text>Serie: {set.id}</Text>
            <Text>Serie: {set.order}</Text>
            <Text>{set.weight} kg</Text>
            <Text>{set.reps} reps</Text>
        </>
    )
}