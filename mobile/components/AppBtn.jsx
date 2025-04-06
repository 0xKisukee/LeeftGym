import "../global.css";
import {SafeAreaView} from 'react-native';
import {Text, TouchableOpacity} from "react-native";

export default function AppBtn({title, handlePress}) {
    return (
        <SafeAreaView className="bg-primary py-3 px-6 rounded-lg my-2 max-w-100 mx-5">
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