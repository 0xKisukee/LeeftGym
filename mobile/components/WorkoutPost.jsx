import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { router } from 'expo-router';
import { likeWorkout } from '../api/workouts';
import { getValueFor } from '../api/jwt';
import {LikeBtn} from '../components/icons/LikeBtn';

export function WorkoutPost({ workout, onLikeUpdate, userInfo }) {
    const [isLiking, setIsLiking] = useState(false);
    const [localLikesCount, setLocalLikesCount] = useState(workout.LikedByUsers ? workout.LikedByUsers.length : 0);
    const [localHasLiked, setLocalHasLiked] = useState(workout.LikedByUsers && workout.LikedByUsers.some(user => user.id === userInfo?.userId));
    
    // Fonction pour formater le temps en HH:MM
    const formatTime = () => {
        const seconds = Math.round((new Date(workout.createdAt).getTime() - new Date(workout.started_at).getTime()) / 1000) // Convert to minutes
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }
    
    // Handle like button press
    const handleLike = async () => {
        if (isLiking) return;
        
        try {
            setIsLiking(true);
            const response = await likeWorkout(workout.id);
            
            // Update local state immediately for better UX
            setLocalHasLiked(!localHasLiked);
            setLocalLikesCount(prev => localHasLiked ? prev - 1 : prev + 1);
            
            // Update the workout with the new likes count
            if (onLikeUpdate) {
                onLikeUpdate(workout.id, response);
            }
        } catch (error) {
            console.error('Error liking workout:', error);
            Alert.alert('Error', 'Failed to like the workout. Please try again.');
        } finally {
            setIsLiking(false);
        }
    };

    return (
            <View className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden p-4">
                <View className="flex-row items-center mb-2">
                    <Text className="font-semibold">{workout.User?.username || 'Anonymous'}</Text>
                    <Text className="text-gray-500 text-sm ml-2">
                        {new Date(workout.createdAt).toLocaleDateString()}
                    </Text>
                </View>

                <Text className="text-lg font-bold mb-2">{workout.name || 'Untitled Workout'}</Text>
                <Text className="text-gray-600 mb-2">{workout.description || 'No description available'}</Text>

                <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                        <Text className="text-gray-500 mr-2">
                            {workout.Exercises?.length || 0} exercises
                        </Text>
                        <Text className="text-gray-500">
                            {formatTime()}
                        </Text>
                    </View>

                    <View className="flex-row items-center">
                        <Text className="text-gray-500 mr-2">
                            {localLikesCount} likes
                        </Text>
                        <Text className="text-gray-500">
                            {workout.comments || 0} comments
                        </Text>
                    </View>
                </View>

                <LikeBtn
                    handleLike={handleLike}
                    hasLiked={localHasLiked}
                />
            </View>
    );
} 