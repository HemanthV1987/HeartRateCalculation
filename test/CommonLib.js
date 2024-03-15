import * as fs from 'node:fs';

export function calculateMedian(values) {
    const sortedValues = values.sort((a, b) => a - b);
    const mid = Math.floor(sortedValues.length / 2);
    return sortedValues[mid];
}

export function writeOutputToFile(data) {
    fs.writeFile('Output/output.json', JSON.stringify(data, null, 2), err => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log('Output has been written to output.json');
    });
}