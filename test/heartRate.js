import { calculateMedian, writeOutputToFile } from './CommonLib.js'
import * as fs from 'node:fs';


function calculateStatistics(heartRateData) {
    const dailyStatistics = [];

    const groupedData = {};
    heartRateData.forEach(data => {
        const startTime = data.timestamps.startTime;
        if (startTime) {
            const date = new Date(startTime).toISOString().split('T')[0];
            if (!groupedData[date]) {
                groupedData[date] = [];
            }
            groupedData[date].push(data);
        }
    });

    for (const date in groupedData) {
        if (Object.prototype.hasOwnProperty.call(groupedData, date)) {
            const measurements = groupedData[date];
            const min = Math.min(...measurements.map(m => m.beatsPerMinute));
            const max = Math.max(...measurements.map(m => m.beatsPerMinute));
            const median = calculateMedian(measurements.map(m => m.beatsPerMinute));
            const latestDataTimestamp = measurements[measurements.length - 1].timestamps.endTime;
            dailyStatistics.push({ date, min, max, median, latestDataTimestamp });
        }
    }

    return dailyStatistics;
}

fs.readFile('Input/heartrate.json', 'utf8', (err, jsonData) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    try {
        const heartRateData = JSON.parse(jsonData);
        const dailyStatistics = calculateStatistics(heartRateData);
        writeOutputToFile(dailyStatistics);
    } catch (error) {
        console.error('Error parsing JSON:', error);
    }
});
