import { createContext, useContext, useState, useEffect } from 'react';
import {getAllExos} from '../api/exercises';

const ExoContext = createContext();

export function ExoProvider({ children }) {
    const [allExos, setAllExos] = useState([]);

    useEffect(() => {
        // remove this from use effect
        async function fetchExos() {
            const data = await getAllExos();
            setAllExos(data);
        }
        fetchExos();
    }, []);

    return (
        <ExoContext.Provider value={allExos}>
            {children}
        </ExoContext.Provider>
    );
}

export function useExos() {
    return useContext(ExoContext);
}
