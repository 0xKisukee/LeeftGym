import "../global.css";
import {Container} from "./ScreenContainer";
import {Text, TextInput, View} from "react-native";
import {BodyText} from "./StyledText";

export default function FormField({title, value, placeholder, handleChangeText}) {
    return (
        <View className="mx-5 my-2">
            <BodyText>{title}</BodyText>
            <View>
                <TextInput
                    className="text-text h-12 px-2 my-1 w-full bg-bgsec rounded-lg"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#a8a8a8"
                    onChangeText={handleChangeText}
                />
            </View>
        </View>
    )
}