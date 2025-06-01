export const formatDate = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffInSeconds = Math.floor((now - date) / 1000);

    const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
        { label: 'second', seconds: 1 }
    ];
    for (const interval of intervals) {
        const count = Math.floor(diffInSeconds / interval.seconds);
        if (count > 0) {
            return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
        }
    }
    return 'just now';
};

export const calculateDailyAverages = (sensorData) => {
    const dailyAverages = {};

    sensorData.forEach((dataPoint) => {
        const date = new Date(dataPoint.timestamp).toLocaleDateString("en-US");
        if (!dailyAverages[date]) {
            dailyAverages[date] = { sum: 0, count: 0 };
        }
        dailyAverages[date].sum += dataPoint.value;
        dailyAverages[date].count += 1;
    });

    const result = Object.keys(dailyAverages).map((date) => ({
        date,
        average: dailyAverages[date].sum / dailyAverages[date].count,
    }));

    return result;
};