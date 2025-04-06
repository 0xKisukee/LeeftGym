import "../global.css";
import {SafeAreaView, Text, View} from "react-native";

export default function BetaBar() {
    return (
        <View className="bg-red-500">
            <Text className="text-center my-2">APPLICATION EN BETA</Text>
        </View>
    )
}