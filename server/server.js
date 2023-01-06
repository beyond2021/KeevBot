import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

//console.log(process.env.OPENAI_API_KEY)
const configueration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,

})

const openAi = new OpenAIApi(configueration);

const app = express();
// middlewares
app.use(cors()); // allows our server to be called from the from end
// allows pass json from front end to backend
app.use(express.json());
// Dummy Route Route
app.get('/', async (req, res) => {
    res.status(200).send({
        message: "Hello from Keev the geneous"
    })


});

app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const response = await openAi.createCompletion({
            model:"text-davinci-003",
            prompt:`${prompt}`,
            temperature:0,
            max_tokens:3000,
            top_p:1,
            frequency_penalty:0.5,
            presence_penalty:0,

        });
        res.status(200).send( {
            bot: response.data.choices[0].text
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send( { error})
        
    }

})
app.listen(5000, () => console.log('Server is running on port http://localhost:5000'));

