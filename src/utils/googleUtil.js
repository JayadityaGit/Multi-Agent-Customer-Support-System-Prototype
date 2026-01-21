import 'dotenv/config'
import { createGoogleGenerativeAI } from '@ai-sdk/google'


const google = createGoogleGenerativeAI({
  apiKey: process.env.AI_API_KEY
});



export default google;