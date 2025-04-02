import "../global.css";
import {SafeAreaView} from 'react-native';
import {Text, TouchableOpacity} from "react-native";

export default function AppBtn({title, handlePress}) {
    return (
        <SafeAreaView className="bg-red-200 my-2 rounded-lg max-w-100 mx-5">
            <TouchableOpacity
                onPress={handlePress}>

                <Text
                    className="text-center my-4">
                    {title}
                </Text>

            </TouchableOpacity>
        </SafeAreaView>
    )
}