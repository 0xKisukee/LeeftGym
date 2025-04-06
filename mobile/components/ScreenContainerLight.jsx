import {SafeAreaView, View} from 'react-native';
import {containers} from "../styles/theme";
import BetaBar from "./BetaBar";

export const ScreenContainerLight = (props) => {
    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top', 'left', 'right', 'bottom']}>
            <BetaBar/>
            <View className="flex-1">
                {props.children}
            </View>
        </SafeAreaView>
    );
};