import React, { useState } from 'react';
import {View, Text, TouchableOpacity, Image, Alert, FlatList} from 'react-native';
import { router } from 'expo-router';
import { likeWorkout } from '../api/workouts';
import { getValueFor } from '../api/jwt';
import {LikeBtn} from '../components/icons/LikeBtn';
import {BodyText, SubTitle, Title} from "./StyledText";
import ExerciseBox from "./boxes/ExerciseBox";
import {useExos} from "../contexts/ExoContext";

export function WorkoutPost({ workout, onLikeUpdate, userInfo }) {
    const [isLiking, setIsLiking] = useState(false);
    const [localLikesCount, setLocalLikesCount] = useState(workout.LikedByUsers ? workout.LikedByUsers.length : 0);
    const [localHasLiked, setLocalHasLiked] = useState(workout.LikedByUsers && workout.LikedByUsers.some(user => user.id === userInfo?.userId));

    const {allExos} = useExos();

    const sortedExercises = [...workout.Exercises].sort((a, b) => a.order - b.order);

    const getExoNameById = (exoId) => {
        const exo = allExos.find(exo => exo.id === exoId);
        return exo ? exo.name : "Chargement...";
    };

    // Fonction pour obtenir le temps du workout formaté en HH:MM
    const getDuration = () => {
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
            <View className="bg-bgsec rounded-lg mb-4 overflow-hidden p-4">
                <View className="flex-row items-center mb-2">
                    <BodyText className="font-bold">{workout.User?.username || 'Anonymous'}</BodyText>
                    <BodyText className="ml-2">
                        {new Date(workout.createdAt).toLocaleDateString()}
                    </BodyText>
                </View>

                <SubTitle className="mb-2">{workout.name || 'Untitled Workout'}</SubTitle>
                <BodyText className="italic mb-2">{workout.description || 'No description available'}</BodyText>

                <FlatList
                    className="mb-4"
                    data={sortedExercises}
                    renderItem={({item}) => (
                        <BodyText className="font-bold">
                            - {getExoNameById(item.exo_id)}
                        </BodyText>
                    )}
                />

                <View className="flex-row items-center justify-between">
                    <LikeBtn
                        handleLike={handleLike}
                        hasLiked={localHasLiked}
                    />

                    <View className="flex-row items-center">
                        <Text className="text-gray-500 mr-2 right">
                            {localLikesCount} likes
                        </Text>

                        <Text className="text-gray-500">
                            {workout.comments || 0} comments
                        </Text>
                    </View>
                </View>

            </View>
    );
} 