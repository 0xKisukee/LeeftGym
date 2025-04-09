import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Heart } from 'react-native-feather';

export const LikeBtn = ({ handleLike, hasLiked }) => {
    return (
        <View className="flex-row items-center">
            <TouchableOpacity
                onPress={handleLike}
                className={`flex-row items-center justify-center rounded-full p-2 ${hasLiked ? 'bg-red-100' : 'bg-gray-100'}`}
            >
                <Heart
                    stroke={hasLiked ? '#ef4444' : '#9ca3af'}
                    fill={hasLiked ? '#ef4444' : 'transparent'}
                    width={24}
                    height={24}
                />
            </TouchableOpacity>
        </View>
    );
};