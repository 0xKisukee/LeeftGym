import "../global.css";
import {SafeAreaView} from 'react-native';
import {Text, TouchableOpacity} from "react-native";

export default function AppBtn({className, title, handlePress}) {
    return (
        <SafeAreaView className={`${className || ''} bg-primary py-12 px-60 rounded-lg my-2 max-w-100`}>
            <TouchableOpacity
                onPress={handlePress}>

                <Text
                    className="text-center my-4 mx-5">
                    {title}
                </Text>

            </TouchableOpacity>
        </SafeAreaView>
    )
}