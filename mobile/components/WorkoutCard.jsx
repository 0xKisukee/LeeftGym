import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';

export function WorkoutCard({ workout }) {
    // Fonction pour formater le temps en HH:MM
    const formatTime = () => {
        const seconds = Math.round((new Date(workout.createdAt).getTime() - new Date(workout.started_at).getTime()) / 1000) // Convert to minutes
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }

    return (
        <TouchableOpacity
            className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden"
            onPress={() => router.push(`/workout/${workout.id}`)} // NOT WORKING YET
        >
            <View className="p-4">
                <View className="flex-row items-center mb-2">
                    <Text className="font-semibold">{workout.User?.email || 'Anonymous'}</Text>
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
                            {workout.likes || 0} likes
                        </Text>
                        <Text className="text-gray-500">
                            {workout.comments || 0} comments
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
} 