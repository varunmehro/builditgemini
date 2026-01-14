const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

async function listModels() {
    try {
        const key = process.env.GEMINI_API_KEY;
        console.log("Fetching models with key: " + key.substring(0, 5) + "...");
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
        const data = await response.json();

        if (data.models) {
            const lines = ["AVAILABLE MODELS:"];
            data.models.forEach(m => {
                // Log everything just in case
                lines.push(`- ${m.name} [${m.supportedGenerationMethods.join(', ')}]`);
            });
            fs.writeFileSync('available_models.txt', lines.join('\n'));
            console.log("Success! Check available_models.txt");
        } else {
            console.log("ERROR LISTING MODELS:", JSON.stringify(data, null, 2));
        }

    } catch (error) {
        console.error("Script Error:", error);
    }
}

listModels();
