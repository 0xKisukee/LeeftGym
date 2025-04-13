export function getTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    let interval = Math.floor(seconds / 31536000); // years
    if (interval >= 1) {
        return interval === 1 ? 'il y a 1 an' : `il y a ${interval} ans`;
    }
    
    interval = Math.floor(seconds / 2592000); // months
    if (interval >= 1) {
        return interval === 1 ? 'il y a 1 mois' : `il y a ${interval} mois`;
    }
    
    interval = Math.floor(seconds / 86400); // days
    if (interval >= 1) {
        return interval === 1 ? 'il y a 1 jour' : `il y a ${interval} jours`;
    }
    
    interval = Math.floor(seconds / 3600); // hours
    if (interval >= 1) {
        return interval === 1 ? 'il y a 1 heure' : `il y a ${interval} heures`;
    }
    
    interval = Math.floor(seconds / 60); // minutes
    if (interval >= 1) {
        return interval === 1 ? 'il y a 1 minute' : `il y a ${interval} minutes`;
    }
    
    return 'à l\'instant';
} 