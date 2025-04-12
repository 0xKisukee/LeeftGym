import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, Image, Alert, FlatList} from 'react-native';
import { router } from 'expo-router';
import { likeWorkout } from '../../api/workouts';
import {LikeBtn} from '../icons/LikeBtn';
import {BodyText, SubTitle, Title} from "../StyledText";
import ExerciseBox from "./ExerciseBox";
import {ExoContext} from "../../contexts/ExoContext";
import {UserContext} from "../../contexts/UserContext";
import {ReleeftBtn} from "../icons/ReleeftBtn";
import {CommentBtn} from "../icons/CommentBtn";

export function WorkoutBox({ workout, onLikeUpdate, onMenuPress }) {
    const {userInfos} = useContext(UserContext);

    const [isLiking, setIsLiking] = useState(false);
    const [localLikesCount, setLocalLikesCount] = useState(workout.LikedByUsers ? workout.LikedByUsers.length : 0);
    const [localHasLiked, setLocalHasLiked] = useState(workout.LikedByUsers && workout.LikedByUsers.some(user => user.id === userInfos?.userId));

    const { allExos, isLoading, error } = useContext(ExoContext);

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

    const handleReleeft = () => {
        console.info('Releeft');
    }

    const handleComment = () => {
        console.info("Comment");
    }

    return (
            <View className="bg-bgsec rounded-lg mb-4 overflow-hidden p-4">
                <View className="flex-row justify-between items-center mb-2">
                    <View className="flex-row items-center">
                        <BodyText className="font-bold">{workout.User?.username || 'Anonymous'}</BodyText>
                        <BodyText className="ml-2">
                            {new Date(workout.createdAt).toLocaleDateString()}
                        </BodyText>
                    </View>
                    <TouchableOpacity
                        className="mr-4 -mt-2"
                        onPress={onMenuPress}
                    >
                        <Title>...</Title>
                    </TouchableOpacity>
                </View>

                <SubTitle className="mb-2">{workout.name || 'Untitled Workout'}</SubTitle>
                <BodyText className="italic mb-6">{workout.description || 'No description available'}</BodyText>

                <FlatList
                    className="mb-6"
                    data={sortedExercises}
                    renderItem={({item}) => (
                        <BodyText className="font-bold">
                            - {getExoNameById(item.exo_id)}
                        </BodyText>
                    )}
                />

                <View className="flex-row items-center justify-between mx-4">
                    <View className="flex-row">
                        <LikeBtn
                            handleLike={handleLike}
                            hasLiked={localHasLiked}
                        />
                        <Text className="text-gray-300 ml-2 mt-3">
                            {localLikesCount}
                        </Text>
                    </View>

                    <View className="flex-row">
                        <ReleeftBtn
                            handleReleeft={handleReleeft}
                        />
                        <Text className="text-gray-300 ml-2 mt-3">
                            231
                        </Text>
                    </View>

                    <View className="flex-row">
                        <CommentBtn
                            handleComment={handleComment}
                        />
                        <Text className="text-gray-300 ml-2 mt-3">
                            {workout.comments || 0}
                        </Text>
                    </View>
                </View>

            </View>
    );
} 