import React, { useState, useEffect } from 'react';
import { View, FlatList, RefreshControl, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { WorkoutPost } from './WorkoutPost';
import {getAll} from '../api/workouts';

export function WorkoutFeed({ userInfo }) {
    const [workouts, setWorkouts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchWorkouts = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getAll();
            setWorkouts(data);
        } catch (error) {
            console.error('Error fetching workouts:', error);
            setError('Failed to load workouts. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchWorkouts();
        setRefreshing(false);
    };

    useEffect(() => {
        fetchWorkouts();
    }, []);

    // Handle like updates
    const handleLikeUpdate = (workoutId, updatedWorkout) => {
        setWorkouts(prevWorkouts => 
            prevWorkouts.map(workout => 
                workout.id === workoutId ? updatedWorkout : workout
            )
        );
    };

    if (loading && !refreshing) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (error) {
        return (
            <View className="flex-1 justify-center items-center p-4">
                <Text className="text-red-500 text-center">{error}</Text>
                <TouchableOpacity 
                    className="mt-4 bg-blue-500 px-4 py-2 rounded-lg"
                    onPress={fetchWorkouts}
                >
                    <Text className="text-white">Try Again</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View className="flex-1">
            <FlatList
                data={workouts}
                renderItem={({ item }) => (
                    <WorkoutPost 
                        workout={item} 
                        onLikeUpdate={handleLikeUpdate}
                        userInfo={userInfo}
                    />
                )}
                keyExtractor={(item) => item.id}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                contentContainerClassName="p-4"
                ListEmptyComponent={
                    <View className="flex-1 justify-center items-center p-4">
                        <Text className="text-gray-500 text-center">No workouts found</Text>
                    </View>
                }
            />
        </View>
    );
} 