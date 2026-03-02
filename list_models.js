const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: 'AIzaSyCTkvIBNNLMQcBQFEKY1TNTj7CvQypCc4Q' });

async function run() {
    try {
        const response = await ai.models.list();
        for await (const model of response) {
            console.log(model.name);
        }
    } catch (e) {
        console.error(e);
    }
}
run();
