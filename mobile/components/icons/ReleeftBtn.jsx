import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Repeat } from 'react-native-feather';

export const ReleeftBtn = ({ handleReleeft }) => {
    return (
        <View className="flex-row items-center">
            <TouchableOpacity
                onPress={handleReleeft}
                className={`flex-row items-center justify-center rounded-full p-2`}
            >
                <Repeat
                    stroke={'#bdb039'}
                    width={24}
                    height={24}
                />
            </TouchableOpacity>
        </View>
    );
};