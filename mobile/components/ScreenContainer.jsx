import {SafeAreaView, View} from 'react-native';
import {containers} from "../styles/theme";
import BetaBar from "./BetaBar";

export const ScreenContainer = (props) => {
    return (
        <SafeAreaView className="flex-1 bg-black">
            <BetaBar/>
            <View className="px-4 py-6">
                {props.children}
            </View>
        </SafeAreaView>
    );
};