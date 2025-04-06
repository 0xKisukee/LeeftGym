import "../global.css";
import {SafeAreaView, Text, View} from "react-native";
import {Container} from "./ScreenContainer";

export default function BetaBar() {
    return (
        <View>
            <View className="bg-primary my-2">
                <Text className="text-center my-4">APPLICATION EN BETA</Text>
            </View>
        </View>
    )
}