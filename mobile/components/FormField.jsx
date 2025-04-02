import "../global.css";
import {Container} from "./Container";
import {Text, TextInput, View} from "react-native";

export default function FormField({title, value, handleChangeText}) {
    return (
        <View className="mx-5 my-2">
            <Text>{title}</Text>
            <View>
                <TextInput
                    className="h-12 w-full border border-red-600"
                    value={value}
                    onChangeText={handleChangeText}
                />
            </View>
        </View>
    )
}