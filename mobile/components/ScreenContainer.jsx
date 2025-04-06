import {SafeAreaView, View} from 'react-native';
import {containers} from "../styles/theme";
import BetaBar from "./BetaBar";

export const ScreenContainer = (props) => {
    return (
        <SafeAreaView className="flex-1 bg-black" edges={['top', 'left', 'right', 'bottom']}>
            <BetaBar/>
            <View className="flex-1 px-4 py-6">
                {props.children}
            </View>
        </SafeAreaView>
    );
};