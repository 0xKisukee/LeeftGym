import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { MessageCircle } from 'react-native-feather';

export const CommentBtn = ({ handleComment }) => {
    return (
        <View className="flex-row items-center">
            <TouchableOpacity
                onPress={handleComment}
                className={`flex-row items-center justify-center rounded-full p-2`}
            >
                <MessageCircle
                    stroke={'#b1b1b1'}
                    width={24}
                    height={24}
                />
            </TouchableOpacity>
        </View>
    );
};