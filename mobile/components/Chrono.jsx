import { useState, useEffect } from "react";
import { Text } from "react-native";

// Fonction pour formater le temps en HH:MM:SS
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export default function Chronometer({ startTimestamp }) {
    const [time, setTime] = useState(startTimestamp); // Temps en secondes

    useEffect(() => {
        const interval = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
        }, 1000);

        return () => clearInterval(interval); // Nettoyage à la suppression du composant
    }, []); // Dépendance vide, donc l'effet s'exécute une seule fois

    return <Text className="text-2xl font-bold">{formatTime(time - startTimestamp)}</Text>; // Afficher le temps formaté
}
