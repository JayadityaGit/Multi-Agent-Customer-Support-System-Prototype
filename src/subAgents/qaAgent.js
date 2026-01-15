import 'dotenv/config'
import { generateText } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'



const google = createGoogleGenerativeAI({
  apiKey: process.env.AI_API_KEY
});

async function qaAgent(userMessage) {
  try {
    const result = await generateText({
      model: google('gemini-2.5-flash-lite'),
      system: `
        You are a General Support & QA Agent.
        
        Your Capabilities:
        - Answering general FAQs (business hours, location, services)
        - Providing basic troubleshooting steps
        - Explaining company policies
        - Handling "How-to" questions
        
        Tone: Friendly, knowledgeable, and patient.
        
        If the user has a specific account problem (like a missing refund or lost package),
        provide a general answer but advise them that the Billing or Order department might be better suited for specifics.
      `,
      prompt: userMessage
    })

    return result.text;

  } catch (error) {
    console.error("QA Agent Error:", error);
    return "I am unable to answer that question right now.";
  }
}

export default qaAgent;