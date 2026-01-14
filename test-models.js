const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

async function checkModels() {
    const key = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        fs.writeFileSync('test-log.txt', JSON.stringify(data, null, 2));
    } catch (error) {
        fs.writeFileSync('test-log.txt', `FETCH ERROR: ${error.message}`);
    }
}

checkModels();
