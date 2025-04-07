import {SafeAreaView, View} from 'react-native';
import {containers} from "../styles/theme";
import BetaBar from "./BetaBar";

export const ScreenContainer = (props) => {
    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top', 'left', 'right', 'bottom']}>
            <BetaBar/>
            <View className="flex-1 px-4">
                {props.children}
            </View>
        </SafeAreaView>
    );
};