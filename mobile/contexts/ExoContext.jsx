import { createContext, useContext, useState, useEffect } from 'react';
import { getAllExos } from '../api/exercises';

const ExoContext = createContext();

export function ExoProvider({ children }) {
    const [allExos, setAllExos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchExos() {
            try {
                setIsLoading(true);
                const data = await getAllExos();
                setAllExos(data);
                setError(null);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching exercises:', err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchExos();
    }, []);

    return (
        <ExoContext.Provider value={{ allExos, isLoading, error }}>
            {children}
        </ExoContext.Provider>
    );
}

export function useExos() {
    const context = useContext(ExoContext);
    if (context === undefined) {
        throw new Error('useExos must be used within an ExoProvider');
    }
    return context;
}
