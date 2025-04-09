import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { router } from 'expo-router';
import { likeWorkout } from '../api/workouts';
import { getValueFor } from '../api/jwt';

export function WorkoutPost({ workout, onLikeUpdate }) {
    const [isLiking, setIsLiking] = useState(false);
    
    // Fonction pour formater le temps en HH:MM
    const formatTime = () => {
        const seconds = Math.round((new Date(workout.createdAt).getTime() - new Date(workout.started_at).getTime()) / 1000) // Convert to minutes
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }

    // Get likes count from LikedByUsers array
    const likesCount = workout.LikedByUsers ? workout.LikedByUsers.length : 0;
    
    // Check if the current user has liked this workout
    const hasLiked = workout.LikedByUsers && workout.LikedByUsers.some(user => user.id === currentUserId);
    
    // Handle like button press
    const handleLike = async () => {
        if (isLiking) return;
        
        try {
            setIsLiking(true);
            const response = await likeWorkout(workout.id);
            
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
    
    // Get current user ID
    const currentUserId = 1; // Replace with actual user ID retrieval logic

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
                            {likesCount} likes
                        </Text>
                        <Text className="text-gray-500">
                            {workout.comments || 0} comments
                        </Text>
                    </View>
                </View>

                <TouchableOpacity 
                    className={`mt-4 ${hasLiked ? 'bg-blue-100' : ''}`} 
                    onPress={handleLike}
                    disabled={isLiking}
                >
                    <Text className={`${hasLiked ? 'text-blue-500 font-bold' : 'text-gray-500'}`}>
                        {isLiking ? 'Liking...' : hasLiked ? 'Liked' : 'Like'}
                    </Text>
                </TouchableOpacity>
            </View>
    );
} 