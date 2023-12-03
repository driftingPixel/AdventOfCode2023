const fs = require('node:fs');

export const readFile = (fileName) => {
    try {
        return fs.readFileSync(fileName, 'utf8')
    } catch (err) {
        console.error(err);
    }
}