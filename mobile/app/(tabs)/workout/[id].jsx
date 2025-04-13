import {View, ActivityIndicator, FlatList} from 'react-native';
import {useLocalSearchParams, router} from 'expo-router';
import {ScreenContainer} from '../../../components/ScreenContainer';
import {BodyText, SubTitle, Title} from '../../../components/StyledText';
import AppBtn from '../../../components/AppBtn';
import {useEffect, useState} from 'react';
import {getWorkoutById} from '../../../api/workouts';
import ExerciseBox from '../../../components/boxes/ExerciseBox';

export default function WorkoutDetails() {
    const {id} = useLocalSearchParams();
    const [workout, setWorkout] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchWorkoutDetails();
    }, [id]);

    const fetchWorkoutDetails = async () => {
        try {
            setLoading(true);
            const data = await getWorkoutById(id);
            setWorkout(data);
        } catch (err) {
            console.error('Error fetching workout details:', err);
            setError('Failed to load workout details');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <ScreenContainer className="justify-center items-center">
                <ActivityIndicator size="large" />
            </ScreenContainer>
        );
    }

    if (error || !workout) {
        return (
            <ScreenContainer className="justify-center items-center">
                <BodyText>{error || 'Workout not found'}</BodyText>
            </ScreenContainer>
        );
    }

    // Sort exercises by order
    const sortedExercises = [...workout.Exercises].sort((a, b) => a.order - b.order);

    const renderHeader = () => (
        <View className="p-4">
            <Title className="text-2xl font-bold mb-4">{workout.name || 'Workout Details'}</Title>

            {/* Workout Header */}
            <View className="bg-bgsec rounded-lg p-4 mb-4 shadow-sm">
                <SubTitle className="text-xl font-semibold">{workout.User?.username || 'Anonymous'}</SubTitle>
                <BodyText className="text-gray-300">
                    Date: {new Date(workout.createdAt).toLocaleDateString()}
                </BodyText>
                {workout.description && (
                    <BodyText className="text-gray-300 mt-2 italic">
                        {workout.description}
                    </BodyText>
                )}
            </View>
        </View>
    );

    return (
        <ScreenContainer>
            <FlatList
                data={sortedExercises}
                renderItem={({item}) => (
                    <ExerciseBox 
                        key={item.id} 
                        exercise={item}
                    />
                )}
                ListHeaderComponent={renderHeader}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </ScreenContainer>
    );
}